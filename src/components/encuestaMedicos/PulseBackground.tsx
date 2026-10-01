export default function PulseBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="em-blob em-blob-1 -top-24 -left-20 h-72 w-72"
        style={{ background: "var(--em-teal-pale)" }}
      />
      <div
        className="em-blob em-blob-2 -bottom-28 -right-16 h-80 w-80"
        style={{ background: "#ffe4da" }}
      />
      <svg
        className="absolute left-1/2 top-[18%] w-[90%] max-w-3xl -translate-x-1/2 opacity-[0.35] sm:top-[22%]"
        viewBox="0 0 400 60"
        fill="none"
      >
        <path
          className="em-pulse-path"
          d="M0 30h70l14-22 18 44 16-30 10 8h60l14-22 18 44 16-30 10 8h164"
          stroke="var(--em-teal)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
