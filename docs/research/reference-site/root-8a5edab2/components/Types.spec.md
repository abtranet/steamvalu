# Component: Types ("Your factory / Your warehouse" + "In your pocket")

Sections 4+5 from PAGE_TOPOLOGY.md. White background. Tall scroll wrapper (`.hp-types_wall`, 150vh original) driving a text+video swap, then a second heading fades in near the end.

## Real content

- Heading 1 (56px/700/lh1.2/-0.04em desktop, black, `data-headline-text="Your factory,Your warehouse"`): starts as "Your factory", swaps to "Your warehouse" partway through the scroll range.
- Portrait phone mockup (`phone-mockup.png`, reused asset) containing two crossfading videos: `factory.mp4` (poster `poster-factory.jpg`) shown first, `warehouse.mp4` (poster `poster-warehouse.jpg`) shown after the swap.
- A white bottom-fade gradient overlay sits over the bottom ~60% of the phone visual (`linear-gradient(rgba(255,255,255,0), #fff 65%)`) to blend the phone into the next heading.
- Heading 2: "In your pocket" (same 56px/700 style), fades in near the bottom of the scroll range, appears to sit "behind/below" the phone as it scrolls up.

## Layout

- Section wrapper: white bg, generous vertical scroll room — implement as a single component with a `min-height: 180vh` (approximating the original 150vh) wrapper containing a `sticky top-[108px]` inner viewport (108px = header height) holding heading + phone, and "In your pocket" heading positioned to reveal at the bottom of the sticky range (simplest robust approach: render "In your pocket" as a normal in-flow heading directly BELOW the sticky wrapper, so it naturally appears once the user scrolls past the sticky phone — this reproduces the visual outcome without needing precise scroll-fraction math).
- Phone visual: centered, `max-width: 360px` desktop / `~70vw` mobile, `aspect-ratio` matching the portrait mockup.
- Heading: centered, `padding-top: 6.4-8rem`.

## Colors

- All text black on white in this section (`text-foreground` / `text-black`).

## Interaction model

Scroll-driven crossfade: use an `IntersectionObserver`-timed approach OR a simple scroll-fraction listener on the sticky wrapper to flip a boolean `showWarehouse` state at roughly the midpoint of the wrapper's scroll range, crossfading heading text and video opacity over ~300ms CSS transition. GSAP/ScrollTrigger may be used for the scroll-fraction read (already a page dependency via HeroSteps) but a plain scroll-fraction calculation is acceptable here since there is no pin requirement — sticky positioning handles the "stays in place while scrolling" effect natively via CSS.

## Assets

- `/sites/reference-site/root-8a5edab2/images/phone-mockup.png`
- `/sites/reference-site/root-8a5edab2/videos/factory.mp4`, poster `.../images/poster-factory.jpg`
- `/sites/reference-site/root-8a5edab2/videos/warehouse.mp4`, poster `.../images/poster-warehouse.jpg`
