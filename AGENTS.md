<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Website Reverse-Engineer Template

## What This Is
A reusable template for reverse-engineering any website into a clean, modern Next.js codebase using AI coding agents. The Next.js + shadcn/ui + Tailwind v4 base is pre-scaffolded — just run `/clone-website <url1> [<url2> ...]`.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **UI:** shadcn/ui (Radix primitives, Tailwind CSS v4, `cn()` utility)
- **Icons:** Lucide React (default — will be replaced/supplemented by extracted SVGs)
- **Styling:** Tailwind CSS v4 with oklch design tokens
- **Deployment:** Vercel

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check
- `npm run check` — Run lint + typecheck + build
- `npm run test` — Regression tests (`node --test`, no extra dependencies)
- `npm run test:unit` — The source-level tests only; no browser or server needed

## Tests
`tests/` uses Node's built-in runner. `demo-view.test.mjs` is pure source
assertions. `demo-regressions.test.mjs` drives headless Chrome over CDP against
a production build (it runs `next build` and `next start` itself) and covers the
two defects from the September 2026 review: the 3D viewer's inspector covering
the control bar on phones, and "Explorer l’usine" landing on the 2D dashboard.

- `CHROME_PATH=/path/to/chrome` if Chrome is not at the macOS default.
- `TEST_BASE_URL=http://localhost:3000` to reuse a server you already started.
- `SKIP_BROWSER_TESTS=1` to run only the source-level tests.

`npm run check` deliberately does not run the browser tests — wire `npm run
test` into CI as its own step so a browser failure is distinguishable from a
build failure.

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- Tailwind utility classes, no inline styles
- 2-space indentation
- Responsive: mobile-first

## Design Principles
- **Pixel-perfect emulation** — match the target's spacing, colors, typography exactly
- **No personal aesthetic changes during emulation phase** — match 1:1 first, customize later
- **Real content** — use actual text and assets from the target site, not placeholders
- **Beauty-first** — every pixel matters

## Project Structure
```
src/
  app/              # Next.js routes
  components/       # React components
    ui/             # shadcn/ui primitives
    icons.tsx       # Extracted SVG icons as React components
  lib/
    utils.ts        # cn() utility (shadcn)
  types/            # TypeScript interfaces
  hooks/            # Custom React hooks
public/
  images/           # Downloaded images from target site
  videos/           # Downloaded videos from target site
  seo/              # Favicons, OG images, webmanifest
docs/
  research/         # Inspection output (design tokens, components, layout)
  design-references/ # Screenshots and visual references
scripts/            # Asset download scripts
```

## MOST IMPORTANT NOTES
- When launching Claude Code agent teams, ALWAYS have each teammate work in their own worktree branch and merge everyone's work at the end, resolving any merge conflicts smartly since you are basically serving the orchestrator role and have full context to our goals, work given, work achieved, and desired outcomes.
- After editing `AGENTS.md`, run `bash scripts/sync-agent-rules.sh` to regenerate platform-specific instruction files.
- After editing `.claude/skills/clone-website/SKILL.md`, run `node scripts/sync-skills.mjs` to regenerate the skill for all platforms.

@docs/research/INSPECTION_GUIDE.md
