# Behaviors — twinzo.com homepage

Extracted from `js/twinzo-webpage/homepage.js` (unminified/beautified inline below key excerpts) and live scroll/click/resize sweeps via Chrome MCP. GSAP + ScrollTrigger + Flip + TextPlugin are confirmed loaded site-wide (`js/vendor/gsap.min.js`, `ScrollTrigger.min.js`, `Flip.min.js`, `TextPlugin.min.js`), plus Lenis and Swiper.

## Global

- **Smooth scroll**: Lenis, `lenis.start()`/`lenis.resize()` called on preload-complete and on entering the steps section (already implemented at layout level, not re-done here).
- **Preloader**: a `sessionStorage`-gated logo animation on first visit only. Out of scope for this page (cosmetic, one-time, not part of "main content").
- **Nav dark/light toggle**: `ScrollTrigger` watches `.u-bg-black`/`.footer`-equivalent elements; `onEnter/onEnterBack` adds `.dark` to `.nav`, `onLeave/onLeaveBack` removes it. Already implemented generically in shared `Header.tsx`. This page must simply use correct solid dark backgrounds on the steps/devices/testimonials sections so the existing contract keeps working (verified: Header already reacts by checking section brightness / explicit hooks — no page-specific change needed beyond real markup).

## Section 1+2: Hero → Steps (the big pinned scroll-jack)

This is one continuous scroll-driven system spanning both sections (`heroSteps = $('.hero_step')`, 3 markers: `_1` = hero, `_2` = steps zones (contains `#intro`/`#know`/`#manage` anchors), `_3` = end).

