# FeaturesCTA Specification

## Overview
- **Target file:** `src/components/sites/twinzo-com-ca6666c1/features-de335934/FeaturesCTA.tsx`
- **Screenshot:** `docs/design-references/twinzo-com-ca6666c1/features-de335934/05-cta-footer.jpg`
- **Interaction model:** static (two outbound links)

## DOM Structure
```
section#get-in-countrol-cta.cc-light > div.container
  row (justify-center) > div.col (~6/12 width, centered)
    h2 "Get in control"
    p (grey paragraph)
    ul.button-group (2 buttons)
      a "Try for free" (outline pill, external → Calendly trial link)
      a "Book Demo" (solid brand pill, external → Calendly intro link)
```

## Computed Styles (converted to 1440px-and-below regime)

### Section
- padding: `~33px 0 120px` (light section, no border of its own — the
  hairline above it belongs to the preceding `ComingNext` wrap)
- text-align: center

### Heading (h2.h1, "Get in control")
- fontSize: 56px, fontWeight: 700, lineHeight: 67.2px, letterSpacing: -2.24px, color: black

### Paragraph
- fontSize: 18px, fontWeight: 400, lineHeight: 21.96px, letterSpacing: -0.72px
- color: grey `rgb(128,128,128)`
- max-width: ~460px, margin: 16px auto 32px

### Button group
- display: flex, gap: ~12px (`cc-gap-small`), justify-content: center

### Button — "Try for free" (`btn cc-secondary`)
- background: transparent, color: black
- border: 1px solid `rgba(0,0,0,0.2)`
- padding: `16px 24px`, border-radius: 9999px (pill)
- fontSize: 15px, fontWeight: 500, letterSpacing: -0.6px

### Button — "Book Demo" (`btn`, default)
- background: `#3AFC97` (brand), color: black, border: none
- padding: `16px 24px`, border-radius: 9999px (pill)
- fontSize: 15px, fontWeight: 500, letterSpacing: -0.6px

## States & Behaviors
- Hover: standard opacity/background-darken transition on both buttons
  (no scale/shadow found in source CSS for this button style). Use
  `transition-opacity hover:opacity-90` to match.

## Text Content (verbatim)
- H2: "Get in control"
- Paragraph: "It's simple. To see all the possibilities, go to the App Store or Google Play and download the \"twinzo—digital twin\" app."
- Buttons: "Try for free" (links to `https://calendly.com/d/crvw-993-zd8/twinzo-trial-setup-call-30-days-free?utm_content=try_for_free`, new tab), "Book Demo" (links to `https://calendly.com/d/cr2r-cbx-n66/twinzo-introduction?utm_content=twinzo_introduction`, new tab)

## Assets
N/A — no images.

## Responsive Behavior
- **Desktop (1440px):** centered column ~50% width (`col-lg-6`).
- **Tablet (768px):** centered column widens (`col-md-8`).
- **Mobile (390px):** full width with side padding (`col-sm-12`); buttons
  may stack or stay inline depending on available width — source uses
  `cc-gap-small` flex-wrap so they wrap to 2 stacked full-width-ish pills
  if they don't fit on one line at very small widths.
- **Breakpoint:** column width step-down at `991px` (`lg`) and `767px` (`md`).
