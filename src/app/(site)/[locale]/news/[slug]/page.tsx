import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NewsArticle } from "@/components/site/news-article";
import { supportedLocales } from "@/content/site/data";
import { getDictionary } from "@/content/site/dictionaries";
import { withBasePathAsset } from "@/lib/base-path";
import { assertLocale } from "@/lib/locale";
import { getAdjacentNews, getAllNewsSlugs, getNewsBySlug } from "@/server/services/news-service";

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) =>
    getAllNewsSlugs().map((slug) => ({
      locale,
      slug,
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
  const article = await getNewsBySlug(locale, slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.seoTitle ?? article.title} | Thoughost`,
    description: article.seoDescription ?? article.summary,
    openGraph: {
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.summary,
      images: article.coverImage
        ? [
            {
              url: withBasePathAsset(article.coverImage),
            },
          ]
        : undefined,
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = assertLocale(rawLocale);
  const dictionary = getDictionary(locale);
  const article = await getNewsBySlug(locale, slug);

  if (!article) {
    notFound();
  }

  return (
    <NewsArticle
      locale={locale}
      article={article}
      backLabel={dictionary.news.backToNews}
      publishedLabel={dictionary.news.publishedOn}
      moreLabel={dictionary.news.moreNews}
      adjacent={getAdjacentNews(locale, slug)}
    />
  );
}
