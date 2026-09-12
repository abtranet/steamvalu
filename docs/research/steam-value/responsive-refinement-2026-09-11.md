# Responsive design refinement — 11 September 2026

Implemented in the existing Next.js project, preserving original media assets, routes, content, simulations, and animation sequences.

## Design improvements

Unified navy/cyan palette, responsive typography, content widths, spacing, buttons, borders, keyboard focus, and footer. Refined hero composition, feature cards, architecture grid, use cases, About page, resources, and calls to action. Mobile layouts now have deliberate stacking, readable text, preserved image proportions, and comfortable controls.

Improved mobile navigation with focus containment, Escape handling, focus restoration, and inactive-menu isolation. Added video visibility handling and persistent manual pause, reduced-motion fallbacks, accessible inactive carousel states, and simulation dialog focus management. Reframed the mobile 3D scene and compressor controls without changing their models or scenarios.

## Verification

- Screenshots and DOM overflow/image checks: all nine public surfaces at 375, 390, 768, 1280, and 1440 CSS pixels; 45 checks passed.
- Surfaces: /, /features, /about, /monitor-production, /blog, /demo, /demo/compressor, /demo/embed, and /demos/value-stream-twin-demo.html.
- Navigation: mobile open/close, Escape and restored focus, FR/EN switching, architecture anchor, primary links and demo destinations.
- Media and motion: play/pause, audio toggle, original hero rotation, laptop composition, tablet transition, laptop demo selector, and rollout previous/next.
- Plant demo: fault scenario, diagnostics, acknowledgement, reset, pause, 3D explorer search/selection, top view, help focus containment and Escape.
- Compressor: demand and optimized scenarios, thermal/exploded views, component selection, keyboard range adjustment, and pause.
- npm run check passed: ESLint, TypeScript, and optimized production build. All Next routes prerendered successfully.

## Limits

Browser verification used the local development server and simulated viewport sizes, not physical devices or a cross-browser matrix. OS-level reduced-motion behavior was reviewed in code, not emulated in this browser. Existing Three.js deprecation warnings remain. The build reports an unrelated parent-directory lockfile warning. No deployment was performed. Existing commercial figures and claims were retained without independent validation.

Screenshots are in ../../design-references/responsive-refinement-2026-09-11/. responsive-results.json contains the final 45 viewport checks. Screenshots may show the development-mode Next.js indicator.
