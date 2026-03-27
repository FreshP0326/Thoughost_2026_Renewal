import { PageIntro } from "@/components/site/page-intro";
import { ReleaseTabs } from "@/components/site/release-tabs";
import { getDictionary } from "@/content/site/dictionaries";
import { assertLocale } from "@/lib/locale";
import { getReleases } from "@/server/services/site-service";

export default async function ReleasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const dictionary = getDictionary(locale);

  const body =
    locale === "zh"
      ? "按时间浏览 Thoughost 的作品目录，包括专辑、EP、单曲与合作作品。"
      : locale === "jp"
        ? "Thoughost の作品群を時系列で閲覧できます。アルバム、EP、シングル、コラボ作品を含みます。"
        : "Browse Thoughost releases by chronology, from albums and EPs to singles and collaborations.";

  const filterLabels =
    locale === "zh"
      ? {
          All: "全部",
          Album: "专辑",
          EP: "EP",
          Single: "单曲",
          Compilation: "合集",
          Collaboration: "合作",
        }
      : locale === "jp"
        ? {
            All: "All",
            Album: "Album",
            EP: "EP",
            Single: "Single",
            Compilation: "Compilation",
            Collaboration: "Collab",
          }
        : {
            All: "All",
            Album: "Album",
            EP: "EP",
            Single: "Single",
            Compilation: "Compilation",
            Collaboration: "Collaboration",
          };

  return (
    <>
      <PageIntro title={dictionary.pages.discographyHeading} body={body} />
      <ReleaseTabs
        locale={locale}
        title={dictionary.home.releases}
        moreLabel={dictionary.home.more}
        items={getReleases(locale)}
        labels={filterLabels}
      />
    </>
  );
}