1. **step00** — trigger: hero step 0, `start: "top top-8px"` (desktop) / `"75% top"` (mobile), `end: "center top"`, `scrub: 1` (desktop only). Effect: the nav's inner container max-width tweens from `100%` to `113.2rem` (i.e., the header's content narrows into its normal centered position as you leave the very top of the page). Also toggles `.nav.dark` via `onEnter`/`onLeaveBack`.
2. **step01** — trigger: hero step 0, `start: "top top"`, `end: "bottom top"`, `scrub: 1`. Desktop: `.hp-hero_visual` (the framed image box containing bg photo + phone) tweens `width: 50% → 200%` (i.e. grows to fill/exceed the viewport). Mobile: tweens `height: 50% → 200%` and squares off its border radius instead. In lockstep, `.hp-hero_phone` rotates `0deg → -90deg` and translates `y: 0 → -4rem`; the looping phone video counter-rotates `0 → 90deg` (so the video stays upright while the phone frame itself rotates from portrait to "landscape" orientation matching the steps section's horizontal phone mockup). On `onLeave` (scrolled past): nav fades out/back in while swapping from transparent-overlay mode to "pushed" fixed mode; `adjustImages()` recalculates the steps-section visual box to match the hero phone's pixel dimensions so the Flip-style handoff lines up.
3. **step01_01** — trigger: hero step 0, `start: "100 top"`, `toggleActions: "play none none reverse"`. All `[data-hero-hide]` content (background photo, headline/subcopy/CTA/logos) fades to `opacity: 0` — clears the hero content out of the way before the steps section's own content takes over.
4. **step02 / step02_00** — trigger: hero step 1 (steps section), `start: "top top"`, `toggleActions: "play none none reverse"`. The whole `.cc-hp-steps` section becomes interactive/visible (`opacity 0→1`, `pointerEvents none→auto`); `.hp-steps_head` (the See/Know/Manage pills) and `.hp-steps_content` fade in 0.3s after.
5. **step02_01 / _02 / _03** — trigger: hero step 1 split into three scroll zones — `top top`→`33% top` (See), `33% top`→`66% top` (Know), `66% top`→`bottom center` (Manage). At each zone's `onEnter`: the corresponding pill gets `.active` (green, opaque; others fade to `opacity:.2`), the paragraph text crossfades (GSAP `.to(opacity:0,yPercent:50)` → swap text → `.to(opacity:1,yPercent:0)`, ~0.3s out), and the matching background video (`see.mp4`/`know.mp4`/`manage.mp4`) crossfades to `opacity:1` while the other two go to `0`. Entering "Manage" also adds `.cc-fullscreen` to the steps section (phone visual grows) and un-pushes the nav.
6. **step03_00** — trigger: hero step 2 (a spacer/marker after steps), `start:"top top"`, `end:"bottom top"`, `scrub:1`: any `[data-steps-ui]` elements (the pills + content wrapper) fade to `opacity:0` as this spacer scrolls by — clearing the steps UI before the devices section.
7. **Flip handoff** — on leaving "Manage" (`onLeave` of step02_03, desktop only): `flipPhone()` builds a scrubbed `Flip.fit` timeline that animates the steps phone element through each `[js-scrollflip-element="zone"]` marker in sequence (there are zone markers positioned at the steps visual and the devices visual) so the phone visually "flies" from the steps position into the devices section's phone slot as you keep scrolling.

**Clone approach**: Reproduce this as a single React component (`HeroSteps.tsx`) covering hero+steps together, using GSAP + ScrollTrigger with a tall wrapper (`height: 400vh` across 3 pinned phases: hero-intro, steps-See/Know/Manage split into 3 sub-zones, hand-off) and `pin: true` on the inner sticky viewport. Skip the pixel-level `Flip.fit` zone-morph (too fragile to reproduce exactly without the original's absolute pixel geometry) — instead cross-fade the steps phone out and the devices phone in at the boundary, which reads the same to a viewer scrolling at normal speed. Text/pill/video swaps ARE reproduced faithfully since they are simple opacity/text tweens.

## Section 3: Devices

- **step03** — trigger: `.cc-hp-devices`, `start:"top center"`, `toggleActions:"play none none reverse"`: `.hp-devices_desktop` (and, mobile only, `.hp-devices_phone`) fade `opacity 0→1` once the section is half in view.
- **step04** — trigger: `[data-devices-content]`, `start: isDesktop ? "top center" : "center bottom"`: `[data-devices-ui]` blocks (heading, paragraph, CTA row, stats) fade+stagger in (`opacity 0→1`, `stagger:0.2`). Simultaneously, an `animateText()` self-recursive loop cross-fades the h2 between "Anytime" and "Anywhere" every ~2s (`yPercent:50→0`, `opacity:0→1`, `ease:"expo.out"`, then loops via `toggleActions:"play pause resume pause"` gating so it only runs while the section is in view).

**Clone approach**: `IntersectionObserver`-triggered fade-in for the whole content block (matches visual effect of the ScrollTrigger reveal without needing GSAP), plus a small `setInterval`/CSS-animation-driven word-swap for "Anytime"/"Anywhere" once visible.

## Section 4+5: Types ("Your factory/warehouse" → "In your pocket")

- **typeAnimation()** — `ScrollTrigger` on `.hp-types_wall` (150vh tall), `start:"top top"`, `end:"bottom bottom"`, `scrub:1`. A GSAP timeline plays through `headingText.length - 1` steps (here: 1 step, "Your factory" → "Your warehouse"): heading fades out (`yPercent:50,opacity:0`), text swapped via `TextPlugin`, image (video) at that index faded in while the rest are hidden, heading fades back in.
- **typePocket()** — trigger `[data-types-pocket]` (the "In your pocket" sub-section), `start:"center bottom"`, `end:"bottom bottom"`, `scrub:1`: the bottom fade overlay and the "In your pocket" heading fade+slide in (`opacity 0→1, yPercent 50→0`, staggered).

**Clone approach**: one `TypesSection.tsx` with a tall (`~220vh`) wrapper, `position: sticky` inner viewport, and scroll-fraction-driven state (via `IntersectionObserver`+scroll-fraction math or a lightweight scroll listener — GSAP ScrollTrigger scrub is used here too since it's already a dependency) swapping between "Your factory"/factory video and "Your warehouse"/warehouse video, then revealing "In your pocket" near the end of the scroll range.

## Section 6: Use cases / Section 7: Product copy

No meaningful animation beyond a GTM analytics pageview fire (`start:"top 80%"`) — purely for tracking, not visual. Rendered as static content with a subtle fade/slide-up on scroll-into-view for polish (not present in the original beyond opacity 1 default, but consistent with the rest of the page's "reveal" language — kept minimal/optional).

## Section 8: Testimonials

- Swiper config: `slidesPerView: 1, effect: "fade", fadeEffect: { crossFade: true }, autoHeight: true, loop: true, navigation: { nextEl: '.swiper-arrow.next', prevEl: '.swiper-arrow.prev' }`. **Click-driven only** — no autoplay configured. Prev/next arrows crossfade between the 3 testimonial slides, looping infinitely in both directions.

**Clone approach**: small client component with `useState` currentIndex, crossfade via CSS transition on opacity (200-300ms), prev/next wrap-around — visually identical to Swiper's fade effect without pulling in the Swiper dependency for one carousel.

## Section 9: Meet Michal / Section 10: CTA

Static; GTM pageview fire only on scroll-into-view, no visual animation to reproduce.

## Responsive breakpoint triggers (confirmed via CSS + live resize)

- `991px` is the primary JS breakpoint (`isDesktop = $(window).width() > 991`) — governs hero/steps orientation math, devices phone visibility default, and whether ScrollTrigger scrub is active on step00.
- CSS breakpoints align with Webflow defaults: `991px` (tablet), `767px` (mobile landscape), `479px` (mobile portrait) — typography tokens step down at the `md`(≤991) and `sm/xs`(≤767/≤479) tiers per `:root` custom properties in `site.css`.
