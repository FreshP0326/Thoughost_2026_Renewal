import type { Locale, ReleaseDetailViewModel } from "@/types/site";

import { ReleaseDetailHeader } from "@/components/site/release-detail-header";
import { ReleaseDetailMeta } from "@/components/site/release-detail-meta";
import { ReleaseDetailTracklist } from "@/components/site/release-detail-tracklist";

function getLabels(locale: Locale) {
  const labels = {
    en: {
      infoTitle: "INFO",
      creditTitle: "CREDIT",
      relatedLinksTitle: "RELATED LINKS",
      artworkDownload: "ARTWORK DOWNLOAD",
    },
    zh: {
      infoTitle: "INFO",
      creditTitle: "CREDIT",
      relatedLinksTitle: "RELATED LINKS",
      artworkDownload: "ARTWORK DOWNLOAD",
    },
    ja: {
      infoTitle: "INFO",
      creditTitle: "CREDIT",
      relatedLinksTitle: "RELATED LINKS",
      artworkDownload: "ARTWORK DOWNLOAD",
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
      <ReleaseDetailHeader release={release} />
      <ReleaseDetailTracklist
        release={release}
        labels={{
          artworkDownload: labels.artworkDownload,
        }}
      />
      <ReleaseDetailMeta
        release={release}
        labels={{
          infoTitle: labels.infoTitle,
          creditTitle: labels.creditTitle,
          relatedLinksTitle: labels.relatedLinksTitle,
        }}
      />
    </>
  );
}
