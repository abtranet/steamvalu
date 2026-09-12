# Output Plan — the reference site clone

app-root: `.` (repo root, single Next.js app, single origin)
site-key: `reference-site`
Tech notes: Webflow-built site. Fonts: Inter Variable. Smooth scroll: Lenis (`.lenis` class on `<html>`). Carousels: Swiper. Accent color: `#3AFC97` (rgb(58,252,151)). Header bg: transparent/white. Footer bg: black, white text.

| Source URL | page-key | Route | Research | Screenshots | Components | Assets |
|---|---|---|---|---|---|---|
| https://www.the reference site/ | root-8a5edab2 | src/app/page.tsx | docs/research/reference-site/root-8a5edab2/ | docs/design-references/reference-site/root-8a5edab2/ | src/components/sites/reference-site/root-8a5edab2/ | public/sites/reference-site/root-8a5edab2/ |
| https://www.the reference site/monitor-production | monitor-production-af1f7c13 | src/app/monitor-production/page.tsx | .../monitor-production-af1f7c13/ | .../monitor-production-af1f7c13/ | .../monitor-production-af1f7c13/ | .../monitor-production-af1f7c13/ |
| https://www.the reference site/about | about-979bddc4 | src/app/about/page.tsx | .../about-979bddc4/ | .../about-979bddc4/ | .../about-979bddc4/ | .../about-979bddc4/ |
| https://www.the reference site/features | features-de335934 | src/app/features/page.tsx | .../features-de335934/ | .../features-de335934/ | .../features-de335934/ | .../features-de335934/ |
| https://www.the reference site/blog | blog-8caafe43 | src/app/blog/page.tsx | .../blog-8caafe43/ | .../blog-8caafe43/ | .../blog-8caafe43/ | .../blog-8caafe43/ |

Shared (same-site, used by every page):
- Components: `src/components/sites/reference-site/shared/` — `Header.tsx`, `Footer.tsx`, `ContactModal.tsx`, `icons.tsx`
- Assets: `public/sites/reference-site/shared/`
- Research: `docs/research/reference-site/shared/` — `HEADER.spec.md`, `FOOTER.spec.md`

Routing: `/` replaces the untouched scaffold `src/app/page.tsx` (first clone in a fresh template). All other routes are new nested `page.tsx` files — no existing routes to preserve besides root.

Foundation (done sequentially by orchestrator, not delegated):
- `src/app/layout.tsx` — Inter Variable font via `next/font/google`, global metadata
- `src/app/globals.css` — brand color tokens (`--brand: #3afc97`, `--brand-foreground: #000`), foreground pure black
- Shared Header/Footer/icons/ContactModal components
- Lenis smooth scroll wired at layout level

Page builds: dispatched as 5 parallel agents in isolated git worktrees, each following the extract → spec → build → verify cycle for their page's main content (excluding header/footer, which they import from shared). Orchestrator merges each worktree sequentially and runs `npm run build` after each merge.

Scope: pixel-perfect visual/structural clone of what's visible at each URL. Out of scope: real backend for forms (`/api/leads`), auth, blog post detail pages (blog index only, per URL given), CMS-dynamic mega-menu content beyond what's listed here (static content mirrors current live site).
