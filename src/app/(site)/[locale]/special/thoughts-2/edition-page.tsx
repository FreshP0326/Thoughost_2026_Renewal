import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { Thoughts2Special } from "@/components/site/thoughts-2-special";
import {
  featuredThoughts2Edition,
  getThoughts2Special,
  thoughts2ReleaseSlug,
  type Thoughts2Edition,
} from "@/content/site/thoughts2-special";
import { withBasePathAsset } from "@/lib/base-path";
import { assertLocale, withLocale } from "@/lib/locale";
import { getReleaseBySlug } from "@/server/services/site-service";

export async function buildThoughts2EditionMetadata({
  params,
  edition,
}: {
  params: Promise<{ locale: string }>;
  edition: Thoughts2Edition;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const release = getReleaseBySlug(locale, thoughts2ReleaseSlug);

  if (!release) {
    return {};
  }

  const page = getThoughts2Special(locale, edition);

  return {
    title: `${release.title} — ${page.currentEdition.shortTitle} | Thoughost`,
    description: page.currentEdition.summary,
    openGraph: {
      title: `${release.title} — ${page.currentEdition.shortTitle}`,
      description: page.currentEdition.description,
      images: [{ url: withBasePathAsset(release.coverImage) }],
    },
  };
}

export async function renderThoughts2EditionPage({
  params,
  edition,
}: {
  params: Promise<{ locale: string }>;
  edition: Thoughts2Edition;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const release = getReleaseBySlug(locale, thoughts2ReleaseSlug);

  if (!release) {
    notFound();
  }

  const page = getThoughts2Special(locale, edition);

  return <Thoughts2Special locale={locale} release={release} page={page} />;
}

export async function redirectToFeaturedThoughts2Edition({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);

  redirect(withLocale(locale, `/special/thoughts-2/${featuredThoughts2Edition}`));
}
