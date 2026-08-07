"use client";

import { useEffect, useState } from "react";
import { ROTATING_PHRASES } from "@/lib/content";

const HOLD_MS = 2600;
const FADE_MS = 700;

export default function RotatingPhrase() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % ROTATING_PHRASES.length);
        setVisible(true);
      }, FADE_MS);
      return () => clearTimeout(swap);
    }, HOLD_MS + FADE_MS);

    return () => clearInterval(cycle);
  }, []);

  return (
    <p
      className="text-body text-ns-black transition-opacity ease-in-out"
      style={{ opacity: visible ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
    >
      {ROTATING_PHRASES[index]}
    </p>
  );
}
