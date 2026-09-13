/**
 * Shared glassmorphism recipe for buttons — light glass for white sections,
 * dark glass for black sections (Cases' inverted CTA, etc). Kept out of the
 * 3 fixed nav pills (Panel/Una carta/Agenda): those rely on
 * mix-blend-mode: difference to stay readable over any background as the
 * page scrolls, which glass transparency would break.
 */
// No border-radius here on purpose — Tailwind's generated stylesheet order
// (not className order) decides which `rounded-*` utility wins, so a
// caller-side `rounded-*` appended after one of these would not reliably
// override a radius baked in here. Each call site adds its own rounded-*.
export const GLASS_BUTTON_LIGHT =
  "border border-white/70 bg-white/30 text-ns-black shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.05),0_14px_36px_rgba(0,0,0,0.14)]";

export const GLASS_BUTTON_DARK =
  "border border-white/25 bg-white/10 text-ns-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.3),0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.3),0_14px_36px_rgba(0,0,0,0.45)]";

/** Same glass recipe, sized for a small icon-only/short-label chip (e.g. a modal close button). */
export const GLASS_BUTTON_LIGHT_SM =
  "border border-white/70 bg-white/35 text-ns-black shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-200 hover:bg-white/55";

/** Non-interactive glass panel — cards, popup bodies, form containers. */
export const GLASS_CARD_LIGHT =
  "border border-white/70 bg-white/25 text-ns-black shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(0,0,0,0.04),0_8px_28px_rgba(0,0,0,0.07)] backdrop-blur-xl backdrop-saturate-150";

export const GLASS_CARD_DARK =
  "border border-white/15 bg-white/8 text-ns-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.3),0_8px_28px_rgba(0,0,0,0.3)] backdrop-blur-xl backdrop-saturate-150";
