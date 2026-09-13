"use client";

import { useBookingPanel } from "./BookingPanelContext";
import { CTA_LABEL } from "@/lib/content";
import { GLASS_BUTTON_DARK, GLASS_BUTTON_LIGHT } from "@/lib/glassButton";

export default function CtaButton({
  className = "",
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  const { open } = useBookingPanel();

  const palette = inverted ? GLASS_BUTTON_DARK : GLASS_BUTTON_LIGHT;

  return (
    <button
      type="button"
      onClick={() => open()}
      className={`inline-block radius-2xl px-ns-4 py-ns-2 text-micro tracking-[0.08em] uppercase text-left ${palette} ${className}`}
    >
      {CTA_LABEL}
    </button>
  );
}
