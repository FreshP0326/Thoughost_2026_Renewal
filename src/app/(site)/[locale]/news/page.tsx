import { PageIntro } from "@/components/site/page-intro";
import { NewsList } from "@/components/site/news-list";
import { getDictionary } from "@/content/site/dictionaries";
import { assertLocale } from "@/lib/locale";
import { getNewsList } from "@/server/services/news-service";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const dictionary = getDictionary(locale);

  const body =
    locale === "zh"
      ? "按时间浏览 Thoughost 的厂牌动态、发行说明与短篇编辑式更新。"
      : locale === "ja"
        ? "Thoughost のレーベル更新、リリースノート、短いエディトリアル記事を時系列で閲覧できます。"
        : "Browse Thoughost label updates, release notes, and short editorial entries in one archive.";

  return (
    <>
      <PageIntro title={dictionary.pages.newsHeading.toUpperCase()} body={body} />
      <NewsList locale={locale} items={getNewsList(locale)} emptyLabel={dictionary.news.emptyState} />
    </>
  );
}
