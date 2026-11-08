import Image from "next/image";
import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="MylesNet home">
      <Image
        src="/mylesnet-logo.png"
        alt="MylesNet"
        width={compact ? 72 : 120}
        height={compact ? 48 : 80}
        priority
        sizes={compact ? "72px" : "120px"}
        className={compact ? "h-10 w-auto object-contain" : "h-14 w-auto object-contain"}
      />
    </Link>
  );
}
