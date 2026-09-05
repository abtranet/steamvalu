# HistoryTimeline (founding history / "Our story" milestones)

Source selector: `div.about-timeline_wall > section.cc-about-timeline`

**Read `../BEHAVIORS.md` section 1 first — this component's entire raison d'être is the scroll-driven pin/horizontal-translate mechanism documented there in full, including the exact GSAP/ScrollTrigger source and the CSS `position:sticky` trick that creates the pin.** This spec covers content + static layout only; do not re-derive the interaction model, follow BEHAVIORS.md's reimplementation approach exactly (plain React + scroll listener, sticky wrapper, disabled <991px).

## Content (real, verbatim) — 10 milestones in order

| Year | Label | Description |
|---|---|---|
| 1999 | INFOTECH establishment | Infotech has been established as a bespoke software house. |
| 2014 | Start of RTLS project | Creation of a new department to create the first product focused on indoor positioning and RTLS. |
| 2015 | First pilots | The first pilots for the technology were in the manufacturing and hospitality field. Manufacturing proved to be the best fit. |
| 2017 | First customer | Whirlpool Corporation became the first important customer of our technology. |
| 2019 | Twinzo is born | Product rebranding and increased focus on 3D live digital twin software as a platform. |
| 2021 | Going public! | Following our main purpose, to make expert systems accessible for almost anyone, our digital twin platform became publicly accessible for almost any smartphone, making real-time logistics, material ordering, and operational insights more intuitive than ever. |
| 2022 | 5.0 Technologies | Driving digital twin trends, twinzo even accelerated its journey as an independent business. |
| 2023 | Investment announcement | Consortium of Critical Ventures, Venture to Future Fund, Soulmates Ventures and Depo Ventures invested in twinzo, recognizing its game-changing potential in smart manufacturing and beyond. |
| 2024 | Do-it-yourself platform | Launch of DIY digital twin platform for all digital twin enthusiasts. Upload your 3D model, connect to live data, and see invisible. |

(Note: 9 rows of copy were found in the DOM but the timeline visually shows 10 dots/years in the scroll sweep screenshots — recount confirms exactly these 9 distinct milestones; screenshots showing "10 dots" across scroll positions were counting overlapping/repeated dot renders at tile edges during scroll, not a 10th unique item. Verified against raw HTML `about-history_item` count = 9.)

## Per-item structure
Each item, top to bottom, centered text:
1. A green dot (`about-history_dot`, 24×24px circle, `background-color: rgb(58,252,151)` = brand green) sitting ON a thin horizontal connecting line that runs through all dots (`.about-history_item:not(:last-child):after` — a `1px` white full-width line positioned at `top: 1.2rem` i.e. vertically centered through the dot, `left: calc(50% + 1.2rem)` extending to the next item).
2. Year number (`number-text`, gradient white→`#b6b6b6`, huge: `100px/700`, `line-height:80px`, `letter-spacing:-2px`; `48px` at ≤767px).
3. Label (`paragraph-15`, color `rgb(178,178,178)` grey-light).
4. Description (`paragraph-18`, gradient white→`#b6b6b6` — matches other body copy on this page, NOT the flat-grey label above it).

## Layout / sizing (live, 1440px)
- Each `.about-history_item`: fixed `width: 470px`, `padding: 0 70px` (so effective content width ≈330px), flex column, centered, `flex: none` (never shrinks — required for the horizontal scroll math). At ≤767px: `width: 360px, padding: 0 32px`. At ≤479px: `width:320px, padding:0 32px`.
- Row (`about-history_row` inside `.about-history`): `display:flex; flex:none` — just lays the 9 items side by side, total width ≈ `470×9 = 4230px` at desktop (matches the live-measured wall `min-height`/scroll-runway math, since the JS sets wall height from `itemWidth * itemCount`).
- Outer flex wrapper (`.about-history`, the translating row): `padding-left/right: calc(50vw - 23.5rem)` at desktop (`calc(50vw - 18rem)` ≤767px, `calc(50vw - 16rem)` ≤479px) — this centers the first/last item in the viewport at full scroll extremes.
- Wall (`about-timeline_wall`): `width:100%`, computed `min-height` set by JS to `itemOuterWidth × itemCount` (≈4230px live-measured at 1440), CSS fallback `min-height:200vh`.
- Sticky inner section (`.cc-about-timeline`): `min-height:100vh`, `position:sticky`, `top:0`, `padding:0`, flex (vertically centers the row).
- A `.divider` (1px, `rgba(255,255,255,.2)`) sits in a `.container` immediately above and below this whole block (render as sibling elements in the page composition, not part of this component).

## Interaction model
**Scroll-driven, pinned, non-clickable.** See BEHAVIORS.md §1. Below 991px viewport width: renders as a plain static (non-pinned, non-transformed) stacked/wrapped list — implement by conditionally skipping the sticky+transform wrapper and instead rendering the row as a normal `flex flex-wrap justify-center` (or vertical stack) block with `height:auto`.

## Tailwind / component implementation notes
- Client component (`"use client"`), needs `useRef`+`useEffect` scroll listener (rAF-throttled) per BEHAVIORS.md §1's reimplementation approach — no new npm dependency (no gsap in this codebase).
- Track `progress` state via ref (not React state, to avoid re-render thrash) and imperatively set `transform: translate3d(-Npx,0,0)` on the row element each frame; use a lerp toward the scroll-derived target for the `scrub`-like smoothing.
- `matchMedia('(max-width: 991px)')` gate to disable the whole effect and swap to `flex-wrap` static layout on small screens (React state + listener, since this needs to react to resize crossing the 991px line).
- Connecting line: absolutely-positioned `after` pseudo-element per item is awkward in Tailwind/JSX — implement instead as a single absolutely-positioned full-row `<div>` (a horizontal line spanning from the first dot to the last) placed behind the dots, plus per-item dot markers — visually identical, simpler DOM.
