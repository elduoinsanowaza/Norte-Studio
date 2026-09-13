"use client";

import { useEffect } from "react";
import { SERVICE_DETAILS } from "@/lib/content";
import { TOOL_ICONS, type ToolName } from "@/components/icons/ToolIcons";
import GlassBlobs from "@/components/GlassBlobs";

/** SERVICE_GROUPS items use slightly different wording/casing than the
 * Rhizome's TOOL_ICONS keys — bridge them here rather than renaming either
 * the visible service list or the diagram. */
const SERVICE_ICON: Record<string, ToolName> = {
  Branding: "Branding",
  "Sistemas de contenido": "Sistemas de Contenido",
  "Páginas comerciales": "Páginas Web",
  "Sistemas audiovisuales": "Sistemas Audiovisuales",
  "Sistemas administrativos": "Sistemas Administrativos",
  "Sistemas de inventario": "Sistemas de Inventario",
  "Herramientas internas": "Herramientas Internas",
  Automatizaciones: "Automatización",
  "Integraciones con IA": "IA",
};

export default function ServiceDetailPopup({
  service,
  onClose,
}: {
  service: string | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!service) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [service, onClose]);

  if (!service) return null;

  const detail = SERVICE_DETAILS[service];
  const Icon = TOOL_ICONS[SERVICE_ICON[service]];
  if (!detail || !Icon) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-ns-4">
      <div
        className="absolute inset-0 bg-ns-black/25 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />
      <GlassBlobs />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={service}
        className="relative flex w-full max-w-sm flex-col gap-ns-4 overflow-hidden radius-3xl border border-white/70 bg-white/40 p-ns-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.05),0_24px_70px_rgba(0,0,0,0.25)] backdrop-blur-2xl backdrop-saturate-150"
        style={{
          backgroundImage:
            "linear-gradient(160deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.12) 65%)",
        }}
      >
        <div className="flex items-start justify-between gap-ns-3">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center radius-2xl border border-white/70 bg-white/50 p-3.5 text-ns-black shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md">
            <Icon className="h-full w-full" />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="radius-full border border-white/70 bg-white/40 px-ns-2 py-ns-1 text-micro tracking-[0.08em] uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-md transition-colors duration-200 hover:bg-ns-black hover:text-ns-white"
          >
            Cerrar ✕
          </button>
        </div>

        <h3 className="text-2xl font-medium">{service}</h3>

        <div className="flex flex-col gap-ns-3">
          <p className="text-body leading-relaxed">{detail.description}</p>

          <div className="flex flex-col gap-1 border-t border-ns-black/15 pt-ns-3">
            <span className="text-micro tracking-[0.08em] uppercase opacity-50">
              Para quién
            </span>
            <p className="text-body opacity-80">{detail.audience}</p>
          </div>

          <div className="flex flex-col gap-1 border-t border-ns-black/15 pt-ns-3">
            <span className="text-micro tracking-[0.08em] uppercase opacity-50">
              Qué resuelve
            </span>
            <p className="text-body opacity-80">{detail.solves}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
