import type { StageId } from "./process";

/**
 * Piping layout for the 3D plant, in world coordinates (metres, y up).
 *
 * Runs are polylines of straight pipe joined by long-radius elbows. Every run
 * starts and ends inside an equipment nozzle or on another run (a tee), and
 * carries explicit supports so no span exceeds MAX_SUPPORT_SPAN. Cross-plant
 * services share a two-tier pipe rack along the south edge of the site road.
 */

export type Vec3 = [number, number, number];

export type PipeSupport =
  /** Rests on steel directly below (rack beam). */
  | { kind: "shoe"; at: Vec3 }
  /** Column from `base` with a cross-arm under the pipe. */
  | { kind: "tpost"; at: Vec3; base: number }
  /** Column from `base` straight to the pipe shoe (dummy leg). */
  | { kind: "stanchion"; at: Vec3; base: number }
  /** Rod hanger from steel whose underside is at `top`. */
  | { kind: "hanger"; at: Vec3; top: number }
  /** Cantilever arm from a column or vessel face at `anchor`. */
  | { kind: "bracket"; at: Vec3; anchor: Vec3 };

export type PipeRoute = {
  id: string;
  service: string;
  /** Selecting the pipe selects this process stage. */
  stage?: StageId;
  /** The run starts on this run's centreline (a tee). */
  branchOf?: string;
  radius: number;
  color: string;
  points: Vec3[];
  /** Flange positions as distances along the run; negative values count back from the end. */
  flanges: number[];
  supports: PipeSupport[];
};

export type SteelMember = { from: Vec3; to: Vec3; size: number };

export type PipePath = { positions: Vec3[]; tangents: Vec3[]; distances: number[]; length: number };

/** Long-radius elbows: centreline bend radius of 1.5 × diameter. */
export const BEND_RADIUS_FACTOR = 3;
/** Largest distance along any run between consecutive supports or nozzles. */
export const MAX_SUPPORT_SPAN = 6.2;
export const SHOE_HEIGHT = 0.095;

export const PIPE_RACK = {
  bents: [-21.6, -15.8, -10, -4, 2, 8, 14, 19.5, 24.8],
  postZ: [5.8, 7.2],
  /** Beam centreline heights: lower tier (process liquids), upper tier (steam). */
  tiers: [6.6, 8.6],
  beamDepth: 0.25,
  bracedBays: [[-15.8, -10], [-4, 2]],
} as const;

const STEAM_RADIUS = 0.18;
const OIL_RADIUS = 0.2;
/** Centreline heights of pipes bearing on rack shoes. */
const STEAM_Y = PIPE_RACK.tiers[1] + PIPE_RACK.beamDepth / 2 + SHOE_HEIGHT + STEAM_RADIUS;
const OIL_Y = PIPE_RACK.tiers[0] + PIPE_RACK.beamDepth / 2 + SHOE_HEIGHT + OIL_RADIUS;
const STEAM_Z = 6.1;
const OIL_Z = 6.9;

const rackShoes = (xs: number[], y: number, z: number): PipeSupport[] => xs.map(x => ({ kind: "shoe", at: [x, y, z] }));
const tposts = (points: Vec3[], base: number): PipeSupport[] => points.map(at => ({ kind: "tpost", at, base }));

