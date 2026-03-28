import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import type { ReleaseDetailViewModel } from "@/types/site";

import styles from "./release-detail.module.css";

function InfoTable({
  title,
  fields,
}: {
  title: string;
  fields: { label: string; value: string }[];
}) {
  return (
    <section className={styles.infoTableBlock}>
      <FadeIn delay={0.04} y={12} amount={0.18}>
        <h2 className={styles.infoHeading}>{title}</h2>
      </FadeIn>
      <FadeIn delay={0.08} y={14} amount={0.18}>
        <div className={styles.infoTable}>
          {fields.map((field) => (
            <div key={`${title}-${field.label}`} className={styles.infoRow}>
              <span className={styles.infoLabel}>{field.label}</span>
              <span className={styles.infoValue}>{field.value}</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

export function ReleaseDetailMeta({
  release,
  labels,
}: {
  release: ReleaseDetailViewModel;
  labels: {
    infoTitle: string;
    creditTitle: string;
    relatedLinksTitle: string;
  };
}) {
  return (
    <section className={styles.metaSection}>
      <div className={styles.container}>
        <div className={styles.metaGrid}>
          <InfoTable title={labels.infoTitle} fields={release.infoPanelFields} />
          <InfoTable title={labels.creditTitle} fields={release.creditPanelFields} />
          <section className={styles.infoTableBlock}>
            <FadeIn delay={0.08} y={12} amount={0.18}>
              <h2 className={styles.infoHeading}>{labels.relatedLinksTitle}</h2>
            </FadeIn>
            <FadeIn delay={0.12} y={14} amount={0.18}>
              <div className={styles.infoTable}>
                {release.relatedLinks.map((link) => (
                  <div key={`${link.label}-${link.url}`} className={styles.linkRow}>
                    <Link href={link.url} target="_blank" rel="noreferrer" className={styles.relatedLink}>
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
            </FadeIn>
          </section>
        </div>
      </div>
    </section>
  );
}
