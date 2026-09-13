type NsColor = "white" | "black";

const COLOR_VALUES: Record<NsColor, string> = {
  white: "#ffffff",
  black: "#000000",
};

/**
 * A plain CSS gradient strip between two flat-color sections — inherently
 * gradual (no scroll-scrub needed), so it can't ever read as an abrupt cut
 * the way the old JS-driven color interpolation sometimes did.
 */
export default function ColorTransition({
  from,
  to,
  heightVh = 60,
}: {
  from: NsColor;
  to: NsColor;
  heightVh?: number;
}) {
  return (
    <div
      aria-hidden
      className="w-full"
      style={{
        height: `${heightVh}vh`,
        background: `linear-gradient(to bottom, ${COLOR_VALUES[from]}, ${COLOR_VALUES[to]})`,
      }}
    />
  );
}
