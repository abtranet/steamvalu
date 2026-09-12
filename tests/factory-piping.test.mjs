import { test } from "node:test";
import assert from "node:assert/strict";
import { MAX_SUPPORT_SPAN, PIPE_ROUTES, elbowTangents, locateOnPath, samplePipe } from "../src/components/palm-oil/factory-piping.ts";

const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const paths = new Map(PIPE_ROUTES.map(route => [route.id, samplePipe(route.points, route.radius)]));

/** Centreline points no more than `step` apart. */
function densify(path, step = 0.1) {
  const points = [];
  for (let i = 0; i < path.positions.length - 1; i++) {
    const a = path.positions[i];
    const b = path.positions[i + 1];
    const n = Math.max(1, Math.ceil(distance(a, b) / step));
    for (let k = 0; k < n; k++) points.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n, a[2] + (b[2] - a[2]) * k / n]);
  }
  points.push(path.positions[path.positions.length - 1]);
  return points;
}

test("route ids are unique and branches name an existing run", () => {
  const ids = PIPE_ROUTES.map(route => route.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const route of PIPE_ROUTES) if (route.branchOf) assert.ok(ids.includes(route.branchOf), route.id);
});

test("every elbow fits its straights at a long-radius bend", () => {
  for (const route of PIPE_ROUTES) {
    const cut = elbowTangents(route.points, route.radius);
    for (let i = 1; i < route.points.length; i++) {
      const length = distance(route.points[i - 1], route.points[i]);
      assert.ok(cut[i - 1] + cut[i] <= length + 1e-9, `${route.id}: segment ${i} is ${length.toFixed(2)} m, elbows need ${(cut[i - 1] + cut[i]).toFixed(2)} m`);
    }
  }
});

test("runs are orthogonal, apart from 45° horizontal offsets", () => {
  for (const route of PIPE_ROUTES) {
    for (let i = 1; i < route.points.length; i++) {
      const [dx, dy, dz] = route.points[i].map((value, axis) => Math.abs(value - route.points[i - 1][axis]));
      const axisAligned = [dx, dy, dz].filter(value => value > 1e-9).length === 1;
      const offset45 = dy < 1e-9 && Math.abs(dx - dz) < 1e-9;
      assert.ok(axisAligned || offset45, `${route.id}: segment ${i} is skewed`);
    }
  }
});

test("a branch starts on its header's straight centreline", () => {
  for (const route of PIPE_ROUTES.filter(route => route.branchOf)) {
    const header = paths.get(route.branchOf);
    assert.ok(locateOnPath(header, route.points[0]).offset < 1e-6, route.id);
  }
});

test("supports sit on the centreline and no span exceeds the limit", () => {
  for (const route of PIPE_ROUTES) {
    const path = paths.get(route.id);
    const stations = [0, path.length];
    for (const support of route.supports) {
      const { distance: along, offset } = locateOnPath(path, support.at);
      assert.ok(offset < 0.08, `${route.id}: ${support.kind} at ${support.at} is ${offset.toFixed(2)} m off the pipe`);
      stations.push(along);
    }
    stations.sort((a, b) => a - b);
    for (let i = 1; i < stations.length; i++) {
      const span = stations[i] - stations[i - 1];
      assert.ok(span <= MAX_SUPPORT_SPAN, `${route.id}: ${span.toFixed(2)} m unsupported ending ${stations[i].toFixed(1)} m along`);
    }
  }
});

test("pipes keep clear of one another except where a branch joins its header", () => {
  const clouds = new Map(PIPE_ROUTES.map(route => [route.id, densify(paths.get(route.id))]));
  for (let i = 0; i < PIPE_ROUTES.length; i++) {
    for (let j = i + 1; j < PIPE_ROUTES.length; j++) {
      const a = PIPE_ROUTES[i];
      const b = PIPE_ROUTES[j];
      const clearance = a.radius + b.radius + 0.1;
      const joint = b.branchOf === a.id ? b.points[0] : a.branchOf === b.id ? a.points[0] : null;
      for (const p of clouds.get(a.id)) {
        if (joint && distance(p, joint) < clearance + 0.3) continue;
        for (const q of clouds.get(b.id)) {
          if (joint && distance(q, joint) < clearance + 0.3) continue;
          assert.ok(distance(p, q) >= clearance, `${a.id} and ${b.id} clash near ${p.map(v => v.toFixed(1))}`);
        }
      }
    }
  }
});
