import { FadeIn } from "@/components/motion/fade-in";

import type { ReleaseTrack } from "@/types/site";

type ReleaseTracklistLabels = {
  title: string;
  number: string;
  artist: string;
};

export function ReleaseDetailTracklist({
  tracks,
  labels,
}: {
  tracks: ReleaseTrack[];
  labels: ReleaseTracklistLabels;
}) {
  return (
    <section id="tracklist" className="border-b border-neutral-200 bg-white">
      <div className="site-nav-frame py-10 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
          <FadeIn>
            <h2 className="type-section-title text-[#101010]">{labels.title}</h2>
          </FadeIn>
          <div className="border-t border-neutral-200">
            <div className="type-meta grid grid-cols-[64px_minmax(0,1fr)] gap-4 border-b border-neutral-200 py-3 text-neutral-500 md:grid-cols-[64px_minmax(0,1fr)_minmax(160px,220px)]">
              <p>{labels.number}</p>
              <p>{labels.title}</p>
              <p className="hidden md:block">{labels.artist}</p>
            </div>
            {tracks.map((track, index) => (
              <FadeIn
                key={`${track.disc ?? "disc"}-${track.number ?? index}-${track.title}`}
                className="motion-surface grid grid-cols-[64px_minmax(0,1fr)] gap-4 border-b border-neutral-200 py-3 hover:border-neutral-400 md:grid-cols-[64px_minmax(0,1fr)_minmax(160px,220px)]"
                delay={Math.min(index * 0.015, 0.14)}
              >
                <p className="text-[13px] leading-[1.35] font-medium text-neutral-500">{track.number ?? String(index + 1).padStart(2, "0")}</p>
                <div>
                  {track.disc ? (
                    <p className="type-meta mb-1 text-neutral-500">{track.disc}</p>
                  ) : null}
                  <p className="text-[15px] leading-[1.4] font-medium tracking-[-0.012em] text-[#101010] md:text-[16px]">{track.title}</p>
                  {track.artist ? <p className="mt-1 text-[14px] leading-[1.45] text-neutral-600 md:hidden">{track.artist}</p> : null}
                </div>
                <p className="hidden text-[14px] leading-[1.45] text-neutral-600 md:block">{track.artist ?? "—"}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
