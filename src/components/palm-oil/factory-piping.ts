import type { StageId } from "./process";

/**
 * Piping layout for the 3D plant, in world coordinates (metres, y up).
 *
 * Runs are polylines of straight pipe joined by long-radius elbows. Every run
 * starts and ends inside an equipment nozzle or on another run (a tee), and
 * carries explicit supports so no span exceeds MAX_SUPPORT_SPAN.
 */

export type Vec3 = [number, number, number];

export type PipeSupport =
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

export type PipePath = { positions: Vec3[]; tangents: Vec3[]; distances: number[]; length: number };

/** Long-radius elbows: centreline bend radius of 1.5 × diameter. */
export const BEND_RADIUS_FACTOR = 3;
/** Largest distance along any run between consecutive supports or nozzles. */
export const MAX_SUPPORT_SPAN = 6.2;
export const SHOE_HEIGHT = 0.095;

/** Steam header elevation: clears the boiler deck railing and the site road. */
const STEAM_Y = 9;
const STEAM_Z = 6.1;

const tposts = (points: Vec3[], base: number): PipeSupport[] => points.map(at => ({ kind: "tpost", at, base }));

export const PIPE_ROUTES: PipeRoute[] = [
  {
    // Boiler column → along the south edge of the road → north across the
    // road → down beside the sterilisation frame → steriliser column.
    id: "steam-main",
    service: "Vapeur chaudière → stérilisation",
    radius: 0.18,
    color: "#abc5cf",
    points: [[12.6, STEAM_Y, 11.2], [12.6, STEAM_Y, STEAM_Z], [-21.3, STEAM_Y, STEAM_Z], [-21.3, STEAM_Y, -11.4], [-21.3, 7.5, -11.4], [-18.5, 7.5, -11.4]],
    flanges: [0.25, -0.25],
    supports: [
      { kind: "hanger", at: [12.6, STEAM_Y, 9.75], top: 9.315 },
      ...tposts([[12.6, STEAM_Y, 7.2], [8, STEAM_Y, STEAM_Z], [2, STEAM_Y, STEAM_Z], [-4, STEAM_Y, STEAM_Z], [-10, STEAM_Y, STEAM_Z], [-15.8, STEAM_Y, STEAM_Z], [-20.7, STEAM_Y, STEAM_Z], [-21.3, STEAM_Y, 0.3]], 0),
      ...tposts([[-21.3, STEAM_Y, -5]], 0.7),
      { kind: "bracket", at: [-21.3, STEAM_Y, -9.3], anchor: [-20.54, STEAM_Y, -9.3] },
      { kind: "stanchion", at: [-19.9, 7.5, -11.4], base: 5.14 },
    ],
  },
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
