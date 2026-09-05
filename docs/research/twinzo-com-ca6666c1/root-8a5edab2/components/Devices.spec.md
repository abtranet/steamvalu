# Component: Devices

Section 3 from PAGE_TOPOLOGY.md. Static section (not pinned), black background, continues visually from Steps.

## Real content

- Visual: MacBook mockup (`macbook-device.png`, 1823×1120) with the `manage.mp4` video masked into its screen (inset ~`2% 9% 8% 8%`), overlapped in front-bottom-left by a smaller landscape phone mockup (`phone-mockup-horizontal.png`) also showing `manage.mp4`, poster `poster-manage.jpg`.
- Heading (56px/700/lh1.2/-0.04em desktop, gradient white text): cycles between "Anytime" and "Anywhere" every ~2s once in view.
- Paragraph (white/grey ~90%, centered, max-width ~640px): "Experience next-gen analytics in stunning 3D with our digital twin app. See your logistic data come to life with interactive heatmaps. Analyze RTLS localization data from multiple sources."
- CTA row: "Try for free" (white bg pill, black text — secondary/light variant) + "Book Demo" (this is a link-style variant on dark bg — render as white-outline or ghost pill; exact source used `cc-light` variant with a border, `background:transparent`, white text, `border:1px solid rgba(255,255,255,.3)`-equivalent). Both use `BOOK_DEMO_URL`/`TRY_FREE_URL` constants (see shared `Header.tsx` for exact Calendly URLs — reuse the same constants rather than re-typing them).
- Stats row (border-top `1px solid rgba(255,255,255,.2)`, margin/padding-top `4rem`): two stat blocks side by side (stack on mobile):
  - "35%" (100px/700, light grey/white) — "Time savings" (500 weight) — "Make decisions much faster thanks to real-time data." (grey `#B2B2B2`)
  - "3-8" (100px/700) — "Months ROI" — "Direct insights leading to fast return of your invested money."

## Layout

- `bg-black text-white`, section padding ~`8rem` top/bottom desktop, `4.8rem` mobile (matches `--spacing-layout--section-padding-lg/sm` tokens: 12rem/4.8rem — use 8-12rem desktop, 4.8rem mobile as a Tailwind `py-24 md:py-32` / `py-12` split).
- Visual block: centered, macbook ~700px max-width desktop, phone overlapping bottom-left at ~40% width with `margin-top: -12%` (negative overlap).
- Content column: max-width ~700px (`col-lg-7`), centered under the visual, `text-center`.
- Stats: `grid grid-cols-2 gap-8` desktop, stacked single column mobile, divided by a top border line above the whole row.

## Colors

- Numbers/heading: white, could carry a subtle grey gradient (`u-text-gradient02`) — implement as plain white; a gradient is a nice-to-have, not required for fidelity at this size.
- Body copy: `text-white/70` approx (source computed `rgb(178,178,178)` for `.u-text-grey-light`).
- "Try for free" button: `bg-white text-black rounded-full px-6 py-4 text-[15px] font-medium`.
- "Book Demo" button (light-on-dark variant): `border border-white/30 text-white rounded-full px-6 py-4 text-[15px] font-medium` (no fill).

## Interaction model

Scroll-into-view reveal (IntersectionObserver, fade+slight translate-y once ~40% visible — matches original's opacity fade). The "Anytime"/"Anywhere" heading auto-cycles on a `setInterval` (2.5s per BEHAVIORS.md's `duration:2` GSAP tween) ONLY while the section is in view (pause when scrolled away, matches original's `toggleActions:"play pause resume pause"` gating) — implement via the same IntersectionObserver toggling an interval on/off.

## Assets

- `/sites/twinzo-com-ca6666c1/root-8a5edab2/images/macbook-device.png`
- `/sites/twinzo-com-ca6666c1/root-8a5edab2/images/phone-mockup-horizontal.png`
- `/sites/twinzo-com-ca6666c1/root-8a5edab2/videos/manage.mp4`, poster `/sites/twinzo-com-ca6666c1/root-8a5edab2/images/poster-manage.jpg`
