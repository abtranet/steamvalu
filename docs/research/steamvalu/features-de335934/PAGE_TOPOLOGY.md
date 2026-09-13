# Features Page — Topology

Source: https://www.twinzo.com/features
Route: `/features` (`src/app/features/page.tsx`)

## Foundation note

At the time this page was researched/built, the shared site foundation
(`src/app/layout.tsx`, `globals.css` brand tokens, and
`src/components/sites/steamvalu/shared/*`) did not yet exist in
this worktree (only the untouched Next.js scaffold was present on
`master`). Rather than block, this pass also created a minimal-but-real
foundation (Header, Footer, ContactModal, shared icons, Lenis smooth
scroll, brand tokens in `globals.css`) extracted from the live site's nav
and footer markup, so this page builds and previews correctly in
isolation. If a fuller foundation lands from another agent, these files
should be reconciled/merged rather than blindly overwritten.

## Layout shell

- `<body>` is a plain flow document (no scroll-snap, no pinned sections).
- `Header` is `position: fixed`, transparent background, 108px tall,
  overlaying the hero (hero has large top padding to compensate).
- Global smooth scroll via Lenis (site-wide, not page-specific).
- Site uses GSAP + ScrollTrigger + Webflow IX2 globally, but the
  `<main id="main" class="page-main">` content on `/features` carries
  **no `data-w-id` interaction attributes and no animation/reveal
  classes** — confirmed by inspecting the raw page HTML. This page's
  content is static flow with no scroll-driven or click-driven state
  switching anywhere in its main content.

## Sections (top to bottom)

1. **Hero** (`section.cc-subpage-hero`) — small green rounded-square
   glyph + "Features" H1, centered, with a gradient sub-paragraph below.
2. **Feature cards grid** (`section.u-no-padding` > `ul.features-top_list`)
   — 4 dark cards in a 2-column wrapping flex grid, each with a full-bleed
   photographic/UI-mockup JPG background, a heading, and a checklist of
   bullet points. Content is top-aligned in 2 cards and bottom-aligned in
   the other 2 (see `FeatureCardsGrid.spec.md`).
3. **Supported external data sources** (`section` > `.features_support-wrap`)
   — light section: heading + intro paragraph + "More about REST API" link,
   followed by a 6-column category list (UWB RTLS, RFID RTLS, BLE RTLS, Man
   down solution, Open source multiplatform middleware, AI-based camera
   feed twinzo RTLS), each with a small checkmark-bulleted list of vendor
   names.
4. **Coming next** (`.features_coming-wrap`) — bordered block (top+bottom
   1px hairline dividers double as the divider above and below this
   section) with a heading and two columns of plain text list items (no
   icons).
5. **CTA — "Get in control"** (`#get-in-countrol-cta`, `section.cc-light`)
   — centered heading, grey paragraph, and a 2-button group ("Try for
   free" outline pill / "Book Demo" solid brand-green pill), both linking
   out to Calendly.

No videos, no carousels, no tabs, no accordions on this page. All
"interactivity" is limited to standard link hovers and the shared
header/footer chrome (dropdowns, mobile menu, contact modal).

## Interaction model summary

| Section | Model |
|---|---|
| Hero | static |
| Feature cards grid | static (hover-only link/card affordance; no click state) |
| Supported data sources | static |
| Coming next | static |
| CTA | static (two outbound links) |

## Responsive breakpoints (from twinzo.com's compiled `site.css`)

The site's root `font-size` (all `rem`-based sizing is relative to it) is:
- `> 1920px`: fixed `12px`
- `1440–1920px`: fluid, `calc(4px + 0.4167vw)`
- `≤ 1440px`: fixed **`10px`** (this is the regime for our 1440/768/390
  reference viewports — i.e. all three of our target breakpoints share the
  exact same rem→px scale, so only explicit per-breakpoint CSS overrides
  change layout, not a fluid root scale).

Breakpoints found in the compiled CSS: `991px`, `767px`, `479px`. This
build collapses that into the standard Tailwind `sm`(640)/`md`(768)/
`lg`(1024) set, targeting the required 1440/768/390 checkpoints:

- **Desktop (1440px+):** 4 feature cards in a 2×2 wrapping grid; support
  section shows all 6 categories in one row (`flex` + `justify-between`);
  "Coming next" and hero paragraph stay on one/two lines.
- **Tablet (768px):** feature cards remain 2 per row (narrower); support
  categories wrap to ~3 per row.
- **Mobile (390px):** feature cards stack to 1 per row
  (`.features-top_list{flex-flow:column}` at ≤479px in source CSS);
  support categories stack to 1 column; "Coming next" 2 columns stack to
  1; hero/CTA headings shrink.
