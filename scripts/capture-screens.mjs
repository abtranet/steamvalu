/**
 * Screenshot capture for design review.
 *
 *   node scripts/capture-screens.mjs <baseUrl> <outDir>
 *
 * Uses CDP rather than Chrome's `--screenshot` flag: that flag cannot render
 * below Chrome's minimum window width on macOS, so a 390px capture comes out as
 * a crop of a ~500px layout rather than a phone-width render.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { launchChrome, openPage, DESKTOP, MOBILE, sleep } from "./lib/cdp.mjs";

const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = process.argv[3] ?? "docs/design-references/screens";

const ROUTES = [
  ["home", "/"],
  ["features", "/features"],
  ["about", "/about"],
  ["monitor-production", "/monitor-production"],
  ["blog", "/blog"],
  ["demo-3d", "/demo?view=3d"],
  ["demo-dashboard", "/demo?view=dashboard"],
  ["demo-compressor", "/demo/compressor"],
];

const chrome = await launchChrome({ port: 9333 });
let failed = false;

try {
  await mkdir(OUT, { recursive: true });

  for (const [name, route] of ROUTES) {
    for (const [suffix, metrics] of [["desktop", DESKTOP], ["mobile", MOBILE]]) {
      const page = await openPage(chrome, metrics);
      try {
        await page.goto(BASE + route, { settle: 0 });
        // Scroll-driven sections and the 3D canvas both need time to settle.
        await sleep(route.startsWith("/demo") ? 15000 : 6000);
        const file = path.join(OUT, `${name}-${suffix}.png`);
        await writeFile(file, await page.screenshot());
        console.log(`${file}  ${metrics.width}x${metrics.height}`);
      } finally {
        await page.close();
      }
    }
  }
} catch (error) {
  failed = true;
  console.error(error.message);
} finally {
  chrome.close();
}

process.exit(failed ? 1 : 0);
