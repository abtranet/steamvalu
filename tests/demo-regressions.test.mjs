/**
 * Browser regression cover for the two defects fixed in the September review.
 *
 * 1. On a phone, selecting an equipment in the 3D viewer laid the inspector
 *    panel over the control bar. Play/pause, reset, speed, scenario, the camera
 *    presets and the process strip stayed visible but stopped responding.
 * 2. "Explorer l’usine" dropped the visitor on the 2D dashboard instead of the
 *    3D plant.
 *
 * Both are layout- and navigation-level, so they need a real engine. Chrome is
 * driven over CDP with true device metrics — emulating 390px in a resized
 * window is not the same thing and would not have caught either bug.
 */
import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";

import { launchChrome, openPage, chromeAvailable, chromePath, MOBILE, DESKTOP } from "../scripts/lib/cdp.mjs";
import { startServer } from "./helpers/server.mjs";

const SKIP = process.env.SKIP_BROWSER_TESTS === "1";

/**
 * Hit-tests a control the way a tap does: the element under the centre of the
 * control has to be the control itself, or something inside it.
 */
const HIT_TEST = `
  /** The visible box of an element after every clipping ancestor is applied. */
  const visibleBox = (el) => {
    let box = el.getBoundingClientRect();
    box = { left: box.left, top: box.top, right: box.right, bottom: box.bottom };
    for (let parent = el.parentElement; parent; parent = parent.parentElement) {
      const style = getComputedStyle(parent);
      const clips = style.overflow !== 'visible' || style.overflowX !== 'visible' || style.overflowY !== 'visible';
      if (!clips) continue;
      const bounds = parent.getBoundingClientRect();
      box.left = Math.max(box.left, bounds.left);
      box.top = Math.max(box.top, bounds.top);
      box.right = Math.min(box.right, bounds.right);
      box.bottom = Math.min(box.bottom, bounds.bottom);
    }
    box.left = Math.max(box.left, 0);
    box.top = Math.max(box.top, 0);
    box.right = Math.min(box.right, innerWidth);
    box.bottom = Math.min(box.bottom, innerHeight);
    return box;
  };

  const report = [];
  for (const el of document.querySelectorAll(selector)) {
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) continue;
    const style = getComputedStyle(el);
    if (style.visibility === 'hidden' || parseFloat(style.opacity) === 0) continue;

    // A control scrolled out of its own container (the process strip scrolls
    // sideways) is not on screen, so it is not something a tap can miss.
    const box = visibleBox(el);
    if (box.right - box.left < 8 || box.bottom - box.top < 8) continue;

    const hit = document.elementFromPoint((box.left + box.right) / 2, (box.top + box.bottom) / 2);
    const reachable = Boolean(hit) && (el.contains(hit) || hit.contains(el));
    const label = (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40);
    report.push({
      label,
      reachable,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      blockedBy: reachable ? null : (hit ? hit.tagName + '.' + String(hit.className || '').slice(0, 50) : 'nothing'),
    });
  }
  return report;
`;

