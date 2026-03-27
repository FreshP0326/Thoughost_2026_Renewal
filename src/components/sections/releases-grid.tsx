import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { SectionHeading } from "@/components/site/section-heading";
import { withBasePathAsset } from "@/lib/base-path";
import { withLocale } from "@/lib/locale";
import type { Locale, ReleaseGridItem } from "@/types/site";

export function ReleasesGridSection({
  locale,
  title,
  moreLabel,
  items,
}: {
  locale: Locale;
  title: string;
  moreLabel: string;
  items: ReleaseGridItem[];
}) {
  return (
    <section id="releases" className="bg-[#f3f3f3] pt-[36px] pb-[44px] md:pt-[40px] md:pb-[48px]">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-0">
        <FadeIn>
          <SectionHeading title={title} />
        </FadeIn>
        <StaggerGroup className="mt-[16px] grid grid-cols-2 gap-[5px] sm:grid-cols-3 lg:grid-cols-5" fast>
          {items.map((item) => (
            <StaggerItem key={item.slug}>
              <Link
                href={withLocale(locale, `/releases/${item.slug}`)}
                className="group motion-image-group motion-border relative block overflow-hidden border border-transparent bg-neutral-200 hover:border-neutral-400"
              >
                <div className="relative aspect-square">
                  <Image
                    src={withBasePathAsset(item.coverImage)}
                    alt={item.title}
                    fill
                    className="motion-image object-cover group-hover:opacity-95 group-hover:brightness-105"
                    sizes="(max-width: 1024px) 50vw, 20vw"
                  />
                </div>
                <div className="motion-overlay absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/72 via-black/22 to-transparent p-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[13px] font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-[11px] text-white/80">{item.artistName}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <FadeIn className="mt-[8px] flex justify-end" delay={0.08}>
          <Link href={withLocale(locale, "/releases")} className="text-[10px] font-semibold tracking-[0.02em] text-[#101010] motion-surface hover:text-neutral-500">
            {moreLabel} →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
