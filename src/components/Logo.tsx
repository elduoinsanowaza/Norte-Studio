import Image from "next/image";

export default function Logo({
  className = "",
  priority = false,
  heightRem = 1.4,
}: {
  className?: string;
  priority?: boolean;
  heightRem?: number;
}) {
  return (
    <Image
      src="/images/logo-ns.png"
      alt="Norte Studio"
      width={1224}
      height={816}
      priority={priority}
      style={{ height: `${heightRem}rem`, width: "auto" }}
      className={className}
    />
  );
}
