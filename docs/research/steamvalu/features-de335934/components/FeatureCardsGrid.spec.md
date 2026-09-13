# FeatureCardsGrid Specification

## Overview
- **Target file:** `src/components/sites/steamvalu/features-de335934/FeatureCardsGrid.tsx`
- **Screenshot:** `docs/design-references/steamvalu/features-de335934/02-cards-1.jpg`, `03-cards-2-support.jpg`
- **Interaction model:** static (no hover state found in source CSS for `.features-top_card`)

## DOM Structure
```
section.u-no-padding > div.container > ul.features-top_list (flex, wrap)
  li.features-top_card (x4, one per FEATURE_CARDS entry)
    div.features-top_content (centered column, contains all text)
      h2 (card title)
      ul (checklist)
        li > svg(check) + p (bullet text)
```
One data-driven subcomponent (`FeatureCard`) renders all 4 — they are the
same structure with different background image / title / list / content
alignment, not truly distinct components, so a single spec covers all 4
per the "small tasks" rule (data variance, not structural variance).

## Computed Styles (converted to 1440px-and-below regime)

### List (`ul.features-top_list`)
- display: flex, flex-wrap: wrap, gap: 8px, justify-content: center

### Card (`li.features-top_card`) — shared
- width: `calc(50% - 4px)` (flex-basis 49%, gap 8px) on `md+`; 100% below
  `sm`
- min-height: 844px, border-radius: 24px, background-color: black,
  color: white
- background-image: one of `card-bg-1.jpg` / `card-bg-2.jpg` /
  `card-bg-3.jpg` / `card-bg-4.jpg` (all downloaded to
  `public/sites/steamvalu/features-de335934/images/`)
- background-size: 708px auto, background-repeat: no-repeat
- padding: `120px 0` (all cards) — **except** cards using the "bottom"
  content-alignment variant (see below), which get `120px 0 140px`
- display: flex, flex-direction: column, align-items: center

### Card content (`.features-top_content`)
- width: 90%, max-width: 448px, margin: 0 auto

### Card title (h2)
- fontSize: 32px, fontWeight: 700, lineHeight: 37.76px, letterSpacing: -1.28px
- color: white, margin-bottom: ~20px (`u-mb-2-4` = 2.4rem = 24px→20px)

### Checklist
- ul: display flex, flex-direction column, gap: 12px
- li: display flex, flex-direction row, align-items: flex-start, gap: 8px
- check icon: 16x16, `CheckIcon` (shared) filled `#3AFC97`, `mt-[3px]`
  shrink-0 to align with first text line
- p (bullet text): fontSize 18px, fontWeight 400, lineHeight 21.96px,
  letterSpacing -0.72px, color white

## Content alignment variants
Two of the four cards anchor their content to the card's **bottom**
(`justify-content: flex-end` on the card, background image top-anchored,
extra 20px bottom padding); the other two anchor to the **top**
(`justify-content: normal`/flex-start default, background image
bottom-anchored, equal top/bottom padding). This was confirmed via
`getComputedStyle` diff between the 4 cards, not guessed.

| # | Title | Content align | bg-position | bg image | mobile bg image (≤479px) |
|---|---|---|---|---|---|
| 1 | Logistics analysis | bottom (`flex-end`) | top (`50% 0`) | card-bg-2.jpg | card-bg-2-re.jpg |
| 2 | Data analysis | top (default) | bottom (`50% 100%`) | card-bg-1.jpg | card-bg-1.jpg |
| 3 | Logistics management | top (default) | bottom (`50% 100%`) | card-bg-3.jpg | card-bg-3.jpg |
| 4 | Multiplatform support | bottom (`flex-end`) | top (`50% 0`) | card-bg-4.jpg | card-bg-4-re.jpg |

## Per-Card Content (verbatim)

**1. Logistics analysis**
- Real-time logistics monitoring
- Spaghetti charts with a player
- Heatmaps
- No-go zones to optimize workflow
- Deep-dive analysis on the web

**2. Data analysis**
- Deep-dive analysis on the web
- KPIs / OEEs tracking for smart manufacturing
- Sensors and production data charts
- Customizable status visualisation
- Real-time notification watchdog

**3. Logistics management**
- Material ordering
- Avoid micro-stoppages
- Order processing analysis
- No need for integration

**4. Multiplatform support**
- Multi-site support
- Cloud or on-premise deployment
- iOS
- Android
- Windows

## Assets
- `public/sites/steamvalu/features-de335934/images/card-bg-1.jpg` (1416×1688)
- `.../card-bg-2.jpg` (1417×1688), `.../card-bg-3.jpg` (1416×1688), `.../card-bg-4.jpg` (1416×1688)
- `.../card-bg-2-re.jpg` (718×1032), `.../card-bg-4-re.jpg` (718×1032) — mobile crops
- `.../check-green.svg` (also inlined as the shared `CheckIcon`)

## Responsive Behavior
- **Desktop (1440px):** 2 columns, 4 cards in a 2×2 grid, gap 8px.
- **Tablet (768px):** same 2-column layout (per source CSS, the 2-per-row
  flex-basis 49% only changes to a column below 479px), min-height and
  background-size/position adjust slightly per source `@media(max-width:
  991px)`/`767px` rules (kept approximate — content still centered/aligned
  the same way).
- **Mobile (390px):** `.features-top_list{flex-flow:column}` — cards
  stack 1 per row, full width; cards 1 and 4 swap to the smaller
  `*-re.jpg` background crops (source CSS
  `@media(max-width:479px)` rule).
- **Breakpoint:** column→stack at 480px (`sm`).
