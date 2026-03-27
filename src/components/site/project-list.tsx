import Image from "next/image";
import Link from "next/link";

import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { withBasePathAsset } from "@/lib/base-path";
import { withLocale } from "@/lib/locale";
import type { Locale } from "@/types/site";

export function ProjectList({
  locale,
  items,
}: {
  locale: Locale;
  items: Array<{
    slug: string;
    title: string;
    summary: string;
    coverImage: string;
    href: string;
  }>;
}) {
  return (
    <section className="bg-white py-12 md:py-16">
      <StaggerGroup className="mx-auto max-w-[1100px] space-y-6 px-4 sm:px-6 lg:px-0" density="base">
        {items.map((item, index) => (
          <StaggerItem key={item.slug}>
            <Link
              href={withLocale(locale, item.href)}
              className="group motion-image-group grid gap-4 border-b border-neutral-200 pb-6 motion-surface hover:border-neutral-400 md:grid-cols-[300px_1fr]"
            >
              <div className="relative aspect-[16/5] overflow-hidden bg-neutral-100 md:aspect-[3/1]">
                <Image
                  src={withBasePathAsset(item.coverImage)}
                  alt={item.title}
                  fill
                  loading={index < 2 ? "eager" : "lazy"}
                  className="motion-image object-cover group-hover:opacity-97 group-hover:brightness-105"
                  sizes="30vw"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="motion-lift-subtle text-[28px] leading-none font-semibold tracking-[-0.04em] text-[#101010] motion-surface group-hover:text-[#181818]">
                  {item.title}
                </h2>
                <p className="mt-3 max-w-[560px] text-[15px] leading-7 text-neutral-600 motion-surface group-hover:text-neutral-800">
                  {item.summary}
                </p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
