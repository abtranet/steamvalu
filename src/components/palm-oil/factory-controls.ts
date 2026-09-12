import { Vector3 } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/** Apply an explicit view command without carrying momentum from the old view. */
export function setFactoryView(controls: OrbitControls, position: Vector3, target: Vector3) {
  const damping = controls.enableDamping;
  controls.enableDamping = false;
  controls.update(); // Consume and clear the previous orbit/pan deltas first.
  controls.object.position.copy(position);
  controls.target.copy(target);
  controls.update();
  controls.enableDamping = damping;
}

/** A drag remains a drag even if it ends back at its starting point. */
export function guardFactorySelection(element: HTMLCanvasElement) {
  let start: { x: number; y: number } | null = null;
  let dragged = false;
  const pointers = new Set<number>();
  const down = (event: PointerEvent) => {
    if (pointers.size === 0) {
      start = { x: event.clientX, y: event.clientY };
      dragged = false;
    } else {
      dragged = true;
    }
    pointers.add(event.pointerId);
  };
  const move = (event: PointerEvent) => {
    if (start && pointers.has(event.pointerId) && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 4) dragged = true;
  };
  const up = (event: PointerEvent) => {
    move(event);
    pointers.delete(event.pointerId);
    if (pointers.size === 0) start = null;
  };
  const cancel = (event: PointerEvent) => { dragged = true; up(event); };
  const click = (event: MouseEvent) => {
    if (!dragged) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  };
  element.addEventListener("pointerdown", down);
  element.ownerDocument.addEventListener("pointermove", move);
  element.ownerDocument.addEventListener("pointerup", up);
  element.addEventListener("pointercancel", cancel);
  element.addEventListener("click", click, true);
  return () => {
    element.removeEventListener("pointerdown", down);
    element.ownerDocument.removeEventListener("pointermove", move);
    element.ownerDocument.removeEventListener("pointerup", up);
    element.removeEventListener("pointercancel", cancel);
    element.removeEventListener("click", click, true);
  };
}
