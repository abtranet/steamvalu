# BlogHero Specification

## Overview
- **Target file:** `src/components/sites/twinzo-com-ca6666c1/blog-8caafe43/BlogHero.tsx`
- **Screenshot:** `docs/design-references/twinzo-com-ca6666c1/blog-8caafe43/live-hero-800w.jpg`
- **Interaction model:** static (no scroll/click/hover behavior — plain text
  content over a black rounded card)

## DOM Structure
```
<section class="blog-page-section">        (padding wrapper, transparent bg)
  <div class="container">
    <div class="cs-hero">                   (position: relative)
      <div class="cs-hero_inner hero-blog-page">  (max-width ~684px, centered)
        <p>Blog</p>                         (eyebrow)
        <h1>Exploring Digital Twins: Trends, Insights, and Innovations</h1>
        <h2>Stay ahead with the latest news, expert insights, and
            cutting-edge advancements in smart manufacturing,  Industry 4.0
            automation, and digital transformation.</h2>
      </div>
    </div>
  </div>
  <div class="cs-hero_bg"></div>            (absolute, z-index:1, full-bleed
                                              rounded black rectangle sitting
                                              BEHIND the text content)
</section>
```
Build this as one component: an outer relative wrapper with a rounded black
background layer (`absolute inset-x-2 inset-y-0` equivalent) behind a
centered text column with higher stacking (or simpler: just make the whole
section a rounded black block with padding, since there is no separate
visual content in `cs-hero_bg` besides solid black + rounded corners — no
gradient/image was found in `background-image` on `.cs-hero_bg`, it's a flat
`rgb(0,0,0)` fill).

## Computed Styles (exact values from getComputedStyle, captured at this
page's effective desktop viewport, html font-size 12px)

### Outer rounded black panel (`.cs-hero_bg` equivalent)
- background-color: `rgb(0, 0, 0)`
- background-image: none (flat color, no gradient/pattern)
- border-radius: `24px` (matches Tailwind `rounded-3xl`, close to `rounded-[24px]`)
- position: absolute, inset near-full-bleed with a small side gutter
  (~8px at 800px viewport width; use a small horizontal margin like `mx-2`)

### Hero inner content column (`.cs-hero_inner`)
- max-width: `684px`
- padding: `0 0 140px` (top 0, bottom ~140px at desktop — this is extra
  bottom breathing room before the section ends; implement as generous
  bottom padding, e.g. `pb-24 md:pb-32`)
- text-align: center
- Overall section vertical padding (`.blog-page-section`): `padding-top:
  264px; padding-bottom: 204px` at this viewport (scales with a fluid root
  font-size on the live site — treat as "generous top padding to clear the
  108px fixed header plus more" and "generous bottom padding"). Recommended
  Tailwind: `pt-40 md:pt-48 lg:pt-56 pb-16 md:pb-20`.

### Eyebrow "Blog" (`p.paragraph-18`)
- font-size: `21.6px` → use `text-lg` (18px) to `text-xl` (20px), close
  enough; exact value if needed: `text-[21.6px]`
- font-weight: 400
- color: `rgb(77, 77, 77)` (`#4D4D4D`) — dim gray on black bg
- text-align: center
- margin-bottom: small (~8px, `u-mb-0-8` wrapper)

### H1 title
- font-size: `67.2px` desktop → map to `text-5xl md:text-6xl lg:text-7xl`
  (or exact `text-[67.2px]` at lg+)
- font-weight: 700
- line-height: `80.64px` (≈1.2×) → `leading-[1.2]`
- letter-spacing: `-2.688px` (≈-4%) → `tracking-[-0.04em]`
- text-align: center
- **Text fill: gradient, not solid color.** Computed:
  `background-image: linear-gradient(rgb(255,255,255), rgb(182,182,182))`,
  `-webkit-background-clip: text`, `-webkit-text-fill-color: transparent`.
  Tailwind: `bg-gradient-to-b from-white to-[#b6b6b6] bg-clip-text text-transparent`
- Text content (verbatim): "Exploring Digital Twins: Trends, Insights, and
  Innovations"

### H2 subhead
- font-size: `28.8px` → `text-2xl md:text-3xl` or exact `text-[28.8px]`
- font-weight: 400
- line-height: `36px` (1.25×)
- letter-spacing: `-1.152px` → `tracking-[-0.04em]`
- text-align: center
- Same gradient text fill as H1 (also wrapped in `.u-text-gradient02`):
  `bg-gradient-to-b from-white to-[#b6b6b6] bg-clip-text text-transparent`
- Text content (verbatim): "Stay ahead with the latest news, expert insights,
  and cutting-edge advancements in smart manufacturing,  Industry 4.0
  automation, and digital transformation." (note: double space before
  "Industry" is present in the source copy — preserve it or normalize to a
  single space, either is acceptable)

## States & Behaviors
N/A — static section, no hover/scroll/click behavior found on any element in
this hero (verified via a full scroll-sweep and hover-sweep; see
`../BEHAVIORS.md`).

## Assets
- No images/icons used in this component. Pure text over a flat black
  rounded rectangle.

## Text Content (verbatim)
- Eyebrow: "Blog"
- H1: "Exploring Digital Twins: Trends, Insights, and Innovations"
- H2: "Stay ahead with the latest news, expert insights, and cutting-edge
  advancements in smart manufacturing,  Industry 4.0 automation, and digital
  transformation."

## Responsive Behavior
- **Desktop (1440/1920px):** As above — big centered gradient headline,
  generous padding, rounded black panel with small side gutters.
- **Tablet (768px):** Same layout, proportionally smaller type (the source
  scales its root font-size fluidly; approximate by stepping down Tailwind
  text sizes one notch, e.g. `text-4xl` for H1).
- **Mobile (390px):** Same centered layout, further reduced type (e.g.
  `text-3xl` sm, `text-4xl` for H1), reduced top/bottom padding
  (`pt-28 pb-10`), content column shrinks to near-full width with small side
  padding (source: `.cs-hero_inner{max-width:29rem}` at ≤479px).
- **Breakpoint:** no structural layout change (always a single centered
  column) — only type scale and padding shrink at smaller widths.
