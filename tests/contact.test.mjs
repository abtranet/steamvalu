/**
 * The destination address for the contact form must never reach the browser.
 *
 * "Do not display that email" is stronger than not printing it on screen: it
 * must not appear in any client component, in the rendered HTML, or in the
 * JavaScript bundle, where anyone could read it out of view-source. These tests
 * pin that down at the source level; demo-regressions.test.mjs checks the built
 * output that actually ships.
 */
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { validateContact, whatsappLink, WHATSAPP_NUMBER } from "../src/lib/contact.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src");
const SERVER_ONLY = path.join("src", "app", "api", "contact", "route.ts");

/** Matches any email address, so a different one cannot slip in unnoticed. */
const EMAIL = /[\w.+-]+@[\w-]+\.[\w.]{2,}/g;

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

describe("contact address stays server-side", () => {
  test("no client component contains an email address", () => {
    const leaks = FILES
      .filter((file) => file.path !== SERVER_ONLY)
      .flatMap((file) => {
        const found = file.text.match(EMAIL) ?? [];
        // The Resend sender placeholder is configuration, not a contact address.
        const real = found.filter((address) => !address.endsWith("@resend.dev"));
        return real.map((address) => `${file.path}: ${address}`);
      });

    assert.deepEqual(leaks, [], "these files would ship an email address to the browser");
  });

  test('the destination lives only in the server route', () => {
    const route = FILES.find((file) => file.path === SERVER_ONLY);
    assert.ok(route, `${SERVER_ONLY} is missing`);
    assert.match(route.text, /CONTACT_TO_EMAIL/, "the destination should be configurable by environment variable");
    assert.doesNotMatch(route.text, /"use client"/, "the contact route must never become a client module");
  });

  test("the widget posts to the API instead of linking mailto:", () => {
    const widget = FILES.find((file) => file.path.endsWith(path.join("contact", "ContactWidget.tsx")));
    assert.ok(widget, "the contact widget is missing");
    assert.doesNotMatch(widget.text, /mailto:/, "a mailto: link would expose the address in the DOM");
    assert.match(widget.text, /fetch\("\/api\/contact"/, "the form should post to the server route");
  });
});

describe("contact helpers", () => {
  test("the WhatsApp link is a valid wa.me deep link", () => {
    const link = whatsappLink("Bonjour");
    assert.match(link, /^https:\/\/wa\.me\/\d+\?text=/);
    assert.ok(link.includes(WHATSAPP_NUMBER));
    assert.doesNotMatch(WHATSAPP_NUMBER, /\D/, "wa.me needs digits only, no +, spaces or dashes");
  });

  test("validation rejects what the form should not send", () => {
    assert.deepEqual(validateContact({ name: "Ada Lovelace", email: "ada@example.com", message: "Ten characters at least." }), []);
    assert.ok(validateContact({ name: "A", email: "ada@example.com", message: "Ten characters at least." }).includes("name"));
    assert.ok(validateContact({ name: "Ada", email: "nope", message: "Ten characters at least." }).includes("email"));
    assert.ok(validateContact({ name: "Ada", email: "ada@example.com", message: "short" }).includes("message"));
    assert.ok(validateContact({}).length >= 3);
  });
});
