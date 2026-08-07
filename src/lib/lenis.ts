import Lenis from "lenis";

export function createLenis() {
  return new Lenis({
    autoRaf: false,
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
}

export type { default as LenisInstance } from "lenis";
