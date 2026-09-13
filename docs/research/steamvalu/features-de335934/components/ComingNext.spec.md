# ComingNext Specification

## Overview
- **Target file:** `src/components/sites/steamvalu/features-de335934/ComingNext.tsx`
- **Screenshot:** `docs/design-references/steamvalu/features-de335934/04-support-coming.jpg`
- **Interaction model:** static

## DOM Structure
```
section.u-no-padding > div.container > div.features_coming-wrap (bordered block)
  row 1: h2 "Coming next"
  row 2: div.features_coming-wrap_inner (flex row, justify-between)
    ul.features_coming-text-wrap (x2 — left/right columns)
      li > p (plain text item, no icon)
```

## Computed Styles (converted to 1440px-and-below regime)

### Wrap (`features_coming-wrap`)
- border-top: 1px solid `rgba(0,0,0,0.2)`
- border-bottom: 1px solid `rgba(0,0,0,0.2)`
- padding: `120px 0` (this single element supplies both the divider line
  above "Coming next" and the divider line before the CTA section — no
  separate `<hr>` elements exist)

### Heading (h2, "Coming next")
- fontSize: 32px, fontWeight: 700, lineHeight: 37.76px, letterSpacing: -1.28px, color: black
- margin-bottom before the two-column list: ~40px (`u-mb` row spacing)

### Inner row (`features_coming-wrap_inner`)
- display: flex, justify-content: space-between, align-items: flex-start, gap: 24px

### Column (`features_coming-text-wrap`, a `<ul>`)
- display: flex, flex-direction: column, gap: 20px, list-style: none
- flex-basis: ~50% each (roughly equal columns, container is 1132px, 24px gap)

### List item / text (p)
- fontSize: 18px, fontWeight: 700, lineHeight: 21.96px, letterSpacing: -0.72px
- color: grey `rgb(128,128,128)` (same grey used elsewhere for
  secondary/muted text on this page)
- Some items wrap their text in `<strong>` in source markup but this adds
  no additional visual weight beyond the already-bold `paragraph-18
  u-wg-700` styling — render plainly, no special-casing needed.

## States & Behaviors
N/A — static text block, no links, no hover states.

## Text Content (verbatim)

**Column 1:**
- Warehouse management system integration
- ERP systems module
- Skill matrix system integration

**Column 2:**
- Turn by turn navigation
- Correlation and cuasality analytics *(sic — "cuasality" is a typo on
  the live site; kept verbatim per "real content" rule)*
- AI anomaly detection
- AI correlation detection

## Assets
N/A — no images or icons in this section.

## Responsive Behavior
- **Desktop (1440px):** 2 columns side by side, `justify-content: space-between`.
- **Tablet (768px):** unchanged 2-column layout (no override found for
  this section between 767–991px beyond the general reduced section
  padding).
- **Mobile (390px):** columns stack to a single column, full width, gap
  reduces (source CSS pattern: `flex-flow: column` at `≤479px`, matching
  the same treatment applied to the support-sources row).
- **Breakpoint:** 2-col → 1-col at 480px (`sm`).
