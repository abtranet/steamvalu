# Blog Index Page — Behaviors

## Scroll sweep

Scrolled the full page (37 posts, ~16,500px of scroll height) slowly from top
to bottom via Chrome MCP:

- Header: no change in appearance was tested here specifically (shared
  component, already built/verified elsewhere) — the blog hero has a solid
  black background so header transparency is a non-issue for this page.
- No IntersectionObserver-driven fade-ins/stagger were observed on cards —
  all 37 cards are visible immediately with no opacity/transform transition
  as they enter the viewport (confirmed by scrolling quickly through the full
  list — no lag/pop-in effect visible, and `.collection-item`/`.image-5`
  transition property is `transition: all` with no `animation` property set,
  consistent with hover-only transitions, not scroll-triggered ones).
- No scroll-snap containers (`scroll-snap-type` not present on `.collection-list`
  or ancestors).
- No parallax layers.
- Smooth scroll: page uses the site-wide Lenis smooth scroll
  (`<link rel="stylesheet" href="/css/vendor/lenis.css">` present, `.lenis`
  class strategy already implemented by the shared `SmoothScroll` component
  in this project — no page-specific scroll behavior needed).

## Click sweep

- "Read more" button on each card: navigates to `/blog-post/<slug>` (real
  anchor tag, standard navigation, not a JS click handler / SPA transition).
- Card thumbnail image: wrapped in the same `<a>` as the post — clicking the
  image also navigates to the post.
- Card title (`<h3><a>`): navigates to the post.
- No modal, no dropdown, no accordion anywhere in the page body.
- No category pills exist to click (confirmed absent from DOM — see
  PAGE_TOPOLOGY.md).

## Hover sweep

- **"Read more" button**: background `rgb(0,0,0)` (black) → `rgb(58,252,151)`
  (`#3AFC97`, the site's brand green), text color stays legible (`rgb(0,0,0)`
  black on both states — verified via `elementFromPoint` after a real mouse
  hover: hovered computed `background-color: rgb(58, 252, 151)`,
  `color: rgb(0, 0, 0)`). Transition:
  `border-color 0.35s cubic-bezier(.215,.61,.355,1), color 0.35s cubic-bezier(.215,.61,.355,1), background-color 0.35s cubic-bezier(.075,.82,.165,1), opacity 0.35s cubic-bezier(.165,.84,.44,1)`
  — this is the generic Webflow `.button.w-button` transition recipe used
  site-wide, not a bespoke one for this page. Simplify in Tailwind to
  `transition-colors duration-300`.
- **Card title link / image**: link elements inherit the same generic
  `border-color/color/background-color/opacity 0.35s` transition recipe, but
  no visually distinct hover state (no underline, no color shift, no image
  scale) was observed when hovering the title or thumbnail directly — the
  cursor becomes a pointer only. No image zoom-on-hover effect exists on this
  page (confirmed — `.image-5` has no hover-specific rule in the stylesheet
  beyond the inherited generic `transition: all`, and no scale/transform
  change rendered).

## Responsive sweep

Verified two ways: (1) live browser resize via Chrome MCP, and (2) direct
inspection of `site.css`'s media-query blocks (`max-width:991px`,
`max-width:767px`, `max-width:479px`, and `min-width:992px`), since the
sandboxed Chrome window in this environment had a hard floor of ~800px width
and would not shrink to a true 390px viewport (confirmed via
`window.innerWidth` returning 800 after requesting 375×800 — a tooling
limitation of this session, not a site behavior). The CSS-source analysis is
authoritative and is what the component specs below are built from.

- **Desktop (≥992px)**: `.collection-list` is `display:grid;
  grid-template-columns:1fr 1fr` (2 columns), column gap 4rem (48px at this
  page's 12px root font-size). Card content is left-aligned within each
  column. Confirmed live at a 1920px-wide render (this session's effective
  desktop width): 2-column grid renders exactly as expected, screenshot
  matches golden reference.
- **Tablet (768–991px)**: confirmed live at an actual 800px-wide render —
  `matchMedia('(max-width:991px)').matches === true`, but `.collection-list`
  computed `display` was still `grid` with 2 columns (348px each) because the
  1-column collapse rule only exists inside the `max-width:767px` block, not
  `max-width:991px`. So the grid stays 2-column all the way down to 767px,
  just narrower. `.collection-item` gets `width:30rem` / centered alignment
  rules in the 991 block but these are overridden by the grid stretch
  container in practice.
  **Decision:** Tailwind's `md:` breakpoint (768px) is a reasonable place to
  keep 2 columns; below `md` we go to 1 column (a reasonable simplification
  — the source technically doesn't collapse to 1 column until 767px, and our
  `md` breakpoint is 768px, so this matches almost exactly).
- **Mobile (≤767px, and further ≤479px)**: `max-width:767px` block sets
  `.collection-list{grid-template-columns:1fr}` — single column. At
  `max-width:479px`, `.image-5{max-width:280px}` (thumbnail shrinks and is
  no longer full-width — it's centered with a fixed max-width), and
  `.div-block-8`/`.heading-5` become `text-align:center` with the content
  block capped at `max-width:80%` and centered — i.e. on the smallest phones
  the card's image and text are centered rather than left-aligned.

## Known tooling gap

A true 390px-wide live screenshot of twinzo.com/blog could not be captured in
this session (browser window would not go below ~800px). Mobile styling was
implemented from the CSS media-query source directly (see above) rather than
from a live pixel-matched screenshot at exactly 390px. This should be spot
checked against a real device/DevTools mobile emulator if pixel-exactness at
390px specifically is required beyond what's documented here.
