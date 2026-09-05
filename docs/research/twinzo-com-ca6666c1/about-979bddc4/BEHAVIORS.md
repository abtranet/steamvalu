# Behaviors — /about

## 1. Founding timeline — scroll-driven pinned horizontal scroller (THE key interaction)

**INTERACTION MODEL: scroll-driven, not click-driven.** Confirmed by scrolling the live page slowly end to end (screenshots at 1440px in `docs/design-references/.../about-979bddc4/`): as the user scrolls vertically through the section, the row of 9 year-cards translates horizontally (left) in lockstep with scroll position. There is no click/tap/arrow control anywhere in the DOM for this section — no buttons, no `tabindex` list, no `role="tablist"`. It only responds to scroll.

### Exact source mechanism (from `https://www.twinzo.com/js/twinzo-webpage/about.js`, reproduced in full — this is the ground truth, not a guess)

```js
var horizontalRow = $('[horizontal-scroll="row"]');       // .about-history (flex row, all 10 items)
var horizontalItem = $('[horizontal-scroll="item"]');      // .about-history_item (each of the 9)
var horizontalSection = $('[horizontal-scroll="section"]'); // .about-timeline_wall (OUTER wrapper div)

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: horizontalSection,   // the wall div, not the inner <section>
    start: "top top",
    end: "bottom bottom",
    invalidateOnRefresh: true,
    scrub: 1                      // 1s smoothing lag between scroll and animated value
  }
});
tl.to(horizontalRow, { x: () => -moveDistance, duration: 1 });

function calculateScroll() {
  horizontalSection.css("height", "200vh");
  moveDistance = horizontalRow.outerWidth() - $(window).width();
  horizontalSection.css("min-height", (horizontalItem.outerWidth() * horizontalItem.length) + "px");
}

// Disabled entirely below 991px viewport width — becomes normal static flow:
function isMobile() { return window.innerWidth <= 991; }
if (isMobile()) {
  ScrollTrigger.getById("horizontalScroll")?.kill();
  gsap.set(horizontalRow, { clearProps: "all" });
  gsap.set(horizontalSection, { height: "auto", minHeight: "none" });
}
```

### How the "pin" itself actually happens (CSS, not GSAP `pin:true`)

Crucially, GSAP is **only** driving the horizontal `x` transform — the visual "pin" (section staying stuck to the viewport while you scroll past it) is done with plain CSS `position: sticky`, extracted directly from the site's stylesheet:

```css
.about-timeline_wall { width: 100%; min-height: 200vh; }      /* outer: tall scroll runway */
.section.cc-about-timeline { min-height: 100vh; padding: 0; display: flex; position: sticky; top: 0; } /* inner: sticky, pins at top:0 for the runway's duration */
```

So structurally: `<div class="about-timeline_wall" style="height:200vh (or itemWidth*count)"> <section class="cc-about-timeline" style="position:sticky;top:0;min-height:100vh"> ...horizontal row... </section> </div>`. Because the outer wall is ~2x (or more) the viewport height and the inner section is sticky at `top:0`, the section visually stays pinned for the scroll distance equal to `wallHeight - viewportHeight`, during which GSAP scrubs the row's `translateX` from `0` to `-moveDistance` (`moveDistance = rowWidth - windowWidth`).

Measured live at 1440×723 viewport:
- `.about-timeline_wall` computed `min-height`: `4230px` (i.e., `historyItem.outerWidth() * 10` — item outerWidth ≈ 423px at that content, not the raw 470px CSS width, includes the horizontal padding math)
- `.section.cc-about-timeline` computed: `position: sticky; top: 0px; min-height: 723px` (= 100vh at that viewport)
- `.about-history` (the row) has large `padding-left`/`padding-right: calc(50vw - 23.5rem)` at desktop so the **first** and **last** items can each be scrolled to a horizontally-centered resting position — i.e. item 1 starts centered in the viewport, item 10 ends centered.

### Reimplementation approach used in this build (no GSAP dependency added)

Implemented in `HistoryTimeline.tsx` as a client component using plain React + a scroll listener (no new npm dependency, since gsap is not otherwise used anywhere in this codebase):
- Same DOM/CSS shape: outer `wall` div with explicit computed height (`itemWidth * items.length`, min 200vh), inner `section` with `position: sticky; top: 0`.
- On scroll (rAF-throttled `scroll` + `resize` listener), compute `progress = clamp((viewportTop - wallTop) / (wallHeight - viewportHeight), 0, 1)` from `wall.getBoundingClientRect()`, then set `translateX(-progress * moveDistance)` on the row via a CSS variable, with `will-change: transform`.
- A small `lerp` (current += (target-current)*0.15 per animation frame) approximates GSAP's `scrub: 1` easing/smoothing without pulling in GSAP.
- Below 991px: the effect is disabled entirely (row rendered in normal static flow, wall height reset to `auto`, no sticky/pin, no transform) — items still show the connecting line/dots but stack as a plain vertical/wrapped list — matching the site's own `isMobile()` bailout.

