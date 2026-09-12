"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    // Smooth scrolling is a desktop pointer enhancement only. On touch
    // devices native scrolling is faster and more responsive, and Lenis's
    // permanent rAF loop competes with taps (e.g. the mobile menu button).
    const noSmooth = window.matchMedia(
      "(max-width: 1023px), (pointer: coarse), (prefers-reduced-motion: reduce)",
    );
    if (noSmooth.matches) return;

    const lenis = new Lenis({ autoRaf: true });
    return () => lenis.destroy();
  }, []);

  return null;
}
