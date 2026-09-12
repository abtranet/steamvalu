# Footer Specification — shared across all pages

## Overview
- Target file: `src/components/sites/reference-site/shared/Footer.tsx`
- Interaction model: static, hover-underline on links (`.link_line` element per link, expands on hover)

## Computed Styles
- Container: `background-color: rgb(0,0,0)`, `color: rgb(255,255,255)`, `padding-top: 67.2px`, `padding-bottom: 144px`
- Column heading (e.g. "Use cases", "Reference site", "Resources", "Links"): `color: white`, `font-size: 18px`, `font-weight: 500`, at ~50% opacity wrapper (`u-opacity50`)
- Links: `color: white`, `font-size: 18px`
- Footnote text (copyright, cookie settings, blurb paragraph): `font-size: 15.6px`, `color: white`, wrapped in `u-opacity50` (~50% opacity)

## DOM Structure / Content (verbatim)
```
footer (bg black)
  logo (SVG, viewBox 0 0 80 20, fill="white")
  4 columns:
    1. "Use cases"
       - Logistics optimization -> /optimize-internal-logistics
       - Logistics management -> /material-order-automation
       - Gemba, in 3D -> /monitor-production
    2. "Reference site"
       - Partners -> /partner
       - Pricing -> /pricing
       - Our story -> /about
       - Contact -> /contact-us
    3. "Resources" (external links, each with a small up-right arrow icon at 50% opacity)
       - Customers portal -> https://partner.reference site.eu/
       - Partners portal -> https://partner.reference site.eu/
       - Documentation -> https://reference site.atlassian.net/wiki/spaces/PUBD/overview
       - Helpdesk -> https://partner.reference site.eu/helpdesk/customer-care-1
       - Sign In -> https://platform.the reference site/login
    4. "Links"
       - LinkedIn -> https://www.linkedin.com/company/reference site
       - YouTube -> https://www.youtube.com/@reference site-digitaltwin
       App download badges (3, horizontal row):
       - App Store badge (img /images/badges/app-store.svg, 120x36) -> apple app store link
       - Google Play badge (img /images/badges/google-play.svg, 120x36) -> play store link
       - Windows badge (img /images/badges/windows.svg, 120x36) -> sharepoint download link
  Bottom row (50% opacity):
    - Left column: "© Reference site 2026" + "Cookie Settings" link (opens cookie preferences — stub as no-op button)
    - Right column: paragraph — "Through collaborative efforts with our inaugural customers, we've systematically devised an expanding suite of solutions aimed at addressing commonplace challenges in manufacturing. Our relentless pursuit pivots towards an intensified emphasis on the tridimensional visualization paradigm. In 2019, this dedicated initiative bore fruit in the form of 'reference site'—a groundbreaking 3D live digital twin, seamlessly operational on any device."
```

## Assets
- Footer logo: same reference site wordmark SVG as header, `fill="white"` (viewBox `0 0 80 20`)
- App badges: downloaded to `public/sites/reference-site/shared/images/badges/{app-store,google-play,windows}.svg`
- External-link arrow icon (6x6, `fill="white" fill-opacity="0.5"`): reuse from `icons.tsx`

## Responsive Behavior
- Desktop (1440px): 4-column grid (logo full width row above)
- Mobile (390px): columns stack vertically, app badges remain in a row (wrap if needed)
