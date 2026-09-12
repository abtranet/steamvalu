# Page Topology — /about ("Our Story")

Source: https://www.the reference site/about
site-key: `reference-site` · page-key: `about-979bddc4`
Framework: Webflow (server-rendered), jQuery + GSAP/ScrollTrigger + Lenis smooth scroll.

Layout is a single-column vertical scroll (no sidebar). `<body>` renders `.page-wrapper.u-bg-black` — the entire page (until the light CTA section) has a pure-black background. Content sits between the shared fixed Header (108px, transparent, overlays hero) and shared Footer.

## Section order (top → bottom)

1. **Hero** (`section.cc-about-hero`) — flow content, static.
   Eyebrow "Our Story" + H1 "Our core value is **innovation**". Centered, big top/bottom padding so it reads as a standalone intro under the fixed transparent header.

2. **Founder** (`section.cc-about-founder`) — flow content, static.
   Full-bleed dark-grey rounded card (`about-founder-wrap`, bg `#333`, radius 24px) containing a large square photo of the CEO (Michal Ukropec) with a stat bar overlapping the bottom edge of the photo (absolutely positioned, negative-margin panel on mobile): name/title on the left, two big-number stats (100k+ Followers, 25+ Years of experience) on the right.

3. **Story / mission** (`section.cc-about-story`) — flow content, static.
   Two-column intro paragraphs (h4 + gradient paragraph), a centered large "Our goal?" statement (h2), then a two-column row: left = quote card (glass/gradient-bordered dark card with quote-mark SVG, bold pull-quote, COO avatar+name+title), right = two paragraphs about culture.

4. **Team** (`section.cc-grey-bg`) — flow content, static.
   Slightly-lighter-than-black background (`rgba(0,0,0,0.031)` over the white body base — reads as near-black band). "Our team" h4 heading + responsive grid of 6 team member cards (photo, name, role).

5. **Divider** — a plain 1px full-width line (`.divider`), inside a `.container`, both above and below the timeline section.

6. **History / founding timeline** (`div.about-timeline_wall > section.cc-about-timeline`) — **scroll-driven pinned horizontal timeline**. See BEHAVIORS.md for the full mechanism. 9 milestones from 1999 to 2024, each with a year, a green dot on a connecting horizontal line, an eyebrow label, and a description.

7. **Divider** — same as #5.

8. **CTA** (`section#get-in-countrol-cta.cc-light`) — flow content, static. Still on the black background (confirmed live — `cc-light` here only affects the secondary button's border/text treatment, it does not flip the section background). Centered white h1 "Get in control", grey paragraph, two pill buttons (white "Try for free" outline pill / brand-green "Book Demo" filled pill — both open external Calendly links, same pattern as header/shared CTAs).

Then the shared Footer begins (not part of this page's scope).

## Interaction model per section

| Section | Model |
|---|---|
| Hero | Static (no scroll/click behavior beyond global fade-in-on-load, not distinguishable from normal paint) |
| Founder | Static |
| Story | Static |
| Team | Static (grid, no hover-state change observed beyond default browser image rendering) |
| History/timeline | **Scroll-driven, pinned** — NOT click-through. See BEHAVIORS.md |
| CTA | Static |

## Z-index / overlay notes
- The shared Header is `position: fixed`, transparent, 108px tall, and overlays the hero section (hero has ~220px top padding at desktop to clear it).
- No modals/dropdowns are specific to this page (ContactModal is shared/global, triggered by header/CTA buttons via `data-tracking="Contact Modal Open"`).
- The timeline section itself becomes `position: sticky; top: 0` while its parent wall div is tall (200vh+), which is what creates the "pin" — no `position: fixed` overlay is used.

## Colors / theme shift
- The whole page (`u-bg-black` page wrapper) stays on pure black background from hero through the CTA — there is no light/white section on this page. Headline text throughout uses a white→grey vertical gradient (`u-text-gradient02`, `background-clip: text`) rather than flat white.
- The "Our team" band (`cc-grey-bg`) is only very subtly lighter than pure black (`rgba(0,0,0,0.031)` overlay) — visually indistinguishable from black except immediately next to the hero/story sections; safe to implement as `bg-white/[0.03]` over the black page background.
