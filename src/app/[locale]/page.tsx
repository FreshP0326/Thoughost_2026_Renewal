import { HeroSection } from "@/components/sections/hero";
import { NewsSection } from "@/components/sections/news";
import { ReleasesGridSection } from "@/components/sections/releases-grid";
import { getDictionary } from "@/content/site/dictionaries";
import { assertLocale } from "@/lib/locale";
import { getFeaturedReleases, getHero, getNews } from "@/server/services/site-service";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const dictionary = getDictionary(locale);

  return (
    <>
      <HeroSection key={locale} locale={locale} slides={getHero(locale)} />
      <NewsSection
        locale={locale}
        title={dictionary.home.news}
        moreLabel={dictionary.home.more}
        items={getNews(locale)}
      />
      <ReleasesGridSection
        locale={locale}
        title={dictionary.home.releases}
        moreLabel={dictionary.home.more}
        items={getFeaturedReleases(locale)}
      />
    </>
  );
}
