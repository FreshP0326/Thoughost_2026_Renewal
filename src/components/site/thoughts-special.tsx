"use client";

import { useEffect, useState } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { withBasePathAsset } from "@/lib/base-path";
import type { ReleaseDetailViewModel, ThoughtsSpecialCard, ThoughtsSpecialImage, ThoughtsSpecialViewModel } from "@/types/site";

import styles from "./thoughts-special.module.css";

export function ThoughtsSpecial({
  release,
  page,
  showTitle = true,
  includeIntro = true,
}: {
  release: ReleaseDetailViewModel;
  page: ThoughtsSpecialViewModel;
  showTitle?: boolean;
  includeIntro?: boolean;
}) {
  const [activeMusicCard, setActiveMusicCard] = useState(0);
  const [previewImage, setPreviewImage] = useState<ThoughtsSpecialImage | null>(null);

  useEffect(() => {
    if (!previewImage) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [previewImage]);

  const currentMusicCard = page.musicCards[activeMusicCard];

  return (
    <div className={styles.shell}>
      {showTitle ? (
        <section className={styles.titleSection}>
          <FadeIn y={12} amount={0.12}>
            <h1 className={styles.pageTitle}>{page.title}</h1>
          </FadeIn>
        </section>
      ) : null}

      {includeIntro ? (
        <section className={styles.section}>
          <FadeIn className={styles.sectionHeader} y={12} amount={0.1}>
            <h2 className={styles.sectionTitle}>{page.labels.introSection}</h2>
          </FadeIn>

          <div className={styles.introGrid}>
            <FadeIn y={16} amount={0.12}>
              <ImageButton image={page.introSection.coverImage} onOpen={setPreviewImage} className={styles.coverButton}>
                <div className={styles.coverFrame}>
                  <img
                    src={withBasePathAsset(page.introSection.coverImage.src)}
                    alt={page.introSection.coverImage.alt}
                    className={styles.coverImage}
                  />
                </div>
              </ImageButton>
            </FadeIn>

            <FadeIn className={styles.trackPanel} delay={0.04} y={16} amount={0.12}>
              <div className={styles.trackPanelHeader}>
                <h3>{page.labels.tracklist}</h3>
              </div>
              <StaggerGroup className={styles.trackList} density="tight" amount={0.04}>
                {page.introSection.tracklist.map((track, index) => (
                  <StaggerItem key={`${track.number ?? index}-${track.title}`}>
                    <article className={styles.trackRow}>
                      <span className={styles.trackNumber}>{track.number ?? String(index + 1).padStart(2, "0")}</span>
                      <div className={styles.trackBody}>
                        <strong>{track.title}</strong>
                        <span>{track.artist ?? release.artistName}</span>
                      </div>
                    </article>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </FadeIn>
          </div>

          <FadeIn className={styles.storyBlock} delay={0.06} y={18} amount={0.12}>
            <h3 className={styles.storyHeading}>{page.labels.storyHeading}</h3>
            <div className={styles.storyCopy}>
              {page.introSection.storyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </FadeIn>
        </section>
      ) : null}

      <section className={styles.section}>
        <FadeIn className={styles.sectionHeader} y={12} amount={0.1}>
          <h2 className={styles.sectionTitle}>{page.labels.musicSection}</h2>
        </FadeIn>

        <div className={styles.carouselShell}>
          <div className={styles.carouselRail}>
            {page.musicCards.map((card, index) => (
              <button
                key={`${card.title}-${card.subtitle}`}
                type="button"
                className={styles.carouselRailButton}
                data-active={index === activeMusicCard ? "true" : "false"}
                onClick={() => setActiveMusicCard(index)}
              >
                <strong>{card.title}</strong>
                <span>{card.subtitle}</span>
              </button>
            ))}
          </div>

          <div className={styles.carouselContent}>
            <div className={styles.carouselControls}>
              <button type="button" className={styles.controlButton} onClick={() => setActiveMusicCard((index) => (index - 1 + page.musicCards.length) % page.musicCards.length)}>
                {page.labels.previousCard}
              </button>
              <button type="button" className={styles.controlButton} onClick={() => setActiveMusicCard((index) => (index + 1) % page.musicCards.length)}>
                {page.labels.nextCard}
              </button>
            </div>

            <FadeIn key={`${currentMusicCard.title}-${currentMusicCard.subtitle}`} className={styles.statementCard} y={12} amount={0.12}>
              <StatementCard card={currentMusicCard} />
            </FadeIn>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <FadeIn className={styles.sectionHeader} y={12} amount={0.1}>
          <h2 className={styles.sectionTitle}>{page.labels.artSection}</h2>
        </FadeIn>

        <div className={styles.artLayout}>
          <div className={styles.artGroups}>
            {page.artProcessGroups.map((group) => (
              <FadeIn key={group.title} className={styles.imageGroup} y={12} amount={0.1}>
                <h3 className={styles.groupTitle}>{group.title}</h3>
                <div className={styles.imageGrid} data-count={group.images.length}>
                  {group.images.map((image) => (
                    <ImageFigure key={image.key} image={image} onOpen={setPreviewImage} />
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>

          <div className={styles.artCards}>
            {page.artCards.map((card) => (
              <FadeIn key={`${card.title}-${card.subtitle}`} y={12} amount={0.12}>
                <StatementCard card={card} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <FadeIn className={styles.konsekiHeader} y={12} amount={0.12}>
          <h2 className={styles.personName}>{page.konsekiSection.name}</h2>
          <p className={styles.personRole}>{page.konsekiSection.role}</p>
        </FadeIn>

        <div className={styles.konsekiGrid}>
          <FadeIn className={styles.konsekiCopy} y={12} amount={0.12}>
            {page.konsekiSection.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </FadeIn>

          <FadeIn className={styles.konsekiMedia} delay={0.04} y={12} amount={0.12}>
            {page.konsekiSection.images.map((image) => (
              <ImageFigure key={image.key} image={image} onOpen={setPreviewImage} compact />
            ))}
          </FadeIn>
        </div>
      </section>

      <section className={styles.section}>
        <FadeIn className={styles.sectionHeader} y={12} amount={0.1}>
          <h2 className={styles.sectionTitle}>{page.labels.creditsSection}</h2>
        </FadeIn>

        <div className={styles.creditsGrid}>
          {page.credits.map((group) => (
            <FadeIn key={group.label} className={styles.creditCard} y={10} amount={0.12}>
              <h3>{group.label}</h3>
              <div className={styles.creditValues}>
                {group.values.map((value) => (
                  <span key={`${group.label}-${value}`}>{value}</span>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {previewImage ? (
        <div
          className={styles.previewOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={previewImage.alt}
          onClick={() => setPreviewImage(null)}
        >
          <div className={styles.previewContent} onClick={(event) => event.stopPropagation()}>
            <button type="button" className={styles.previewClose} onClick={() => setPreviewImage(null)}>
              {page.labels.closePreview}
            </button>
            <img src={withBasePathAsset(previewImage.src)} alt={previewImage.alt} className={styles.previewImage} />
            <p className={styles.previewCaption}>{previewImage.caption}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StatementCard({ card }: { card: ThoughtsSpecialCard }) {
  return (
    <article className={styles.statementCardInner}>
      <div className={styles.statementHeader}>
        <h3>{card.title}</h3>
        <p>{card.subtitle}</p>
      </div>
      <div className={styles.statementCopy}>
        {card.paragraphs.map((paragraph, index) =>
          paragraph ? <p key={`${card.title}-${index}`}>{paragraph}</p> : <div key={`${card.title}-${index}`} className={styles.statementSpacer} />,
        )}
      </div>
    </article>
  );
}

function ImageButton({
  image,
  onOpen,
  className,
  children,
}: {
  image: ThoughtsSpecialImage;
  onOpen: (image: ThoughtsSpecialImage) => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button type="button" className={className ? `${styles.imageButton} ${className}` : styles.imageButton} onClick={() => onOpen(image)}>
      {children}
    </button>
  );
}

function ImageFigure({
  image,
  onOpen,
  compact = false,
}: {
  image: ThoughtsSpecialImage;
  onOpen: (image: ThoughtsSpecialImage) => void;
  compact?: boolean;
}) {
  return (
    <figure className={styles.imageFigure} data-compact={compact ? "true" : "false"}>
      <ImageButton image={image} onOpen={onOpen}>
        <div className={styles.imageFrame} data-compact={compact ? "true" : "false"}>
          <img src={withBasePathAsset(image.src)} alt={image.alt} className={styles.gridImage} />
        </div>
      </ImageButton>
      <figcaption className={styles.imageCaption}>{image.caption}</figcaption>
    </figure>
  );
}
