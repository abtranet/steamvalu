"use client";

import { memo, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { StageId } from "./process";
import { PIPE_RACK, PIPE_ROUTES, PIPE_STEEL, SHOE_HEIGHT, locateOnPath, pointAlong, samplePipe, type PipePath, type PipeRoute, type Vec3 } from "./factory-piping";

const UP = new THREE.Vector3(0, 1, 0);
const PIPE_PATHS = PIPE_ROUTES.map(route => samplePipe(route.points, route.radius));

/** Exposes precomputed centreline samples to TubeGeometry: segment i is sample i. */
class SampledPipeCurve extends THREE.Curve<THREE.Vector3> {
  readonly path: PipePath;
  constructor(path: PipePath) {
    super();
    this.path = path;
  }
  getPoint(t: number, target = new THREE.Vector3()) { return this.sample(this.path.positions, t, target); }
  getPointAt(u: number, target = new THREE.Vector3()) { return this.getPoint(u, target); }
  getTangent(t: number, target = new THREE.Vector3()) { return this.sample(this.path.tangents, t, target).normalize(); }
  getTangentAt(u: number, target = new THREE.Vector3()) { return this.getTangent(u, target); }
  getLength() { return this.path.length; }
  private sample(values: Vec3[], t: number, target: THREE.Vector3) {
    const f = Math.min(1, Math.max(0, t)) * (values.length - 1);
    const index = Math.min(values.length - 2, Math.floor(f));
    const [ax, ay, az] = values[index];
    const [bx, by, bz] = values[index + 1];
    const k = f - index;
    return target.set(ax + (bx - ax) * k, ay + (by - ay) * k, az + (bz - az) * k);
  }
}

const vec = (p: Vec3) => new THREE.Vector3(p[0], p[1], p[2]);

/** Square-section member between two points (unit box, long axis on local y). */
function member(from: THREE.Vector3, to: THREE.Vector3, section: number) {
  const axis = to.clone().sub(from);
  const length = axis.length();
  return new THREE.Matrix4().compose(from.clone().add(to).multiplyScalar(0.5), new THREE.Quaternion().setFromUnitVectors(UP, axis.normalize()), new THREE.Vector3(section, length, section));
}

/** Box aligned with a horizontal direction: size is [across, height, along]. */
function block(centre: THREE.Vector3, along: THREE.Vector3, size: Vec3) {
  const across = new THREE.Vector3().crossVectors(UP, along).normalize();
  return new THREE.Matrix4().makeBasis(across, UP, along).scale(vec(size)).setPosition(centre);
}

const ring = (centre: THREE.Vector3, normal: THREE.Vector3, radius: number) =>
  new THREE.Matrix4().compose(centre, new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal), new THREE.Vector3(radius, radius, radius));

const disc = (centre: THREE.Vector3, axis: THREE.Vector3, radius: number, thickness: number) =>
  new THREE.Matrix4().compose(centre, new THREE.Quaternion().setFromUnitVectors(UP, axis), new THREE.Vector3(radius, thickness, radius));

type PipingParts = { steel: THREE.Matrix4[]; clamps: THREE.Matrix4[]; fittings: THREE.Matrix4[] };

function addRack({ steel }: PipingParts) {
  const { bents, postZ, tiers, beamDepth, bracedBays } = PIPE_RACK;
  const top = tiers[1] + beamDepth / 2;
  const ends = [bents[0] - 0.13, bents[bents.length - 1] + 0.13];
  for (const x of bents) {
    for (const z of postZ) {
      steel.push(member(new THREE.Vector3(x, 0, z), new THREE.Vector3(x, top, z), 0.26));
      steel.push(block(new THREE.Vector3(x, 0.025, z), new THREE.Vector3(1, 0, 0), [0.5, 0.05, 0.5]));
    }
    for (const y of tiers) steel.push(member(new THREE.Vector3(x, y, postZ[0] - 0.13), new THREE.Vector3(x, y, postZ[1] + 0.13), beamDepth));
  }
  for (const z of postZ) {
    for (const y of tiers) steel.push(member(new THREE.Vector3(ends[0], y, z), new THREE.Vector3(ends[1], y, z), beamDepth));
    for (const [from, to] of bracedBays) steel.push(member(new THREE.Vector3(from + 0.15, 0.5, z), new THREE.Vector3(to - 0.15, tiers[0] - 0.2, z), 0.12));
  }
}

