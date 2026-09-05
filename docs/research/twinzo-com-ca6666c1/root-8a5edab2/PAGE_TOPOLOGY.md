# Page Topology — twinzo.com homepage (`/`)

Source: https://www.twinzo.com/ (fetched live, Sep 2026). Webflow-built, server-rendered HTML + GSAP/ScrollTrigger/Flip for scroll interactions, Lenis for smooth scroll, Swiper for the testimonials carousel.

Full raw HTML saved for reference during build: fetched via `curl` (see section extracts below); screenshots in `docs/design-references/twinzo-com-ca6666c1/root-8a5edab2/`.

## Layout shell

- `<body>` has Lenis smooth scroll applied at the html level (`html.lenis`), wired at the shared layout level already (`SmoothScroll.tsx`) — not re-implemented here.
- Fixed header (`.nav`, 108px tall, transparent, overlays hero) — already built in shared `Header.tsx`. It toggles a `.dark` class (dark text on light backgrounds) when scrolled over light sections — implemented in the shared Header already; the homepage does not need to manage header appearance itself except by giving sections real background colors.
- Main content area is a flat stack of `<section>` elements — no sidebar, no nested scroll containers besides the two pinned hero sections.
- No dark/light mode toggle on this site — it's a single fixed light theme with two full-bleed near-black sections (steps, testimonials) as accent bands.

## Sections top → bottom

