# CtaBanner Specification

Reusable component — used twice on this page with different copy/link/style. One component, two usages.

## Overview
- **Target file:** `src/components/sites/reference-site/monitor-production-af1f7c13/CtaBanner.tsx`
- **Screenshot:** `docs/design-references/reference-site/monitor-production-af1f7c13/desktop-03-cta-stats.jpg` (banner 1), `desktop-04-stats-cta2.jpg` (banner 2)
- **Interaction model:** static layout; hover transition on the button only

## DOM Structure
```
<section>
  <div class="container">
    <div class="cta-banner"> (pill, brand green bg)
      <p>{headline text}</p>
      <a class="btn" href={link}>{button label}</a>
    </div>
  </div>
</section>
```

## Computed Styles (exact values from getComputedStyle, live Chrome @ 1440px)

### Section wrapper
- Instance 1 (after Hero, before Grey stats): paddingTop 40px, paddingBottom 80px
- Instance 2 (after Grey stats, before Related): paddingTop 40px, paddingBottom 80px

### `.cta-banner` (pill container)
- backgroundColor: rgb(58, 252, 151) = `#3AFC97` → `bg-brand`
- borderRadius: 1000px (fully pill) → `rounded-full`
- padding: 24px 24px 24px 48px (asymmetric: more left padding for text breathing room, tighter around the button on the right)
- display: flex, alignItems: center, justifyContent: space-between
- max-width: matches container (1132px), full width of its row

### Headline text (`.u-wg-500`)
- fontSize: 24px, fontWeight: 500, color: rgb(0,0,0) → black

### Button (`.btn.cc-secondary.cc-solid`)
- backgroundColor: transparent
- color: rgb(0,0,0)
- borderRadius: 100px (pill) → `rounded-full`
- padding: 16px 24px
- border: 1px solid rgb(0,0,0)
- fontSize: 15px
- **Hover (site-wide secondary-button convention, confirmed against other already-built shared components' hover pattern):** `hover:bg-black hover:text-white transition-colors duration-200`

## States & Behaviors
### Hover
- **Element:** the pill button
- **Before:** transparent bg, black border, black text
- **After:** black bg, white text (border stays black, now invisible against bg)
- **Transition:** `transition-colors duration-200`

## Assets
- None (no icons on the button itself; plain text link with pill border).

## Text Content (verbatim) — two instances used on this page
1. Headline: "Book Your Free Expert Session" / Button: "Book now" / Link: `https://calendly.com/d/cv66-765-hyx/book-your-free-expert-session?utm_content=expert_session` (external, opens new tab)
2. Headline: "Get free Whitepaper for step-by-step instructions" / Button: "Download now" / Link: `/get-whitepaper` (internal route — link only, no page built for it in this task's scope; render as a plain Next `<Link>` even though the target route doesn't exist yet in this app)

## Responsive Behavior
- **Desktop (1440px):** single row, headline left, button right, pill shape with `space-between`.
- **Tablet (768px):** per site.css `@media (max-width: 991px)`: `.cta-banner{border-radius:24px;padding:32px 24px}` — banner becomes a **less-round rounded rectangle** (not full pill) with symmetric padding; layout may still be row (no `flex-direction` override at 991px, only at 767px).
- **Mobile (390px):** per site.css `@media (max-width: 767px)`: `.cta-banner{flex-flow:column;padding:0;border-radius:var(--sections--border-radius)}` (border-radius token = 24px at this breakpoint) — banner switches to a **column layout** (headline stacked above button, both centered), and since the component's own padding drops to 0, the visual padding must come from wrapping the text/button in inner elements with their own padding to avoid content touching the rounded edge — implement with an inner `p-8` wrapper on mobile, or keep sensible padding via a mobile-specific class override (`max-sm:flex-col max-sm:items-center max-sm:gap-6 max-sm:rounded-3xl max-sm:p-8 max-sm:text-center`) since a literal `padding:0` would look broken; prioritize visual correctness over a literal zero.
- **Breakpoint:** rectangle-not-pill at 991px; column stack at 767px.
