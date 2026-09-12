"use client";

import { useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Vector3 } from "three";
import { STAGES, type StageId, type ViewPreset } from "./process";
import { guardFactorySelection, setFactoryView } from "./factory-controls";

const POSITIONS: Record<ViewPreset, [number, number, number]> = {
  perspective: [-61, 49, 65], top: [0, 97, 0.01], front: [0, 22, 88],
};

export function FactoryCamera({ preset, revision, selected, focusRevision }: {
  preset: ViewPreset; revision: number; selected: StageId | null; focusRevision: number;
}) {
  const camera = useThree(state => state.camera);
  const gl = useThree(state => state.gl);
  const get = useThree(state => state.get);
  const set = useThree(state => state.set);
  const controls = useRef<OrbitControls | null>(null);
  const lastFocus = useRef(0);

  useLayoutEffect(() => {
    // Use the controls shipped with our Three version: pointer capture and
    // continuing with one finger after a pinch are handled by this version.
    const orbit = new OrbitControls(camera, gl.domElement);
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.12;
    orbit.minDistance = 12;
    orbit.maxDistance = 160;
    orbit.maxPolarAngle = Math.PI / 2.04;
    orbit.autoRotate = false;
    controls.current = orbit;
    const previous = get().controls;
    set({ controls: orbit });
    const removeSelectionGuard = guardFactorySelection(gl.domElement);
    return () => {
      removeSelectionGuard();
      orbit.dispose();
      controls.current = null;
      set({ controls: previous });
    };
  }, [camera, gl, get, set]);

  useLayoutEffect(() => {
    const orbit = controls.current;
    if (!orbit) return;
    const { width, height } = get().size;
    const aspect = width / Math.max(1, height);
    const fit = preset === "perspective" && aspect < 1 ? Math.max(0.45, aspect) : 1;
    setFactoryView(orbit, new Vector3(...POSITIONS[preset]).multiplyScalar(fit), new Vector3(0, 2, 0));
    // ResizeObserver/Fiber updates the projection on resize; preserve the
    // user's position, target and zoom. Only explicit commands reset the view.
  }, [camera, get, preset, revision]);

  useLayoutEffect(() => {
    if (lastFocus.current === focusRevision) return;
    lastFocus.current = focusRevision;
    const stage = STAGES.find(stage => stage.id === selected);
    if (!focusRevision || !stage || !controls.current) return;
    const target = new Vector3(...stage.position);
    setFactoryView(controls.current, target.clone().add(new Vector3(-18, 17, 24)), target);
  }, [selected, focusRevision]);

  // The sole camera animation subscription. Fiber owns requestAnimationFrame.
  useFrame((_, delta) => controls.current?.update(Math.min(delta, 0.05)), -1);
  return null;
}
