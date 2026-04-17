import { HomeLanding } from "@/components/site/home-landing";
import { getDictionary } from "@/content/site/dictionaries";
import { getNewsPreview } from "@/server/services/news-service";
import { getHero, getHomeReleases } from "@/server/services/site-service";

export default function RootPage() {
  const locale = "en";
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
