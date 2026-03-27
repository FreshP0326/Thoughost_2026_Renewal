import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ReleaseDetail } from "@/components/site/release-detail";
import { releases, supportedLocales } from "@/content/site/data";
import { withBasePathAsset } from "@/lib/base-path";
import { assertLocale } from "@/lib/locale";
import { getReleaseBySlug } from "@/server/services/site-service";

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) =>
    releases.map((release) => ({
      locale,
      slug: release.slug,
    })),
  );
}

export const dynamicParams = false;

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
          url: withBasePathAsset(release.coverImage),
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
