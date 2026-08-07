"use client";

import { useBookingPanel } from "./BookingPanelContext";
import { CTA_LABEL } from "@/lib/content";

export default function CtaButton({
  className = "",
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  const { open } = useBookingPanel();

  const palette = inverted
    ? "border-ns-white text-ns-white hover:bg-ns-white hover:text-ns-black"
    : "border-ns-black text-ns-black hover:bg-ns-black hover:text-ns-white";

  return (
    <button
      type="button"
      onClick={open}
      className={`inline-block border ${palette} px-ns-4 py-ns-2 text-micro tracking-[0.08em] uppercase text-left transition-colors duration-200 ${className}`}
    >
      {CTA_LABEL}
    </button>
  );
}