function addRoute(parts: PipingParts, route: PipeRoute, path: PipePath) {
  const { steel, clamps, fittings } = parts;
  const r = route.radius;
  for (const offset of route.flanges) {
    const { position, tangent } = pointAlong(path, offset < 0 ? path.length + offset : offset);
    fittings.push(disc(vec(position), vec(tangent), r * 1.5, 0.11));
  }
  for (const support of route.supports) {
    const at = vec(support.at);
    const tangent = vec(pointAlong(path, locateOnPath(path, support.at).distance).tangent);
    if (Math.abs(tangent.y) > 0.7) {
      // Guide on a vertical riser: clamp band plus a stand-off arm to the anchor.
      clamps.push(ring(at, UP, r + 0.03));
      if (support.kind === "bracket") {
        const anchor = vec(support.anchor).setY(at.y);
        const towardPipe = at.clone().sub(anchor).normalize();
        steel.push(member(anchor, at.clone().addScaledVector(towardPipe, -(r + 0.03)), 0.14));
      }
      continue;
    }
    const along = tangent.setY(0).normalize();
    clamps.push(ring(at, along, r + 0.03));
    if (support.kind === "hanger") {
      fittings.push(member(new THREE.Vector3(at.x, at.y + r + 0.03, at.z), new THREE.Vector3(at.x, support.top, at.z), 0.05));
      steel.push(block(new THREE.Vector3(at.x, support.top - 0.02, at.z), along, [0.3, 0.04, 0.3]));
      continue;
    }
    const underside = at.y - r - SHOE_HEIGHT;
    steel.push(block(new THREE.Vector3(at.x, underside + SHOE_HEIGHT / 2, at.z), along, [r * 1.5, SHOE_HEIGHT, 0.3]));
    if (support.kind === "tpost" || support.kind === "stanchion") {
      const armDepth = support.kind === "tpost" ? 0.18 : 0;
      if (armDepth) steel.push(block(new THREE.Vector3(at.x, underside - armDepth / 2, at.z), along, [1, armDepth, 0.2]));
      steel.push(member(new THREE.Vector3(at.x, support.base, at.z), new THREE.Vector3(at.x, underside - armDepth, at.z), 0.22));
      steel.push(block(new THREE.Vector3(at.x, support.base + 0.025, at.z), along, [0.46, 0.05, 0.46]));
    } else if (support.kind === "bracket") {
      const armY = underside - 0.08;
      const anchor = vec(support.anchor).setY(armY);
      const outward = at.clone().setY(armY).sub(anchor);
      const reach = outward.length() + 0.15;
      outward.normalize();
      steel.push(member(anchor, anchor.clone().addScaledVector(outward, reach), 0.16));
      steel.push(member(anchor.clone().setY(armY - reach * 0.7), anchor.clone().addScaledVector(outward, reach * 0.7), 0.1));
    }
  }
}

function buildPipingParts(): PipingParts {
  const parts: PipingParts = { steel: [], clamps: [], fittings: [] };
  addRack(parts);
  PIPE_ROUTES.forEach((route, index) => addRoute(parts, route, PIPE_PATHS[index]));
  for (const { from, to, size } of PIPE_STEEL) parts.steel.push(member(vec(from), vec(to), size));
  return parts;
}

function InstancedParts({ name, matrices, geometry, material }: { name: string; matrices: THREE.Matrix4[]; geometry: THREE.BufferGeometry; material: THREE.Material }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    matrices.forEach((matrix, index) => mesh.setMatrixAt(index, matrix));
    mesh.instanceMatrix.needsUpdate = true;
    // Culling must use the instances' extent, not the unit geometry at the origin.
    mesh.computeBoundingBox();
    mesh.computeBoundingSphere();
  }, [matrices]);
  return <instancedMesh ref={ref} name={name} args={[geometry, material, matrices.length]} castShadow receiveShadow />;
}

function PipeRun({ route, path, material }: { route: PipeRoute; path: PipePath; material: THREE.Material }) {
  const curve = useMemo(() => new SampledPipeCurve(path), [path]);
  return (
    <mesh name={route.id} material={material} castShadow receiveShadow>
      <tubeGeometry args={[curve, path.positions.length - 1, route.radius, 18, false]} />
    </mesh>
  );
}

/** All process piping, the pipe rack and pipe supports, drawn with shared materials and instancing. */
export const FactoryPiping = memo(function FactoryPiping({ onSelect }: { onSelect: (id: StageId) => void }) {
  const parts = useMemo(() => buildPipingParts(), []);
  const resources = useMemo(() => ({
    pipes: Object.fromEntries(PIPE_ROUTES.map(route => [route.color, new THREE.MeshStandardMaterial({ color: route.color, metalness: 0.9, roughness: 0.18 })])),
    steel: new THREE.MeshStandardMaterial({ color: "#364758", metalness: 0.72, roughness: 0.3 }),
    clamp: new THREE.MeshStandardMaterial({ color: "#8f999e", metalness: 0.82, roughness: 0.28 }),
    fitting: new THREE.MeshStandardMaterial({ color: "#899093", metalness: 0.82, roughness: 0.25 }),
    box: new THREE.BoxGeometry(1, 1, 1),
    torus: new THREE.TorusGeometry(1, 0.1, 6, 24),
    cylinder: new THREE.CylinderGeometry(1, 1, 1, 20),
  }), []);
  useEffect(() => () => {
    Object.values(resources.pipes).forEach(material => material.dispose());
    [resources.steel, resources.clamp, resources.fitting, resources.box, resources.torus, resources.cylinder].forEach(resource => resource.dispose());
  }, [resources]);

  return (
    <group>
      {PIPE_ROUTES.map((route, index) => {
        const run = <PipeRun route={route} path={PIPE_PATHS[index]} material={resources.pipes[route.color]} />;
        const stage = route.stage;
        return stage
          ? <group key={route.id} onClick={(event) => { event.stopPropagation(); onSelect(stage); }}>{run}</group>
          : <group key={route.id}>{run}</group>;
      })}
      <InstancedParts name="pipe-steel" matrices={parts.steel} geometry={resources.box} material={resources.steel} />
      <InstancedParts name="pipe-clamps" matrices={parts.clamps} geometry={resources.torus} material={resources.clamp} />
      <InstancedParts name="pipe-fittings" matrices={parts.fittings} geometry={resources.cylinder} material={resources.fitting} />
    </group>
  );
});
