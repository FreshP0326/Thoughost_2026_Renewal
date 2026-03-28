import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { withBasePathAsset } from "@/lib/base-path";
import type { ReleaseDetailViewModel } from "@/types/site";

import styles from "./release-detail.module.css";

export function ReleaseDetailTracklist({
  release,
  labels,
}: {
  release: ReleaseDetailViewModel;
  labels: {
    artworkDownload: string;
  };
}) {
  return (
    <section className={styles.bodySection}>
      <div className={styles.container}>
        <div className={styles.bodyGrid}>
          <div className={styles.playerColumn}>
            <div className={styles.playerFrame}>
              <div className={styles.coverFrame}>
                <Image
                  src={withBasePathAsset(release.coverImage)}
                  alt={release.title}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  priority
                  className={styles.coverImage}
                  sizes="(max-width: 1024px) 100vw, 390px"
                />
                <div className={styles.playButton} aria-hidden="true">
                  <span className={styles.playTriangle} />
                </div>
              </div>
              <div className={styles.playerBar} aria-hidden="true">
                <div className={styles.progressRail}>
                  <span className={styles.progressDot} />
                </div>
                <div className={styles.volumeCluster}>
                  <span className={styles.volumeIcon} />
                  <span className={styles.volumeRail} />
                </div>
              </div>
            </div>
            {release.artworkDownloadUrl ? (
              <Link
                href={withBasePathAsset(release.artworkDownloadUrl)}
                target="_blank"
                rel="noreferrer"
                className={styles.artworkLink}
              >
                {labels.artworkDownload}
              </Link>
            ) : null}
          </div>
          <div className={styles.trackColumn}>
            <FadeIn delay={0.08} y={16} amount={0.16}>
              <h2 className={styles.discTitle}>{release.discTitle}</h2>
            </FadeIn>
            <StaggerGroup className={styles.trackTable} density="tight" amount={0.08}>
              {release.tracksDetailed.map((track, index) => (
                <StaggerItem key={`${track.number ?? index}-${track.title}`}>
                  <div className={styles.trackRow} data-track-row-active={index < 6 ? "true" : "false"}>
                    <span className={styles.trackNumber}>{track.number ?? String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.trackTitle}>{track.title}</span>
                    <span className={styles.trackArtist}>{track.artist ?? release.artistName}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
