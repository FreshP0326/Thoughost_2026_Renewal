"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { withLocale } from "@/lib/locale";
import { motionDurations, motionEasing } from "@/lib/motion";
import type { Locale, MemberProfile } from "@/types/site";

export function MemberDetailDialog({
  locale,
  members,
  labels,
}: {
  locale: Locale;
  members: MemberProfile[];
  labels: {
    representativeWorks: string;
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

  return (
    <AnimatePresence>
      {selectedSlug ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionDurations.base, ease: motionEasing.emphasized }}
          className="fixed inset-0 z-[70] flex items-end bg-black/60 md:items-center md:justify-center"
          aria-hidden={selectedMember ? undefined : true}
          onClick={closeDialog}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selectedMember?.name ?? labels.memberNotFound}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: motionDurations.base, ease: motionEasing.emphasized }}
            className="relative max-h-[92vh] w-full overflow-y-auto bg-white md:max-h-[86vh] md:max-w-[1080px]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeDialog}
              aria-label={labels.close}
              className="motion-surface sticky top-0 z-10 ml-auto flex h-12 w-12 items-center justify-center border-l border-b border-neutral-200 bg-white text-[var(--page-ink)] hover:bg-neutral-50"
            >
              <X size={18} />
            </button>

            {selectedMember ? (
              <div className="md:grid md:grid-cols-[minmax(420px,1.15fr)_minmax(360px,0.95fr)]">
                <div className="border-b border-neutral-200 bg-[var(--hero-surface)] md:border-r md:border-b-0">
                  <div className="relative aspect-[16/10] md:sticky md:top-0 md:aspect-[16/9]">
                    <div className="absolute inset-0 p-4 md:p-6 lg:p-8">
                      <div className="relative h-full w-full overflow-hidden border border-neutral-200 bg-neutral-100">
                        <Image
                          src={selectedMember.image}
                          alt={selectedMember.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 767px) 100vw, 56vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-8 pt-5 md:max-h-[calc(86vh-48px)] md:overflow-y-auto md:px-8 md:pb-10 md:pt-8">
                  <div className="border-b border-neutral-200 pb-5 md:pb-6">
                    <p className="text-[11px] leading-none font-semibold tracking-[0.08em] text-neutral-500">
                      {selectedMember.role}
                    </p>
                    <h2 className="mt-3 text-[34px] leading-[0.96] font-semibold tracking-[-0.05em] text-[var(--page-ink)] md:text-[40px]">
                      {selectedMember.name}
                    </h2>
                    {selectedMember.bio ? (
                      <div className="mt-4 space-y-3 md:space-y-4">
                        {selectedMember.bio.split("\n\n").map((paragraph) => (
                          <p key={paragraph} className="text-[14px] leading-7 text-neutral-700">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {selectedMember.representativeTracks.length ? (
                    <div className="border-b border-neutral-200 py-5 md:py-6">
                      <h3 className="text-[12px] leading-none font-semibold tracking-[0.06em] text-[var(--page-ink)]">
                        {labels.representativeWorks}
                      </h3>
                      <div className="mt-3 space-y-3">
                        {selectedMember.representativeTracks.map((track) => (
                          <Link
                            key={`${track.releaseSlug}-${track.trackNumber ?? track.trackTitle}`}
                            href={withLocale(locale, track.releaseHref)}
                            className="motion-surface block border border-neutral-200 px-4 py-3 hover:border-neutral-400"
                          >
                            <p className="text-[14px] leading-5 font-medium text-[var(--page-ink)]">
                              {track.trackNumber ? `${track.trackNumber}. ` : ""}
                              {track.trackTitle}
                            </p>
                            <p className="mt-1 text-[12px] leading-5 text-neutral-500">{track.releaseTitle}</p>
                            {track.trackArtist ? (
                              <p className="mt-1 text-[12px] leading-5 text-neutral-500">{track.trackArtist}</p>
                            ) : null}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {selectedMember.links.length ? (
                    <div className="py-5 md:py-6">
                      <h3 className="text-[12px] leading-none font-semibold tracking-[0.06em] text-[var(--page-ink)]">
                        {labels.links}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-2">
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
                    </div>
                  ) : null}
                </div>
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
