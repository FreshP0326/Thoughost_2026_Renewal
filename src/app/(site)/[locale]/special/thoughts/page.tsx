import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { PageIntro } from "@/components/site/page-intro";
import { assertLocale } from "@/lib/locale";
import { getPageContent } from "@/server/services/site-service";

const entries = {
  en: [
    {
      title: "On density",
      body: "Good edits do not need extra interface framing. The cover already carries enough energy; the page should step back.",
    },
    {
      title: "On collaboration",
      body: "When image language is strong, layout should become quieter so every release can keep its own pressure.",
    },
    {
      title: "On future cuts",
      body: "Short updates, unfinished drafts, and side material belong in a lightweight archive instead of a content-heavy blog.",
    },
  ],
  zh: [
    {
      title: "关于密度",
      body: "好的剪辑不需要额外的界面包装。封面本身已经足够有能量，页面应该主动后退。",
    },
    {
      title: "关于合作",
      body: "当图像语言足够强时，版式应该更安静，让每张作品都保留自己的压迫感。",
    },
    {
      title: "关于未来切片",
      body: "短更新、未完成草稿与边角材料，更适合放进轻量档案页，而不是内容臃肿的博客。",
    },
  ],
  ja: [
    {
      title: "密度について",
      body: "良い編集に余計な UI の額縁は不要です。カバー自体に十分なエネルギーがあるなら、ページは一歩引くべきです。",
    },
    {
      title: "コラボレーションについて",
      body: "イメージの言語が強いほど、レイアウトは静かであるべきです。そうすることで各作品がそれぞれの圧を保てます。",
    },
    {
      title: "次の断片について",
      body: "短い更新、未完成の草稿、サイド素材は、重いブログよりも軽いアーカイブに置く方が自然です。",
    },
  ],
} as const;

export default async function ThoughtsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const content = getPageContent(locale, "thoughts");

  return (
    <>
      <PageIntro title={content.title} body={content.body} />
      <section className="bg-white py-12 md:py-16">
        <StaggerGroup className="mx-auto max-w-[820px] space-y-8 px-4 sm:px-6 lg:px-0">
          {entries[locale].map((entry) => (
            <StaggerItem key={entry.title}>
              <article className="motion-surface border-b border-neutral-200 pb-8 hover:border-neutral-400">
                <h2 className="text-[28px] leading-none font-semibold tracking-[-0.04em] text-[#101010]">
                  {entry.title}
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-neutral-700">{entry.body}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </>
  );
}
