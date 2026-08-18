"use client";

import Image from "next/image";
import { CARD_BACK_IMAGE, type Symptom } from "@/lib/symptoms";

export default function SymptomCard({
  item,
  onOpen,
  isHovered,
  isDimmed,
  onHoverStart,
  onHoverEnd,
}: {
  item: Symptom;
  onOpen: () => void;
  isHovered: boolean;
  isDimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <div
      className="relative aspect-[5/7] w-full"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{ zIndex: isHovered ? 20 : 1 }}
    >
      {/* Card back, fanned behind the front */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{
          transform: isHovered
            ? "translate(14%, -8%) rotate(9deg) scale(1.1)"
            : "translate(7%, 5%) rotate(5deg)",
        }}
      >
        <Image
          src={CARD_BACK_IMAGE}
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 30vw, 90vw"
          className="object-contain"
        />
      </div>

      {/* Card front — the clickable symptom card */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Abrir carta: ${item.symptom}`}
        className="absolute inset-0 transition-[transform,filter,opacity] duration-500 ease-out"
        style={{
          transform: isHovered
            ? "translate(-6%, -10%) rotate(-3deg) scale(1.16)"
            : "translate(-4%, 2%) rotate(-3deg)",
          filter: isDimmed ? "blur(5px)" : "none",
          opacity: isDimmed ? 0.5 : 1,
        }}
      >
        <Image
          src={item.image}
          alt={item.symptom ?? ""}
          fill
          sizes="(min-width: 1024px) 30vw, 90vw"
          className="object-contain"
        />
      </button>
    </div>
  );
}