export const PIPE_ROUTES: PipeRoute[] = [
  {
    id: "steam-main",
    service: "Vapeur chaudière → stérilisation",
    radius: STEAM_RADIUS,
    color: "#abc5cf",
    points: [[12.6, STEAM_Y, 11.2], [12.6, STEAM_Y, STEAM_Z], [-21.3, STEAM_Y, STEAM_Z], [-21.3, STEAM_Y, -11.4], [-21.3, 7.5, -11.4], [-18.5, 7.5, -11.4]],
    flanges: [0.25, -0.25],
    supports: [
      { kind: "hanger", at: [12.6, STEAM_Y, 9.75], top: 9.315 },
      { kind: "shoe", at: [12.6, STEAM_Y, 7.2] },
      ...rackShoes([8, 2, -4, -10, -15.8], STEAM_Y, STEAM_Z),
      { kind: "shoe", at: [-21.24, STEAM_Y, 5.8] },
      ...tposts([[-21.3, STEAM_Y, 0.3]], 0),
      ...tposts([[-21.3, STEAM_Y, -5]], 0.7),
      { kind: "bracket", at: [-21.3, STEAM_Y, -9.3], anchor: [-20.54, STEAM_Y, -9.3] },
      { kind: "stanchion", at: [-19.9, 7.5, -11.4], base: 5.14 },
    ],
  },
  {
    id: "sterilizer-to-digester",
    service: "Stérilisation → digesteurs",
    radius: 0.34,
    color: "#c1c6c7",
    points: [[-15.5, 7.4, -11.4], [3, 7.4, -11.4], [3, 4.6, -11.4], [3, 4.6, -9.3]],
    flanges: [0.25, -0.2],
    supports: [
      ...tposts([[-11.6, 7.4, -11.4], [-7, 7.4, -11.4], [-2.4, 7.4, -11.4]], 0),
      ...tposts([[1.8, 7.4, -11.4]], 0.76),
      { kind: "stanchion", at: [3, 4.6, -10.1], base: 0.76 },
    ],
  },
  {
    id: "press-to-clarifier",
    service: "Huile brute → clarification",
    radius: 0.25,
    color: "#b78b43",
    points: [[8.3, 3.6, -8], [14, 3.6, -8], [14, 3.6, -10], [19.3, 3.6, -10]],
    flanges: [0.2, -0.3],
    supports: tposts([[11.3, 3.6, -8], [14, 3.6, -9], [17, 3.6, -10]], 0),
  },
  {
    id: "clarified-oil",
    service: "Huile clarifiée → stockage",
    radius: OIL_RADIUS,
    color: "#c59845",
    points: [[24, 1.8, -4.7], [24, 1.8, -3.4], [24, OIL_Y, -3.4], [24, OIL_Y, OIL_Z], [-12, OIL_Y, OIL_Z], [-12, OIL_Y, 9], [-16, OIL_Y, 9], [-16, OIL_Y, 11], [-16, 5.8, 11]],
    flanges: [0.2, -0.2],
    supports: [
      { kind: "stanchion", at: [24, 1.8, -4.2], base: 0.8 },
      { kind: "bracket", at: [24, 4.4, -3.4], anchor: [24, 4.4, -4.5] },
      ...tposts([[24, OIL_Y, 0]], 0),
      { kind: "shoe", at: [24, OIL_Y, 5.8] },
      ...rackShoes([19.5, 14, 8, 2, -4, -10], OIL_Y, OIL_Z),
      ...tposts([[-12, OIL_Y, 8], [-14, OIL_Y, 9]], 0),
    ],
  },
  {
    id: "clarified-oil-east-tank",
    service: "Huile clarifiée → cuve est",
    branchOf: "clarified-oil",
    radius: OIL_RADIUS,
    color: "#c59845",
    points: [[-12, OIL_Y, 8], [-8, OIL_Y, 8], [-8, OIL_Y, 11], [-8, 5.8, 11]],
    flanges: [0.35, -0.2],
    supports: tposts([[-9, OIL_Y, 8]], 0),
  },
  {
    id: "digester-vapour",
    service: "Équilibrage vapeur digesteurs",
    stage: "pressing",
    radius: 0.22,
    color: "#b8bec0",
    points: [[3, 5.9, -9.15], [3, 7, -9.15], [7, 7, -9.15], [7, 5.9, -9.15]],
    flanges: [0.12, -0.12],
    supports: [],
  },
  {
    id: "clarifier-balance",
    service: "Équilibrage clarificateurs",
    stage: "clarification",
    radius: 0.25,
    color: "#b8bec0",
    points: [[21, 7.9, -10], [21, 9.2, -10], [27, 9.2, -10], [27, 7.9, -10]],
    flanges: [0.12, -0.12],
    supports: [{ kind: "stanchion", at: [24, 9.2, -10], base: 8.2 }],
  },
  {
    id: "sterilizer-vent-west",
    service: "Évent autoclave ouest",
    stage: "sterilization",
    radius: 0.2,
    color: "#b8bec0",
    points: [[-19.3, 3.45, -9.2], [-19.3, 4.3, -9.2], [-19.3, 4.3, -10.4], [-18.2, 4.3, -10.4]],
    flanges: [0.15, -0.24],
    supports: [{ kind: "hanger", at: [-18.62, 4.3, -10.4], top: 4.96 }],
  },
  {
    id: "sterilizer-vent-east",
    service: "Évent autoclave est",
    stage: "sterilization",
    radius: 0.2,
    color: "#b8bec0",
    points: [[-14.7, 3.45, -9.2], [-14.7, 4.3, -9.2], [-14.7, 4.3, -10.4], [-15.8, 4.3, -10.4]],
    flanges: [0.15, -0.24],
    supports: [{ kind: "hanger", at: [-15.38, 4.3, -10.4], top: 4.96 }],
  },
  {
    id: "boiler-flue",
    service: "Carneau chaudière → cheminée",
    stage: "boiler",
    radius: 0.38,
    color: "#bdc3c4",
    points: [[13.2, 13.4, 11.6], [13.8, 13.4, 11], [16.6, 13.4, 11]],
    flanges: [0.4, -0.243],
    supports: [],
  },
  {
    id: "boiler-bypass",
    service: "Dérivation fumées",
    stage: "boiler",
    radius: 0.24,
    color: "#c38636",
    points: [[11, 8.2, 10.6], [11, 8.2, 9.1], [17, 8.2, 9.1], [17, 8.2, 10.6]],
    flanges: [0.7, -0.33],
    supports: tposts([[14, 8.2, 9.1]], 0.84),
  },
];

