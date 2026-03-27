import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { withBasePathAsset } from "@/lib/base-path";
import { withLocale } from "@/lib/locale";
import type { Locale, NewsListItem } from "@/types/site";

export function NewsList({
  locale,
  items,
  emptyLabel,
}: {
  locale: Locale;
  items: NewsListItem[];
  emptyLabel: string;
}) {
  if (!items.length) {
    return (
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-[1100px] border-t border-[var(--page-divider)] px-4 pt-6 sm:px-6 lg:px-0">
          <p className="text-[14px] leading-7 text-neutral-500">{emptyLabel}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-0">
        <div className="border-t border-[var(--page-divider)]">
          {items.map((item, index) => {
            const href = item.isExternal ? item.href : withLocale(locale, item.href);
            const delay = index < 8 ? Math.min(index * 0.04, 0.2) : 0.04;

            return (
              <FadeIn key={item.slug} delay={delay}>
                <Link
                  href={href}
                  className="group grid gap-5 border-b border-[var(--page-divider)] py-6 md:grid-cols-[148px_1fr_188px] md:gap-8 md:py-8"
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noreferrer" : undefined}
                >
                  <div className="space-y-2">
                    {item.pinned ? (
                      <div className="inline-flex border border-[var(--page-ink)] px-2 py-[3px] text-[10px] font-semibold tracking-[0.08em] text-[var(--page-ink)] uppercase">
                        Pin
                      </div>
                    ) : null}
                    <p className="text-[11px] leading-none font-semibold tracking-[0.08em] text-neutral-500 uppercase">
                      {item.dateLabel}
                    </p>
                  </div>
                  <div className="min-w-0 space-y-3">
                    <h2 className="max-w-[720px] text-[22px] leading-[1.08] font-semibold tracking-[-0.04em] text-[var(--page-ink)] motion-surface group-hover:text-neutral-600 md:text-[31px]">
                      {item.title}
                    </h2>
                    <p className="max-w-[700px] text-[14px] leading-7 text-neutral-600 md:text-[15px]">{item.summary}</p>
                  </div>
                  {item.coverImage ? (
                    <div className="hidden md:block">
                      <div className="relative aspect-[4/3] overflow-hidden border border-[var(--page-divider)]">
                        <Image
                          src={withBasePathAsset(item.coverImage)}
                          alt={item.coverAlt ?? item.title}
                          fill
                          loading={index < 2 ? "eager" : "lazy"}
                          sizes="188px"
                          className="object-cover motion-image"
                        />
                      </div>
                    </div>
                  ) : null}
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
