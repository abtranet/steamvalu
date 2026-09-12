# AboutFounder

Source selector: `section.cc-about-founder > .about-founder-wrap`

## Content (real, verbatim)
- Photo: CEO Michal Ukropec, downloaded to `/sites/reference-site/about-979bddc4/people/michal-ukropec.jpg` (source 1200×1228, `alt="Michal Ukropec"`).
- Name/title: "Michal Ukropec, CEO"
- Stat 1: **100k+** / "Followers" / "Michal is the #15 influencer in innovation worldwide."
- Stat 2: **25+** / "Years of experience" / "Ups and downs teach what has value and what does not. Get in touch to find out more."

## Layout
- Outer wrap: full container width, `max-width: 1424px`, `border-radius: 24px`, `background-color: #333`, `padding-top: 4rem (64px)` (only top padding — image sits flush left/right/bottom against the rounded corners), `position: relative`, flex column centered.
- Photo: centered, `aspect-ratio: 1/1`, `max-width: 600px`, `width: 600px` at desktop (scales to `width:80%` of the wrap at ≤767px).
- Stat meta bar (`.about-founder_meta`): absolutely positioned at desktop — `position:absolute; inset: auto 64px 0 auto` (bottom-anchored, 64px inset from both left/right of the wrap, i.e. it sits over the bottom portion of the photo/wrap), `border-top: 1px solid rgba(255,255,255,.2)`, `padding: 40px 0`, flex row, `justify-content: space-between`, `gap: 16px`. Live measured `inset: 453px 64px 0px` at 1440 (i.e. top offset 453px from wrap top).
  - At ≤991px: becomes `position: relative` in normal flow, column layout, `gap: 4rem`, `margin: -15rem 2.4rem 0`, `padding: 0`.
  - At ≤767px: `gap: 2.4rem`, `margin-top: -20vw`, `padding: 2.4rem 0`.
  - At ≤479px: `margin-left/right: 1.6rem`.
- Inside the meta bar: name block (`h5`, `no-shrink`) + two `.about-founder_meta-inner` stat blocks, each `display:flex; align-items:center; gap:24px; max-width:450px` (column + `gap:8px` at ≤767px): a big number (`h1.cc-number`, `font-size:56px` desktop / uses `--spacing-utility-rem--4-8rem` = 48px per token — live measured 56px matching plain h1 lg size) + a label/description stack.

## Computed styles (live, 1440px)
- Name "Michal Ukropec, CEO": `h5`, `24px / 700 / 1.33em`, color white.
- Big numbers ("100k+", "25+"): `h1.cc-number`, `56px/700`, `line-height:1em`, gradient white→`#b6b6b6`.
- "Followers"/"Years of experience": `paragraph-18`, `18px/400`, white.
- Descriptive lines: `paragraph-15`, `15px/500`, color `rgb(178,178,178)` (grey-light).

## Interaction model
Static.

## Tailwind implementation notes
- Card: `rounded-3xl bg-[#333] relative w-full max-w-[1424px] mx-auto pt-16 flex flex-col items-center`.
- Photo via `next/image` (or plain `<img>` since fixed external-style asset), `aspect-square w-[600px] max-w-full md:w-4/5 rounded-t-3xl object-cover` — actually the image itself isn't independently rounded (the wrap clips via `overflow:hidden` implied by rounded corners + `object-fit:cover`); add `overflow-hidden` on the wrap.
- Meta bar: `md:absolute md:inset-x-16 md:bottom-0 md:border-t md:border-white/20 relative -mt-24 mx-6 md:mx-0 md:mt-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4 py-6 md:py-10`.
