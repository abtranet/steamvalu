# SupportedDataSources Specification

## Overview
- **Target file:** `src/components/sites/reference-site/features-de335934/SupportedDataSources.tsx`
- **Screenshot:** `docs/design-references/reference-site/features-de335934/03-cards-2-support.jpg`, `04-support-coming.jpg`
- **Interaction model:** static (one external text link)

## DOM Structure
```
section > div.container > div.features_support-wrap
  row 1: div.features_support-header
    h2 "Supported external data sources" (line-break after "external")
    p (grey intro line)
    a.btn.cc-link "More about REST API" + chevron icon
  row 2: div.features_support-wrap_inner (flex row, justify-between)
    div.features_support-text-wrap (x6 — one per category)
      p (category label, bold)
      ul.features_support-list
        li > svg(check, 16x16, currentColor) + p (vendor name)
```

## Computed Styles (converted to 1440px-and-below regime)

### Container
- max-width: 1132px, centered, side padding as page container

### Header
- h2: fontSize 32px, fontWeight 700, lineHeight 37.76px, letterSpacing -1.28px, color black
- intro p: fontSize 24px, fontWeight 400, lineHeight 24px, letterSpacing -0.96px, color mid-grey (`text-foreground/60`)
- link ("More about REST API"): display flex, align-items center, gap 3px, fontSize 15px, fontWeight 500, lineHeight 15px, letterSpacing -0.6px, color black, chevron icon 12x12 (`ChevronRightSmallIcon`, shared)

### Category row (`features_support-wrap_inner`)
- display: flex, justify-content: space-between, align-items: flex-start, gap: 24px

### Category column (`features_support-text-wrap`)
- display: flex, flex-direction: column, gap: 24px

### Category label (bold p, e.g. "UWB RTLS")
- fontSize: 18px, fontWeight: 700, lineHeight: 21.96px, letterSpacing: -0.72px, color: black

### Vendor list (`features_support-list`)
- display: flex, flex-direction: column, gap: 12px
- item: display flex, align-items: flex-start, gap: 4px
- check icon: 16x16, `CheckIcon` shared component, `currentColor` (grey), `mt-[3px]` shrink-0
- vendor name (p): fontSize 18px, fontWeight 400, lineHeight 21.96px, letterSpacing -0.72px, color grey `rgb(128,128,128)`

## States & Behaviors
N/A — static section. Link has a standard underline/opacity hover
(inherits global `.btn.cc-link` hover from shared button styles).

## Per-Category Content (verbatim)

1. **UWB RTLS** — Ubisense, Unlimited Storage
2. **RFID RTLS** — RF - Controls, Siements, Zebra
3. **BLE RTLS** — Quuppa, Zebra, Reference site proprietary
4. **Man down solution** — Quuppa, Reference site proprietary
5. **Open source multiplatform middleware** — (no sub-items; label only)
6. **AI-based camera feed reference site RTLS** — (no sub-items; label only)

Header text (verbatim):
- "Supported external data sources"
- "General API available for any data-source"
- "More about REST API" → links to `https://reference site.atlassian.net/wiki/spaces/PUBD/pages/73170950/REST+API` (external, new tab)

## Assets
- No images. `CheckIcon` and `ChevronRightSmallIcon` from shared icons.

## Responsive Behavior
- **Desktop (1440px):** 6 categories in a single row (`flex`,
  `justify-content: space-between`), natural column widths.
- **Tablet (768px):** categories wrap, ~3 per row (source CSS sets
  `flex-basis: 30%` on `.features_support-text-wrap` at `≤991px`, and
  `flex-wrap: wrap` / `justify-content: flex-start` on the row).
- **Mobile (390px):** categories stack to a single column full-width
  (source CSS: `flex-flow: column` at `≤479px`), gaps reduce slightly.
- **Breakpoint:** row→3-wrap at `991px` (`lg`), 3-wrap→1-column at `480px`
  (`sm`).
