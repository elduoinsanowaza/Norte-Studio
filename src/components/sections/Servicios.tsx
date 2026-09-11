"use client";

import { useLayoutEffect, useRef } from "react";
import { SERVICE_GROUPS, SERVICES_NOTE } from "@/lib/content";
import { setupPinnedStaggerReveal } from "@/lib/scrollReveal";

export default function Servicios() {
  const wrapperRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<Array<HTMLDivElement | null>>([]);
  const noteRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const wrapperEl = wrapperRef.current;
    const pinEl = pinRef.current;
    const noteEl = noteRef.current;
    const groups = groupRefs.current.filter((el): el is HTMLDivElement => !!el);

    if (!wrapperEl || !pinEl || !noteEl || groups.length === 0) return;

    const ctx = setupPinnedStaggerReveal({
      wrapperEl,
      pinEl,
      targets: [...groups, noteEl],
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative bg-ns-white text-ns-black md:h-[170vh]"
    >
      <div
        ref={pinRef}
        className="container-content flex flex-col gap-ns-7 py-ns-8 md:h-screen md:justify-center md:py-0"
      >
        <h2 className="text-2xl font-medium tracking-[0.08em] uppercase opacity-60">
          Servicios
        </h2>

        <div className="grid gap-ns-6 sm:grid-cols-2">
          {SERVICE_GROUPS.map((group, i) => (
            <div
              key={group.title}
              ref={(el) => {
                groupRefs.current[i] = el;
              }}
              className="flex flex-col gap-ns-4"
            >
              <h3 className="text-micro tracking-[0.08em] uppercase opacity-50">
                {group.title}
              </h3>
              <ul className="flex flex-col">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-ns-black/15 py-ns-2 text-xl font-medium last:border-b sm:text-2xl"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          ref={noteRef}
          className="max-w-[var(--text-width)] text-body opacity-70"
        >
          {SERVICES_NOTE}
        </p>
      </div>
    </section>
  );
}
