# BlogPostGrid + BlogPostCard Specification

## Overview
- **Target files:**
  - `src/components/sites/steamvalu/blog-8caafe43/BlogPostGrid.tsx`
    (grid wrapper, maps over post data)
  - `src/components/sites/steamvalu/blog-8caafe43/BlogPostCard.tsx`
    (single card — image, title, excerpt, date, button)
  - `src/components/sites/steamvalu/blog-8caafe43/data.ts`
    (typed array of the 37 real posts scraped from the live site)
- **Screenshot:** `docs/design-references/steamvalu/blog-8caafe43/live-card-grid-800w.jpg`
- **Interaction model:** static list; **hover-driven** button color change on
  each card's "Read more" pill.

## DOM Structure
```
<div class="div-block-3">                    (white section, overlaps hero)
  <div class="collection-list-wrapper">
    <div class="collection-list">             (CSS GRID, 2 cols desktop)
      <div class="collection-item"> * 37      (one per post — a "card")
        <a href="/blog-post/<slug>">
          <img class="image-5" .../>          (16:10, rounded, cover)
        </a>
        <div class="div-block-8">
          <h3 class="heading-5"><a>Title</a></h3>
          <p class="preview-text">Excerpt…</p>
          <p class="paragraph-release-date">Month DD, YYYY</p>
          <a class="button w-button">Read more</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Computed Styles (exact values from getComputedStyle)

### Grid wrapper (`.div-block-3`)
- background-color: `rgb(255, 255, 255)` (white)
- max-width container: `1440px`, horizontal padding `28.8px` each side
  (→ `max-w-[1440px] mx-auto px-7`)
- margin-top: `-145px` at desktop (pulls the white section up under the
  hero's rounded bottom corners so they visually overlap) →
  `-mt-24 md:-mt-32 lg:-mt-36` (tune to taste; exact value scales with the
  source's fluid root font-size so an approximate negative margin is
  acceptable)
- Overall vertical padding below the overlap: generous, e.g. `pt-40 pb-24`
  once the negative margin is applied (so the actual cards sit well clear of
  the hero).

### Grid (`.collection-list`)
- display: `grid`
- grid-template-columns: `1fr 1fr` at ≥992px (desktop/tablet down to 768px in
  our simplified breakpoint mapping — see BEHAVIORS.md), `1fr` (1 column)
  below that.
- gap: `48px` at desktop (`gap-12`), can stay the same or reduce slightly at
  mobile (`gap-8`/`gap-10`).
- Tailwind: `grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12`

### Card (`.collection-item`)
- display: flex, flex-direction: column
- gap between image and text block: `25px` (`gap-6` = 24px, close enough, or
  `gap-[25px]`)
- background-color: white, border-radius: `20px` (`rounded-[20px]`)
- horizontal inner padding: `0 10px` (small side inset — `px-2.5`)
- border: none

### Image (`.image-5`)
- aspect-ratio: `16 / 10` (`aspect-[16/10]`)
- object-fit: cover
- border-radius: `20px` (`rounded-[20px]`)
- width: 100% of card column
- overflow: clip (so cover-cropped image respects the rounded corners)
- **No hover scale/zoom effect** — confirmed no transform change on hover.

### Text block (`.div-block-8`)
- display: flex, flex-direction: column, gap `3px` between title/excerpt
  (effectively tight — `gap-1`), padding-top `10px` (`pt-2.5`)
- text-align: left (desktop/tablet) — becomes centered only at ≤479px (see
  Responsive section)

### Title (`h3.heading-5` → its inner `<a>`)
- font-size: `28.8px` → `text-2xl md:text-[28.8px]` (or `text-3xl` ≈ close)
- font-weight: 700
- line-height: `36.576px` (≈1.27×) → `leading-tight`
- letter-spacing: `-1.152px` → `tracking-[-0.04em]`
- color: `rgb(0, 0, 0)` (black)
- text-align: left (desktop), center at ≤479px
- No distinct hover state observed (cursor becomes pointer only, no color
  shift/underline)

### Excerpt (`p.preview-text`)
- font-size: `19.2px` → `text-lg` (18px) or exact `text-[19.2px]`
- font-weight: 400
- line-height: `28.8px` (1.5×) → `leading-relaxed`
- color: `rgb(0, 0, 0)` (black)
- **No line-clamp / truncation** — `-webkit-line-clamp` is unset; render the
  full excerpt text every time, however long.

### Date (`p.paragraph-release-date`)
- font-size: `16.8px` → `text-base` (16px) or exact `text-[16.8px]`
- font-weight: 400
- color: `rgb(128, 128, 128)` (`#808080`, Tailwind `text-neutral-500` is
  close, or use `text-[#808080]`)

### "Read more" button (`a.button.w-button`)
- width: `180px`, height: `40px` (fixed pill size — not just intrinsic to
  text)
- display: flex, align-items: center, justify-content: center
- padding: `0 15px`
- border-radius: `20px` (= half of height → fully rounded pill,
  `rounded-full`)
- background-color: `rgb(0, 0, 0)` (black), default
- color: `rgb(255, 255, 255)` (white text), default
- font-size: `18px`
- margin-bottom: `20px` (breathing room under the button within the card)
- **Hover state:**
  - background-color → `rgb(58, 252, 151)` (`#3AFC97`, the project's brand
    green token — use `bg-brand` per this project's existing `--brand`
    token, do NOT hardcode a new hex since `globals.css` already defines
    `--brand: #3afc97`)
  - color → stays `rgb(0, 0, 0)` (black) on green — use `text-brand-foreground`
    if that token maps to black, else `text-black`
  - transition: `border-color 0.35s, color 0.35s, background-color 0.35s,
    opacity 0.35s` all with Webflow's default eased cubic-beziers → simplify
    to Tailwind `transition-colors duration-300`

## Per-Card Content (real data — full list)
All 37 real posts (title, excerpt, date, image, slug) are captured in
`docs/research/steamvalu/blog-8caafe43/posts-data-reference.json`
(also mirrored into the component's `data.ts`). Newest first:
"On-Premise twinzo on an Air-Gapped Plant Network" (August 30, 2026) down to
"Pushing the Boundaries" (May 3, 2024). Do not fabricate additional posts —
use exactly these 37.

## Assets
- 37 thumbnail images downloaded to
  `public/sites/steamvalu/blog-8caafe43/images/<file>` — referenced
  in `data.ts` as `/sites/steamvalu/blog-8caafe43/images/<file>`.
- No icons used in this component.

## Responsive Behavior
- **Desktop (1440px):** 2-column grid, left-aligned card text, gap ~48px.
- **Tablet (768px):** Still 2-column grid (source keeps 2 columns down to
  767px), narrower columns, same left-aligned text.
- **Mobile (390px):** Single column (`grid-cols-1`), card content still
  left-aligned down to ~480px; below ~480px the source centers the image
  (capped `max-width:280px`, centered) and centers title/excerpt text
  (`text-align:center`, content capped at `max-width:80%` and auto-margined).
  Implement via `text-center sm:text-left items-center sm:items-stretch` on
  the card, and `mx-auto sm:mx-0 max-w-[280px] sm:max-w-none` on the image.
- **Breakpoint:** grid columns collapse at `md` (768px in Tailwind, ≈767px in
  source); text/image centering shifts at `sm` (640px in Tailwind, ≈479px in
  source).
