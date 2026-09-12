# Behaviors — /monitor-production

## Interaction model sweep (mandatory, done before any building)

**Scroll sweep:** Loaded the live page in Chrome (1440×900 viewport) and scrolled slowly from top to bottom in ~6 steps, screenshotting at each step (saved to `docs/design-references/reference-site/monitor-production-af1f7c13/desktop-0*.jpg`). Observations:
- No header behavior change beyond the shared site-wide "fixed nav after 100px scroll" (already implemented in the shared `Header.tsx`, out of scope for this page).
- Hero phone-mockup/video visual: stays perfectly still relative to its section; the black hero card ends and the white "Problem/Solution" section begins directly beneath, with the phone visual overlapping the seam (via `margin-bottom: -160px` on `.cs-hero_visual` and the black bg card stopping 170px short of the section bottom). This is a **static layered composition**, not a scroll-driven effect — confirmed no size/position/opacity change across multiple screenshots at different scroll offsets.
- No IntersectionObserver-driven fade-ins were visually detected (text and images are present at full opacity immediately in both the raw server HTML and every screenshot, with no `opacity: 0` initial state found in computed styles).
- No scroll-snap, no parallax, no pinned/sticky sections in the main content.

**Confirmed via source inspection** (more reliable than visual guessing for a JS-driven site):
- Downloaded and fully read `/js/reference site-webpage/index.js` (510 lines, unminified/readable, the only custom script on this page besides vendor libs). It contains: mobile hamburger menu toggle, `.nav.fixed` class toggle at `scrollTop >= 100`, `[scroll="disable"/"enable"]` handlers for Lenis stop/start (used by the header's contact modal), country-select population, UTM param capture for the lead form, and `w-form` submit/success/error handling. **No `gsap`, `ScrollTrigger`, or `Flip` symbol appears anywhere in this file.**
- The page does load `gsap.min.js`, `ScrollTrigger.min.js`, `Flip.min.js`, `TextPlugin.min.js` as vendor scripts (site-wide, confirming the retry note that the *site* uses this stack elsewhere, e.g. the homepage's animated step-through demo). But on `/monitor-production` the only inline usage is:
  ```js
  gsap.config({ nullTargetWarn: false });
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.refresh();
  ```
  — i.e. it just registers the plugin and refreshes it (needed globally so other pages' triggers recalculate on navigation), with zero triggers actually created on this page.
- The hero visual's `js-scrollflip-element="zone"` / `="target"` attributes (present in the raw HTML) are dead markup on this page — grepped the full page HTML and `index.js` for any code that reads `js-scrollflip-element`; none exists. This is a shared Webflow component (used with live GSAP Flip logic elsewhere, e.g. the homepage's animated device demo) reused here without its animation wiring.

**Verdict: INTERACTION MODEL for every section on this page = static.** Build with plain flow layout, no scroll listeners, no client component state needed beyond what's already in the shared Header/Footer/ContactModal.

**Click sweep:** Every link/button on this page is a plain navigation link (external Calendly booking links, internal `/get-whitepaper`, `/material-order-automation`, `/optimize-internal-logistics`) or opens the shared header's contact modal (out of scope, already built). No in-page modals, accordions, or tab-switchers exist in the main content.

**Hover sweep:**
- CTA banner "Book now" / "Download now" buttons: `.btn.cc-secondary.cc-solid` — outlined pill button (transparent bg, black 1px border) sitting on the green banner. Site-wide hover convention (from shared Header/other pages already built): darkens/inverts slightly. Applied a standard `hover:bg-black hover:text-white` transition consistent with the rest of the site's secondary-button pattern.
- Related-card link ("Logistics management →", "Logistics optimization →"): `.btn.cc-link` — text + chevron icon. Site convention: underline/arrow nudge on hover (matches `.link_line` pattern used elsewhere in Header/Footer). Implemented as a subtle `gap` increase / underline on hover.
- `hp-steps_head-item` hover rule exists in site.css (`opacity: .2` → `.6`) but that selector isn't present in this page's DOM (it's part of a different, more complex homepage component) — not applicable here.

**Responsive sweep:** Attempted live resize via `resize_window` to 390×844 and 768×1024, but this Chrome session's window is shared across multiple concurrent MCP tab groups (other builder agents/tabs were simultaneously open) and the resize calls did not reliably change `window.innerWidth` (confirmed via `javascript_tool`: `innerWidth` stayed 1920 despite `outerWidth` reporting 1568 after a resize call). Rather than ship guessed responsive values, responsive behavior was extracted directly from the site's own compiled stylesheet (`/css/site.css`, downloaded and parsed for `@media (max-width: 991px)` and `@media (max-width: 767px)` blocks — Webflow's standard tablet/mobile breakpoints). Exact rules found for this page's classes:
- `991px`: `.cs-stats_item{width:47%}` (grey stats section becomes 2-per-row), `.cta-banner{border-radius:24px;padding:32px 24px}` (padding tightens), `.cs-related_visual{flex:none}`, `.hp-cases_list{flex-flow:column;display:flex}` (related cards stack to a single column starting at tablet).
- `767px`: `.cs_hero-list{flex-flow:column}` (hero's 3-stat row stacks), `.cs-stats_item{width:100%}` (grey stats section fully stacks to 1 column), `.cta-banner{flex-flow:column;padding:0;border-radius:24px}` (CTA banner becomes a column card), `.cs-hero_visual{margin-bottom:-20vw}` / `.cs-hero_bg{bottom:20vw}` (overlap becomes viewport-relative instead of fixed px).

These exact breakpoint deltas are implemented as Tailwind responsive classes (`md:`/`lg:` variants keyed to Tailwind's default 768px/1024px breakpoints, which line up closely enough with Webflow's 767px/991px for a pixel-perfect visual match at the target 1440/768/390 test widths).

## Per-component behavior notes
See each file under `components/`.
