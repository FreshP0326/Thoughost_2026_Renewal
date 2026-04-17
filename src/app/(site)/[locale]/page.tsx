import { HomeLanding } from "@/components/site/home-landing";
import { getDictionary } from "@/content/site/dictionaries";
import { assertLocale } from "@/lib/locale";
import { getHero, getHomeReleases } from "@/server/services/site-service";
import { getNewsPreview } from "@/server/services/news-service";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const dictionary = getDictionary(locale);

  return (
    <HomeLanding
      locale={locale}
      heroSlides={getHero(locale)}
      newsTitle={dictionary.home.news}
      newsMoreLabel={dictionary.home.more}
      newsItems={getNewsPreview(locale)}
      releasesTitle={dictionary.home.releases}
      releasesMoreLabel={dictionary.home.more}
      releaseItems={getHomeReleases(locale)}
    />
  );
}
