import Image from "next/image";

export default function Logo({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/logo-ns.png"
      alt="Norte Studio"
      width={1224}
      height={816}
      priority={priority}
      className={`h-[1.4rem] w-auto ${className}`}
    />
  );
}
