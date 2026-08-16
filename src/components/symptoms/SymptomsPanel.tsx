"use client";

import { useEffect } from "react";
import { useSymptomsPanel } from "./SymptomsPanelContext";
import SymptomsContent from "./SymptomsContent";

export default function SymptomsPanel() {
  const { isOpen, close, detailId } = useSymptomsPanel();

  useEffect(() => {
    if (!isOpen) return;

    // When a detail pop-up is open, its own Escape handler closes just
    // that layer — this one only closes the whole panel once it's gone.
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && detailId === null) close();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, detailId]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mazo de síntomas"
      className="fixed inset-0 z-50 overflow-y-auto bg-ns-white text-ns-black"
    >
      <div className="container-content flex min-h-full flex-col py-ns-6">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="border border-ns-black px-ns-2 py-ns-1 text-micro uppercase tracking-[0.08em] hover:bg-ns-black hover:text-ns-white"
          >
            Cerrar ✕
          </button>
        </div>

        <div className="py-ns-6">
          <SymptomsContent />
        </div>
      </div>
    </div>
  );
}
