# Blog Index Page — Topology

Source: https://www.the reference site/blog
site-key: `reference-site` · page-key: `blog-8caafe43`
Route: `src/app/blog/page.tsx`

## Rendering model

This is a Webflow CMS Collection List page. `curl`-fetched HTML confirms the
page is **fully server-rendered** — all 37 blog posts are present in the raw
HTML inside `.collection-list.w-dyn-items` on first load. There is:

- **No pagination** (`.w-pagination-wrapper` absent)
- **No "Load more" button** (verified: no button/link anywhere on the page
  contains "load more" text)
- **No category filter pills / tag UI** (no `.w-tab`, no filter buttons, no
  `category`/`tag`/`filter`/`pill` classes anywhere in the DOM)
- **No search input** on this page

So the entire page is static content, no client interactivity beyond the
global header/footer (already built) and standard link hovers.

## Sections top to bottom

1. **Fixed global Header** (already built, shared, not part of this page) —
   overlays the top of the hero since header is `position:fixed`, transparent,
   108px tall.

2. **BlogHero** — full-bleed-ish rounded black card containing:
   - Eyebrow label "Blog"
   - Gradient H1 title
   - Gradient H2 subhead paragraph
   - Interaction model: **static** (no scroll/click behavior, no animation
     observed — text is present at full opacity on load, no fade-in delay
     detected in a slow scroll pass)

3. **BlogPostGrid** — white section directly below the hero, containing:
   - A CSS grid of all 37 post cards, 2 columns desktop (≥768px in our
     Tailwind mapping; source breakpoint is `min-width:992px` for the true
     Webflow grid, collapsing to 1 column below that), 1 column tablet/mobile.
   - Each card: thumbnail image (16:10, rounded, object-cover), title (link),
     excerpt paragraph (full text, no line-clamp/truncation was found —
     `-webkit-line-clamp` was not set on `.preview-text`), release date, and a
     black pill "Read more" button linking to the same post.
   - The white section overlaps the hero's bottom rounded corners via a
     negative top margin (`margin-top:-145px` in the source at desktop),
     producing the layered look where the black hero's rounded bottom corners
     sit visually on top of the white content section.
   - Interaction model: **static list** + **hover-driven** micro-interactions
     on each card's "Read more" button (background flips from black to the
     brand green `#3AFC97` with black text, 0.35s ease transition — this is
     the same generic `.button.w-button` hover pattern used site-wide).

4. **Fixed global Footer** (already built, shared, not part of this page).

## Layout / stacking

- No sticky/pinned elements within the page body itself (header is the only
  fixed element, and it's part of the shared layout, not this page).
- No z-index layering concerns beyond the header sitting above the hero
  (header is transparent so the hero's black background shows through/behind
  it — this is already handled by the shared `Header` component).
- No scroll-snap, no parallax, no GSAP ScrollTrigger pinning was observed
  anywhere on this page (appropriate for a simple card-grid listing page, as
  anticipated in the task brief).

## Content dependency

- Card grid content: real posts scraped from the live site's server-rendered
  HTML (37 posts, from "On-Premise reference site on an Air-Gapped Plant Network"
  dated August 30, 2026 down to "Pushing the Boundaries" dated May 3, 2024).
  All 37 thumbnail images were downloaded into
  `public/sites/reference-site/blog-8caafe43/images/`.
- Post links point to `/blog-post/<slug>` on the live site. Per the parent
  task's explicit scope, this clone does NOT build the `/blog-post/[slug]`
  detail route — cards link to the equivalent local path
  `/blog/<slug>` is NOT used (would imply a route we don't own); instead we
  preserve the semantic reference by linking to `https://www.the reference site` +
  the original path is avoided too (out of scope pages must not fabricate a
  working destination). Decision: cards render as non-navigating placeholders
  pointing to `#` is poor UX; instead each card links to
  `/blog-post/<slug>` as a same-origin path (matching the source site's own
  URL structure) so the link markup is realistic even though that route isn't
  built in this project — this mirrors how the source site itself structures
  its URLs and keeps the component reusable if the detail page is added
  later.
