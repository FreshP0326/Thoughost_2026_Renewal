"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

import { withBasePathAsset } from "@/lib/base-path";
import { withLocale } from "@/lib/locale";
import { dialogContent, dialogOverlay, motionEasing, motionTokens } from "@/lib/motion";
import type { Locale, MemberAppearanceSummary, MemberProfile, MemberProfileMetrics } from "@/types/site";

function splitBio(bio?: string) {
  return bio?.split("\n\n").filter(Boolean) ?? [];
}

function renderMetricValue(metrics: MemberProfileMetrics, key: "featuredTrackCount" | "releaseAppearanceCount" | "trackAppearanceCount") {
  return String(metrics[key]);
}

function SectionBlock({
  title,
  children,
  testId,
}: {
  title: string;
  children: React.ReactNode;
  testId?: string;
}) {
  return (
    <section className="border-t border-neutral-200 py-6 md:py-7" data-testid={testId}>
      <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)] md:gap-6">
        <div>
          <p className="detail-kicker">{title}</p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

function ReleasePreview({
  locale,
  release,
}: {
  locale: Locale;
  release: MemberAppearanceSummary;
}) {
  return (
    <Link
      href={withLocale(locale, release.releaseHref)}
      className="detail-panel group grid grid-cols-[88px_minmax(0,1fr)] gap-4 p-3 motion-surface hover:border-neutral-400"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Image
          src={withBasePathAsset(release.coverImage)}
          alt={release.releaseTitle}
          fill
          loading="lazy"
          className="motion-image object-cover"
          sizes="88px"
        />
      </div>
      <div className="min-w-0">
        <p className="detail-kicker">
          {release.releaseType} · {release.releaseDateLabel}
        </p>
        <h3 className="mt-2 text-[16px] leading-[1.2] font-semibold tracking-[-0.03em] text-[var(--page-ink)]">
          {release.releaseTitle}
        </h3>
        <p className="mt-3 text-[12px] leading-5 text-neutral-600">
          {release.matchKind === "primary"
            ? `Primary credit${release.matchedTrackCount > 0 ? ` · ${release.matchedTrackCount} track match` : ""}`
            : `${release.matchedTrackCount} matching track${release.matchedTrackCount === 1 ? "" : "s"}`}
        </p>
      </div>
    </Link>
  );
}

