import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { ReleaseDetailMeta } from "@/components/site/release-detail-meta";
import { withBasePathAsset } from "@/lib/base-path";
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
  const summaryParagraphs = release.summary.split("\n\n").filter(Boolean);

  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="site-nav-frame py-8 md:py-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-10">
          <FadeIn className="motion-image-group">
            <div className="relative aspect-square overflow-hidden bg-neutral-100">
              <Image
                src={withBasePathAsset(release.coverImage)}
                alt={release.title}
                fill
                loading="eager"
                fetchPriority="high"
                className="motion-image object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>
          </FadeIn>
          <StaggerGroup className="flex flex-col gap-6" density="tight">
            <StaggerItem>
              <p className="type-meta text-neutral-500">
                {release.releaseType} · {release.releaseDateLabel}
              </p>
              <h1 className="type-detail-title mt-3 max-w-[680px] text-[#101010]">
                {release.title}
              </h1>
              {release.subtitle ? (
                <p className="type-summary mt-3 max-w-[720px] text-neutral-600">{release.subtitle}</p>
              ) : null}
              <p className="mt-2 text-[15px] leading-[1.45] font-semibold tracking-[-0.01em] text-neutral-700 md:text-[16px]">{release.artistName}</p>
              <div className="type-body mt-5 max-w-[760px] space-y-4 text-neutral-700">
                {summaryParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </StaggerItem>

            {release.storeLinks.length ? (
              <StaggerItem className="border-t border-neutral-200 pt-4">
                <p className="type-meta text-neutral-500">{labels.linksTitle}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  {release.storeLinks.map((link, index) => (
                    <div key={`${link.label}-${link.url}`} className="flex items-center gap-4">
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="motion-link text-[15px] leading-[1.35] font-medium text-[#101010] underline-offset-4 hover:text-neutral-600 hover:underline"
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
