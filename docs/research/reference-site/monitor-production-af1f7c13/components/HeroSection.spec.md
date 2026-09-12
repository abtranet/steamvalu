# HeroSection Specification

## Overview
- **Target file:** `src/components/sites/reference-site/monitor-production-af1f7c13/HeroSection.tsx`
- **Screenshot:** `docs/design-references/reference-site/monitor-production-af1f7c13/desktop-01-hero.jpg`, `desktop-02-hero-visual-problem.jpg`
- **Interaction model:** static (see BEHAVIORS.md — no scroll/click/hover-driven state; `js-scrollflip-element` markup on the source site is dead/unused on this page)

## DOM Structure
```
<section> (black rounded card, overflow visible so visual can spill below)
  <div class="container"> (max-width 1132px, centered)
    <div> (hero inner, centered column, max-width none but text visually capped ~576px for label/H1/paragraph — matches container ~1132 for stat row)
      eyebrow: "Use case" (paragraph-18, grey)
      h1: "Gemba, in 3D"
      p: intro paragraph (paragraph-24)
      ul: 3 stat items, each { h2 title, p label }
      visual: phone mockup image + embedded YouTube iframe (masked into rounded phone screen), absolutely stacked
    </div>
  </div>
  bg: absolutely-positioned black rounded rect behind everything, ends 170px above section bottom (creates the "peek" overlap for the visual)
</section>
```

## Computed Styles (exact values from getComputedStyle, live Chrome @ 1440px)

### Section
- paddingTop: 220px
- paddingBottom: 170px
- position: relative (bg is absolutely positioned inside)

### Container
- maxWidth: 1132px
- margin: 0 auto
- paddingLeft/Right: 0

### Hero bg (black card)
- backgroundColor: rgb(0, 0, 0) → `bg-black`
- borderRadius: 24px
- position: absolute; inset: 0 0 170px 0 (top:0, left:0, right:0, bottom:170px)
- z-index: 1 (behind text content, which sits at z-index 2, and behind/around the visual)

### Eyebrow ("Use case")
- fontSize: 18px, fontWeight: 400, color: rgb(77,77,77) (`text-neutral-500`/`text-white/50`-ish — use `text-white/40`), lineHeight: ~22px, letterSpacing: -0.72px

### H1 ("Gemba, in 3D")
- fontSize: 56px, fontWeight: 700, color: rgb(255,255,255) → white, lineHeight: 67.2px (1.2), letterSpacing: -2.24px (-0.04em), fontFamily: "Inter Variable", sans-serif

### Intro paragraph
- fontSize: 24px, fontWeight: 400, color: white, lineHeight: 30px (1.25)
- Text is centered, roughly capped to a comfortable reading width (~700-750px) — implement with `max-w-3xl mx-auto text-center`

### Stat row (`cs_hero-list`)
- display: flex, flexDirection: row, gap: 40px (`gap-10`)
- Each item centered column: number (h2, fontSize 36px, fontWeight 700, color white) + label (paragraph-18, fontSize 18px, color rgb(128,128,128) → `text-white/50`)
- Row wraps to `flex-col` at ≤767px (site.css: `.cs_hero-list{flex-flow:column}`)

### Bottom wrap (stats + visual)
- display: flex, flexDirection: column, alignItems: center, gap: 56px (`gap-14`)

### Visual (phone mockup)
- `.cs-hero_visual`: width/maxWidth 670px, marginBottom: -160px (pulls the visual down so it visually overlaps the next white section)
- Contains (stacked, all `position: absolute; inset: 0`):
  1. `<img>` phone-mockup-horizontal.png (device frame PNG with transparent screen cutout), z-index 3, drawn on top
  2. video mask div (`hp-steps_video-mask`): `position: absolute; inset: 1.5%; border-radius: 9%; overflow: hidden; background: black; z-index: 2` — clips the video to the phone's screen area, sitting just under the frame image
  3. Inside the mask: a `<div class="hp-steps_phone-yt">` (`width: 89%; height: 180%` on desktop, `200%` at ≤767px, absolutely centered) wrapping a full-bleed `<iframe>` YouTube embed
- `.hp-steps_visual` aspect-ratio: 1136/560 (~2.03:1)

## States & Behaviors
- N/A — fully static section. No hover states on hero text/visual. No entrance animation (content is server-rendered at full opacity).

## Assets
- `public/sites/reference-site/monitor-production-af1f7c13/images/phone-mockup-horizontal.png` (1819×897 PNG, device frame with transparent screen)
- Video: YouTube embed, ID `ncxY4i55CME`, params: `autoplay=1&controls=0&fs=0&modestbranding=1&mute=1&rel=0&iv_load_policy=3&loop=1&playlist=ncxY4i55CME` (loop requires `playlist` param set to the same video ID per YouTube API quirk) — embed exactly as an `<iframe>` with `allow="autoplay; encrypted-media"` and `playsInline`.

## Text Content (verbatim)
- Eyebrow: "Use case"
- H1: "Gemba, in 3D"
- Paragraph: "Digital GEMBA 24/7 in your pocket. Organize your teams around interactive TV screens or evaluate latest notifications with ease in digital twin."
- Stat 1: "€10K" / "totally invested"
- Stat 2: "2 wk." / "implementation process"
- Stat 3: "20%" / "shorter breakdowns"
- Image alt: "reference site logistics analytics on a phone"

## Responsive Behavior
- **Desktop (1440px):** as described above — row stat layout, 670px-wide visual overlapping -160px into next section.
- **Tablet (768px):** stat row likely still fits in a row (no rule found targeting 768-991 specifically beyond the 991 stats-item width rule which applies to the *grey stats* section, not this hero list) — keep `flex-row` down to `md:` and only stack at the mobile breakpoint per source CSS (`767px`).
- **Mobile (390px):** `.cs_hero-list{flex-flow:column}` — stats stack vertically, each full width, centered. `.cs-hero_visual{margin-bottom:-20vw}` and `.cs-hero_bg{bottom:20vw}` — overlap becomes viewport-relative (use `-mb-[20vw]` and bg `bottom-[20vw]` under `max-sm:`/`sm:hidden` responsive utilities, or approximate with fixed Tailwind `-mb-32` at `max-sm` since 20vw at 390px ≈ 78px, reasonably close to fixed values already used elsewhere — implement literally as `-20vw`/`20vw` via arbitrary values for exactness).
- **Breakpoint:** stat-row stack at 767px; visual overlap formula switches from fixed px to vw-based at 767px.
