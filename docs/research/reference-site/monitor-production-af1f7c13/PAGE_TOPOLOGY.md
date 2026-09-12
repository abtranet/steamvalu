# Page Topology — /monitor-production ("Gemba, in 3D")

Source: https://www.the reference site/monitor-production
Route: `src/app/monitor-production/page.tsx`

## Global facts confirmed for this page

- Fetched raw HTML via curl (server-rendered, Webflow-built) — main content is fully present in initial HTML, no client-side content injection needed for text.
- Loads `gsap.min.js`, `ScrollTrigger.min.js`, `Flip.min.js`, `TextPlugin.min.js`, `lenis.min.js`, `ix2*.js` — confirming the site-wide GSAP/ScrollTrigger/Flip/Lenis stack noted in the brief.
- **However, on THIS page specifically**: downloaded and read `/js/reference site-webpage/index.js` (the only custom script beyond vendor libs) in full — it contains **zero** references to `gsap`, `ScrollTrigger`, or `Flip`. It only handles: mobile nav toggle, sticky-nav-on-scroll class toggle, country <select> population, UTM param capture, and form submission/validation.
- The hero visual carries leftover markup attributes `js-scrollflip-element="zone"` / `="target"` (a shared Webflow component also used elsewhere on the site, e.g. homepage), but **no JS on this page ever queries `[js-scrollflip-element]`** — verified via live Chrome browser scroll-through (screenshots below) that the phone-mockup/video visual does not move, resize, or "flip" on scroll. It is purely static, CSS-positioned (absolute, negative-margin overlap into the section below).
- **Interaction model verdict for this whole page: static / flow content.** No scroll-driven pinned sections, no click-tabs, no carousel. The only inherited interactive elements are the fixed Header (shared, already built) and the shared Lenis smooth scroll + ScrollTrigger.refresh() (site-wide, in Header/SmoothScroll shared components already).
- Confirmed via `getComputedStyle` in live Chrome (1440px) — see each component spec for exact values.

## Sections, top to bottom (between fixed Header and Footer)

1. **Hero** (`section.cc-cs-hero`) — dark/black rounded card. "Use case" eyebrow, H1 "Gemba, in 3D", intro paragraph, 3-stat row (€10K / 2 wk. / 20%), and a phone-mockup-with-embedded-video visual that overlaps down into section 2 via negative margin. Static, no animation.
2. **Problem / Solution** (`section` plain, white bg) — two-row "label + paragraph" list (Problem / Solution). Static text.
3. **CTA banner #1** (`section.cc-cta-banner.whitepaper-section`) — brand-green pill banner, "Book Your Free Expert Session" + "Book now" button linking to Calendly. Static.
4. **Stats / grey section** (`section.cc-grey-bg`) — light-grey rounded card, "Let us talk about the numbers" heading + repeated 3-stat row (larger numerals than hero). Static.
5. **CTA banner #2** (`section.cc-cta-banner.whitepaper-section`) — same green pill pattern, "Get free Whitepaper for step-by-step instructions" + "Download now" button linking to `/get-whitepaper`. Static.
6. **Related use cases** (`section.u-pt-0`) — 2-column grid of related use-case cards (image + title + description + link), linking to the other two use-case pages (`/material-order-automation`, `/optimize-internal-logistics`). Static.

No sticky/fixed elements within main content (Header is fixed but is shared/out of scope). No z-index layering conflicts beyond the hero visual's normal stacking (bg black card behind, phone mockup + video mask above it, both `position: absolute` inside `.cs-hero_visual`).

## Layout

- All sections wrapped in `.container` → `max-width: 1132px`, centered, no horizontal padding of its own (edge spacing comes from viewport centering + `.section` vertical padding only — horizontal gutter beyond 1132px is just centering whitespace, but we add a small `px-6` safety gutter for narrow viewports between 1132px and typical tablet since Webflow uses per-breakpoint rem scaling that shrinks the effective font-size/spacing scale rather than adding container padding).
- Vertical rhythm (desktop 1440, computed via `getComputedStyle`):
  - Hero: padding-top 220px, padding-bottom 170px
  - Problem/Solution: padding-top 40px, padding-bottom 120px
  - CTA banner (both): padding-top 40px, padding-bottom 80px
  - Grey stats: padding-top 40px, padding-bottom 120px
  - Related: padding-top 0, padding-bottom 120px

## Responsive breakpoints (from `site.css` media queries, confirmed against Webflow's standard 991/767px breakpoints)

- **991px (tablet):** `.cs-stats_item` width 47% (2-per-row wrap for the grey stats section), CTA banner padding shrinks, related visual becomes `flex: none`.
- **767px (mobile):** `.cs_hero-list` (hero's 3-stat row) switches to column stack; `.cs-stats_item` width 100% (grey stats section fully stacks); `.cta-banner` switches to column layout (text above button, centered); `.cs-hero_visual` / `.cs-hero_bg` overlap amount changes to `-20vw`/`20vw` (vs fixed px on desktop); `.cs-related_visual` fixed width 16rem (160px) — related cards likely also stack to a single column (verified visually not available due to browser window-resize limitation in this session — implemented as a Tailwind `flex-col sm:flex-row` / grid `grid-cols-1 md:grid-cols-2` per Webflow's `hp-cases_list{flex-flow:column}` rule at 991px).

## Screenshots captured

- `docs/design-references/reference-site/monitor-production-af1f7c13/desktop-hero.png`
- `docs/design-references/reference-site/monitor-production-af1f7c13/desktop-problem-solution.png`
- `docs/design-references/reference-site/monitor-production-af1f7c13/desktop-cta-stats.png`
- `docs/design-references/reference-site/monitor-production-af1f7c13/desktop-related.png`
- `docs/design-references/reference-site/monitor-production-af1f7c13/mobile-hero.png`

## Assets downloaded

- `public/sites/reference-site/monitor-production-af1f7c13/images/phone-mockup-horizontal.png` (1819×897 PNG, device frame)
- `public/sites/reference-site/monitor-production-af1f7c13/images/production-monitoring.jpg` (424×424 JPEG)
- `public/sites/reference-site/monitor-production-af1f7c13/images/logistics-optimization.jpg` (424×424 JPEG)
- Hero video: embedded YouTube iframe (`https://www.youtube.com/embed/ncxY4i55CME`), autoplay/muted/looped/no-controls — not a downloadable local asset; embedded as a live iframe in the component, matching source exactly.
