import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { ReleaseDetailMeta } from "@/components/site/release-detail-meta";
import type { ReleaseDetailViewModel } from "@/types/site";

type ReleaseDetailLabels = {
  linksTitle: string;
  metaTitle: string;
};

export function ReleaseDetailHeader({
  release,
  labels,
}: {
  release: ReleaseDetailViewModel;
  labels: ReleaseDetailLabels;
}) {
  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 md:py-10 lg:px-0 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-10">
          <FadeIn className="motion-image-group">
            <div className="relative aspect-square overflow-hidden bg-neutral-100">
              <Image
                src={release.coverImage}
                alt={release.title}
                fill
                className="motion-image object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>
          </FadeIn>
          <StaggerGroup className="flex flex-col gap-6" fast>
            <StaggerItem>
              <p className="text-[12px] font-semibold tracking-[0.08em] text-neutral-500">
                {release.releaseType} · {release.releaseDateLabel}
              </p>
              <h1 className="mt-3 max-w-[680px] text-[34px] leading-[0.96] font-semibold tracking-[-0.05em] text-[#101010] md:text-[50px]">
                {release.title}
              </h1>
              {release.subtitle ? (
                <p className="mt-2 text-[15px] font-medium text-neutral-600 md:text-[16px]">{release.subtitle}</p>
              ) : null}
              <p className="mt-2 text-[15px] font-medium text-neutral-700 md:text-[16px]">{release.artistName}</p>
              <p className="mt-5 max-w-[760px] text-[15px] leading-7 text-neutral-700 md:text-[16px]">{release.summary}</p>
            </StaggerItem>

            {release.storeLinks.length ? (
              <StaggerItem className="border-t border-neutral-200 pt-4">
                <p className="text-[11px] font-semibold tracking-[0.08em] text-neutral-500">{labels.linksTitle}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  {release.storeLinks.map((link, index) => (
                    <div key={`${link.label}-${link.url}`} className="flex items-center gap-4">
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="motion-link text-[14px] font-medium text-[#101010] underline-offset-4 hover:text-neutral-600 hover:underline"
                      >
                        {link.label}
                      </Link>
                      {index < release.storeLinks.length - 1 ? <span className="text-neutral-300">/</span> : null}
                    </div>
                  ))}
                </div>
              </StaggerItem>
            ) : null}

            <StaggerItem className="border-t border-neutral-200 pt-4">
              <ReleaseDetailMeta title={labels.metaTitle} fields={release.infoFields} compact />
            </StaggerItem>
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
