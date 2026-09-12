# Component: Devices

Section 3 from PAGE_TOPOLOGY.md. Scroll-driven pinned section on desktop, black background, continuing visually from the landscape-phone state in the hero.

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
- Visual block: centered, MacBook up to ~912px wide on desktop. For the requested transition treatment, center the landscape phone over the upper portion of the MacBook screen at ~54% of the MacBook width so the incoming composition matches the supplied reference frame.
- At a 1082 × 857 viewport and `scrollY: 2250`, target the MacBook top near `369px` and the landscape phone top near `418px`.
- Content column: max-width ~700px (`col-lg-7`), centered under the visual, `text-center`.
- Stats: `grid grid-cols-2 gap-8` desktop, stacked single column mobile, divided by a top border line above the whole row.

## Metrics row — measured at 1761px viewport

- Container: `1283.4px` wide, `137px` tall, centered; `border-top: 1px solid rgba(255,255,255,.2)`.
- Each metric: `605.4px` wide, `display:flex`, `gap:27.21px`.
- Number column: `306.1px` wide.
- Number: `113.375px`, weight `700`, line-height `90.7px`, white.
- Heading: `27.21px/27.21px`, weight `400`, white.
- Description: `20.4075px/24.8972px`, weight `400`, `rgb(178,178,178)`.
- Exact content: `35%` / `Time savings` / `Make decisions much faster thanks to real-time data.` and `3-8` / `Months ROI` / `Direct insights leading to fast return of your invested money.`

## Colors

- Numbers/heading: white, could carry a subtle grey gradient (`u-text-gradient02`) — implement as plain white; a gradient is a nice-to-have, not required for fidelity at this size.
- Body copy: `text-white/70` approx (source computed `rgb(178,178,178)` for `.u-text-grey-light`).
- "Try for free" button: `bg-white text-black rounded-full px-6 py-4 text-[15px] font-medium`.
- "Book Demo" button (light-on-dark variant): `border border-white/30 text-white rounded-full px-6 py-4 text-[15px] font-medium` (no fill).

## Interaction model

Desktop is a pinned, scroll-scrubbed sequence based on the supplied 12.73-second screen recording:

1. The landscape phone is visible first while the MacBook begins below the viewport.
2. During the first third of the scroll, the MacBook rises from below and the phone moves downward from the upper screen area to the lower-center of the MacBook display.
3. Hold the completed stack briefly so both devices are clearly readable.
4. During the final third, move the whole device stack upward and out of frame while the heading, explanatory copy, CTA row, and metrics fade/slide into the viewport.
5. Tie all transforms directly to scroll progress with GSAP `ScrollTrigger` and `scrub`; do not use a time-only entrance animation.
6. Preserve a static, naturally stacked fallback below the desktop breakpoint and for reduced-motion users.

The heading continues cycling between the localized equivalents of “Anytime” and “Anywhere” while the copy state is in view.

## Assets

- `/sites/reference-site/root-8a5edab2/images/macbook-device.png`
- `/sites/reference-site/root-8a5edab2/images/phone-mockup-horizontal.png`
- `/sites/reference-site/root-8a5edab2/videos/manage.mp4`, poster `/sites/reference-site/root-8a5edab2/images/poster-manage.jpg`
