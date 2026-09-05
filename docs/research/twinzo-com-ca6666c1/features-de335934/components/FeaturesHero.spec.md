# FeaturesHero Specification

## Overview
- **Target file:** `src/components/sites/twinzo-com-ca6666c1/features-de335934/FeaturesHero.tsx`
- **Screenshot:** `docs/design-references/twinzo-com-ca6666c1/features-de335934/01-hero.jpg`
- **Interaction model:** static

## DOM Structure
```
section (cc-subpage-hero)
  div.container (max-width 1132px, centered)
    div (row, justify-center) > div (col, ~8/12 width, centered text)
      div.features_hero-header (flex row, centered, gap)
        div.features_hero-icon (60x60 green rounded-square glyph, inline svg)
        h1 "Features"
      p (gradient paragraph, ~688px max width, centered)
```

## Computed Styles (all values converted to the ≤1440px / 10px-root regime
— see BEHAVIORS.md "known tool limitation" for the 1920→1440 conversion)

### Section
- padding: `220px 0 120px` (top accounts for the fixed 108px header)
- text-align: center

### Icon glyph (`features_hero-icon`)
- width/height: 60px, border-radius ~24px (rounded square)
- Inline SVG, viewBox `0 0 60 60`: green rounded-square (`fill:#3AFC97`)
  background shape with a black "tt" wordmark-glyph cut into it (two
  vertical strokes with a horizontal crossbar, like a lowercase double-t).
  Render as one inline `<svg>` (see icons.tsx `FeaturesGlyphIcon` — page
  local, not reused elsewhere).

### H1 "Features"
- fontSize: 56px, fontWeight: 700, lineHeight: 67.2px, letterSpacing: -2.24px
- color: black
- margin-left: 8px from icon (gap ~14px in flex row)

### Paragraph (gradient sub-headline)
- fontSize: 24px, fontWeight: 400, lineHeight: 30px, letterSpacing: -0.96px
- `background: linear-gradient(#333, #252525)`, `background-clip: text`,
  `-webkit-text-fill-color: transparent` — a subtle dark-grey vertical
  gradient on the text (simplify to a solid `text-foreground/80` grey if
  gradient-text plumbing is not worth the complexity; visually near-
  identical since the two stops are only 8 tone-units apart)
- max-width: ~640px, margin: 24px auto 0, text-align: center

## States & Behaviors
N/A — fully static section, no hover/scroll behavior on any element here.

## Assets
- No downloaded images. The glyph is a small inline SVG (2 paths + a
  rounded-rect fill), embedded directly in the component.

## Text Content (verbatim)
- H1: "Features"
- Paragraph: "A 3D digital twin app for real-time view. Detailed web analysis for a deep dive. And if something goes wrong, get notified."

## Responsive Behavior
- **Desktop (1440px):** as above, content column ~66% width, centered.
- **Tablet (768px):** same proportions, column widens to ~90%; hero
  section top padding reduces (source CSS: `cc-subpage-hero` padding-top
  drops from 22rem(220px)→16rem(160px equivalent already-converted) at
  ≤991px, then further at ≤767px). Use `pt-[160px] md:pt-[220px]`-style
  scaling, i.e. smaller top padding below `lg`.
- **Mobile (390px):** icon+H1 row may wrap if needed (icon 48px, H1 ~40px
  fontSize), paragraph full width with side padding, top padding further
  reduced (~140px) to keep the fixed header from crowding content.
- **Breakpoint:** collapse to tighter mobile spacing at `<768px` (`md`).
