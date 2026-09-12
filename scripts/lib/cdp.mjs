/**
 * A very small Chrome DevTools Protocol client.
 *
 * Chrome's `--screenshot` flag cannot render below its minimum window width on
 * macOS, and it cannot drive a page at all, so both the design-review capture
 * and the browser regression tests need CDP. Node 22+ ships a global WebSocket,
 * so this needs no dependencies.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const DEFAULT_CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false };
export const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2, mobile: true };

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function chromePath() {
  return process.env.CHROME_PATH ?? DEFAULT_CHROME;
}

export function chromeAvailable() {
  return existsSync(chromePath());
}

async function connect(url) {
  const socket = new WebSocket(url);
  const pending = new Map();
  let nextId = 0;

  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", () => reject(new Error(`Could not open ${url}`)), { once: true });
  });

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    const entry = pending.get(message.id);
    if (!entry) return;
    pending.delete(message.id);
    if (message.error) entry.reject(new Error(message.error.message));
    else entry.resolve(message.result);
  });

  return {
    send(method, params = {}) {
      const id = ++nextId;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
    close: () => socket.close(),
  };
}

/** Starts headless Chrome and waits for its debugging endpoint to answer. */
export async function launchChrome({ port = 9444 } = {}) {
  const binary = chromePath();
  if (!existsSync(binary)) {
    throw new Error(`Chrome not found at ${binary}. Set CHROME_PATH to a Chrome or Chromium binary.`);
  }

  const profile = path.join(process.env.TMPDIR ?? "/tmp", `sv-cdp-${process.pid}-${Date.now()}`);
  const proc = spawn(binary, [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${profile}`,
    "about:blank",
  ], { stdio: "ignore" });

  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      await fetch(`http://127.0.0.1:${port}/json/version`).then((r) => r.json());
      return { port, close: () => proc.kill() };
    } catch {
      await sleep(250);
    }
  }
  proc.kill();
  throw new Error("Chrome did not expose a debugging endpoint in time");
}

/** Opens a tab with real device metrics, which is what makes 390px mean 390px. */
export async function openPage(chrome, metrics = DESKTOP) {
  const target = await fetch(`http://127.0.0.1:${chrome.port}/json/new?about:blank`, { method: "PUT" })
    .then((r) => r.json());
  const session = await connect(target.webSocketDebuggerUrl);

  await session.send("Emulation.setDeviceMetricsOverride", metrics);
  if (metrics.mobile) {
    await session.send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
  }
  await session.send("Page.enable");
  await session.send("Runtime.enable");

  return {
    async goto(url, { settle = 1200 } = {}) {
      await session.send("Page.navigate", { url });
      await sleep(settle);
    },

    /** Evaluates an expression in the page and returns its value. */
    async evaluate(expression) {
      const result = await session.send("Runtime.evaluate", {
        expression: `(async () => { ${expression} })()`,
        awaitPromise: true,
        returnByValue: true,
      });
      if (result.exceptionDetails) {
        throw new Error(result.exceptionDetails.exception?.description ?? "Evaluation failed");
      }
      return result.result.value;
    },

    /** Polls `expression` until it is truthy, so waits track the page not the clock. */
    async waitFor(expression, { timeout = 20000, interval = 250, label = expression } = {}) {
      const deadline = Date.now() + timeout;
      while (Date.now() < deadline) {
        if (await this.evaluate(`return Boolean(${expression});`)) return true;
        await sleep(interval);
      }
      throw new Error(`Timed out waiting for: ${label}`);
    },

    async screenshot() {
      const { data } = await session.send("Page.captureScreenshot", { format: "png" });
      return Buffer.from(data, "base64");
    },

    async close() {
      session.close();
      await fetch(`http://127.0.0.1:${chrome.port}/json/close/${target.id}`).catch(() => {});
    },
  };
}
