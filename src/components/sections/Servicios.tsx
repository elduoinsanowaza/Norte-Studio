"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { SERVICE_GROUPS, SERVICES_NOTE } from "@/lib/content";
import { setupPinnedStaggerReveal } from "@/lib/scrollReveal";
import ServiceDetailPopup from "./ServiceDetailPopup";
import GlassBlobs from "@/components/GlassBlobs";

export default function Servicios() {
  const [openService, setOpenService] = useState<string | null>(null);
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
      className="relative overflow-hidden bg-ns-white text-ns-black md:h-[170vh]"
    >
      <div
        ref={pinRef}
        className="container-content relative flex flex-col gap-ns-7 py-ns-8 md:h-screen md:justify-center md:py-0"
      >
        <GlassBlobs />
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
              <ul className="flex flex-col gap-ns-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => setOpenService(item)}
                      className="group relative w-full overflow-hidden radius-2xl border border-white/70 bg-white/25 px-ns-4 py-ns-4 text-left text-xl font-medium text-ns-black shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.04),0_8px_28px_rgba(0,0,0,0.07)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/45 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.05),0_16px_44px_rgba(0,0,0,0.14)] sm:text-2xl"
                      style={{
                        backgroundImage:
                          "linear-gradient(160deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.05) 75%)",
                      }}
                    >
                      <span className="relative z-10">{item}</span>
                    </button>
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

      <ServiceDetailPopup service={openService} onClose={() => setOpenService(null)} />
    </section>
  );
}
