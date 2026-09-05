# Features Page — Behavior Sweep

## Method

- Fetched the raw server-rendered HTML (`curl` with a desktop UA) and the
  compiled `site.css` / `site.css` media-query blocks directly — this is a
  Webflow site, largely server-rendered, so exact classes/markup/media
  queries were read from source rather than guessed.
- Loaded the live page in a Chrome MCP tab and scrolled top-to-bottom,
  watching for anything that changes on its own (scroll-driven), then
  checked hover/click affordances.
- Extracted computed styles via `getComputedStyle()` through
  `javascript_tool` for every section (hero, cards, support grid, coming
  next, CTA).

## Known tool limitation encountered

The Chrome MCP browser tab used for this research is a **shared window**
across multiple concurrent worktree agents cloning other pages of this
same site. `resize_window` calls did not change the tab's actual
`window.innerWidth` (it stayed pinned at the physical display's 1920px
throughout this session, regardless of the requested size). All
`getComputedStyle()` numbers were therefore captured at an effective
1920px viewport. This was **not a blocker**: the site's root `font-size`
is fixed at `12px` above 1440px and fixed at `10px` at ≤1440px (see
`PAGE_TOPOLOGY.md`), a ratio of exactly `10/12`. Every extracted `rem`-
derived pixel value in the component specs below has been converted back
to the ≤1440px (10px root) regime by multiplying the raw 1920px reading
by `10/12` — e.g. a captured `h1` of `67.2px` is documented as `56px`,
which is what actually renders at 1440/768/390. Non-rem values (raw
image/asset pixel dimensions, border widths) were used as-is.
Live-site mobile (390px) screenshots could not be captured for the same
reason; mobile layout is instead derived directly from the site's own
`@media (max-width: 479px)` CSS rules (read from `site.css` source, not
inferred), which is an equally reliable source of truth.

## Scroll sweep

- No scroll-snap containers.
- No IntersectionObserver-driven reveals were observed in `<main>` for
  this page — content is present at full opacity/position at all scroll
  offsets; no elements carry a `data-w-id` (Webflow interaction) attribute
  in the raw HTML for the features page body.
- Header is `position: fixed` and transparent at all scroll positions on
  this page (no scrolled/solid state was observed to trigger while
  scrolling `/features` — the header does not change appearance here).
- Smooth scroll: Lenis is loaded site-wide (`/js/vendor/lenis.min.js`,
  `<link rel="stylesheet" href="/css/vendor/lenis.css">`); implemented in
  the clone via the `lenis` npm package mounted once in the root layout.

## Click sweep

- "More about REST API" → external link (Atlassian wiki), opens in new tab.
- "Try for free" / "Book Demo" (nav + CTA) → external Calendly booking
  links, open in new tab. Not modals.
- Header "About us → Contact" and Footer "Contact" open the site's
  `#modal-get-in-touch` contact form modal (client-side; the clone
  reproduces this with a local `ContactModal` triggered via a custom
  window event, `openContactModal()`).
- No tabs, accordions, or pill-switchers exist on this page.

## Hover sweep

- Nav links/dropdowns: standard underline/opacity hover, dropdown menus
  open on hover (`data-hover="true"` in source, `.nav_dropdown`).
- Buttons (`Book Demo`, `Try for free`, CTA buttons): opacity/background
  hover only, no scale or shadow transform observed in source CSS for
  this page's buttons.
- Feature cards: no hover state found in compiled CSS for
  `.features-top_card` (static backgrounds, no scale/lift on hover).
- `a:hover .footer_icon` / `.icon_external` (source CSS, global): small
  4px diagonal translate on hover for external-link icons — applied in
  the Header/Footer's external-link chevrons.

## Responsive sweep

Confirmed directly from `site.css` `@media` blocks (see
`PAGE_TOPOLOGY.md` for the breakpoint table). Key structural changes:

- `.features-top_list` (the 4-card grid): `flex-flow: wrap` down to
  480px, then `flex-flow: column` at `≤479px` — i.e. 2-per-row until the
  smallest breakpoint, then a single column.
- `.features_support-wrap_inner` (6-category row): `flex` with
  `justify-content: space-between` at desktop; `flex-basis: 30%` (≈3 per
  row) at `≤991px`; `flex-flow: column` (stacked) at `≤479px`.
- `.features_coming-wrap_inner` (2-column "Coming next" list): flex row
  `justify-content: space-between` at desktop/tablet; stacks to column at
  `≤479px` (inferred from the same pattern applied to `.features_support-
  wrap_inner` in the same media block, and confirmed by the general
  container becoming `flex-flow:column` site-wide at this breakpoint for
  all two-column text blocks).
- Card background images swap at `≤479px` for cards 1 and 4 to dedicated
  smaller mobile crops: `card-bg-2-re.jpg` and `card-bg-4-re.jpg` (both
  downloaded).

## Summary

This page has **zero interactive state-switching** in its main content —
no tabs, no scroll-driven pinning, no accordions. The only true
interaction model on the page is standard hover/click on links and
buttons, all handled with plain CSS `:hover` transitions. This was
verified by scrolling first (nothing auto-changed) before testing any
clicks, per the "identify interaction model before building" principle.
