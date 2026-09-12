import { test } from "node:test";
import assert from "node:assert/strict";
import { PerspectiveCamera, Vector3 } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { guardFactorySelection, setFactoryView } from "../src/components/palm-oil/factory-controls.ts";

// Exercise the installed controls with pointer events, without requiring a GPU.
class CanvasTarget extends EventTarget {
  ownerDocument = new EventTarget();
  style = {};
  clientWidth = 900;
  clientHeight = 700;
  captured = new Set();
  getRootNode() { return this.ownerDocument; }
  setPointerCapture(id) { this.captured.add(id); }
  releasePointerCapture(id) { this.captured.delete(id); }
  getBoundingClientRect() { return { x: 0, y: 0, left: 0, top: 0, width: this.clientWidth, height: this.clientHeight }; }
}
function fixture() {
  const canvas = new CanvasTarget();
  const camera = new PerspectiveCamera(43, 9 / 7, 0.5, 500);
  camera.position.set(-61, 49, 65);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.12;
  controls.minDistance = 12;
  controls.maxDistance = 160;
  controls.maxPolarAngle = Math.PI / 2.04;
  const cleanup = guardFactorySelection(canvas);
  const send = (type, x, y, pointerId = 1, pointerType = "mouse", extra = {}) => {
    const event = new Event(type, { cancelable: true });
    Object.assign(event, { clientX: x, clientY: y, pageX: x, pageY: y, pointerId, pointerType, button: 0, ...extra });
    const target = type === "pointermove" || type === "pointerup" ? canvas.ownerDocument : canvas;
    target.dispatchEvent(event);
    return event;
  };
  const settle = () => { for (let i = 0; i < 240; i++) controls.update(1 / 60); };
  return { canvas, camera, controls, send, settle, close: () => { cleanup(); controls.dispose(); } };
}

test("repeated drags rotate, settle, and never turn into equipment clicks", () => {
  const f = fixture();
  try {
    for (let i = 0; i < 8; i++) {
      const before = f.camera.position.clone();
      f.send("pointerdown", 300, 300);
      f.send("pointermove", 400, 300);
      f.send("pointerup", 400, 300);
      assert.equal(f.send("click", 400, 300).defaultPrevented, true);
      f.settle();
      assert.ok(f.camera.position.distanceTo(before) > 1);
      const released = f.camera.position.clone();
      f.settle();
      assert.ok(f.camera.position.distanceTo(released) < 1e-8, "released view must stop moving");
    }
    f.send("pointerdown", 300, 300);
    f.send("pointerup", 301, 301);
    assert.equal(f.send("click", 301, 301).defaultPrevented, false, "a real click must still select");
  } finally { f.close(); }
});

test("dragging back to the starting point still suppresses selection", () => {
  const f = fixture();
  try {
    f.send("pointerdown", 300, 300);
    f.send("pointermove", 450, 300);
    f.send("pointermove", 300, 300);
    f.send("pointerup", 300, 300);
    assert.equal(f.send("click", 300, 300).defaultPrevented, true);
  } finally { f.close(); }
});

test("touch pinch zoom continues as a one-finger orbit after lifting a finger", () => {
  const f = fixture();
  try {
    const before = f.camera.position.distanceTo(f.controls.target);
    f.send("pointerdown", 250, 300, 1, "touch");
    f.send("pointerdown", 350, 300, 2, "touch");
    f.send("pointermove", 430, 300, 2, "touch");
    assert.ok(f.camera.position.distanceTo(f.controls.target) < before, "pinch out must zoom in");
    f.send("pointerup", 430, 300, 2, "touch");
    f.settle();
    const angle = f.controls.getAzimuthalAngle();
    f.send("pointermove", 310, 300, 1, "touch");
    f.send("pointerup", 310, 300, 1, "touch");
    f.settle();
    assert.ok(Math.abs(f.controls.getAzimuthalAngle() - angle) > 0.01, "remaining finger must keep rotating");
    assert.equal(f.send("click", 310, 300).defaultPrevented, true);
  } finally { f.close(); }
});

test("cancelling a touch allows the next drag and releases pointer capture", () => {
  const f = fixture();
  try {
    f.send("pointerdown", 250, 300, 1, "touch");
    f.send("pointermove", 300, 300, 1, "touch");
    f.send("pointercancel", 300, 300, 1, "touch");
    f.settle();
    const before = f.camera.position.clone();
    f.send("pointerdown", 250, 300, 2, "touch");
    f.send("pointermove", 400, 300, 2, "touch");
    f.send("pointerup", 400, 300, 2, "touch");
    f.settle();
    assert.ok(f.camera.position.distanceTo(before) > 1);
    assert.equal(f.canvas.captured.size, 0);
  } finally { f.close(); }
});

test("explicit presets clear old damping momentum and wheel zoom respects limits", () => {
  const f = fixture();
  try {
    f.send("pointerdown", 300, 300);
    f.send("pointermove", 500, 320);
    f.send("pointerup", 500, 320);
    const position = new Vector3(-61, 49, 65);
    const target = new Vector3(0, 2, 0);
    setFactoryView(f.controls, position, target);
    f.settle();
    assert.ok(f.camera.position.distanceTo(position) < 1e-8);
    assert.ok(f.controls.target.distanceTo(target) < 1e-8);
    for (const deltaY of [-100, 100]) {
      for (let i = 0; i < 150; i++) f.send("wheel", 400, 350, 1, "mouse", { deltaY, deltaMode: 0 });
      f.settle();
      const distance = f.camera.position.distanceTo(f.controls.target);
      assert.ok(distance >= 12 - 1e-8 && distance <= 160 + 1e-8);
      assert.ok(f.camera.position.toArray().every(Number.isFinite));
    }
  } finally { f.close(); }
});

test("changing canvas aspect preserves orbit and subsequent controls remain usable", () => {
  const f = fixture();
  try {
    f.send("pointerdown", 300, 300);
    f.send("pointermove", 500, 320);
    f.send("pointerup", 500, 320);
    f.settle();
    const before = f.camera.position.clone();
    for (const [width, height] of [[390, 844], [844, 390], [1440, 900]]) {
      f.canvas.clientWidth = width; f.canvas.clientHeight = height;
      f.camera.aspect = width / height;
      f.camera.updateProjectionMatrix();
      f.settle();
      assert.ok(f.camera.position.distanceTo(before) < 1e-8);
    }
    f.send("pointerdown", 300, 300);
    f.send("pointermove", 400, 300);
    f.send("pointerup", 400, 300);
    f.settle();
    assert.ok(f.camera.position.distanceTo(before) > 1);
  } finally { f.close(); }
});
