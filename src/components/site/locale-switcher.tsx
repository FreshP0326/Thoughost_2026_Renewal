import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/site";

const localeItems = [
  { key: "en", label: "En" },
  { key: "jp", label: "日" },
  { key: "zh", label: "中" },
] as const satisfies Array<{ key: Locale; label: string }>;

export function LocaleSwitcher({
  locale,
  pathname,
}: {
  locale: Locale;
  pathname: string;
}) {
  const pathWithoutLocale = pathname.replace(/^\/(en|zh|jp)(?=\/|$)/, "") || "";

  return (
    <FadeIn className="fixed top-1/2 right-4 z-40 -translate-y-1/2 sm:right-6" delay={0.12}>
      <div className="flex flex-col gap-2 border border-neutral-200 bg-white/92 p-1 backdrop-blur-[2px]">
        {localeItems.map((entry) => {
          const active = entry.key === locale;

          return (
            <Link
              key={entry.key}
              href={`/${entry.key}${pathWithoutLocale || ""}`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "motion-surface flex h-10 w-10 items-center justify-center border text-[18px] font-medium",
                active
                  ? "border-[#3a3a3a] bg-[#3a3a3a] !text-white visited:!text-white hover:bg-[#3a3a3a] hover:!text-white"
                  : "border-transparent bg-white !text-[#101010] visited:!text-[#101010] hover:border-[#101010] hover:bg-neutral-100 hover:!text-[#101010]",
              )}
            >
              {entry.label}
            </Link>
          );
        })}
      </div>
    </FadeIn>
  );
}