1. **Hero** (`.cc-hp-hero`, `data-sticky-hero`) — full-viewport-height (100dvh) pinned section. Background: full-bleed forklift/pipes warehouse photo at 50% opacity over black, with a rotated smartphone mockup showing a looping product video, headline, subcopy, one pill CTA ("Download FREE whitepaper"), and a customer-logo row ("Empowering" + Skoda/Whirlpool/Benteler). **Interaction model: scroll-driven (GSAP ScrollTrigger, scrub).** As the user scrolls past this section, the visual box grows from 50% to 200% width and the phone mockup rotates from portrait to landscape (90°→0°) while text content fades out — this is the transition INTO the steps section (they're visually spliced together: the same phone that fills half the hero grows to fill the full viewport and becomes the steps section's phone).
2. **Steps** (`.cc-hp-steps`, `data-sticky-hero`) — pinned, near-black background. Three numbered pill tabs ("1 See / 2 Know / 3 Manage") above a landscape phone mockup that swaps its background video and caption paragraph as you scroll through 3 internal zones (33%/33%/33% of this section's scroll distance). A `Flip`-animated exit: on leaving "Manage", the phone flips/resizes into the position of the devices section's phone. **Interaction model: scroll-driven (ScrollTrigger `toggleActions`, zone-based, plus a `Flip.fit` GSAP timeline)** — NOT click tabs, though the pills are also real anchor links (`#intro`/`#know`/`#manage`) as a progressive-enhancement fallback.
3. **Devices** (`.cc-hp-devices`) — near-black background (continues from steps). A MacBook mockup + a landscape phone mockup overlapping it, both showing the same "manage" product video. Below: a heading that alternates between "Anytime" and "Anywhere" (auto-cycling text swap, not scroll-linked — runs on a timer/relay once the section is in view), body copy, two CTA buttons (Try for free / Book Demo), then a stats row (35% Time savings, 3-8 Months ROI) separated by a top border. **Interaction model: scroll-triggered reveal (fade in once in view) + self-looping text-swap animation** (`animateText()` recursion in `homepage.js`, not scroll-scrubbed).
4. **Types — "Your factory / Your warehouse"** (`.cc-hp-types._1`) — white background. Large heading that swaps text ("Your factory" → "Your warehouse") in lockstep with a portrait phone mockup whose background video crossfades between a factory clip and a warehouse clip, driven by scroll position across a tall (150vh) wrapper (`.hp-types_wall`). **Interaction model: scroll-scrubbed (GSAP timeline inside a ScrollTrigger with `scrub`, `start:"top top"`, `end:"bottom bottom"` on the 150vh wrapper).**
5. **Types — "In your pocket"** (`.cc-hp-types._2`, `data-types-pocket`) — continuation of the same tall wrapper; a bottom-fade gradient overlay and second heading ("In your pocket") crossfade in near the bottom of the scroll range. **Interaction model: scroll-scrubbed fade-in.**
6. **Use cases** (`#hp-cases`) — white background. "Use cases" eyebrow heading + intro paragraph, then a 3-card grid (2-up desktop, 1-up mobile) of case studies (Logistics optimization / Logistics management / Gemba in 3D) each with a square photo, heading, paragraph, and text link with chevron icon. **Interaction model: static, scroll-into-view fade only (`start:"top 80%"`, fires once, only used for GTM analytics — no visible animation difference worth reproducing beyond a subtle fade/slide-up).**
7. **Product SEO copy** (`#hp-product`) — plain long-form text block (no card, no image) restating the product value prop and the See/Know/Manage/pocket points for SEO. Same grey body-copy styling as the Use cases intro paragraph. **Interaction model: static.**
8. **Testimonials** (`#hp-testimonials`) — full-bleed black section. "Testimonials" heading, a single-slide-visible Swiper carousel (fade + cross-fade effect, autoHeight, loop) with quote + attribution, and two round prev/next arrow buttons. 3 real testimonials. **Interaction model: click-driven carousel (Swiper, fade effect, loop) — NOT autoplay, NOT scroll-driven.**
9. **Meet Michal** (`#hp-michal`) — white background, 2-column (bio+stats+links / portrait photo). Bio paragraph, two stat blocks (100k+ Followers, 25+ Years of experience), two text links (About us, Michal's LinkedIn). **Interaction model: static, fade-into-view only.**
10. **CTA — "Get in control"** (`#get-in-countrol-cta`) — white/light background, centered, narrow column. Heading, paragraph mentioning App Store/Google Play, two pill buttons (Try for free outline, Book Demo solid green). **Interaction model: static.**

Footer (`Footer.tsx`, shared, already built) follows immediately after the CTA section — not part of this page's scope.

## Z-index / stacking notes

- Header is fixed and above everything (`z-index` highest); no section content is ever meant to render above it.
- Within hero/steps, phone mockup image sits above its video mask (z-index 5 vs 2-4) — the video is masked/cropped to the phone's screen area, not the whole phone image.
- The dark→light nav color switch is already handled generically inside the shared `Header.tsx` per the site-wide contract (it watches `.u-bg-black`/`.footer`-equivalent dark sections); this page just needs correct semantic background colors/classes on its dark sections (steps, devices, testimonials) so that contract keeps working. No page-specific header logic was added.

## Responsive behavior summary (from live CSS breakpoints + manual resize checks)

- **≥992px (desktop)**: hero split 50/50 visual/content; steps phone ~26rem tall docked at bottom of pinned viewport; devices macbook+phone side-by-side overlap; types visual ~40em wide centered.
- **768–991px (tablet)**: hero remains split but narrower type scale (h1/h2/h4 drop to the "md" token tier, mostly unchanged from lg until ~767px); use-case cards remain 2-up down to `md`, single column below.
- **≤767px (mobile)**: hero stacks `column-reverse` (image on top half, text below, each 50% height instead of side-by-side); steps phone shrinks to 21rem; devices item stat cards go from 2-col to stacked; type scale drops to the "sm/xs" token tier (h1 32px, h2 26px, h4 22-23px, body 16px). Use-case/testimonial/michal grids collapse to a single column.

## Assets referenced (downloaded to `public/sites/twinzo-com-ca6666c1/root-8a5edab2/`)

Images: `hero-bg.jpg`, `phone-mockup.png`, `phone-mockup-horizontal.png`, `macbook-device.png`, `hero-5-poster.jpg`, `poster-see.jpg`, `poster-know.jpg`, `poster-manage.jpg`, `poster-factory.jpg`, `poster-warehouse.jpg`, `logo-skoda.svg`, `logo-whirlpool.svg`, `logo-benteler.svg`, `usecase-logistics-optimization.jpg`, `usecase-production-monitoring.jpg`, `usecase-order-automation.jpg`, `michal-ceo.jpg`.

Videos (mp4 only — original site also serves webm, mp4 is sufficient for the clone and universally supported): `hero-5.mp4`, `see.mp4`, `know.mp4`, `manage.mp4`, `factory.mp4`, `warehouse.mp4`.
