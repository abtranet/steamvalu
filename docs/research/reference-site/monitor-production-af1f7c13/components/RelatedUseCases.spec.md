# RelatedUseCases Specification

## Overview
- **Target file:** `src/components/sites/reference-site/monitor-production-af1f7c13/RelatedUseCases.tsx`
- **Screenshot:** `docs/design-references/reference-site/monitor-production-af1f7c13/desktop-05-related.jpg`
- **Interaction model:** static layout; hover on card image link and text link

## DOM Structure
```
<section class="u-pt-0">
  <div class="container">
    <div class="hp-cases_list"> (grid, 2 columns desktop)
      <div class="cs-related_item"> x2
        <a class="cs-related_visual"><img/></a>
        <div class="cs-related_content">
          <h3>{title}</h3>
          <p>{description}</p>
          <a class="btn cc-link">{title}<ChevronRightIcon/></a>
        </div>
      </div>
    </div>
  </div>
</section>
```
Each card: image (fixed square) + text block, side by side (image left, text right), NOT stacked image-on-top.

## Computed Styles (exact values from getComputedStyle, live Chrome @ 1440px)
- Section: paddingTop 0, paddingBottom 120px
- List (`.hp-cases_list`): display grid, gridTemplateColumns: 530px 530px (i.e. two fixed ~530px columns with a 40px gap) → implement as `grid grid-cols-1 md:grid-cols-2 gap-10`
- Item (`.cs-related_item`): display flex, alignItems center, gap 24px (image + text side by side)
- Image: 210px × 210px, objectFit cover, borderRadius 0 (square corners, no rounding)
- Title (h3, `.subhead.u-wg-500`): fontSize 24px, fontWeight 500, color black
- Description (p, `.paragraph-18`): fontSize 18px, color black, lineHeight ~22px
- Link (`.btn.cc-link`): fontSize 15px, color black, no underline by default; contains a small chevron-right icon (16×16 viewBox, path `M6 12L10 8L6 4`, stroke currentColor) — reuse/add a `ChevronRightIcon` to the page's local icons or inline SVG since it differs from the shared `ChevronDownIcon`.

## States & Behaviors
### Hover — image link
- Standard link, no special hover treatment observed beyond default cursor; apply a subtle `opacity-90` on hover for interactivity affordance (site-wide convention for image links).

### Hover — text link (`.btn.cc-link`)
- Site-wide convention seen elsewhere (footer `.link_line` underline-grow pattern): implement `hover:gap-2` (chevron nudges right) plus `hover:underline` on the text for a clear affordance, transition 200ms.

## Assets
- `public/sites/reference-site/monitor-production-af1f7c13/images/production-monitoring.jpg` (424×424 JPEG) — card 1, links to `/material-order-automation`
- `public/sites/reference-site/monitor-production-af1f7c13/images/logistics-optimization.jpg` (424×424 JPEG) — card 2, links to `/optimize-internal-logistics`

## Text Content (verbatim)
**Card 1**
- Image alt: "automated material ordering"
- Title: "Logistics management"
- Description: "Avoid production micro-stoppages via an Automated Ordering System (AOS). It's Uber, just for a factory."
- Link text: "Logistics management"
- href: `/material-order-automation`

**Card 2**
- Image alt: "internal logistics optimization"
- Title: "Logistics optimization"
- Description: "RTLS (real-time location service) data show you logistics from a new perspective. Identify waste, utilize your fleet, and save."
- Link text: "Logistics optimization"
- href: `/optimize-internal-logistics`

## Responsive Behavior
- **Desktop (1440px):** 2 columns, each card is image-left/text-right in a row.
- **Tablet (768px):** per site.css `@media (max-width: 991px)`: `.hp-cases_list{flex-flow:column;display:flex}` — the two cards stack vertically (1 column), each card itself likely remains row (image+text side by side) since `.cs-related_item` itself isn't restacked until further down; `.cs-related_visual{flex:none}` prevents the image from stretching.
- **Mobile (390px):** per site.css `@media (max-width: 767px)`: `.cs-related_visual{width:16rem}` (image fixed 160px) — cards remain image-left/text-right (not stacked image-on-top) but at a smaller fixed image size.
- **Breakpoint:** list stacks to 1 column at 991px (Tailwind `lg:grid-cols-2` i.e. only 2-column at ≥1024px, single column below); image shrinks to 160px at 767px (Tailwind `max-sm:` or explicit size at default/mobile).
