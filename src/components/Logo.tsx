export default function Logo({ className = "" }: { className?: string }) {
  return (
    <p
      className={`font-sans text-micro leading-tight font-medium tracking-[0.14em] uppercase ${className}`}
    >
      Norte
      <br />
      Studio
    </p>
  );
}
