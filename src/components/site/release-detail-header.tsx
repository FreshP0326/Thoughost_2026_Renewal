import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { withBasePathAsset } from "@/lib/base-path";
import type { ReleaseDetailViewModel } from "@/types/site";

import styles from "./release-detail.module.css";

export function ReleaseDetailHeader({
  release,
}: {
  release: ReleaseDetailViewModel;
}) {
  const summaryParagraphs = release.summary.split("\n\n").filter(Boolean);
  const heroImage = release.heroImage ?? release.coverImage;

  return (
    <section className={styles.hero}>
      <div className={styles.heroMedia}>
        <Image
          src={withBasePathAsset(heroImage)}
          alt={release.title}
          fill
          loading="eager"
          fetchPriority="high"
          decoding="async"
          priority
          className={styles.heroImage}
          sizes="100vw"
        />
      </div>
      <div className={styles.heroOverlay} />
      <div className={styles.container}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <FadeIn delay={0.06} y={14} amount={0.15}>
              <p className={styles.heroEyebrow}>{release.heroEyebrow}</p>
            </FadeIn>
            <FadeIn delay={0.1} y={18} amount={0.15}>
              <h1 className={styles.heroTitle}>{release.title}</h1>
            </FadeIn>
            <FadeIn delay={0.16} y={16} amount={0.15}>
              <div className={styles.heroSummary}>
                {summaryParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </FadeIn>
          </div>
          {release.heroPrimaryLinks.length ? (
            <FadeIn delay={0.22} y={14} amount={0.15}>
              <div className={styles.heroActions}>
                {release.heroPrimaryLinks.map((link, index) => (
                  <Link
                    key={`${link.label}-${link.url}`}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.heroButton}
                    data-button-tone={index === 0 ? "cyan" : "orange"}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </FadeIn>
          ) : null}
        </div>
      </div>
    </section>
  );
}
