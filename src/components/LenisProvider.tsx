"use client";

import { useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { createLenis } from "@/lib/lenis";

const MOBILE_QUERY = "(max-width: 767px)";

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Native touch scroll is more predictable than a forced smooth-scroll
    // on mobile, especially iOS Safari. ScrollTrigger updates fine on its
    // own native scroll listener without Lenis driving it.
    if (window.matchMedia(MOBILE_QUERY).matches) {
      const refresh = () => ScrollTrigger.refresh();
      if (document.fonts?.ready) {
        document.fonts.ready.then(refresh);
      } else {
        refresh();
      }
      return;
    }

    const lenis = createLenis();

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    } else {
      refresh();
    }

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
