import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/types/site";

export function SiteLogo({ locale }: { locale: Locale }) {
  return (
    <Link href={`/${locale}`} aria-label="Thoughost home" className="inline-flex items-center">
      <Image src="/thoughost-logo.svg" alt="Thoughost" width={128} height={28} priority />
    </Link>
  );
}
