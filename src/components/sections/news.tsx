import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { SectionHeading } from "@/components/site/section-heading";
import { withLocale } from "@/lib/locale";
import type { Locale, NewsCardItem } from "@/types/site";

export function NewsSection({
  locale,
  title,
  moreLabel,
  items,
}: {
  locale: Locale;
  title: string;
  moreLabel: string;
  items: NewsCardItem[];
}) {
  return (
    <section id="news" className="bg-white pt-[22px] pb-[34px] md:pt-[26px] md:pb-[38px]">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-0">
        <FadeIn>
          <SectionHeading title={title} />
        </FadeIn>
        <StaggerGroup className="mt-[10px] grid gap-x-[46px] gap-y-0 md:mt-[12px] md:grid-cols-2">
          {items.map((item) => (
            <StaggerItem key={item.slug}>
              <Link
                href={withLocale(locale, item.href)}
                className="group grid grid-cols-[67px_1fr] items-center gap-x-3 border-b border-neutral-300 py-[13px] motion-surface hover:border-neutral-500"
              >
                <span className="inline-flex h-[16px] items-center justify-center bg-[var(--page-ink)] px-[4px] text-[9px] font-semibold leading-none tracking-[0.01em] text-white motion-surface group-hover:bg-[#1c1c1c]">
                  {item.dateLabel}
                </span>
                <span className="flex items-center justify-between gap-4 overflow-hidden">
                  <span className="truncate text-[13px] font-medium tracking-[0em] text-[var(--page-ink)] motion-surface group-hover:translate-x-[2px] group-hover:text-[#202020]">
                    {item.title}
                  </span>
                  <span className="motion-surface text-[11px] text-neutral-300 opacity-0 group-hover:opacity-100">
                    →
                  </span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <FadeIn className="mt-[7px] flex justify-end" delay={0.08}>
          <Link href={withLocale(locale, "/special/thoughts")} className="text-[10px] font-semibold tracking-[0.03em] text-[var(--page-ink)] motion-surface hover:text-neutral-500">
            {moreLabel} →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