describe("demo regressions", { skip: SKIP && "SKIP_BROWSER_TESTS=1" }, () => {
  let chrome;
  let server;
  let baseUrl;

  before(async () => {
    assert.ok(
      chromeAvailable(),
      `Chrome not found at ${chromePath()}. Set CHROME_PATH, or set SKIP_BROWSER_TESTS=1 to skip these.`,
    );
    server = await startServer();
    baseUrl = server.baseUrl;
    chrome = await launchChrome();
  }, { timeout: 180000 });

  after(async () => {
    chrome?.close();
    await server?.stop();
  });

  /** Opens the 3D viewer on a phone and waits for the scene to paint. */
  async function openPlant(metrics = MOBILE) {
    const page = await openPage(chrome, metrics);
    await page.goto(`${baseUrl}/demo?view=3d`, { settle: 500 });
    await page.waitFor(`document.querySelector('canvas')`, { label: "the 3D canvas", timeout: 40000 });
    await page.waitFor(`!document.querySelector('[class*="sceneVeil"]')`, { label: "the loading veil to clear", timeout: 40000 });
    return page;
  }

  describe("Explorer l’usine opens the 3D view directly", () => {
    test("the server sends the 3D workspace, so 2D is never painted", async () => {
      const html = await fetch(`${baseUrl}/demo?view=3d`).then((r) => r.text());
      assert.match(html, /id="plant-explorer"/, "the first HTML response must already contain the 3D workspace");
      assert.doesNotMatch(html, /Le procédé, en un regard/, "the dashboard must not be rendered first and swapped");
    });

    test("the dashboard stays the default, including for an unknown view", async () => {
      for (const route of ["/demo", "/demo?view=dashboard", "/demo?view=bogus"]) {
        const html = await fetch(`${baseUrl}${route}`).then((r) => r.text());
        assert.match(html, /Le procédé, en un regard/, `${route} should render the dashboard`);
        assert.doesNotMatch(html, /id="plant-explorer"/, `${route} should not render the 3D workspace`);
      }
    });

    test("tapping the hero call to action lands in 3D on a phone", async () => {
      const page = await openPage(chrome, MOBILE);
      try {
        await page.goto(`${baseUrl}/`, { settle: 2500 });

        const href = await page.evaluate(`
          const link = [...document.querySelectorAll('a[href]')]
            .find((a) => /Explorer l’usine|Explore the plant/.test(a.textContent || ''));
          if (!link) throw new Error('the hero call to action is missing');
          link.click();
          return link.getAttribute('href');
        `);
        assert.equal(href, "/demo?view=3d");

        await page.waitFor(`document.querySelector('#plant-explorer')`, { label: "the 3D workspace" });

        const state = await page.evaluate(`
          const [dashboard, threeD] = document.querySelectorAll('[class*="viewSwitch"] button');
          return {
            search: location.search,
            threeDPressed: threeD?.getAttribute('aria-pressed'),
            dashboardPressed: dashboard?.getAttribute('aria-pressed'),
            dashboardRendered: document.body.textContent.includes('Le procédé, en un regard'),
          };
        `);

        assert.equal(state.search, "?view=3d", "the URL must carry the view so a refresh reopens it");
        assert.equal(state.threeDPressed, "true", "the 3D switch must be the selected one");
        assert.equal(state.dashboardPressed, "false");
        assert.equal(state.dashboardRendered, false, "the 2D dashboard must not be on the page");
      } finally {
        await page.close();
      }
    }, { timeout: 120000 });

    test("refreshing the resulting URL reopens 3D", async () => {
      const page = await openPage(chrome, MOBILE);
      try {
        await page.goto(`${baseUrl}/demo?view=3d`, { settle: 1500 });
        await page.waitFor(`document.querySelector('#plant-explorer')`, { label: "the 3D workspace" });
        await page.evaluate(`location.reload(); return true;`);
        await page.waitFor(`document.querySelector('#plant-explorer')`, { label: "the 3D workspace after reload" });
        assert.equal(await page.evaluate(`return location.search;`), "?view=3d");
      } finally {
        await page.close();
      }
    }, { timeout: 120000 });
  });

  describe("the contact address never reaches the browser", () => {
    test("it is absent from every served page and from the JavaScript bundle", async () => {
      const { readdirSync, readFileSync, statSync } = await import("node:fs");
      const nodePath = await import("node:path");

      // Read the address from the server module rather than repeating it here,
      // so this test keeps working if the destination changes.
      const route = readFileSync("src/app/api/contact/route.ts", "utf8");
      const destination = route.match(/CONTACT_TO_EMAIL \?\? "([^"]+)"/)?.[1];
      assert.ok(destination, "could not read the fallback destination from the contact route");

      for (const route of ["/", "/features", "/about", "/blog", "/monitor-production"]) {
        const html = await fetch(`${baseUrl}${route}`).then((r) => r.text());
        assert.ok(!html.includes(destination), `${route} serves the contact address in its HTML`);
      }

      const chunks = [];
      const walk = (dir) => {
        for (const entry of readdirSync(dir)) {
          const full = nodePath.join(dir, entry);
          if (statSync(full).isDirectory()) walk(full);
          else if (full.endsWith(".js")) chunks.push(full);
        }
      };
      walk(".next/static");
      assert.ok(chunks.length > 0, "no client chunks were found to check");

      const leaking = chunks.filter((file) => readFileSync(file, "utf8").includes(destination));
      assert.deepEqual(leaking, [], "the contact address is readable in the client JavaScript bundle");
    }, { timeout: 60000 });

    test("the WhatsApp link is present and correctly formatted", async () => {
      const page = await openPage(chrome, MOBILE);
      try {
        await page.goto(`${baseUrl}/`, { settle: 2500 });
        const link = await page.evaluate(`
          const button = document.querySelector('[aria-controls="contact-panel"]');
          if (!button) throw new Error('the floating contact button is missing');
          button.click();
          await new Promise((r) => setTimeout(r, 300));
          const anchor = document.querySelector('#contact-panel a[href^="https://wa.me/"]');
          return anchor ? anchor.getAttribute('href') : null;
        `);
        assert.ok(link, "the panel should offer a wa.me link");
        assert.match(link, /^https:\/\/wa\.me\/\d+\?text=/);
      } finally {
        await page.close();
      }
    }, { timeout: 120000 });
  });

  describe("3D viewer controls stay usable on a phone", () => {
    test("selecting an equipment does not cover the control bar", async () => {
      const page = await openPlant();
      try {
        await page.evaluate(`
          const strip = document.querySelectorAll('[class*="processStrip"] button');
          if (!strip.length) throw new Error('the process strip is missing');
          strip[0].click();
          return true;
        `);
        await page.waitFor(`document.querySelector('[class*="inspector"]')`, { label: "the equipment inspector" });

        const geometry = await page.evaluate(`
          const box = (sel) => {
            const el = document.querySelector(sel);
            if (!el) throw new Error('missing ' + sel);
            const r = el.getBoundingClientRect();
            return { top: Math.round(r.top), bottom: Math.round(r.bottom), height: Math.round(r.height) };
          };
          return { inspector: box('[class*="inspector"]'), controls: box('[class*="bottomOverlay"]') };
        `);

        // This is the invariant the bug broke: the panel used to run past the
        // control bar and swallow every tap meant for it.
        assert.ok(
          geometry.inspector.bottom <= geometry.controls.top + 1,
          `the inspector (bottom ${geometry.inspector.bottom}px) overlaps the control bar (top ${geometry.controls.top}px)`,
        );
        assert.ok(geometry.inspector.height > 120, "the inspector collapsed to an unusable height");

        const controls = await page.evaluate(`
          const selector = '[class*="bottomOverlay"] button, [class*="bottomOverlay"] select, [class*="viewTools"] button';
          ${HIT_TEST}
        `);

        assert.ok(controls.length >= 8, `expected the viewer's controls, found ${controls.length}`);
        assert.deepEqual(
          controls.filter((control) => !control.reachable),
          [],
          "these controls are visible but cannot be tapped",
        );
      } finally {
        await page.close();
      }
    }, { timeout: 120000 });

    test("controls stay reachable with an alarm on screen", async () => {
      const page = await openPlant();
      try {
        // The alarm banner grows the control bar; the inspector has to give way.
        await page.evaluate(`
          const select = document.querySelector('select[aria-label="Scénario de simulation"]');
          if (!select) throw new Error('the scenario control is missing');
          select.value = 'steam';
          select.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        `);
        await page.waitFor(`document.querySelector('[class*="alarm"]')`, { label: "the alarm banner" });

        await page.evaluate(`document.querySelectorAll('[class*="processStrip"] button')[1].click(); return true;`);
        await page.waitFor(`document.querySelector('[class*="inspector"]')`, { label: "the equipment inspector" });

        const controls = await page.evaluate(`
          const selector = '[class*="bottomOverlay"] button, [class*="bottomOverlay"] select, [class*="viewTools"] button';
          ${HIT_TEST}
        `);

        assert.deepEqual(
          controls.filter((control) => !control.reachable),
          [],
          "these controls are visible but cannot be tapped while an alarm is showing",
        );
      } finally {
        await page.close();
      }
    }, { timeout: 120000 });

    test("every viewer control meets the 44px touch target", async () => {
      const page = await openPlant();
      try {
        const controls = await page.evaluate(`
          const selector = '[class*="bottomOverlay"] button, [class*="bottomOverlay"] select, [class*="viewTools"] button, [class*="viewSwitch"] button';
          ${HIT_TEST}
        `);
        const small = controls.filter((control) => control.height < 44);
        assert.deepEqual(small, [], "these controls are below the 44px minimum touch target");
      } finally {
        await page.close();
      }
    }, { timeout: 120000 });

    test("the desktop viewer keeps the inspector clear of the controls too", async () => {
      const page = await openPlant(DESKTOP);
      try {
        await page.evaluate(`document.querySelectorAll('[class*="processStrip"] button')[3].click(); return true;`);
        await page.waitFor(`document.querySelector('[class*="inspector"]')`, { label: "the equipment inspector" });

        const geometry = await page.evaluate(`
          const box = (sel) => {
            const r = document.querySelector(sel).getBoundingClientRect();
            return { bottom: Math.round(r.bottom), top: Math.round(r.top) };
          };
          const viewer = document.querySelector('[class*="viewer"]').getBoundingClientRect();
          return {
            inspector: box('[class*="inspector"]'),
            controls: box('[class*="bottomOverlay"]'),
            viewerBottom: Math.round(viewer.bottom),
          };
        `);

        assert.ok(
          geometry.inspector.bottom <= geometry.controls.top + 1,
          `the inspector (bottom ${geometry.inspector.bottom}px) overlaps the control bar (top ${geometry.controls.top}px)`,
        );
        assert.ok(
          geometry.inspector.bottom <= geometry.viewerBottom,
          "the inspector is clipped by the viewer",
        );
      } finally {
        await page.close();
      }
    }, { timeout: 120000 });
  });
});
