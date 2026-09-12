# Factory 3D piping — 12 September 2026

The plant's piping was rebuilt so every run is routed, supported and terminated like installed pipe. Equipment, layout, camera, labels, animation and selection are unchanged.

## What was wrong

A clash audit (ray casts from each pipe centreline against every scene mesh) on the previous scene found:

| Problem | Where |
| --- | --- |
| Pipe through equipment | Steam line through the boiler column, chimney 1, the boiler service deck and its railing; the grey sterilisation→digester line through the moving fruit on the top conveyor; the boiler flue through the column's platform railing and ladder; the gold boiler line through the column |
| Pipe through pipe | Boiler flue and gold boiler line |
| Ends in mid-air | Clarified-oil line at both ends (0.5 m short of the clarifier, and between the storage tanks); steam line over the sterilisation autoclaves |
| Unsupported spans | 27 m and 18 m steam runs, 36 m oil run, 18 m grey run, 10 m gold run — no supports anywhere |
| Unrealistic bends | Catmull-Rom splines through the corner points bulged into S-curves; diagonal runs in plan; spheres pasted at corners |

## Design rules

`src/components/palm-oil/factory-piping.ts` holds all routes in world coordinates. `FactoryPiping.tsx` renders them.

- Runs are straight pipe joined by long-radius elbows (centreline bend radius 3 × pipe radius). Routing is orthogonal. The boiler flue is the only exception: a 45° breeching.
- Every run starts and ends inside an equipment nozzle, with a flange at the shell, or on a header as a tee.
- Supports are explicit: rack shoes, T-posts, dummy-leg stanchions, rod hangers from existing steel, and cantilever brackets from frame posts or vessel shells. No span exceeds 6.2 m.
- Cross-plant services share a two-tier pipe rack along the south edge of the road (z 5.8–7.2). The rack has nine bents, longitudinal runners and two braced bays. Liquids use the lower tier; steam uses the upper tier, so branches cross at different elevations.
- Posts stand clear of the road, walkways, stairs, autoclave doors and conveyor legs. Road crossings are elevated at 7–9 m.

| Run | Route |
| --- | --- |
| `steam-main` | Boiler column → hanger under the boiler frame → rack upper tier → north across the road on T-posts → bracket on the sterilisation frame post → drop → stanchion on the service deck → steriliser column |
| `sterilizer-to-digester` | Steriliser column → four T-posts north of the conveyors → drop elbow on a dummy leg → digester side nozzle |
| `press-to-clarifier` | Digester → three T-posts → clarifier tank |
| `clarified-oil` (+ `-east-tank` tee) | Small clarifier → riser with shell bracket → T-post across the road → rack lower tier → tee and T-posts → roof nozzles of both storage tanks |
| `digester-vapour`, `clarifier-balance` | Nozzle-to-nozzle jumpers moved off the conveyor feed; the clarifier jumper gets a roof bridge support |
| `sterilizer-vent-west/east` | Autoclave top → hangers from the service deck → steriliser shell |
| `boiler-flue`, `boiler-bypass` | Rerouted clear of the column's ladder, railings and shell bands; the bypass is on a T-post |

## Performance

The rack, supports, clamps and flanges are three instanced meshes. Pipe elbows are part of each run's single tube, so the corner-sphere meshes are gone. Geometry is built once; tube and instance identities are unchanged across telemetry ticks.

| Default perspective, in-app Chromium | Before | After |
| --- | --- | --- |
| Pipe draw calls | 10 tubes + 20 corner spheres | 11 tubes + 3 instanced meshes (214 instances) |
| Scene draw calls / triangles | about 1,168 / 173,436 (earlier measurement) | 1,140 / 157,028 |
| Frame interval over 300 frames | median about 13.3 ms | median 13.3 ms, p95 14.3 ms, max 14.4 ms |

## Verification

- The clash audit after the change found no pipe-through-equipment clashes, no loose ends, and no support steel inside equipment. The only pipe–pipe contact is the intended oil tee.
- `tests/factory-piping.test.mjs` checks:
  - elbows fit their straights;
  - runs are orthogonal;
  - branches start on their header;
  - supports lie on the centreline, with no span over the limit;
  - rack shoes bear on rack beams;
  - separate runs keep 0.1 m clear.
- Views inspected: default perspective, top view, road crossing, boiler, sterilisation, clarification, storage tees, and the north side of the process line.
- `npm run check` passed (lint, typecheck, production build). `npm run test` passed all 38 tests, including the headless Chrome regressions.

Out of scope, not changed: both boiler chimneys start at y 4, about 3 m above their slab.
