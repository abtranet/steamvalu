# Component: Testimonials

Section 8. Full-bleed black section (`#hp-testimonials`, `.u-bg-black`) — this background must remain a real solid dark section so the shared Header's dark/light scroll-watch contract keeps working.

## Real content

Heading (56px/700, white): "Testimonials"

3 slides (quote, 24px-ish `.u-text-gradient02`/white, centered, max-width ~700px; attribution 18px/500 at ~50% opacity):
1. "After the pilot phase, we performed installation throughout the entire plant. Twinzo has proved to be a flexible partner and has provided us with services that would not be possible to implement through manpower." — Igor Leskanic, Plastic Omnium Auto Exteriors
2. "IPS is one of the solutions that will, in our opinion, build the big future of facility management. Thanks to twinzo, we now have a flexible and reliable partner that managed to implement IPS solution based on our requirements. After offices in Bratislava, we will jointly implement IPS also in other branches." — Karol Michaliak, HB Reavis, Data & Application Teamleader
3. "The deployment of RTLS into the internal logistics process has helped us identify on-site locations from the perspective of technology and human resources." — Peter Pacek, Embraco, Warehousing & internal logistics leader

Arrows: round buttons (~40px, dark grey `rgba(255,255,255,.1)` bg) with a chevron-left/chevron-right icon (16px, `stroke="white"`, paths `M10 4L6 8L10 12` prev / `M6 12L10 8L6 4` next — same chevron shape as `ChevronRightIcon`, mirrored for prev).

## Layout

- `bg-black text-white`, `py-24 md:py-32`, container max-width 1132px.
- Heading centered, `mb-16`.
- Slide content centered, max-width ~700px, `min-height` reserved (e.g. `min-h-[180px]`) so the crossfade doesn't cause layout jump between slides of different lengths (matches Swiper's `autoHeight:true` behavior approximately — exact autoHeight would need JS height measurement; a generous min-height is an acceptable simplification).
- Prev/next arrow buttons positioned left/right of the slide content (`absolute` or flex row with `justify-between`, arrows at the outer edges of the container on desktop; stack below content on narrow mobile if it doesn't fit — container is narrow so this should be fine at 390px too, arrows can shrink/move closer).

## Interaction model

**Click-driven carousel, NOT scroll or autoplay** (Swiper config confirmed: no `autoplay` key). Implement as a small client component: `useState<number> currentIndex`, prev/next handlers with wraparound (`(i - 1 + length) % length`, `(i + 1) % length`), crossfade via CSS `transition-opacity duration-300` swapping the visible slide (render all slides absolutely stacked, only `currentIndex` at `opacity-100`, others `opacity-0 pointer-events-none` — matches Swiper's `effect:"fade", crossFade:true`).

## Assets

None beyond icons (reuse `ChevronRightIcon`, mirror with `scale-x-[-1]` for the prev arrow, or add a small local `ArrowLeftIcon`/reuse rotate).
