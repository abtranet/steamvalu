# Factory 3D interaction fix — 12 September 2026

The factory now keeps the user's orbit and zoom across telemetry updates and resizes. Only the explicit recenter, preset, reset, and equipment-focus commands reposition the camera.

## Reproduction and causes

- With the simulation running, dragging the factory changed its angle, but it returned to its starting pose on a subsequent update. `CameraRig` subscribed to the entire Fiber store and its reset effect depended on `size` object identity. Canvas configuration supplied fresh size objects during parent updates; actual window resizing also triggered that reset.
- The simulation ticks once per second. An unstable selection callback and un-memoized scene/layout propagated these updates through hundreds of meshes. The inline pipe point arrays invalidated `useMemo`, reconstructing ten tube geometries each update.
- A drag over equipment opened the inspector on release. Mesh click selection had no gesture guard. After an earlier focus command, changing selection could also reposition the camera because the old focus effect depended on `selected` with a persistently nonzero focus revision.
- The installed Drei wrapper uses `three-stdlib` controls. In that implementation, lifting one finger after a two-finger gesture sets the control state to NONE even if another finger remains down. The OrbitControls distributed with the installed Three version handles that transition and captures the pointer.
- Boolean Canvas `shadows` selects deprecated PCFSoftShadowMap. Three converts it to PCFShadowMap; subsequent configurations selected the deprecated value again. Browser logs showed the warning repeating once per second.
- There was no automatic camera rotation and no independent duplicate animation loop. Conveyor/drum `useFrame` callbacks share Fiber's loop. The Canvas did not need routine remounting to explain the camera jumps.

## Changes

| File | Change |
| --- | --- |
| `src/components/palm-oil/FactoryScene.tsx` | Memoize scene and static layout, separate motion/scenario context, stabilize renderer/camera options, explicitly select supported PCF shadows, raise camera near plane from 0.1 to 0.5 for depth precision. |
| `src/components/palm-oil/PalmOilDemo.tsx` | Stabilize selection and readiness callbacks so telemetry does not invalidate the scene. |
| `src/components/palm-oil/FactoryCamera.tsx` | Own one Three OrbitControls instance and one Fiber update subscription; bind to the canvas; preserve pose on resize; clean up listeners; run focus only for a new focus command. |
| `src/components/palm-oil/factory-controls.ts` | Clear old damping before explicit camera placement; suppress selection after drag, pinch, or cancellation, including a drag returning to its origin. |
| `tests/factory-controls.test.mjs` | Six tests using the installed controls for mouse orbit, settling, selection, pinch-to-one-finger transition, cancellation, zoom limits, presets, and projection resizing. |
| `tests/demo-regressions.test.mjs` | Add a browser regression for visible orbit surviving telemetry ticks and desktop/portrait/landscape resizing, with one persistent canvas. |
| `scripts/lib/cdp.mjs` | Add mouse drag and viewport resize support to the existing test helper. |

Fiber continues to update camera aspect/projection from its canvas size observer. It no longer resets position or target as a side effect of that observation. The initial portrait framing remains available on explicit recenter. No dependency versions were changed.

## Measurements

Temporary instrumentation sampled frame intervals and geometry identity in the live Chromium preview. It was removed before the final build.

| Steady-state sample | Before | After |
| --- | --- | --- |
| Replaced pipe geometries between samples | 10 | 0 |
| Median frame interval | about 13.3 ms | about 13.3 ms |
| Maximum interval in sampled windows | 53–55 ms | approximately 17–27 ms |
| Repeated PCFSoftShadowMap warnings | Every simulation tick | None after the fix |

These are short local development measurements, not a hardware-independent frame-rate guarantee. Rendering complexity remains approximately 1,168 draw calls / 173,436 triangles in the comparable full view. The observed improvement removes periodic reconstruction stalls rather than reducing scene detail. Compilation, hot reload, initial shader warmup, and concurrent build work are excluded from steady-state comparisons.

## Verification

- `npm run check`: ESLint, TypeScript, and production build passed.
- `npm run test`: 31 tests passed, including 11 headless Chrome browser checks. The initial sandboxed attempt could not bind a local port; the permitted run with local networking passed.
- In-app Chromium: repeated desktop and mobile-width drags, wheel zoom, release/settle, pause/resume, equipment selection/focus, all presets, recenter/reset, and scenario changes.
- Viewports checked: desktop 1100×800 and 1440×900; portrait 390×844; landscape 844×390, plus smaller desktop resize steps.
- Camera coordinates, target, and camera identity were unchanged across tested resizes; canvas backing dimensions tracked the displayed container. The persistent browser regression independently checks normalized label projections across resize and verifies the original canvas remains mounted.
- The new control tests exercise pinch zoom, continuing rotation with the remaining finger, touch cancellation/restart, and drag-back-to-origin selection suppression using synthetic pointer events and the actual installed control implementation.
- No recurring shadow warnings appeared after the change. An existing one-time `THREE.Clock` deprecation warning originates in Fiber and remains unrelated to interaction.

Physical iOS/Android devices, their GPUs, real multi-touch hardware, Safari, and Firefox were not available for testing. Portrait/landscape emulation checks layout and projection, not physical device orientation sensors or mobile browser chrome behavior.

Implementation follows the guidance on avoiding recurring geometry construction in [Fiber performance pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls) and updating damped controls within the render loop in [Three OrbitControls](https://threejs.org/docs/pages/OrbitControls.html). Installed package source was used to verify the exact versions' behavior.
