import { notFound } from "next/navigation";

import { supportedLocales } from "@/content/site/data";
import type { Locale } from "@/types/site";

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function assertLocale(value: string): Locale {
  if (!isLocale(value)) {
    notFound();
  }

  return value;
}

export function withLocale(locale: Locale, href: string) {
  return `/${locale}${href === "/" ? "" : href}`;
}

export function isSiteHomePath(pathname: string | null | undefined, locale: Locale) {
  return pathname === "/" || pathname === `/${locale}` || pathname === `/${locale}/`;
}

export function stripLocalePrefix(pathname: string) {
  return pathname.replace(/^\/(en|zh|ja)(?=\/|$)/, "") || "";
}

export function resolveSystemLocale(language: string | undefined): Locale {
  const normalized = language?.toLowerCase() ?? "";

  if (normalized.startsWith("zh")) {
    return "zh";
  }

  if (normalized.startsWith("ja")) {
    return "ja";
  }

  return "en";
}
