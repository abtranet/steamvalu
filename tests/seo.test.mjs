import { test } from "node:test";
import assert from "node:assert/strict";
import { PAGE_SEO } from "../src/lib/seo-pages.ts";
import { FAQ } from "../src/components/sites/steam-value/root-8a5edab2/faq.ts";

const pages = Object.entries(PAGE_SEO);

test("titles fit search results and carry the brand", () => {
  for (const [key, page] of pages) {
    assert.ok(page.title.length <= 60, `${key}: title is ${page.title.length} characters`);
    assert.match(page.title, /STEAM VALUE™/, `${key}: title should name the brand`);
  }
});

test("descriptions are 150–160 characters", () => {
  for (const [key, page] of pages) {
    const { length } = page.description;
    assert.ok(length >= 150 && length <= 160, `${key}: description is ${length} characters`);
  }
});

test("titles, descriptions and paths are unique", () => {
  for (const field of ["title", "description", "path"]) {
    const values = pages.map(([, page]) => page[field]);
    assert.equal(new Set(values).size, values.length, `duplicate ${field}`);
  }
});

test("the FAQ has the same questions in both languages", () => {
  assert.ok(FAQ.fr.length >= 5, "the FAQ needs enough questions to be useful");
  assert.equal(FAQ.fr.length, FAQ.en.length);
  for (const item of [...FAQ.fr, ...FAQ.en]) {
    assert.ok(item.question.trim() && item.answer.trim().length > 40, `thin FAQ entry: ${item.question}`);
  }
});
