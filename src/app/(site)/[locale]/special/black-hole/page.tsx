import type { Metadata } from "next";
import Link from "next/link";

import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { withBasePathAsset } from "@/lib/base-path";
import { assertLocale, withLocale } from "@/lib/locale";
import { getBlackHolePage } from "@/server/services/site-service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const content = getBlackHolePage(locale);

  return {
    title: `${content.title} — Thoughost`,
    description: content.summary,
    openGraph: {
      title: `${content.title} — Thoughost`,
      description: content.summary,
      images: [withBasePathAsset("/images/releases/release-bar-1.png")],
    },
  };
}

export default async function BlackHolePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const content = getBlackHolePage(locale);

  return (
    <section className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-[#060606] text-white">
      <div className="black-hole-grid absolute inset-0 opacity-35" />
      <div className="black-hole-noise absolute inset-0 opacity-30" />
      <div className="black-hole-ring black-hole-ring-outer absolute left-1/2 top-1/2 h-[920px] w-[920px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="black-hole-ring black-hole-ring-mid absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="black-hole-core absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(240,64,52,0.12)_0%,rgba(240,64,52,0.05)_18%,rgba(0,0,0,0)_46%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

      <div className="relative mx-auto flex min-h-[calc(100svh-72px)] max-w-[1400px] items-center px-4 py-16 sm:px-6 lg:px-10">
        <div className="w-full">
          <StaggerGroup className="mx-auto flex max-w-[900px] flex-col items-center text-center" amount={0.08}>
            <StaggerItem>
              <h1 className="black-hole-enter text-[60px] leading-[0.82] font-semibold tracking-[-0.09em] text-white sm:text-[86px] md:text-[120px] lg:text-[158px]">
                {content.title}
              </h1>
            </StaggerItem>

            <StaggerItem>
              <div className="black-hole-enter black-hole-enter-late mt-8 border-y border-white/12 px-4 py-3 sm:px-6">
                <p className="black-hole-status-pulse text-[18px] leading-none font-semibold tracking-[0.28em] text-[#f04034] sm:text-[22px] md:text-[26px]">
                  {content.status}
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <p className="black-hole-enter black-hole-enter-late mt-8 max-w-[430px] text-[15px] leading-7 text-white/58 sm:text-[16px]">
                {content.summary}
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="black-hole-enter black-hole-enter-late mt-10">
                <Link
                  href={withLocale(locale, content.backLinkHref)}
                  className="motion-surface inline-flex items-center border border-white/18 px-4 py-2 text-[12px] font-semibold tracking-[0.12em] text-white/88 hover:border-[#f04034]/70 hover:bg-white/[0.03] hover:text-white"
                >
                  {content.backLinkLabel}
                </Link>
              </div>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
