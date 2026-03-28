import { HeroSection } from "@/components/sections/hero";
import { NewsSection } from "@/components/sections/news";
import { ReleasesGridSection } from "@/components/sections/releases-grid";
import type { HeroSlide, Locale, NewsCardItem, ReleaseGridItem } from "@/types/site";

export function HomeLanding({
  locale,
  heroSlides,
  newsTitle,
  newsMoreLabel,
  newsItems,
  releasesTitle,
  releasesMoreLabel,
  releaseItems,
}: {
  locale: Locale;
  heroSlides: HeroSlide[];
  newsTitle: string;
  newsMoreLabel: string;
  newsItems: NewsCardItem[];
  releasesTitle: string;
  releasesMoreLabel: string;
  releaseItems: ReleaseGridItem[];
}) {
  return (
    <>
      <HeroSection key={locale} locale={locale} slides={heroSlides} />
      <NewsSection locale={locale} title={newsTitle} moreLabel={newsMoreLabel} moreHref="/news" items={newsItems} />
      <ReleasesGridSection locale={locale} title={releasesTitle} moreLabel={releasesMoreLabel} items={releaseItems} />
    </>
  );
}
