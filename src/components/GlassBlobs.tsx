/**
 * Soft, blurred grayscale shapes that sit behind glassmorphism surfaces so
 * their backdrop-blur has something to actually refract — on a flat
 * background, blur alone is invisible. Monochrome to respect the site's
 * strict black/white palette. Pass `dark` on black-background sections
 * (light shapes on dark, instead of dark shapes on light).
 *
 * Sized and positioned in percentages of the container (not fixed rem
 * offsets pushed outside it) so the radial fade always completes to fully
 * transparent well before the container's own edge — a blob straddling its
 * clipping box gets cut off mid-gradient, showing up as a hard visible line
 * rather than a soft fade. `transparent 50%` plus generous inset keeps the
 * clip invisible at any container size, from a compact card to a full
 * viewport-height pinned section.
 */
export default function GlassBlobs({ dark = false }: { dark?: boolean }) {
  const c = dark ? "255,255,255" : "0,0,0";
  const a = dark ? [0.16, 0.12, 0.1] : [0.32, 0.24, 0.2];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute top-[6%] left-[8%] h-[45%] max-h-72 w-[45%] max-w-72 radius-full blur-3xl"
        style={{ background: `radial-gradient(circle, rgba(${c},${a[0]}), transparent 50%)` }}
      />
      <div
        className="absolute top-[32%] right-[6%] h-[50%] max-h-80 w-[50%] max-w-80 radius-full blur-3xl"
        style={{ background: `radial-gradient(circle, rgba(${c},${a[1]}), transparent 50%)` }}
      />
      <div
        className="absolute bottom-[6%] left-[28%] h-[42%] max-h-64 w-[42%] max-w-64 radius-full blur-3xl"
        style={{ background: `radial-gradient(circle, rgba(${c},${a[2]}), transparent 50%)` }}
      />
    </div>
  );
}
