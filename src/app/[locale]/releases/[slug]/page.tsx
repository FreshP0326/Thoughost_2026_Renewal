import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ReleaseDetail } from "@/components/site/release-detail";
import { assertLocale } from "@/lib/locale";
import { getReleaseBySlug } from "@/server/services/site-service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = assertLocale(rawLocale);
  const release = getReleaseBySlug(locale, slug);

  if (!release) {
    return {};
  }

  return {
    title: `${release.title} | Thoughost`,
    description: release.summary,
    openGraph: {
      title: release.title,
      description: release.summary,
      images: [
        {
          url: release.coverImage,
        },
      ],
    },
  };
}

export default async function ReleaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = assertLocale(rawLocale);
  const release = getReleaseBySlug(locale, slug);

  if (!release) {
    notFound();
  }

  return <ReleaseDetail locale={locale} release={release} />;
}
