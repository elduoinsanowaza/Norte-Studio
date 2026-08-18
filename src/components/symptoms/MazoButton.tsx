"use client";

import { useSymptomsPanel } from "./SymptomsPanelContext";

export default function MazoButton() {
  const { open } = useSymptomsPanel();

  return (
    <button
      type="button"
      onClick={() => open()}
      style={{ mixBlendMode: "difference" }}
      className="border border-ns-white bg-ns-white px-ns-2 py-ns-1 text-micro tracking-[0.08em] uppercase text-ns-black sm:px-ns-3"
    >
      <span className="sm:hidden">Una carta</span>
      <span className="hidden sm:inline">Una carta, una señal</span>
    </button>
  );
}
