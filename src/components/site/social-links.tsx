import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { SocialIconLink } from "@/types/site";

function SocialIcon({ iconKey, label }: { iconKey: string; label: string }) {
  if (iconKey === "x" || iconKey === "bandcamp" || iconKey === "soundcloud") {
    return <Image src={`/icons/social/${iconKey}.svg`} alt={label} width={18} height={18} />;
  }

  return <span className="text-[11px] font-semibold uppercase">{label.slice(0, 2)}</span>;
}

export function SocialLinks({
  links,
  dark = false,
}: {
  links: SocialIconLink[];
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {links.map((item) => (
        <Link
          key={item.platform}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          className={cn(
            "motion-surface flex h-8 w-8 items-center justify-center border hover:-translate-y-px",
            dark
              ? "border-neutral-600 bg-neutral-500/20 hover:border-neutral-400 hover:bg-neutral-500/30"
              : "border-transparent hover:border-neutral-200 hover:bg-neutral-100",
          )}
        >
          <SocialIcon iconKey={item.iconKey} label={item.label} />
        </Link>
      ))}
    </div>
  );
}
