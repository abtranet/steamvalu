# Hero iPhone scroll transition

## Target

- Component: `src/components/sites/steam-value/root-8a5edab2/Hero.tsx`
- Reference: `https://www.the reference site/`
- Reference viewport: 1280 × 720

## Observed reference behavior

- The hero occupies two viewport heights on desktop and keeps its visible frame fixed while the page advances through the first viewport of scroll.
- The left visual panel expands from 50% to 100% of the viewport width.
- The portrait phone rotates continuously from `0deg` to `-90deg` and translates `40px` upward.
- The right-hand copy fades and moves downward as the visual panel covers it.
- The transition is scrubbed: reversing the scroll reverses the animation at the same rate.
- At the measured desktop viewport, the phone begins near `x: 213, y: 135, w: 222, h: 451` and finishes near `x: 415, y: 209, w: 451, h: 222`.
- The reference transform settles at `matrix(0, -1, 1, 0, 0, -40)`.

## Local implementation contract

- Use a `300dvh` desktop wrapper and a `100dvh` sticky inner frame. This reproduces Reference site's measured two-viewport sticky range followed by one viewport of natural exit.
- Animate only at `min-width: 1024px` and when reduced motion is not requested.
- Drive one GSAP timeline with `ScrollTrigger`, from `top top` to `bottom bottom`, using `scrub: 1`.
- During the first quarter of the sticky range (about `0.5 × viewport height`), animate the visual panel width from `50%` to `100%`, the phone to `rotation: -90` and `y: -40`, and the introductory content to `opacity: 0` and `yPercent: 20`.
- Only after the phone reaches `-90deg`, fade in the reference overlay while retaining the industrial background.
- Overlay four numbered stages sourced from the existing page document: `Observer`, `Contextualiser`, `Composer`, and `Agir`.
- Keep the horizontal phone centered between the stage navigation and the active stage description, followed by the `Toute la plateforme` link.
- Advance the active stage from the remaining scroll progress; inactive stages use reduced opacity while the active stage uses the brand green badge and white text.
- Do not manually translate the hero phone downward. Reference site's live DOM shows the sticky hero/steps layer leaving upward while the following device composition rises from below.
- At a 1082 × 857 viewport, the sticky layer releases near `scrollY: 1722`; at `scrollY: 2250`, its description is near `y: 49` while the following desktop composition has risen to approximately `y: 369`.
- Position the workflow copy block at approximately `67.3%` of the sticky viewport (`y: 577` at 857px tall and `y: 485` at 720px tall), so its natural upward exit follows Reference site's measured path.
- Preserve the industrial background throughout the sticky portion. The following device section may cover it naturally as that section enters the viewport.
- Do not render the old standalone black `StepsSection` after the hero; the overlay replaces that duplicate experience.
- Preserve the current stacked, non-animated mobile and tablet layout.
- Reuse the existing phone mockup and industrial hero imagery; no new assets are required.

## Verification

- Confirm the phone transform changes at the beginning, midpoint, and end of the first viewport of scroll.
- Confirm the overlay remains hidden before the phone reaches `-90deg` and becomes visible afterward.
- Confirm all four active labels and document-derived descriptions appear as the remaining sticky range is scrolled.
- Confirm the full sticky layer exits upward after the last workflow state and the device composition rises from below without a discontinuous jump.
- Confirm scrolling back to the top restores the portrait state.
- Confirm the browser console has no runtime errors.
- Run TypeScript, targeted ESLint, and a production build.
