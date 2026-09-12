/**
 * Regression cover for the "Explorer l’usine" entry point, at the source level.
 *
 * The reported bug was that the call to action dropped the visitor on the 2D
 * dashboard. The fix routes every instance through `PLANT_3D_HREF` and resolves
 * the view on the server. These tests fail if either half is undone.
 */
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { parseDemoView, PLANT_3D_HREF } from "../src/components/palm-oil/view.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src");

function sourceFiles(dir = SRC) {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.tsx?$/.test(entry) ? [full] : [];
  });
}

const FILES = sourceFiles().map((file) => ({
  path: path.relative(ROOT, file),
  text: readFileSync(file, "utf8"),
}));

describe("parseDemoView", () => {
  test("recognises the 3D view", () => {
    assert.equal(parseDemoView("3d"), "3d");
    assert.equal(parseDemoView("3D"), "3d");
    assert.equal(parseDemoView(["3d"]), "3d", "repeated query params arrive as an array");
  });

  test("recognises the dashboard view", () => {
    assert.equal(parseDemoView("dashboard"), "dashboard");
    assert.equal(parseDemoView("2d"), "dashboard");
  });

  test("returns null for anything else, so the caller picks the default", () => {
    for (const value of [undefined, null, "", "bogus", "3", [], ["nope"]]) {
      assert.equal(parseDemoView(value), null, `expected null for ${JSON.stringify(value)}`);
    }
  });

  test("PLANT_3D_HREF round-trips through the parser", () => {
    const view = new URL(PLANT_3D_HREF, "http://localhost").searchParams.get("view");
    assert.equal(parseDemoView(view), "3d", `${PLANT_3D_HREF} must parse back to the 3D view`);
  });
});

describe("plant call-to-action wiring", () => {
  // The French and English labels of the CTA named in the brief.
  const CTA_LABELS = ["Explorer l’usine", "Explore the plant"];

  /** The file's own code, with import statements removed. */
  const body = (file) => file.text.replace(/^\s*import[\s\S]*?;\s*$/gm, "");

  test("every linked instance of the CTA uses PLANT_3D_HREF", () => {
    const linked = FILES.filter((file) =>
      CTA_LABELS.some((label) => file.text.includes(label)) && /href=|href:/.test(file.text));

    assert.ok(linked.length >= 3, `expected the CTA to appear in several linked components, found ${linked.length}`);

    for (const file of linked) {
      // An import alone is not enough: the constant has to be the href.
      assert.ok(
        body(file).includes("PLANT_3D_HREF"),
        `${file.path} links the plant CTA but does not use PLANT_3D_HREF — it would land on the 2D dashboard`,
      );
    }
  });

  test("no plant CTA links to the bare dashboard route", () => {
    const offenders = FILES
      .filter((file) => CTA_LABELS.some((label) => file.text.includes(label)))
      .filter((file) => /href\s*[=:]\s*["']\/demo["']/.test(file.text))
      .map((file) => file.path);

    assert.deepEqual(
      offenders,
      [],
      'these files send the plant CTA to "/demo", which opens the 2D dashboard',
    );
  });

  test("the 3D href is defined in exactly one place", () => {
    const hardCoded = FILES.filter((file) =>
      file.text.includes('"/demo?view=3d"') && !file.path.endsWith(path.join("palm-oil", "view.ts")));

    assert.deepEqual(
      hardCoded.map((file) => file.path),
      [],
      "hard-coded 3D links drift from the constant; import PLANT_3D_HREF instead",
    );
  });

  test("the demo route resolves the view on the server", () => {
    const page = FILES.find((file) => file.path === path.join("src", "app", "demo", "page.tsx"));
    assert.ok(page, "src/app/demo/page.tsx is missing");
    assert.match(page.text, /searchParams/, "the route must read searchParams to pick the view server-side");
    assert.match(page.text, /parseDemoView/, "the route must use the shared parser");
    assert.match(page.text, /initialView/, "the resolved view must reach PalmOilDemo as a prop");
  });

  test("no stored preference can override the requested view", () => {
    const offenders = FILES.filter((file) =>
      /palm-oil/.test(file.path) && /localStorage|sessionStorage/.test(file.text));

    assert.deepEqual(
      offenders.map((file) => file.path),
      [],
      "a persisted view preference would override an explicit ?view= entry",
    );
  });
});
