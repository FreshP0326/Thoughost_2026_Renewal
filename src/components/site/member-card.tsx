import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { withLocale } from "@/lib/locale";
import type { Locale, MemberProfile } from "@/types/site";

export function MemberCard({
  locale,
  member,
  viewProfileLabel,
}: {
  locale: Locale;
  member: MemberProfile;
  viewProfileLabel: string;
}) {
  const previewTracks = member.representativeTracks.slice(0, 2);

  return (
    <FadeIn>
      <Link
        href={withLocale(locale, `/about?member=${member.slug}`)}
        scroll={false}
        className="group motion-image-group block border border-neutral-200 bg-white motion-surface hover:border-neutral-400"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="motion-image object-cover group-hover:opacity-94 group-hover:brightness-105"
            sizes="(max-width: 767px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="motion-overlay absolute inset-0 bg-gradient-to-t from-black/16 via-transparent to-transparent opacity-0 group-hover:opacity-100" />
        </div>
        <div className="space-y-2 px-4 py-4">
          <p className="text-[11px] leading-none font-semibold tracking-[0.08em] text-neutral-500">{member.role}</p>
          <div>
            <h3 className="motion-lift-subtle text-[18px] leading-[1.1] font-semibold tracking-[-0.04em] text-[var(--page-ink)] motion-surface">
              {member.name}
            </h3>
          </div>
          {previewTracks.length ? (
            <p className="border-t border-neutral-200 pt-3 text-[12px] leading-5 text-neutral-500 motion-surface group-hover:text-neutral-600">
              {previewTracks.map((track) => track.trackTitle).join(" / ")}
            </p>
          ) : null}
          <p className="pt-1 text-[11px] leading-none font-semibold tracking-[0.04em] text-[var(--page-ink)] motion-surface group-hover:text-neutral-700">
            {viewProfileLabel} →
          </p>
        </div>
      </Link>
    </FadeIn>
  );
}