export function MemberDetailDialog({
  locale,
  members,
  labels,
}: {
  locale: Locale;
  members: MemberProfile[];
  labels: {
    profileOverview: string;
    representativeWorks: string;
    featuredTracks: string;
    selectedReleases: string;
    releaseAppearances: string;
    trackAppearances: string;
    latestRelease: string;
    links: string;
    close: string;
    memberNotFound: string;
  };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSlug = searchParams.get("member");

  const selectedMember = useMemo(
    () => members.find((member) => member.slug === selectedSlug) ?? null,
    [members, selectedSlug],
  );

  const closeDialog = useCallback(() => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("member");
    const query = nextParams.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (!selectedSlug) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeDialog, selectedSlug]);

  const bioParagraphs = splitBio(selectedMember?.bio);
  return (
    <AnimatePresence>
      {selectedSlug ? (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={dialogOverlay}
          className="fixed inset-0 z-[70] flex items-end bg-black/60 md:items-center md:justify-center"
          aria-hidden={selectedMember ? undefined : true}
          onClick={closeDialog}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selectedMember?.name ?? labels.memberNotFound}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dialogContent}
            className="relative max-h-[92vh] w-full overflow-y-auto bg-white md:max-h-[88vh] md:max-w-[1024px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
              <div className="flex min-h-12 items-center justify-between gap-4 pl-5 md:pl-8">
                <p className="detail-kicker">
                  {selectedMember ? `ABOUT / ${selectedMember.slug}` : "ABOUT"}
                </p>
                <button
                  type="button"
                  onClick={closeDialog}
                  aria-label={labels.close}
                  className="motion-surface flex h-12 w-12 items-center justify-center border-l border-neutral-200 text-[var(--page-ink)] hover:bg-neutral-50"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {selectedMember ? (
              <div className="px-5 pb-8 md:px-8 md:pb-10">
                <section className="py-5 md:py-8" data-testid="member-detail-hero">
                  <div className="grid gap-5 md:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] md:gap-8">
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: motionTokens.enterBase, ease: motionEasing.emphasized }}
                      className="detail-panel relative overflow-hidden bg-[var(--hero-surface)]"
                    >
                      <div className="relative aspect-[4/5] md:aspect-[4/4.8]">
                        <Image
                          src={withBasePathAsset(selectedMember.image)}
                          alt={selectedMember.name}
                          fill
                          loading="eager"
                          className="object-cover"
                          sizes="(max-width: 767px) 100vw, 560px"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: motionTokens.enterBase, delay: 0.04, ease: motionEasing.emphasized }}
                      className="detail-panel flex flex-col justify-between p-5 md:p-6"
                    >
                      <div>
                        <p className="detail-kicker">
                          {selectedMember.group === "members" ? "MEMBER PROFILE" : "STAFF PROFILE"}
                        </p>
                        <p className="mt-4 detail-kicker">
                          {selectedMember.role}
                        </p>
                        <h2 className="mt-3 text-[36px] leading-[0.94] font-semibold tracking-[-0.05em] text-[var(--page-ink)] md:text-[46px]">
                          {selectedMember.name}
                        </h2>
                        {bioParagraphs.length ? (
                          <div className="mt-6 border-t border-neutral-200 pt-6" data-testid="member-profile-bio">
                            <div className="space-y-4 text-[15px] leading-8 text-neutral-700 md:text-[16px]">
                              {bioParagraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>

                      {selectedMember.isArtistLike && selectedMember.metrics ? (
                        <div className="mt-8 border-t border-neutral-200 pt-4" data-testid="member-profile-metrics">
                          <p className="detail-kicker">
                            {labels.profileOverview}
                          </p>
                          <div className="detail-metadata-grid mt-4 sm:grid-cols-3">
                            <div className="detail-panel px-3 py-3">
                              <p className="detail-kicker">
                                {labels.featuredTracks}
                              </p>
                              <p className="mt-2 text-[24px] leading-none font-semibold tracking-[-0.04em] text-[var(--page-ink)]">
                                {renderMetricValue(selectedMember.metrics, "featuredTrackCount")}
                              </p>
                            </div>
                            <div className="detail-panel px-3 py-3">
                              <p className="detail-kicker">
                                {labels.releaseAppearances}
                              </p>
                              <p className="mt-2 text-[24px] leading-none font-semibold tracking-[-0.04em] text-[var(--page-ink)]">
                                {renderMetricValue(selectedMember.metrics, "releaseAppearanceCount")}
                              </p>
                            </div>
                            <div className="detail-panel px-3 py-3">
                              <p className="detail-kicker">
                                {labels.trackAppearances}
                              </p>
                              <p className="mt-2 text-[24px] leading-none font-semibold tracking-[-0.04em] text-[var(--page-ink)]">
                                {renderMetricValue(selectedMember.metrics, "trackAppearanceCount")}
                              </p>
                            </div>
                          </div>
                          {selectedMember.metrics.latestReleaseTitle ? (
                            <div className="detail-panel mt-4 px-3 py-3">
                              <p className="detail-kicker">
                                {labels.latestRelease}
                              </p>
                              <p className="mt-2 text-[15px] leading-6 font-medium text-[var(--page-ink)]">
                                {selectedMember.metrics.latestReleaseTitle}
                              </p>
                              <p className="mt-1 text-[12px] leading-5 text-neutral-500">
                                {selectedMember.metrics.latestReleaseDateLabel}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </motion.div>
                  </div>
                </section>

                {selectedMember.isArtistLike && selectedMember.selectedReleases.length ? (
                  <SectionBlock title={labels.selectedReleases} testId="member-selected-releases">
                    <div className="grid gap-3 md:grid-cols-3">
                      {selectedMember.selectedReleases.map((release) => (
                        <ReleasePreview key={release.releaseSlug} locale={locale} release={release} />
                      ))}
                    </div>
                  </SectionBlock>
                ) : null}

                {selectedMember.representativeTracks.length ? (
                  <SectionBlock title={labels.representativeWorks}>
                    <div className="space-y-3" data-testid="member-featured-tracks">
                      {selectedMember.representativeTracks.map((track) => (
                        <Link
                          key={`${track.releaseSlug}-${track.trackNumber ?? track.trackTitle}`}
                          href={withLocale(locale, track.releaseHref)}
                          className="detail-panel group block px-4 py-3 motion-surface hover:border-neutral-400"
                        >
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                            <p className="detail-kicker">
                              {track.trackNumber ? `#${track.trackNumber}` : labels.featuredTracks}
                            </p>
                            <p className="text-[12px] leading-5 text-neutral-500">{track.releaseTitle}</p>
                          </div>
                          <p className="mt-2 text-[16px] leading-6 font-medium text-[var(--page-ink)]">{track.trackTitle}</p>
                          {track.trackArtist ? (
                            <p className="mt-1 text-[12px] leading-5 text-neutral-500">{track.trackArtist}</p>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  </SectionBlock>
                ) : null}

                {selectedMember.links.length ? (
                  <SectionBlock title={labels.links}>
                    <div className="flex flex-wrap gap-2" data-testid="member-links">
                      {selectedMember.links.map((link) => (
                        <a
                          key={`${selectedMember.slug}-${link.label}`}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="motion-surface border border-neutral-300 px-3 py-2 text-[12px] leading-none text-[var(--page-ink)] hover:border-neutral-500"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </SectionBlock>
                ) : null}
              </div>
            ) : (
              <div className="px-6 pb-8 pt-4 md:px-8 md:pb-10">
                <p className="text-[15px] leading-7 text-neutral-700">{labels.memberNotFound}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
