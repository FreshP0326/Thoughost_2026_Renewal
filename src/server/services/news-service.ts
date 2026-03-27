import "server-only";

import { cache } from "react";
import { readFileSync } from "node:fs";
import path from "node:path";

import { newsContentModules } from "@/content/news";
import { renderMarkdown } from "@/lib/markdown";
import type {
  Locale,
  LocalizedText,
  NewsAdjacentItem,
  NewsArticleViewModel,
  NewsCardItem,
  NewsEntryMeta,
  NewsListItem,
} from "@/types/site";

type NewsContentItem = (typeof newsContentModules)[number];

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

function pickText(locale: Locale, value: LocalizedText) {
  return value[locale] ?? value.en;
}

function formatNewsDate(date: string) {
  return date.replaceAll("-", ".");
}

function getInternalHref(slug: string) {
  return `/news/${slug}`;
}

function assertMeta(meta: NewsEntryMeta) {
  if (!isoDatePattern.test(meta.date) || Number.isNaN(Date.parse(meta.date))) {
    throw new Error(`Invalid news date for "${meta.slug}": ${meta.date}`);
  }
}

function readBody(item: NewsContentItem, locale: Locale) {
  const filePath = path.join(process.cwd(), "src", "content", "news", "items", item.meta.slug, `${locale}.md`);
  const body = readFileSync(filePath, "utf8");

  if (!body.trim()) {
    throw new Error(`Missing ${locale}.md body for news "${item.meta.slug}"`);
  }

  return body;
}

function sortNews(a: NewsContentItem, b: NewsContentItem) {
  const pinDiff = Number(Boolean(b.meta.pinned)) - Number(Boolean(a.meta.pinned));

  if (pinDiff !== 0) {
    return pinDiff;
  }

  const dateDiff = Date.parse(b.meta.date) - Date.parse(a.meta.date);

  if (dateDiff !== 0) {
    return dateDiff;
  }

  return a.meta.slug.localeCompare(b.meta.slug);
}

const getPublishedNewsEntries = cache(() => {
  const seenSlugs = new Set<string>();

  return newsContentModules
    .map((item) => {
      assertMeta(item.meta);

      if (seenSlugs.has(item.meta.slug)) {
        throw new Error(`Duplicate news slug "${item.meta.slug}"`);
      }

      seenSlugs.add(item.meta.slug);

      return item;
    })
    .filter((item) => item.meta.published)
    .sort(sortNews);
});

function mapListItem(locale: Locale, item: NewsContentItem): NewsListItem {
  return {
    slug: item.meta.slug,
    title: pickText(locale, item.meta.title),
    summary: pickText(locale, item.meta.summary),
    dateLabel: formatNewsDate(item.meta.date),
    href: item.meta.externalUrl ?? getInternalHref(item.meta.slug),
    coverImage: item.meta.coverImage,
    coverAlt: item.meta.coverAlt ? pickText(locale, item.meta.coverAlt) : undefined,
    pinned: Boolean(item.meta.pinned),
    isExternal: Boolean(item.meta.externalUrl),
    category: item.meta.category,
  };
}

export function getAllNewsSlugs() {
  return getPublishedNewsEntries().map((item) => item.meta.slug);
}

export function getNewsList(locale: Locale): NewsListItem[] {
  return getPublishedNewsEntries().map((item) => mapListItem(locale, item));
}

export function getNewsPreview(locale: Locale, limit = 4): NewsCardItem[] {
  return getPublishedNewsEntries()
    .slice(0, limit)
    .map((item) => ({
      slug: item.meta.slug,
      title: pickText(locale, item.meta.title),
      dateLabel: formatNewsDate(item.meta.date),
      href: item.meta.externalUrl ?? getInternalHref(item.meta.slug),
      isExternal: Boolean(item.meta.externalUrl),
    }));
}

export const getNewsBySlug = cache(async (locale: Locale, slug: string): Promise<NewsArticleViewModel | null> => {
  const item = getPublishedNewsEntries().find((entry) => entry.meta.slug === slug);

  if (!item) {
    return null;
  }

  const html = await renderMarkdown(readBody(item, locale));

  return {
    slug: item.meta.slug,
    title: pickText(locale, item.meta.title),
    summary: pickText(locale, item.meta.summary),
    dateLabel: formatNewsDate(item.meta.date),
    href: item.meta.externalUrl ?? getInternalHref(item.meta.slug),
    coverImage: item.meta.coverImage,
    coverAlt: item.meta.coverAlt ? pickText(locale, item.meta.coverAlt) : undefined,
    html,
    pinned: Boolean(item.meta.pinned),
    category: item.meta.category,
    seoTitle: item.meta.seoTitle ? pickText(locale, item.meta.seoTitle) : undefined,
    seoDescription: item.meta.seoDescription ? pickText(locale, item.meta.seoDescription) : undefined,
  };
});

export function getAdjacentNews(locale: Locale, slug: string): { previous?: NewsAdjacentItem; next?: NewsAdjacentItem } {
  const list = getNewsList(locale);
  const index = list.findIndex((item) => item.slug === slug);

  if (index === -1) {
    return {};
  }

  const previousItem = list[index - 1];
  const nextItem = list[index + 1];

  return {
    previous: previousItem
      ? {
          slug: previousItem.slug,
          title: previousItem.title,
          href: previousItem.href,
          dateLabel: previousItem.dateLabel,
          isExternal: Boolean(previousItem.isExternal),
        }
      : undefined,
    next: nextItem
      ? {
          slug: nextItem.slug,
          title: nextItem.title,
          href: nextItem.href,
          dateLabel: nextItem.dateLabel,
          isExternal: Boolean(nextItem.isExternal),
        }
      : undefined,
  };
}
