export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 32"
      className={className}
      style={{ height: "1.4rem", width: "auto" }}
      aria-label="Norte Studio"
    >
      <path
        d="M5.2,4 L5.2,28 M5.2,4 L22.4,26.4"
        fill="none"
        stroke="currentColor"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.4,8.4
           C34.4,4.8 30,3.6 26,5.2
           C22.2,6.8 22.2,10.8 26,12.8
           C30,14.8 34.4,16 34.4,20
           C34.4,24.4 30,27.6 25.6,26
           C22.4,24.8 21.6,22.4 21.6,21.2"
        fill="none"
        stroke="currentColor"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
