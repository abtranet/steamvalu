# AboutHero

Source selector: `section.cc-about-hero`

## Content (real, verbatim)
- Eyebrow: "Our Story"
- H1: "Our core value is **innovation**" (the word "innovation" is inside `<strong>`, but visually it's the same gradient/weight as the rest — `<strong>` here doesn't change appearance, only semantics)

## Layout
- `<section>` full width, `.container` > `.row.row-justify-center` > `.col.col-lg-6.col-md-8` (centers a max ~50%-width column so the H1 wraps onto 3 lines at desktop: "Our core" / "value" / "is innovation" — verified live, this is natural wrapping from the narrow column + large font, not manual `<br>`s). A literal 50%-of-1424px column (~672px) does not reproduce this wrap in the rebuilt markup (measured too wide, collapses to 2 lines); empirically a `max-w-[460px]` wrapper reproduces the live 3-line break at desktop and is used instead — treat the exact column-width math as secondary to matching the visible line breaks.
- Text is centered (`u-text-center`).

## Computed styles (live, 1440px)
- Section padding: `padding-top: 220px; padding-bottom: 170px` (desktop). Tablet ≤991px: `224px / 128px`. Mobile ≤767px: `224px / 102.4px`.
- Eyebrow: `font-size:18px; font-weight:400; color: rgb(77,77,77)` (`#4d4d4d`, i.e. `--colors-all--grey-text-dark`), margin-bottom 12.8px (`u-mb-0-8` = 0.8rem).
- H1: `font-size:56px; font-weight:700; line-height:67.2px (1.2em); letter-spacing:-2.24px (-0.04em); font-family:"Inter Variable"`. Color: white→`#b6b6b6` vertical gradient via `background-clip:text` (class `u-text-gradient02`). Breakpoints: tablet/md 56px (unchanged), mobile ≤767px 32px, ≤479px 32px.
- Background: pure black (inherited from page wrapper `u-bg-black`).

## Interaction model
Static. No scroll/hover/click behavior specific to this section.

## Tailwind implementation notes
- `pt-[220px] pb-[170px] md:pt-14 md:pb-8 sm:pt-14 sm:pb-[102px]` (rem-based Webflow values converted: 14rem=224px≈`pt-56`, 8rem=128px=`pb-32`, 6.4rem=102.4px≈`pb-[102px]`).
- Gradient text utility (reused across the page): `bg-gradient-to-b from-white to-[#b6b6b6] bg-clip-text text-transparent`.
