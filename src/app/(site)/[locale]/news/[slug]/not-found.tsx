import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";

export default function NewsArticleNotFound() {
  const copy = {
    title: "This news entry could not be found.",
    body: "It may not be published yet, or the link may have changed. Return to the NEWS archive to keep browsing.",
    cta: "Back to NEWS",
    href: "/en/news",
  };

  return (
    <section className="bg-white py-18 md:py-24">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-0">
        <FadeIn>
          <div className="max-w-[620px] border-t border-[var(--page-divider)] pt-6">
            <p className="text-[11px] leading-none font-semibold tracking-[0.08em] text-neutral-500 uppercase">404</p>
            <h1 className="mt-4 text-[32px] leading-[1.04] font-semibold tracking-[-0.04em] text-[var(--page-ink)] md:text-[44px]">
              {copy.title}
            </h1>
            <p className="mt-5 text-[15px] leading-7 text-neutral-600">{copy.body}</p>
            <Link
              href={copy.href}
              className="mt-8 inline-flex border border-[var(--page-ink)] px-4 py-3 text-[11px] font-semibold tracking-[0.08em] text-[var(--page-ink)] uppercase motion-surface hover:bg-[var(--page-ink)] hover:text-white"
            >
              {copy.cta}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