## 2. Text gradient headlines (`u-text-gradient02` / `u-text-gradient03`)

Not an animation — a static `background-clip: text` effect, but worth documenting since it changes appearance per line of a multi-line heading (later lines read visibly greyer):

```css
.u-text-gradient02 { -webkit-text-fill-color: transparent; background-image: linear-gradient(#fff, #b6b6b6); -webkit-background-clip: text; background-clip: text; }
.u-text-gradient03 { -webkit-text-fill-color: transparent; background-image: linear-gradient(#333, #252525); -webkit-background-clip: text; background-clip: text; } /* used for the quote-mark SVG fill only, not text in this page */
```
Applied to: hero H1, the "Our goal…" H2, all `number-text` (year figures) and the story paragraphs. Implement with Tailwind arbitrary value: `bg-gradient-to-b from-white to-[#b6b6b6] bg-clip-text text-transparent`.

## 3. Founder stat panel overlap

`.about-founder_meta` is `position: absolute; inset: auto 6.4rem 0 auto` (bottom-anchored, inset from left/right 6.4rem) at desktop, so it overlaps the bottom portion of the founder photo inside the same rounded card — not a separate section. Live-measured desktop inset: `453px 64px 0px` (top/right/bottom, i.e. positioned from the bottom edge, 64px from each side) with a `border-top: 1px solid rgba(255,255,255,.2)` divider line and `padding: 40px 0`. Below 767px it becomes `position: relative` (in-flow, no overlap), stacked as a column with a negative top margin (`margin-top:-20vw` at ≤767px, `-15rem` at ≤991px) pulling it up to still slightly overlap the photo.

## 4. Hover/click sweep

- Team photos, story quote card: no hover state observed (no `:hover` rules found for `.about-team_item`, `.about-team_img`, `.about-story_card` in the source CSS; they're static images/cards).
- CTA buttons (`.btn`, `.btn.cc-secondary.cc-light`): standard site-wide button hover already implemented in the shared Header/CTA components — reuse those classes, don't reinvent (`.btn.cc-secondary.cc-light:hover{border-color:rgba(255,255,255,.6)}`, `.btn.cc-light:hover{background:#fff;color:#000}`).
- No dropdowns/modals/tabs are specific to this page's own content (ContactModal is shared and out of scope here).

## 5. Responsive sweep

Live browser resize (Chrome MCP `resize_window`) was unavailable in this session — the shared automation window would not change viewport size (`window.innerWidth` stayed pinned at 1440 across repeated `resize_window` calls to 390×844 and 800×900, even after a wait — likely because the browser window is shared across several concurrent agent sessions and cannot be resized/reflowed by one of them). Responsive values below are instead taken directly from the site's own compiled CSS `@media` breakpoints (Webflow's standard `max-width: 991 / 767 / 479`), which is a stronger source of truth than eyeballing a resized viewport:

| Breakpoint | `cc-about-hero` padding | `about-founder_visual` | `about-founder_meta` | `about-team_list` cols | `about-history_item` width | `number-text` size | `h1`/`h2` size |
|---|---|---|---|---|---|---|---|
| Desktop (default, >991px) | 220/170px (base) → hero uses `14rem/8rem` is actually the ≤991 value; base unprefixed rule measured live = `220px`/`170px` | 600px (`max-width:60rem`, but container-capped) | absolute, bottom-anchored, row layout | 3 cols | 470px | 100px | 56px / 48px |
| Tablet ≤991px | 14rem / 8rem (224/128px) | 600px cap still applies (width still 100%/auto up to cap) | becomes `position: relative`, column layout, `margin-top:-15rem` | 2 cols (`1fr 1fr`) | 470px (unchanged at this tier) | 100px (unchanged) | md size (56px h1 / 48px h2 — same as lg in this theme's tokens) | 
| Mobile ≤767px | 14rem / 6.4rem (224/102px) | `width:80%` | `margin-top:-20vw`, `padding:2.4rem 0` | 2 cols (unchanged) | 360px (`36rem`) | 48px (`4.8rem`) | 32px / 26px |
| Small ≤479px | unchanged from 767 tier | unchanged | `margin-left/right:1.6rem` | 2 cols (unchanged) | 320px (`32rem`), padding 32px l/r | 48px (unchanged) | 32px / 26px (unchanged) |

Timeline horizontal-scroll effect: **fully disabled** at ≤991px (see section 1) — renders as a static stacked list instead, which is also when the team grid drops to 2 columns and the founder meta panel un-overlaps into normal flow.

## 6. Smooth scroll / global

Site-wide Lenis smooth scroll (`html.lenis`) applies here same as every other page — already wired at the shared layout level (`SmoothScroll.tsx`), nothing page-specific to add. The timeline's scroll-progress calculation reads `getBoundingClientRect()` on every scroll tick, which works correctly under Lenis since Lenis dispatches native `scroll` events.
