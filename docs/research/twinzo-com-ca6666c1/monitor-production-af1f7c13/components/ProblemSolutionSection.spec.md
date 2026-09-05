# ProblemSolutionSection Specification

## Overview
- **Target file:** `src/components/sites/twinzo-com-ca6666c1/monitor-production-af1f7c13/ProblemSolutionSection.tsx`
- **Screenshot:** `docs/design-references/twinzo-com-ca6666c1/monitor-production-af1f7c13/desktop-02-hero-visual-problem.jpg`
- **Interaction model:** static

## DOM Structure
```
<section> (white bg)
  <div class="container"> (max-width 1132px)
    <ul> (cs-list)
      <li class="row">  -- "Problem" row
        <div class="col-lg-2"><h2>Problem</h2></div>
        <div class="col"><p>...paragraph...</p></div>
      </li>
      <li class="row">  -- "Solution" row
        <div class="col-lg-2"><h2>Solution</h2></div>
        <div class="col"><p>...paragraph...</p></div>
      </li>
    </ul>
  </div>
</section>
```
Each row is a two-column flex layout: a narrow label column (~2/12 of width) and a wide text column, side by side on desktop.

## Computed Styles (exact values from getComputedStyle, live Chrome @ 1440px)
- Section: paddingTop 40px, paddingBottom 120px
- Row: display: flex (label column fixed narrow width, text column flex-1), with generous column gap (~64-96px based on visual; site.css base `.row` gutter pattern) — implement as `flex flex-col md:flex-row md:items-start gap-6 md:gap-16`
- Label ("Problem"/"Solution"): fontSize 24px, fontWeight 500, color rgb(0,0,0), textTransform none — this is `.subhead` class, not a heading tag but styled like one; keep as `<h2>` semantically
- Paragraph: fontSize 24px, fontWeight 400, lineHeight 30px, color rgb(0,0,0)
- Vertical gap between the two rows: visually ~64-80px (matches the site's row gap pattern of `4rem`=40px seen in the `.cs-list` gap rule at some breakpoints; using `gap-16` (64px) between rows for close visual match)

## States & Behaviors
- N/A — fully static, plain text section, no links, no hover states.

## Assets
- None (text only).

## Text Content (verbatim)
**Problem**
"Large manufacturing sites face challenges in achieving a comprehensive overview of production, logistics, safety, quality, and maintenance processes. Supervisors, maintenance crews, and other roles struggle to assess the current status and identify issues in real time, often necessitating phone calls and extensive walks across the facility. This inefficiency directly results in prolonged breakdowns and increased production idle times."

**Solution**
"Integrate all systems, such as ERP, MES, SAP, Quality, Breakdowns, PLC readouts, Environmental sensors, and more, into the twinzo digital twin. This information can then be accessed through our 3D digital twin app on various devices, including phones, tablets, TVs, and large touch screens. The data is presented in an easy-to-understand 3D format, providing every employee on the shop floor with instant access to critical information. This not only streamlines decision-making but also enhances data transparency throughout the manufacturing facility."

## Responsive Behavior
- **Desktop (1440px):** label + paragraph side by side, label column narrow (~2 of 12 grid columns, roughly 160-180px), paragraph text left-aligned taking the remaining width (both rows visually center-aligned as a block within the 1132px container based on live screenshot, but underlying text itself is left-aligned within its column).
- **Tablet (768px):** same two-column pattern likely persists (Webflow `col-lg-2` breaks at `lg` i.e. 991px in Webflow's own grid — meaning tablet ≤991px stacks the label above the paragraph). Implement stacking starting at `md:` (768px) to `lg:flex-row` at ≥1024px for the closest practical Tailwind match.
- **Mobile (390px):** label stacks above paragraph, both full width, paragraph text likely remains left-aligned (not centered) per Webflow's typical behavior for `.col` text blocks.
- **Breakpoint:** row switches from stacked to side-by-side at ~991px (Webflow's `col-lg` breakpoint) → implemented as Tailwind `lg:` (1024px).
