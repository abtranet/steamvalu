# Header (nav) Specification — shared across all pages

## Overview
- Target file: `src/components/sites/steamvalu/shared/Header.tsx`
- Interaction model: static layout, click-driven dropdowns (hover-opens on desktop per `data-hover="true"`), click-driven mobile hamburger menu, click-driven Contact modal (opens `ContactModal.tsx`)
- Fixed/sticky: `position: fixed; top: 0; z-index: 1000` — overlays all page content, transparent background over hero, no scroll-shrink behavior observed on homepage.

## DOM Structure
```
header (.nav_wrapper.top, fixed)
  .nav.cc-solid
    .container.cc-nav
      a.nav_brand (href="/", aria-label="twinzo home")
        svg logo (viewBox 0 0 80 21, fill="currentColor", black)
      nav.nav_menu
        .nav_dropdown "Use cases" (chevron icon, hover-opens)
          .nav_dropdown-menu
            a "Logistics optimization" -> /optimize-internal-logistics
            a "Logistics management" -> /material-order-automation
            a "Gemba, in 3D" -> /monitor-production
        a "Pricing" -> /pricing
        a "Partners" -> /partner
        .nav_dropdown "About us"
          a "Our Story" -> /about
          a "Contact" -> opens ContactModal (id=modal-get-in-touch)
        .nav_dropdown "Resources"
          a "Features" -> /features
          a "Blog" -> /blog
          a "Newsroom" -> /newsroom
          a "Customers portal" -> external (partner.twinzo.eu) + external-link icon
          a "Partners portal" -> external (partner.twinzo.eu) + external-link icon
          a "Documentation" -> external (atlassian wiki) + external-link icon
          a "Helpdesk" -> external (partner.twinzo.eu/helpdesk) + external-link icon
        .nav_menu-actions
          a.btn "Book Demo" -> external Calendly link, primary button (brand green)
          a.btn "Try for free" (masked/secondary style) -> external Calendly link
      .nav_ham (hamburger, mobile only: 2 lines)
  ContactModal (see below) — lives inside header, opened by "Contact" nav link

## Computed Styles
- `.nav_wrapper.top`: position fixed, top 0, z-index 1000, height 108px (desktop), background transparent, font-family "Inter Variable", sans-serif
- `.nav_link` (top-level items incl. dropdown toggles): font-size 18px, font-weight 400, color rgb(0,0,0), gap between icon/text 4.8px
- `.btn.btn-try-for-free` (Book Demo — primary CTA): background rgb(58,252,151) `#3AFC97`, color rgb(0,0,0), font-size 18px, font-weight 500, padding 19.2px 28.8px, border-radius 120px (pill), height 60px, no border
- Dropdown chevron: 16x16 icon, `<path d="M4 6L8 10L12 6" stroke="currentColor"/>` (viewBox 0 0 16 16)
- External-link icon: 6x6, arrow pointing up-right, `fill="white" fill-opacity="0.5"` variant used inside dark dropdown panel (dropdown panel itself has dark bg — chevron/arrow icons are white-on-dark in the Resources submenu, confirm dropdown panel bg is dark/near-black with white text, matching footer's black theme)
- Logo: inline SVG, viewBox `0 0 80 21`, `fill="currentColor"` (renders black on light header, white in footer variant viewBox `0 0 80 20`)

## States & Behaviors
### Dropdown open/close
- Trigger: hover (desktop, `data-hover="true"`) or click (mobile)
- Before: dropdown panel hidden (display none / opacity 0)
- After: panel visible, chevron rotates 180deg
- Transition: opacity/transform, ~200-300ms ease (standard Webflow dropdown easing)

### Mobile menu
- Trigger: click hamburger (`.nav_ham`)
- Before: nav menu hidden off-canvas or collapsed
- After: full-screen or dropdown mobile menu appears with all links stacked, two hamburger lines animate into an X
- Breakpoint: `data-collapse="medium"` → collapses at Webflow's medium breakpoint (~768px)

### Contact modal
- Trigger: click "Contact" link inside "About us" dropdown (`id="menu-item"`, `scroll="disable"`)
- Content: modal card with heading "Contact us", subcopy, and a form (Name, Phone, Email, Company, Subject, "You want to become" select [Customer/Partner], Country select, Message textarea, Submit button "Submit")
- Close: click `.hp_modal-close-button` (X icon) or click `.hp_modal-bg` backdrop
- Out of scope: real submission to `/api/leads` — build as local UI state only (no backend), submit button can show a static "Thank you" success state or just be visually present/disabled

## Assets
- Logo SVG: full path data captured in `header.html` scratch extract — reproduce inline as `<TwinzoLogo />` in `shared/icons.tsx`, `fill="currentColor"` so it can render black (header) or white (footer, slightly different viewBox `0 0 80 20`, same paths minus 0.5 y-offset — acceptable to reuse the header logo with `currentColor` for both contexts)
- Chevron down icon, external-link icon: reproduce as small inline SVGs in `icons.tsx`

## Text Content (verbatim)
See DOM structure above for exact link labels. Button labels: "Book Demo", "Try for free".

## Responsive Behavior
- Desktop (1440px): full horizontal nav with dropdowns, both CTA buttons visible
- Tablet (768px): collapses to hamburger menu at Webflow's "medium" breakpoint
- Mobile (390px): hamburger menu, logo left, hamburger right, CTA buttons appear inside the mobile menu panel
