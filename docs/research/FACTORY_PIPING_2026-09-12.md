# Factory 3D piping — 12 September 2026

The plant has a single process pipe: the steam line from the boiler to the steriliser. It is routed, supported and terminated like installed pipe. Equipment, layout, camera, labels, animation and selection are unchanged.

## What was wrong

A clash audit (ray casts from each pipe centreline against every scene mesh) found problems in the previous scene:

- **Pipe through equipment:**
  - steam line through the boiler column, chimney 1, the boiler service deck and its railing;
  - grey line through the moving fruit on the conveyor;
  - boiler flue through the column's railing and ladder.
- **Pipe through pipe:** two boiler pipes crossed each other.
- **Ends in mid-air:** the oil line at both ends, and the steam line over the autoclaves.
- **No supports:** runs of up to 36 m had none.
- **Bad bends:** Catmull-Rom splines bulged into S-curves, with diagonal runs in plan and spheres pasted at corners.

A first rebuild kept all ten pipes on a two-tier pipe rack. It was reduced to one pipe to keep the scene legible.

## The steam line

`src/components/palm-oil/factory-piping.ts` holds the route in world coordinates; `FactoryPiping.tsx` renders it.

**Route:**
1. Leaves the boiler column facing the road, at 9 m.
2. Passes under the boiler frame beam, on a rod hanger.
3. Runs west along the south edge of the road on T-posts.
4. Turns north and crosses the road at 9 m.
5. Passes a T-post on the sterilisation slab.
6. Runs past a cantilever bracket on the sterilisation frame post.
7. Drops 1.5 m to pass between the column's platform railings.
8. Crosses a stanchion on the service deck.
9. Enters the steriliser column through a flange.

**Rules:**
- Straight pipe with long-radius elbows: centreline bend radius 3 × pipe radius.
- Orthogonal routing.
- Constant diameter.
- A flange at each nozzle.
- No span longer than 6.2 m.
- Supports stand clear of the road, stairs, autoclave doors and conveyor legs.

**Rendering:** support steel, clamps and flanges are drawn as three instanced meshes. The tube and its instances are built once and never rebuilt during simulation ticks.

## Verification

- `tests/factory-piping.test.mjs` checks:
  - elbows fit their straights;
  - the run is orthogonal;
  - supports lie on the centreline and no span exceeds the limit;
  - route integrity, and clearance between runs if more are added.
- The ten-pipe version passed the in-browser clash audit with no clashes, loose ends or support steel inside equipment. The steam line kept the same geometry when the other runs were removed; its rack shoes were replaced by T-posts on open ground.

Out of scope, not changed: both boiler chimneys start at y 4, about 3 m above their slab.
