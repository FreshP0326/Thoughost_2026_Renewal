"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { withBasePathAsset } from "@/lib/base-path";
import type {
  ReleaseDetailViewModel,
  ThoughtsSpecialCard,
  ThoughtsSpecialImage,
  ThoughtsSpecialVariant,
  ThoughtsSpecialViewModel,
} from "@/types/site";

import styles from "./thoughts-special.module.css";

export function ThoughtsSpecial({
  release,
  page,
  variant = "standalone",
}: {
  release: ReleaseDetailViewModel;
  page: ThoughtsSpecialViewModel;
  variant?: ThoughtsSpecialVariant;
}) {
  const [activeMusicCard, setActiveMusicCard] = useState(0);
  const [activeArtPerson, setActiveArtPerson] = useState(0);
  const [previewGallery, setPreviewGallery] = useState<PreviewGalleryState | null>(null);
  const isEchoEmbed = variant === "echo-embed";
  const designGalleryItems = collectDesignGalleryItems(page, { includeKonsekiImages: !isEchoEmbed });

  useEffect(() => {
    if (!previewGallery) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewGallery(null);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setPreviewGallery((current) => movePreviewGallery(current, -1));
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setPreviewGallery((current) => movePreviewGallery(current, 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [previewGallery]);

  const currentMusicCard = page.musicCards[activeMusicCard];
  const currentArtPerson = page.artPeople[activeArtPerson];
  const activePreviewImage = previewGallery ? previewGallery.items[previewGallery.activeIndex] : null;
  const hasPreviewNavigation = (previewGallery?.items.length ?? 0) > 1;

  const openSinglePreview = (image: ThoughtsSpecialImage) => {
    setPreviewGallery({
      items: [image],
      activeIndex: 0,
    });
  };

  const openDesignPreview = (image: ThoughtsSpecialImage) => {
    setPreviewGallery({
      items: designGalleryItems,
      activeIndex: findPreviewIndex(designGalleryItems, image),
    });
  };

  return (
    <div className={styles.shell} data-variant={variant}>
      {!isEchoEmbed ? (
        <section className={styles.titleSection}>
          <FadeIn y={12} amount={0.12}>
            <h1 className={styles.pageTitle}>{page.title}</h1>
          </FadeIn>
        </section>
      ) : null}

      {!isEchoEmbed ? (
        <section className={styles.section}>
          <FadeIn className={styles.sectionHeader} y={12} amount={0.1}>
            <h2 className={styles.sectionTitle}>{page.labels.introSection}</h2>
          </FadeIn>

          <div className={styles.introGrid}>
            <FadeIn y={16} amount={0.12}>
              <ImageButton image={page.introSection.coverImage} onOpen={openSinglePreview} className={styles.coverButton}>
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
        <SectionReveal animate={!isEchoEmbed} className={styles.sectionHeader} y={12} amount={0.1}>
          <div className={styles.sectionHeadingBlock}>
            <h2 className={styles.sectionTitle}>{page.labels.musicSection}</h2>
          </div>
        </SectionReveal>

        <div className={styles.carouselShell}>
          <div className={styles.carouselRail} role="tablist" aria-label={page.labels.musicSection}>
            {page.musicCards.map((card, index) => (
              <button
                key={`${card.title}-${card.subtitle}`}
                type="button"
                className={styles.carouselRailButton}
                data-active={index === activeMusicCard ? "true" : "false"}
                id={`thoughts-music-tab-${index}`}
                role="tab"
                aria-selected={index === activeMusicCard}
                aria-controls="thoughts-music-panel"
                aria-label={`${card.title} / ${card.subtitle}`}
                onClick={() => setActiveMusicCard(index)}
              >
                <strong>{card.title}</strong>
                <span>{card.subtitle}</span>
              </button>
            ))}
          </div>

          <div className={styles.carouselContent}>
            <div className={styles.carouselControls}>
              <button
                type="button"
                className={styles.controlButton}
                onClick={() => setActiveMusicCard((index) => (index - 1 + page.musicCards.length) % page.musicCards.length)}
              >
                {page.labels.previousCard}
              </button>
              <button
                type="button"
                className={styles.controlButton}
                onClick={() => setActiveMusicCard((index) => (index + 1) % page.musicCards.length)}
              >
                {page.labels.nextCard}
              </button>
            </div>

            <SectionReveal
              key={`${currentMusicCard.title}-${currentMusicCard.subtitle}`}
              className={styles.statementCard}
              id="thoughts-music-panel"
              role="tabpanel"
              aria-labelledby={`thoughts-music-tab-${activeMusicCard}`}
              y={12}
              amount={0.12}
              animate={!isEchoEmbed}
            >
              <StatementCard card={currentMusicCard} />
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <SectionReveal animate={!isEchoEmbed} className={styles.sectionHeader} y={12} amount={0.1}>
          <div className={styles.sectionHeadingBlock}>
            <h2 className={styles.sectionTitle}>{page.labels.artSection}</h2>
          </div>
        </SectionReveal>

        {isEchoEmbed ? (
          <>
            <div className={styles.carouselShell}>
              <div className={styles.carouselRail} role="tablist" aria-label={page.labels.artSection}>
                {page.artPeople.map((person, index) => (
                  <button
                    key={`${person.title}-${person.subtitle}`}
                    type="button"
                    className={styles.carouselRailButton}
                    data-active={index === activeArtPerson ? "true" : "false"}
                    id={`thoughts-art-tab-${index}`}
                    role="tab"
                    aria-selected={index === activeArtPerson}
                    aria-controls="thoughts-art-panel"
                    aria-label={`${person.title} / ${person.subtitle}`}
                    onClick={() => setActiveArtPerson(index)}
                  >
                    <strong>{person.title}</strong>
                    <span>{person.subtitle}</span>
                  </button>
                ))}
              </div>

              <div className={styles.carouselContent}>
                <div className={styles.carouselControls}>
                  <button
                    type="button"
                    className={styles.controlButton}
                    onClick={() => setActiveArtPerson((index) => (index - 1 + page.artPeople.length) % page.artPeople.length)}
                  >
                    {page.labels.previousCard}
                  </button>
                  <button
                    type="button"
                    className={styles.controlButton}
                    onClick={() => setActiveArtPerson((index) => (index + 1) % page.artPeople.length)}
                  >
                    {page.labels.nextCard}
                  </button>
                </div>

                <div
                  key={`${currentArtPerson.title}-${currentArtPerson.subtitle}`}
                  className={styles.statementCard}
                  id="thoughts-art-panel"
                  role="tabpanel"
                  aria-labelledby={`thoughts-art-tab-${activeArtPerson}`}
                >
                  <StatementCard card={currentArtPerson} />
                </div>
              </div>
            </div>

            <div className={styles.artGroups}>
              {page.artProcessGroups.map((group) => (
                <SectionReveal key={group.title} animate={false} className={styles.imageGroup} y={12} amount={0.1}>
                  <h3 className={styles.groupTitle}>{group.title}</h3>
                  <div className={styles.imageGrid} data-count={group.images.length}>
                    {group.images.map((image) => (
                      <ImageFigure key={image.key} image={image} onOpen={openDesignPreview} />
                    ))}
                  </div>
                </SectionReveal>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.artLayout}>
            <div className={styles.artCards}>
              {page.artCards.map((card) => (
                <SectionReveal key={`${card.title}-${card.subtitle}`} animate={!isEchoEmbed} y={12} amount={0.12}>
                  <StatementCard card={card} />
                </SectionReveal>
              ))}
            </div>

            <div className={styles.artGroups}>
              {page.artProcessGroups.map((group) => (
                <SectionReveal key={group.title} animate={!isEchoEmbed} className={styles.imageGroup} y={12} amount={0.1}>
                  <h3 className={styles.groupTitle}>{group.title}</h3>
                  <div className={styles.imageGrid} data-count={group.images.length}>
                    {group.images.map((image) => (
                      <ImageFigure key={image.key} image={image} onOpen={openDesignPreview} />
                    ))}
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        )}
      </section>

      {!isEchoEmbed ? (
        <section className={styles.section}>
          <SectionReveal animate={!isEchoEmbed} className={styles.konsekiHeader} y={12} amount={0.12}>
            <h2 className={styles.personName}>{page.konsekiSection.name}</h2>
            <p className={styles.personRole}>{page.konsekiSection.role}</p>
          </SectionReveal>

          <div className={styles.konsekiGrid}>
            <SectionReveal animate={!isEchoEmbed} className={styles.konsekiCopy} y={12} amount={0.12}>
              {page.konsekiSection.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </SectionReveal>

            <SectionReveal animate={!isEchoEmbed} className={styles.konsekiMedia} delay={0.04} y={12} amount={0.12}>
              {page.konsekiSection.images.map((image) => (
                <ImageFigure key={image.key} image={image} onOpen={openDesignPreview} compact />
              ))}
            </SectionReveal>
          </div>
        </section>
      ) : null}

      <section className={styles.section}>
        <SectionReveal animate={!isEchoEmbed} className={styles.sectionHeader} y={12} amount={0.1}>
          <div className={styles.sectionHeadingBlock}>
            <h2 className={styles.sectionTitle}>{page.labels.creditsSection}</h2>
          </div>
        </SectionReveal>

        <div className={styles.creditsGrid}>
          {page.credits.map((group) => (
            <SectionReveal key={group.label} animate={!isEchoEmbed} className={styles.creditCard} y={10} amount={0.12}>
              <h3>{group.label}</h3>
              <div className={styles.creditValues}>
                {group.values.map((value) => (
                  <span key={`${group.label}-${value}`}>{value}</span>
                ))}
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {previewGallery && activePreviewImage ? (
        <div className={styles.previewOverlay} onClick={() => setPreviewGallery(null)}>
          <div
            className={styles.previewContent}
            role="dialog"
            aria-modal="true"
            aria-label={activePreviewImage.alt}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.previewHeader}>
              <p className={styles.previewCounter} aria-live="polite">
                {previewGallery.activeIndex + 1} / {previewGallery.items.length}
              </p>
              <button
                type="button"
                className={styles.previewClose}
                aria-label={page.labels.closePreview}
                onClick={() => setPreviewGallery(null)}
              >
                <X size={18} strokeWidth={1.85} />
                <span className={styles.srOnly}>{page.labels.closePreview}</span>
              </button>
            </div>

            <div className={styles.previewBody}>
              <div className={styles.previewStage}>
                {hasPreviewNavigation ? (
                  <button
                    type="button"
                    className={styles.previewNavButton}
                    data-direction="prev"
                    aria-label={page.labels.previousPreview}
                    onClick={() => setPreviewGallery((current) => movePreviewGallery(current, -1))}
                  >
                    <ChevronLeft size={22} strokeWidth={1.9} />
                    <span className={styles.srOnly}>{page.labels.previousPreview}</span>
                  </button>
                ) : null}

                <div className={styles.previewStageMedia}>
                  <img src={withBasePathAsset(activePreviewImage.src)} alt={activePreviewImage.alt} className={styles.previewImage} />
                </div>

                {hasPreviewNavigation ? (
                  <button
                    type="button"
                    className={styles.previewNavButton}
                    data-direction="next"
                    aria-label={page.labels.nextPreview}
                    onClick={() => setPreviewGallery((current) => movePreviewGallery(current, 1))}
                  >
                    <ChevronRight size={22} strokeWidth={1.9} />
                    <span className={styles.srOnly}>{page.labels.nextPreview}</span>
                  </button>
                ) : null}
              </div>

              <div className={styles.previewFooter}>
                <p className={styles.previewCaption}>{activePreviewImage.caption}</p>

                {hasPreviewNavigation ? (
                  <div className={styles.previewMobileActions}>
                    <button
                      type="button"
                      className={styles.previewMobileButton}
                      aria-label={page.labels.previousPreview}
                      onClick={() => setPreviewGallery((current) => movePreviewGallery(current, -1))}
                    >
                      <ChevronLeft size={20} strokeWidth={1.9} />
                      <span className={styles.srOnly}>{page.labels.previousPreview}</span>
                    </button>
                    <button
                      type="button"
                      className={styles.previewMobileButton}
                      aria-label={page.labels.nextPreview}
                      onClick={() => setPreviewGallery((current) => movePreviewGallery(current, 1))}
                    >
                      <ChevronRight size={20} strokeWidth={1.9} />
                      <span className={styles.srOnly}>{page.labels.nextPreview}</span>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

type PreviewGalleryState = {
  items: ThoughtsSpecialImage[];
  activeIndex: number;
};

function collectDesignGalleryItems(
  page: ThoughtsSpecialViewModel,
  options?: {
    includeKonsekiImages?: boolean;
  },
) {
  const galleryItems: ThoughtsSpecialImage[] = [];
  const seenSources = new Set<string>();
  const sourceImages =
    options?.includeKonsekiImages === false
      ? page.artProcessGroups.flatMap((group) => group.images)
      : [...page.artProcessGroups.flatMap((group) => group.images), ...page.konsekiSection.images];

  for (const image of sourceImages) {
    if (seenSources.has(image.src)) {
      continue;
    }

    seenSources.add(image.src);
    galleryItems.push(image);
  }

  return galleryItems;
}

function findPreviewIndex(items: ThoughtsSpecialImage[], image: ThoughtsSpecialImage) {
  const index = items.findIndex((item) => item.src === image.src);

  return index >= 0 ? index : 0;
}

function movePreviewGallery(current: PreviewGalleryState | null, direction: -1 | 1) {
  if (!current || current.items.length <= 1) {
    return current;
  }

  const nextIndex = (current.activeIndex + direction + current.items.length) % current.items.length;

  return {
    ...current,
    activeIndex: nextIndex,
  };
}

function SectionReveal({
  animate,
  children,
  className,
  delay,
  y,
  amount,
  id,
  role,
  "aria-labelledby": ariaLabelledBy,
}: {
  animate: boolean;
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
  id?: string;
  role?: string;
  "aria-labelledby"?: string;
}) {
  if (!animate) {
    return (
      <div className={className} id={id} role={role} aria-labelledby={ariaLabelledBy}>
        {children}
      </div>
    );
  }

  return (
    <FadeIn className={className} delay={delay} y={y} amount={amount}>
      {children}
    </FadeIn>
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
    <button
      type="button"
      className={className ? `${styles.imageButton} ${className}` : styles.imageButton}
      onClick={() => onOpen(image)}
      aria-label={image.caption}
    >
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
