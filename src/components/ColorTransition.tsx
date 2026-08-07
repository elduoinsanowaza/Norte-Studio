"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type NsColor = "white" | "black";

const COLOR_VALUES: Record<NsColor, string> = {
  white: "#ffffff",
  black: "#000000",
};

export default function ColorTransition({
  from,
  to,
  heightVh = 60,
}: {
  from: NsColor;
  to: NsColor;
  heightVh?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { backgroundColor: COLOR_VALUES[from] });
      gsap.to(el, {
        backgroundColor: COLOR_VALUES[to],
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [from, to]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="w-full"
      style={{ height: `${heightVh}vh` }}
    />
  );
}
