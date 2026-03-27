import Image from "next/image";
import Link from "next/link";

import { withBasePathAsset } from "@/lib/base-path";
import type { Locale } from "@/types/site";

export function SiteLogo({ locale }: { locale: Locale }) {
  return (
    <Link href={`/${locale}`} aria-label="Thoughost home" className="inline-flex items-center">
      <Image
        src={withBasePathAsset("/thoughost-logo.svg")}
        alt="Thoughost"
        width={132}
        height={29}
        priority
        className="h-[26px] w-auto md:h-[29px]"
      />
    </Link>
  );
}
