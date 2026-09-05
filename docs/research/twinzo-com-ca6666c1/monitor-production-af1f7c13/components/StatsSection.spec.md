# StatsSection Specification

## Overview
- **Target file:** `src/components/sites/twinzo-com-ca6666c1/monitor-production-af1f7c13/StatsSection.tsx`
- **Screenshot:** `docs/design-references/twinzo-com-ca6666c1/monitor-production-af1f7c13/desktop-03-cta-stats.jpg`, `desktop-04-stats-cta2.jpg`
- **Interaction model:** static

## DOM Structure
```
<section class="cc-grey-bg">
  <div class="container">
    <div class="cs-stats"> (light-grey rounded card)
      <div class="row"><h2>Let us talk about the numbers</h2></div>
      <div class="row">
        <ul class="cs-stats_list">
          <li>{number}{label}</li>  x3
        </ul>
      </div>
    </div>
  </div>
</section>
```

## Computed Styles (exact values from getComputedStyle, live Chrome @ 1440px)
- Section: paddingTop 40px, paddingBottom 120px
- Card background: rgba(0,0,0,0.03) → very light grey, `bg-black/[0.03]`
- Card borderRadius: 24px
- Card container maxWidth: 1132px (inner content uses `col-lg-11` per source ≈ 91.6% width, but visually near-full)
- Heading ("Let us talk about the numbers"): fontSize 32px, fontWeight 700, color black. Live screenshot shows it wraps across 3 lines within a narrower column (~col-lg-4, roughly 1/3 width) — implement with `max-w-sm` (~384px) so it wraps similarly at desktop.
- Stats list: display flex, gap 40px (columnGap/rowGap both 40px), wraps to new row when needed (3rd item drops to its own row at desktop 1440 per screenshot, because heading takes horizontal space beside first two stats — actually re-examine: screenshot shows heading on its own row above, then 3 stats below in their own full-width row; 3rd stat wrapping happens only at ≤991px per `.cs-stats_item{width:47%}`). At clean desktop the row holds all 3 side by side using `col-lg-11` (≈1037px) width — confirmed by initial screenshot showing all three inline.
- Stat number: fontSize 56px, fontWeight 700, color black
- Stat label: fontSize 24px, color black (not muted grey here, unlike the hero's white/dimmed labels — this section's labels are full-opacity black-on-grey)

## States & Behaviors
- N/A — static.

## Assets
- None (text only).

## Text Content (verbatim)
- Heading: "Let us talk about the numbers"
- Stat 1: "€10K" / "totally invested"
- Stat 2: "2 wk." / "implementation process" (note: source HTML has a `<br/>` inside "implementation<br/>process" — a manual line break; reproduce as `implementation<br />process` or simply allow natural wrap, visual match is close either way — use the literal line break to match exactly)
- Stat 3: "20%" / "shorter breakdowns"

## Responsive Behavior
- **Desktop (1440px):** heading full width on its own row (`max-w-sm`), all 3 stats in one row below, `gap-10` (40px).
- **Tablet (768px):** per site.css `@media (max-width: 991px)`: `.cs-stats_item{width:47%}` — stats wrap 2-per-row (2 columns, with the 3rd item wrapping to a second row spanning ~47% width) → implement `flex flex-wrap` with each item `basis-[47%]` at `md:` and up to `lg:`, or simpler: `grid grid-cols-2 lg:flex lg:flex-row`.
- **Mobile (390px):** per site.css `@media (max-width: 767px)`: `.cs-stats_item{width:100%}` — fully stacked, one per row.
- **Breakpoint:** 2-column at 991px (Tailwind `md:` 768px close enough), full stack below 767px (Tailwind default mobile, no prefix).
