/**
 * Serves the app for a browser test run.
 *
 * Tests run against a production build rather than `next dev`: it is what
 * actually ships, it has no HMR overlay to confuse hit-testing, and Next 16
 * refuses to start a second dev server for a directory that already has one.
 *
 * Set TEST_BASE_URL to point the suite at a server you started yourself.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { createServer } from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const BUILD_ID = path.join(ROOT, ".next", "BUILD_ID");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function run(command, args, { capture = false } = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { cwd: ROOT, stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit" });
    let output = "";
    proc.stdout?.on("data", (chunk) => { output += chunk; });
    proc.stderr?.on("data", (chunk) => { output += chunk; });
    proc.on("error", reject);
    proc.on("exit", (code) => (code === 0 ? resolve(output) : reject(new Error(`${command} exited with ${code}\n${output}`))));
  });
}

async function freePort() {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.on("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const { port } = probe.address();
      probe.close(() => resolve(port));
    });
  });
}

export async function startServer() {
  if (process.env.TEST_BASE_URL) {
    return { baseUrl: process.env.TEST_BASE_URL.replace(/\/$/, ""), stop: async () => {} };
  }

  if (!existsSync(BUILD_ID)) {
    console.log("No production build found — running `next build` first…");
    await run("npx", ["next", "build", "--webpack"], { capture: true });
  }

  const port = await freePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const proc = spawn("npx", ["next", "start", "--port", String(port)], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
  });

  let log = "";
  proc.stdout.on("data", (chunk) => { log += chunk; });
  proc.stderr.on("data", (chunk) => { log += chunk; });

  const stop = async () => {
    proc.kill();
    await sleep(300);
  };

  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (proc.exitCode !== null) throw new Error(`next start exited early:\n${log}`);
    try {
      const response = await fetch(baseUrl, { signal: AbortSignal.timeout(3000) });
      if (response.ok) return { baseUrl, stop };
    } catch {
      // not listening yet
    }
    await sleep(500);
  }

  await stop();
  throw new Error(`Server did not become ready on ${baseUrl}\n${log}`);
}
