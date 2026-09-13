# Component: HeroSteps (Hero + Steps combined pinned scroll section)

Covers sections 1 and 2 from PAGE_TOPOLOGY.md. Built as one component because they share one continuous GSAP ScrollTrigger system (see BEHAVIORS.md).

## Real content

**Hero:**
- H1 (rendered as `.h4` class, 32px/700/lh 1.18/-0.04em tracking): "Cut 1/5 of your forklift fleet in 6 months, learn how"
- Subcopy (18px/400/lh 1.22/-0.04em, black): "See forklift utilization in a live 3D digital twin so you can cut 1/5 of your fleet in 6 months."
- CTA: pill button "Download FREE whitepaper", href `/get-whitepaper` (route doesn't exist in this clone's scope — link to `#` or `/get-whitepaper` as a dead link is acceptable; do not fabricate a page). Style: `bg-brand text-brand-foreground`, `border-radius:100px`, padding `16px 24px`, font 15px/500.
- Logos row label: "Empowering" (15px, opacity .3, white on the photo)
- Logos: Skoda, Whirlpool, Benteler (svg files downloaded), each `height: 3.2rem` (32px) desktop / `2.4rem` (24px) mobile, `object-fit: contain`.
- Background: `hero-bg.jpg` (2880×1768 photo of pipes/warehouse), rendered at `opacity: .5` over black.
- Phone mockup: `phone-mockup.png` (896×1818, portrait notch phone frame), containing a looping cropped video (`hero-5.mp4`, poster `hero-5-poster.jpg`) masked into the screen area (`border-radius: 9%`, inset `2%`).

**Steps:**
- 3 pills: "See" / "Know" / "Manage", each with a circular numbered badge (1/2/3, green bg `#3AFC97`, black text, 24px circle) + label text (32px/500, gradient/white, `opacity:.2` default, `1` on active, hover `.6`).
- Landscape phone mockup: `phone-mockup-horizontal.png` (1819×897) containing 3 stacked videos (`see.mp4`/poster `poster-see.jpg`, `know.mp4`/poster `poster-know.jpg`, `manage.mp4`/poster `poster-manage.jpg`), only the active one visible.
- Paragraph per step (18px effectively rendered ~24-32px style `.cc-step-text`, white/grey-gradient text, max-width 72rem, centered):
  - See: "Industry 4.0 in its essence. 24/7, all your data, available on any device, is visible under one roof. And in 3D. Smart manufacturing, data about logistics, production, quality, energy consumption, or environment."
  - Know: "Seeing is knowing. A real-time spatially oriented dataset within a digital twin software shows your data in a new, previously unknown context. You don't need to combine different data sources in an Excel table."
  - Manage: "Recognize risks in time. twinzo's digital twin notification system lets you know about the coming dangers. Just set the parameter thresholds or special zones for your material ordering processes and act without delay."
- Link below paragraph: "All features" + chevron-right icon, href `/features`.

## Colors / tokens

- Steps/hero-dark background: `#000000` (pure black, `bg-black`).
- Green accent: `--brand` (`#3AFC97`) already in globals.css — use `bg-brand`/`text-brand-foreground`.
- Pill button dark-on-light (hero CTA on photo): white bg, black text — this is the ONE button on the page that is NOT the brand green (site note confirms). Use `bg-white text-black rounded-full`.
- Step paragraph text color: white at ~90% (use `text-white/90` or `text-neutral-200`).
- Step number badge: black text on `bg-brand` circle, 24px diameter.

## Layout (desktop ≥1024px)

- Full-bleed section, `min-height: 100vh`, this is the PINNED scroll area — implement as `<section style={{height: '400vh'}}>` wrapper with an inner `sticky top-0 h-screen` viewport, matching the "tall wrapper + pin" pattern from BEHAVIORS.md.
- Hero phase (first ~25% of the 400vh): visual box (bg photo + phone) occupies left 50%, content (heading/subcopy/CTA/logos) occupies right 50%, vertically centered.
- Steps phase (remaining ~75%): background goes solid black, pills centered at top, landscape phone centered (`max-width ~560px`), paragraph + "All features" link below.
- Container max-width: 1132px, horizontal padding 40px (desktop).

## Layout (mobile <768px)

- Hero: stacks vertically — image half on top (`height:50%`), content half below (`height:50%`), each full width. Phone mockup shrinks to `21rem` height equivalent (use responsive `w-[70vw] max-w-[280px]`).
- Steps: pills wrap/center, phone shrinks to fit width minus padding, paragraph text left at a smaller size (16-18px).
- Given scroll-hijack pinning is disorienting and fragile on mobile viewports/touch scroll, and the ORIGINAL site itself disables the desktop scrub on mobile for step00 and uses simpler `toggleActions` triggers everywhere else — implement the mobile variant WITHOUT GSAP pinning: render hero and the 3 steps as normal stacked-in-flow content, with each step's video simply auto-cycling on a timer OR revealing on scroll-into-view (IntersectionObserver), not scroll-scrubbed. This matches the spirit (real content, real videos, step badges) without fighting mobile scroll physics.

## Interaction model

**Desktop (≥1024px): scroll-driven, GSAP + ScrollTrigger, pinned.** Implement with:
- A `useRef` tall wrapper + `gsap.registerPlugin(ScrollTrigger)` in a `useEffect` (client component, `"use client"`).
- One `ScrollTrigger` with `pin: true`, `scrub: 1`, `start: 'top top'`, `end: 'bottom bottom'` on the wrapper.
- Progress-driven state machine (0→1 progress mapped to phases: 0-0.2 hero, 0.2-0.4 See, 0.4-0.7 Know, 0.7-1.0 Manage) updating React state for which step is active + crossfading videos/text via CSS opacity transitions (do not need GSAP for the crossfade itself, just for reading scroll progress).
- Clean up ScrollTrigger instance on unmount (`.kill()`).

**Mobile (<1024px): scroll-into-view reveal (IntersectionObserver), no pin.** Each step section fades/slides in once ~30% visible; active video per step is simply the one whose step is currently in view.

## Videos (autoplay, loop, muted, playsInline — required for mobile autoplay)

- Hero: `/sites/steamvalu/root-8a5edab2/videos/hero-5.mp4`, poster `/sites/steamvalu/root-8a5edab2/images/hero-5-poster.jpg`
- See: `.../videos/see.mp4`, poster `.../images/poster-see.jpg`
- Know: `.../videos/know.mp4`, poster `.../images/poster-know.jpg`
- Manage: `.../videos/manage.mp4`, poster `.../images/poster-manage.jpg`

## Images

- `/sites/steamvalu/root-8a5edab2/images/hero-bg.jpg`
- `/sites/steamvalu/root-8a5edab2/images/phone-mockup.png` (portrait)
- `/sites/steamvalu/root-8a5edab2/images/phone-mockup-horizontal.png` (landscape)
- `/sites/steamvalu/root-8a5edab2/images/logo-skoda.svg`, `logo-whirlpool.svg`, `logo-benteler.svg`