/** Extra steel added for piping: a roof bridge between the clarifier tanks. */
export const PIPE_STEEL: SteelMember[] = [
  { from: [22.3, 8.1, -10], to: [25.7, 8.1, -10], size: 0.22 },
];

const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const scale = (a: Vec3, k: number): Vec3 => [a[0] * k, a[1] * k, a[2] * k];
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const size = (a: Vec3) => Math.sqrt(dot(a, a));
const unit = (a: Vec3): Vec3 => scale(a, 1 / (size(a) || 1));
const clampUnit = (value: number) => Math.min(1, Math.max(-1, value));

/** Length of straight pipe each corner's elbow consumes on both adjacent segments. */
export function elbowTangents(points: Vec3[], radius: number): number[] {
  const bend = radius * BEND_RADIUS_FACTOR;
  return points.map((point, index) => {
    if (index === 0 || index === points.length - 1) return 0;
    const angle = Math.acos(clampUnit(dot(unit(sub(point, points[index - 1])), unit(sub(points[index + 1], point)))));
    return bend * Math.tan(angle / 2);
  });
}

/** Centreline samples: segment endpoints on straights, dense samples on circular elbows. */
export function samplePipe(points: Vec3[], radius: number): PipePath {
  const bend = radius * BEND_RADIUS_FACTOR;
  const cut = elbowTangents(points, radius);
  const positions: Vec3[] = [];
  const tangents: Vec3[] = [];
  const push = (position: Vec3, tangent: Vec3) => {
    const last = positions[positions.length - 1];
    if (last && size(sub(position, last)) < 1e-6) return;
    positions.push(position);
    tangents.push(tangent);
  };
  push(points[0], unit(sub(points[1], points[0])));
  for (let index = 1; index < points.length - 1; index++) {
    const inward = unit(sub(points[index], points[index - 1]));
    const outward = unit(sub(points[index + 1], points[index]));
    const angle = Math.acos(clampUnit(dot(inward, outward)));
    if (angle < 1e-4) continue;
    const start = add(points[index], scale(inward, -cut[index]));
    const end = add(points[index], scale(outward, cut[index]));
    const centre = add(points[index], scale(unit(sub(outward, inward)), bend / Math.cos(angle / 2)));
    const from = sub(start, centre);
    const to = sub(end, centre);
    const steps = Math.max(2, Math.ceil(angle / (Math.PI / 16)));
    for (let step = 0; step <= steps; step++) {
      const w = step / steps;
      const position = add(centre, add(scale(from, Math.sin((1 - w) * angle) / Math.sin(angle)), scale(to, Math.sin(w * angle) / Math.sin(angle))));
      push(position, unit(add(scale(from, -Math.cos((1 - w) * angle)), scale(to, Math.cos(w * angle)))));
    }
  }
  const last = points[points.length - 1];
  push(last, unit(sub(last, points[points.length - 2])));
  const distances = positions.map(() => 0);
  for (let index = 1; index < positions.length; index++) distances[index] = distances[index - 1] + size(sub(positions[index], positions[index - 1]));
  return { positions, tangents, distances, length: distances[distances.length - 1] };
}

/** Position and direction at a distance along the run. */
export function pointAlong(path: PipePath, distance: number): { position: Vec3; tangent: Vec3 } {
  const d = Math.min(path.length, Math.max(0, distance));
  let index = 0;
  while (index < path.positions.length - 2 && path.distances[index + 1] < d) index++;
  const span = path.distances[index + 1] - path.distances[index] || 1;
  const k = (d - path.distances[index]) / span;
  return {
    position: add(path.positions[index], scale(sub(path.positions[index + 1], path.positions[index]), k)),
    tangent: unit(add(scale(path.tangents[index], 1 - k), scale(path.tangents[index + 1], k))),
  };
}

/** Nearest centreline location to a point: its distance along the run and its offset from it. */
export function locateOnPath(path: PipePath, point: Vec3): { distance: number; offset: number } {
  let best = { distance: 0, offset: Infinity };
  for (let index = 0; index < path.positions.length - 1; index++) {
    const a = path.positions[index];
    const ab = sub(path.positions[index + 1], a);
    const t = Math.min(1, Math.max(0, dot(sub(point, a), ab) / (dot(ab, ab) || 1)));
    const offset = size(sub(point, add(a, scale(ab, t))));
    if (offset < best.offset) best = { distance: path.distances[index] + t * size(ab), offset };
  }
  return best;
}
