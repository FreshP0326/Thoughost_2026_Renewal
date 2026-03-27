import type { Locale, ReleaseDetailViewModel } from "@/types/site";

import { ReleaseDetailHeader } from "@/components/site/release-detail-header";
import { ReleaseDetailTracklist } from "@/components/site/release-detail-tracklist";

function getLabels(locale: Locale) {
  const labels = {
    en: {
      linksTitle: "Links",
      meta: "Release Information",
      tracklist: "Tracklist",
      trackNumber: "Track",
      trackArtist: "Artist / Contributor",
    },
    zh: {
      linksTitle: "外部链接",
      meta: "发行信息",
      tracklist: "曲目列表",
      trackNumber: "曲目",
      trackArtist: "作者 / 参与者",
    },
    ja: {
      linksTitle: "リンク",
      meta: "リリース情報",
      tracklist: "トラックリスト",
      trackNumber: "Track",
      trackArtist: "Artist / Contributor",
    },
  } as const;

  return labels[locale];
}

export function ReleaseDetail({
  locale,
  release,
}: {
  locale: Locale;
  release: ReleaseDetailViewModel;
}) {
  const labels = getLabels(locale);

  return (
    <>
      <ReleaseDetailHeader
        release={release}
        labels={{
          linksTitle: labels.linksTitle,
          metaTitle: labels.meta,
        }}
      />
      <ReleaseDetailTracklist
        tracks={release.tracksDetailed}
        labels={{
          title: labels.tracklist,
          number: labels.trackNumber,
          artist: labels.trackArtist,
        }}
      />
    </>
  );
}
