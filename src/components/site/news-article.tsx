import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { withBasePathAsset } from "@/lib/base-path";
import { withLocale } from "@/lib/locale";
import type { Locale, NewsAdjacentItem, NewsArticleViewModel } from "@/types/site";

export function NewsArticle({
  locale,
  article,
  backLabel,
  publishedLabel,
  moreLabel,
  adjacent,
}: {
  locale: Locale;
  article: NewsArticleViewModel;
  backLabel: string;
  publishedLabel: string;
  moreLabel: string;
  adjacent: { previous?: NewsAdjacentItem; next?: NewsAdjacentItem };
}) {
  return (
    <article className="bg-white pb-14 md:pb-20">
      <section className="border-b border-[var(--page-divider)] bg-white">
        <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 lg:px-0 lg:py-16">
          <FadeIn y={14}>
            <Link
              href={withLocale(locale, "/news")}
              className="inline-flex text-[11px] leading-none font-semibold tracking-[0.08em] text-neutral-500 uppercase motion-link hover:text-[var(--page-ink)]"
            >
              {backLabel}
            </Link>
          </FadeIn>
          <FadeIn delay={0.04} y={12}>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {article.pinned ? (
                <span className="inline-flex border border-[var(--page-ink)] px-2 py-[3px] text-[10px] font-semibold tracking-[0.08em] text-[var(--page-ink)] uppercase">
                  Pin
                </span>
              ) : null}
              <p className="text-[11px] leading-none font-semibold tracking-[0.08em] text-neutral-500 uppercase">
                {publishedLabel} · {article.dateLabel}
              </p>
            </div>
            <h1 className="mt-4 max-w-[860px] text-[32px] leading-[1.04] font-semibold tracking-[-0.045em] text-[var(--page-ink)] md:text-[48px]">
              {article.title}
            </h1>
            <p className="mt-5 max-w-[760px] text-[15px] leading-7 text-neutral-600">{article.summary}</p>
          </FadeIn>
        </div>
      </section>

      {article.coverImage ? (
        <section className="bg-white pt-8 md:pt-10">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-0">
            <FadeIn>
              <div className="relative aspect-[16/9] overflow-hidden border border-[var(--page-divider)]">
                <Image
                  src={withBasePathAsset(article.coverImage)}
                  alt={article.coverAlt ?? article.title}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, 1100px"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </section>
      ) : null}

      <section className="bg-white pt-10 md:pt-12">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-0">
          <FadeIn>
            <div
              className="news-prose max-w-[760px]"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
          </FadeIn>
        </div>
      </section>

      {adjacent.previous || adjacent.next ? (
        <section className="bg-white pt-12">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-0">
            <div className="grid gap-4 border-t border-[var(--page-divider)] pt-6 md:grid-cols-2">
              {[adjacent.previous, adjacent.next].filter(Boolean).map((item) => (
                <Link
                  key={item?.slug}
                  href={item && item.isExternal ? item.href : withLocale(locale, item!.href)}
                  className="group border-b border-[var(--page-divider)] py-4 md:border-b-0"
                  target={item?.isExternal ? "_blank" : undefined}
                  rel={item?.isExternal ? "noreferrer" : undefined}
                >
                  <p className="text-[11px] leading-none font-semibold tracking-[0.08em] text-neutral-500 uppercase">
                    {moreLabel}
                  </p>
                  <h2 className="mt-3 text-[19px] leading-[1.15] font-semibold tracking-[-0.03em] text-[var(--page-ink)] motion-surface group-hover:text-neutral-600">
                    {item?.title}
                  </h2>
                  <p className="mt-2 text-[12px] text-neutral-500">{item?.dateLabel}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
