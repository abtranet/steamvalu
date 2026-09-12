# Shared Header Specification

## Overview
- **Reference:** `https://www.the reference site/`, inspected 2026-09-05.
- **Target file:** `src/components/sites/steam-value/shared/Header.tsx`
- **Screenshots:** `docs/design-references/reference-site/shared/header-desktop-1440.jpg`, `header-mobile-390.jpg`, `header-mobile-open-390.jpg`
- **Interaction model:** hover/focus dropdowns on desktop; click-driven menu and accordion dropdowns on mobile.
- **Brand adaptation:** Reference site geometry and behavior with STEAM VALUE labels, routes, logo, and green token retained.

## DOM Structure
```text
header (fixed)
  container (logo left, navigation right)
    STEAM VALUE logo
    desktop navigation
      Cas d’usage dropdown
      Plateforme link
      Architecture link
      À propos dropdown
      Ressources dropdown
      Voir la démo CTA
    mobile hamburger (two 24x1px rules)
  mobile navigation panel
    five 69px top-level rows
    two-column CTA row
```

## Computed Styles

### Desktop at 1440px
- Header: `position: fixed`, `top: 0`, `left/right: 8px`, `height: 90px`, `z-index: 1000`, transparent background.
- Container: `height: 50px`, `padding-left: 40px`, `justify-content: space-between`.
- Logo reference box: `80x21px`; STEAM VALUE keeps its own wordmark aspect ratio at the same 21px height.
- Menu inner: `display: flex`, `align-items: center`, `gap: 16px`, `height: 50px`.
- Top-level labels: `15px/15px`, weight 400, letter spacing `-0.02em`.
- CTA: `height: 50px`, minimum width `130px`, horizontal padding `24px`, `15px/15px`, weight 500, `border-radius: 100px`, background `#3afc97`.

### Desktop fluid scale to 1920px
- Header height: `108px`; outer inset: `9.6px`; container left padding: `48px`.
- Menu gap: `19.2px`; CTA height: `60px`; CTA min-width: `156px`; CTA padding: `28.8px`.
- All desktop values interpolate with `clamp()` between the observed 1440px and 1920px states.

### Desktop dropdown
- Wrapper: relative, z-index 900.
- Menu offset: `top: 100%` plus `24px` transparent hover bridge.
- Inner panel: black, `border-radius: 16px`, `padding: 10px 20px`, min-content width.
- Links: white, `padding: 10px 0`, `15px/15px` at 1440px, letter spacing `-0.04em`.

### Mobile at 390px
- Header: `390x80px`, no side inset, transparent background.
- Container: `height: 27px`, horizontal padding `24px`.
- Hamburger hit area: `44x27px`, right margin `-10px`, padding `10px`; two `24x1px` lines separated by 5px.
- Open panel: `top: 80px`, width 100%, black, bottom corners `24px`, content padding `32px 24px 24px`, max-height `calc(100dvh - 80px)`.
- Top-level rows: `69px` high, `20px/20px`, letter spacing `-0.02em`, white, `1px rgba(255,255,255,.2)` divider.
- CTA group: two equal columns, `24px` gap, `64px` top margin; buttons `50px` high and pill-shaped.

## States & Behaviors

### Desktop dropdown
- **Trigger:** pointer hover or keyboard focus within the dropdown.
- **Closed:** invisible, opacity 0.
- **Open:** visible, opacity 1; chevron rotates 180 degrees.
- **Transition:** opacity 200ms; chevron 300ms.

### Scrolled desktop position
- **Trigger:** document scroll position moves beyond 1px.
- **Before:** `top: 0`.
- **After:** `top: 8px`.
- **Transition:** the header's top offset transitions over 300ms.

### Mobile menu
- **Breakpoint:** desktop persists through 992px; mobile activates at 991px and below.
- **Trigger:** hamburger click.
- **Open:** black content-height panel below the 80px header; body scrolling is locked; hamburger rules cross into an X.
- **Close:** hamburger click, Escape, route selection, or viewport widening to 992px.
- **Transition:** transform/opacity/visibility over 400ms.

### Mobile dropdowns
- **Trigger:** top-level dropdown row click.
- **Behavior:** one accordion can be expanded at a time; nested links animate open using grid-row interpolation.

### Contrast behavior
- Logo and desktop menu contrast are sampled independently from the content beneath their positions. This reproduces the split hero state: light logo over the dark image and dark navigation over the white content.

## Text Content
- Cas d’usage: Fiabilité des actifs; Performance du procédé; Composition multi-niveaux.
- Plateforme.
- Architecture.
- À propos: À propos; Démonstrateur.
- Ressources: Fonctionnement; Ressources; Démonstrateur.
- CTAs: Découvrir; Voir la démo.

## Responsive Behavior
- **Desktop (1440–1920px):** right-aligned horizontal navigation, hover dropdowns, single visible primary CTA.
- **Tablet/mobile (≤991px):** logo and two-line hamburger; black content-height dropdown panel with top-level accordion rows and two CTAs.
