import Image from "next/image";
import Link from "next/link";

import { withBasePathAsset } from "@/lib/base-path";
import { cn } from "@/lib/utils";
import type { SocialIconLink } from "@/types/site";

function SocialIcon({ iconKey, label, dark = false }: { iconKey: string; label: string; dark?: boolean }) {
  if (["x", "bandcamp", "soundcloud", "bilibili", "dizzylab"].includes(iconKey)) {
    return (
      <Image
        src={withBasePathAsset(`/icons/social/${iconKey}.svg`)}
        alt={label}
        width={18}
        height={18}
        className={cn("h-[16px] w-[16px]", dark && "opacity-95 brightness-0 invert")}
      />
    );
  }

  return <span className={cn("text-[11px] leading-none font-medium uppercase", dark && "text-white")}>{label.slice(0, 2)}</span>;
}

export function SocialLinks({
  links,
  dark = false,
}: {
  links: SocialIconLink[];
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-[var(--header-cluster-gap)]">
      {links.map((item) => (
        <Link
          key={item.platform}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          className={cn(
            "motion-surface motion-image-group flex items-center justify-center border",
            dark
              ? "border-neutral-500 bg-white/[0.06] hover:border-neutral-300 hover:bg-white/[0.12]"
              : "border-transparent hover:border-neutral-300 hover:bg-neutral-100",
          )}
          style={{ width: "var(--header-control-size)", height: "var(--header-control-size)" }}
        >
          <SocialIcon iconKey={item.iconKey} label={item.label} dark={dark} />
        </Link>
      ))}
    </div>
  );
}
