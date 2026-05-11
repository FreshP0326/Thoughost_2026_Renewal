import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { ThoughtsSpecial } from "@/components/site/thoughts-special";
import { socialLinks } from "@/content/site/data";
import { getThoughtsSpecial } from "@/content/site/thoughts-special";
import type { Thoughts2Edition, getThoughts2Special } from "@/content/site/thoughts2-special";
import { withBasePathAsset } from "@/lib/base-path";
import { withLocale } from "@/lib/locale";
import type { Locale, ReleaseDetailViewModel, ThoughtsSpecialCreditGroup, ThoughtsSpecialImage } from "@/types/site";
import { Thoughts2Share } from "@/components/site/thoughts-2-share";
import { Thoughts2EchoHero } from "@/components/site/thoughts-2-special-echo-hero";
import { getReleaseBySlug } from "@/server/services/site-service";

import styles from "./thoughts-2-special.module.css";

type Thoughts2SpecialData = ReturnType<typeof getThoughts2Special>;
type MaterialItem = Thoughts2SpecialData["materials"][number];

export function Thoughts2Special({
  locale,
  release,
  page,
}: {
  locale: Locale;
  release: ReleaseDetailViewModel;
  page: Thoughts2SpecialData;
}) {
  const contributors = Array.from(
    new Set(release.tracksDetailed.map((track) => track.artist).filter((artist): artist is string => Boolean(artist))),
  );
  const linkedThoughtsRelease = page.edition === "3" ? getReleaseBySlug(locale, "thoughts") : null;
  const linkedThoughtsPage = linkedThoughtsRelease ? getThoughtsSpecial(locale) : null;
  const linkedThoughtsEmbedPage = linkedThoughtsPage
    ? createThoughts2LinkedThoughtsPage(locale, page, linkedThoughtsPage, release, contributors)
    : null;

  return (
    <div className={styles.shell} data-edition={page.edition}>
      {page.editions.length > 1 ? <VersionSwitcher locale={locale} page={page} /> : null}
      <EditionLayout
        locale={locale}
        release={release}
        page={page}
        contributors={contributors}
        linkedThoughtsRelease={linkedThoughtsRelease}
        linkedThoughtsPage={linkedThoughtsEmbedPage}
      />
    </div>
  );
}

function EditionLayout({
  locale,
  release,
  page,
  contributors,
  linkedThoughtsRelease,
  linkedThoughtsPage,
}: {
  locale: Locale;
  release: ReleaseDetailViewModel;
  page: Thoughts2SpecialData;
  contributors: string[];
  linkedThoughtsRelease: ReleaseDetailViewModel | null;
  linkedThoughtsPage: ReturnType<typeof getThoughtsSpecial> | null;
}) {
  const layouts: Record<Thoughts2Edition, ReactNode> = {
    1: (
      <>
        <section className={styles.heroPoster}>
          <div className={styles.posterMedia}>
            <ThoughtsImage material={page.materials[0]} priority />
          </div>
          <div className={styles.posterCopy}>
            <FadeIn delay={0.03} y={12}>
              <p className={styles.eyebrow}>{page.currentEdition.shortTitle}</p>
            </FadeIn>
            <FadeIn delay={0.08} y={18}>
              <p className={styles.posterTagline}>{page.tagline}</p>
            </FadeIn>
            <FadeIn delay={0.12} y={20}>
              <h1 className={styles.posterTitle}>{page.title}</h1>
            </FadeIn>
            <FadeIn delay={0.16} y={20}>
              <p className={styles.posterIntro}>{page.intro}</p>
            </FadeIn>
          </div>
          <div className={styles.posterVerticalTitle}>{page.title}</div>
        </section>
        <OverviewSection page={page} variant="poster" />
        <section className={styles.dualColumnSection}>
          <AboutSection page={page} variant="poster" />
          <StaffSection page={page} contributors={contributors} variant="poster" />
        </section>
        <GallerySection page={page} materials={[page.materials[3], page.materials[1], page.materials[2]]} variant="poster" />
        <TracklistSection page={page} release={release} variant="poster" />
      </>
    ),
    2: (
      <TokusetsuEditionTwoLayout locale={locale} release={release} page={page} contributors={contributors} />
    ),
    3: (
      <>
        <Thoughts2EchoHero
          title={page.title}
          intro={page.intro}
          actions={[
            {
              label: getEchoHeroActionLabel(locale, "youtube"),
              variant: "primary",
              type: "media",
              media: {
                title: getEchoHeroActionLabel(locale, "youtube"),
                embedUrl: toYouTubeEmbedUrl(release.videoLink),
                externalUrl: release.videoLink ?? null,
                message: getEchoMediaMessage(locale, "youtube"),
              },
            },
            {
              label: getEchoHeroActionLabel(locale, "bilibili"),
              variant: "secondary",
              type: "media",
              media: {
                title: getEchoHeroActionLabel(locale, "bilibili"),
                embedUrl: null,
                externalUrl: socialLinks.find((item) => item.platform === "Bilibili")?.url ?? null,
                message: getEchoMediaMessage(locale, "bilibili"),
              },
            },
          ]}
          media={<ThoughtsImage material={page.materials[0]} priority />}
        />
        <EchoReleaseInfoSection locale={locale} release={release} page={page} />
        <EchoEditorialSection page={page} />
        <EchoTracklistSection page={page} release={release} />
        {linkedThoughtsRelease && linkedThoughtsPage ? (
          <section className={styles.echoThoughtsEmbed}>
            <ThoughtsSpecial release={linkedThoughtsRelease} page={linkedThoughtsPage} variant="echo-embed" />
          </section>
        ) : null}
      </>
    ),
    4: (
      <>
        <section className={styles.heroMaterial}>
          <div className={styles.materialHeroFrame}>
            <div className={styles.materialHeroCrop}>
              <ThoughtsImage material={page.materials[0]} className={styles.materialHeroImage} priority />
            </div>
            <div className={styles.materialLead}>
              <FadeIn delay={0.04} y={12}>
                <p className={styles.eyebrow}>{page.currentEdition.shortTitle}</p>
              </FadeIn>
              <FadeIn delay={0.08} y={18}>
                <h1 className={styles.materialTitle}>{page.title}</h1>
              </FadeIn>
              <FadeIn delay={0.12} y={18}>
                <p className={styles.materialIntro}>{page.currentEdition.description}</p>
              </FadeIn>
            </div>
          </div>
        </section>
        <OverviewSection page={page} variant="material" />
        <GallerySection page={page} materials={[page.materials[0], page.materials[5], page.materials[4], page.materials[3]]} variant="material" />
        <section className={styles.dualColumnSection}>
          <AboutSection page={page} variant="material" />
          <StaffSection page={page} contributors={contributors} variant="material" />
        </section>
        <TracklistSection page={page} release={release} variant="material" compact />
      </>
    ),
    5: (
      <>
        <section className={styles.heroRing}>
          <div className={styles.ringBackgroundRings}>
            <div className={styles.ringBackgroundCircle} />
            <div className={styles.ringBackgroundCircle} />
            <div className={styles.ringBackgroundCircle} />
          </div>
          <div className={styles.ringCore}>
            <div className={styles.ringMedia}>
              <div className={styles.ringCoverWrap}>
                <ThoughtsImage material={page.materials[0]} className={styles.ringCover} priority />
              </div>
              <ThoughtsImage material={page.materials[5]} className={styles.discOverlay} />
            </div>
            <div className={styles.ringCopy}>
              <FadeIn delay={0.04} y={12}>
                <p className={styles.eyebrow}>{page.currentEdition.shortTitle}</p>
              </FadeIn>
              <FadeIn delay={0.08} y={18}>
                <h1 className={styles.ringTitle}>{page.title}</h1>
              </FadeIn>
              <FadeIn delay={0.12} y={18}>
                <p className={styles.ringSummary}>{page.currentEdition.summary}</p>
              </FadeIn>
              <FadeIn delay={0.16} y={20}>
                <p className={styles.ringIntro}>{page.intro}</p>
              </FadeIn>
            </div>
          </div>
        </section>
        <OverviewSection page={page} variant="ring" />
        <StaffSection page={page} contributors={contributors} variant="ring" />
        <section className={styles.ringBottom}>
          <GallerySection page={page} materials={[page.materials[5], page.materials[1], page.materials[2]]} variant="ring" />
          <TracklistSection page={page} release={release} variant="ring" />
          <section className={styles.dualColumnSection}>
            <AboutSection page={page} variant="ring" />
            <AvailabilityPanel locale={locale} release={release} page={page} />
          </section>
        </section>
      </>
    ),
  };

  return layouts[page.edition];
}

function TokusetsuEditionTwoLayout({
  locale,
  release,
  page,
  contributors,
}: {
  locale: Locale;
  release: ReleaseDetailViewModel;
  page: Thoughts2SpecialData;
  contributors: string[];
}) {
  return (
    <>
      <section className={styles.coverHero}>
        <div className={styles.coverHeroFrame}>
          <ThoughtsImage material={page.materials[0]} className={styles.coverHeroImage} priority />
        </div>
      </section>

      <section id="overview" className={styles.overviewShell}>
        <div className={styles.overviewArt}>
          <ThoughtsImage material={page.materials[0]} className={styles.overviewArtImage} />
        </div>
        <div className={styles.overviewMain}>
          <p className={styles.overviewEdition}>{page.currentEdition.label}</p>
          <h1 className={styles.overviewTitle}>{page.title}</h1>
          <p className={styles.overviewOrganization}>Thoughost</p>
          <p className={styles.overviewIntro}>{page.pageTwo.overviewIntro}</p>
          <dl className={styles.overviewTable}>
            {page.meta.slice(0, 5).map((item) => (
              <div key={item.label} className={styles.overviewRow}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.storeSection}>
        <h2 className={styles.storeHeading}>{page.labels.availability}</h2>
        <div className={styles.storeButtons}>
          {page.pageTwo.storeCtas.map((cta) => {
            const href = cta.href ? withLocale(locale, cta.href) : undefined;

            if (!href) {
              return (
                <span key={cta.kind} className={styles.storeButton} data-disabled="true">
                  {cta.label}
                </span>
              );
            }

            return (
              <Link key={cta.kind} href={href} className={styles.storeButton}>
                {cta.label}
              </Link>
            );
          })}
        </div>
      </section>

      <section className={styles.shareSection}>
        <Thoughts2Share
          title={`${page.title} | Thoughost`}
          labels={page.pageTwo.shareLabels}
          className={styles.shareButtons}
          compact
        />
      </section>

      <section id="about" className={styles.aboutSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{page.labels.about}</h2>
        </div>
        <div className={styles.aboutContent}>
          {page.pageTwo.aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section id="gallery" className={styles.gallerySection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{page.labels.gallery}</h2>
          <p className={styles.sectionSummary}>{page.currentEdition.description}</p>
        </div>
        <div className={styles.galleryGrid}>
          {[page.materials[0], page.materials[1], page.materials[3], page.materials[2], page.materials[4], page.materials[5]].map((item) => (
            <figure key={item.key} className={styles.galleryItem}>
              <div className={styles.galleryFrame}>
                <ThoughtsImage material={item} className={styles.galleryImage} />
              </div>
              <figcaption className={styles.galleryCaption}>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="tracklist" className={styles.tracklistTable}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{page.labels.tracklist}</h2>
          <p className={styles.sectionSummary}>{page.tagline}</p>
        </div>
        <div className={styles.tracklistRows}>
          {release.tracksDetailed.map((track, index) => (
            <div key={`${track.number ?? index}-${track.title}`} className={styles.tracklistRow}>
              <span className={styles.tracklistNumber}>{track.number ?? String(index + 1).padStart(2, "0")}</span>
              <div className={styles.tracklistBody}>
                <strong>{track.title}</strong>
                <span>{track.artist ?? release.artistName}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="staff" className={styles.staffSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{page.labels.staff}</h2>
        </div>
        <div className={styles.staffRows}>
          {page.pageTwo.staffRows.map((row) => (
            <div key={row.label} className={styles.staffRow}>
              <span>{row.label}</span>
              <strong>{row.value}</strong>
            </div>
          ))}
          <div className={styles.staffRow}>
            <span>{page.labels.contributors}</span>
            <strong>{contributors.join(" / ")}</strong>
          </div>
        </div>
      </section>
    </>
  );
}

function OverviewSection({
  page,
  variant,
}: {
  page: Thoughts2SpecialData;
  variant: string;
}) {
  const isEcho = variant === "echo";
  const metaItems = isEcho ? [page.meta[0], page.meta[1], page.meta[2], page.meta[4]].filter(Boolean) : page.meta;

  return (
    <section id="overview" className={styles.infoDeck} data-variant={variant}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{page.labels.overview}</h2>
        {!isEcho ? <p className={styles.sectionSummary}>{page.currentEdition.description}</p> : null}
      </div>
      <MetaRail items={metaItems} compact />
      <div className={styles.infoDeckBody} data-panel-count={isEcho ? "1" : "2"}>
        <section className={styles.infoDeckPanel}>
          <p className={styles.sectionLabel}>{page.labels.availability}</p>
          <div className={styles.availabilityList}>
            <div className={styles.availabilityRow}>
              <span>Bandcamp</span>
              <strong>{page.placeholders.streaming}</strong>
            </div>
            <div className={styles.availabilityRow}>
              <span>Dizzylab</span>
              <strong>{page.placeholders.mailOrder}</strong>
            </div>
            <div className={styles.availabilityRow}>
              <span>Diverse Direct</span>
              <strong>{page.placeholders.mailOrder}</strong>
            </div>
          </div>
        </section>
        {!isEcho ? (
          <section className={styles.infoDeckPanel}>
            <p className={styles.sectionLabel}>{page.labels.about}</p>
            <div className={styles.infoDeckCopy}>
              <p>{page.intro}</p>
              <p>{page.currentEdition.summary}</p>
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}

function EchoReleaseInfoSection({
  locale,
  release,
  page,
}: {
  locale: Locale;
  release: ReleaseDetailViewModel;
  page: Thoughts2SpecialData;
}) {
  const summaryItems = page.meta.slice(0, 5);
  const availabilityItems = [
    {
      label: getEchoActionLabel(locale, "event"),
      value: `${page.meta[1]?.value ?? ""} / ${page.meta[2]?.value ?? ""}`.trim(),
    },
    {
      label: "Bandcamp",
      value: page.placeholders.streaming,
    },
    {
      label: getEchoActionLabel(locale, "mail"),
      value: page.placeholders.mailOrder,
    },
    {
      label: page.labels.releaseDetail,
      value: release.title,
      href: withLocale(locale, `/releases/${release.slug}`),
    },
  ];

  return (
    <section id="overview" className={styles.echoReleaseInfo}>
      <div className={styles.echoReleaseCard}>
        <div className={styles.echoReleaseCardHeader}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{page.labels.overview}</h2>
          </div>
        </div>

        <div className={styles.echoReleaseGrid}>
          {summaryItems.map((item) => (
            <div key={item.label} className={styles.echoReleaseCell}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className={styles.echoAvailabilityRail}>
          <div className={styles.echoAvailabilityHeading}>
            <p className={styles.sectionLabel}>{page.labels.availability}</p>
          </div>
          <div className={styles.echoAvailabilityGrid}>
            {availabilityItems.map((item) => (
              <div key={item.label} className={styles.echoAvailabilityItem}>
                <span>{item.label}</span>
                {item.href ? (
                  <Link href={item.href} className={styles.inlineLink}>
                    {item.value}
                  </Link>
                ) : (
                  <strong>{item.value}</strong>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VersionSwitcher({
  locale,
  page,
}: {
  locale: Locale;
  page: Thoughts2SpecialData;
}) {
  return (
    <nav className={styles.switcher} aria-label={page.labels.editionSwitcher}>
      <span className={styles.switcherLabel}>{page.labels.specialEditions}</span>
      <div className={styles.switcherList}>
        {page.editions.map((edition) => {
          const active = edition.key === page.edition;

          return (
            <Link
              key={edition.key}
              href={withLocale(locale, edition.href)}
              aria-current={active ? "page" : undefined}
              aria-label={`${edition.label} / ${edition.shortTitle}`}
              className={styles.switcherLink}
              data-active={active ? "true" : "false"}
              title={edition.shortTitle}
            >
              {edition.key}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function AboutSection({
  page,
  variant,
}: {
  page: Thoughts2SpecialData;
  variant: string;
}) {
  const isEcho = variant === "echo";
  const title = isEcho ? page.echoProductionNotes.title : page.labels.about;
  const paragraphs = isEcho ? page.echoProductionNotes.paragraphs : page.manifesto;

  return (
    <section id="about" className={styles.copyBlock} data-variant={variant}>
      <div className={styles.copyBlockInner} data-variant={variant}>
        <div className={styles.copyBlockHeading}>
          <h2 className={styles.sectionTitle}>{title}</h2>
          {!isEcho ? <p className={styles.sectionLabel}>{page.labels.manifesto}</p> : null}
        </div>
        <div className={styles.copyBlockBody} data-variant={variant}>
          <div className={styles.copyText}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EchoEditorialSection({
  page,
}: {
  page: Thoughts2SpecialData;
}) {
  return (
    <section id="notes" className={styles.echoEditorialBand}>
      <article className={styles.echoEditorialColumn}>
        <p className={styles.sectionLabel}>{page.echoProductionNotes.title}</p>
        <div className={styles.echoEditorialCopy}>
          {page.echoProductionNotes.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </section>
  );
}

function AvailabilityPanel({
  locale,
  release,
  page,
}: {
  locale: Locale;
  release: ReleaseDetailViewModel;
  page: Thoughts2SpecialData;
}) {
  return (
    <section className={styles.copyBlock}>
      <p className={styles.sectionLabel}>{page.labels.availability}</p>
      <div className={styles.availabilityList}>
        <div className={styles.availabilityRow}>
          <span>Bandcamp</span>
          <strong>{page.placeholders.streaming}</strong>
        </div>
        <div className={styles.availabilityRow}>
          <span>Mail order</span>
          <strong>{page.placeholders.mailOrder}</strong>
        </div>
        <div className={styles.availabilityRow}>
          <span>{page.labels.releaseDetail}</span>
          <Link href={withLocale(locale, `/releases/${release.slug}`)} className={styles.inlineLink}>
            {release.title}
          </Link>
        </div>
      </div>
    </section>
  );
}

function StaffSection({
  page,
  contributors,
  variant,
}: {
  page: Thoughts2SpecialData;
  contributors: string[];
  variant: string;
}) {
  return (
    <section id="staff" className={styles.copyBlock} data-variant={variant}>
      <h2 className={styles.sectionTitle}>{page.labels.staff}</h2>
      <p className={styles.sectionLabel}>{page.labels.contributors}</p>
      <div className={styles.staffGrid} data-variant={variant}>
        {contributors.map((name) => (
          <div key={name} className={styles.staffItem}>
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}

function MetaRail({
  items,
  compact = false,
}: {
  items: Thoughts2SpecialData["meta"];
  compact?: boolean;
}) {
  return (
    <section className={styles.metaRail} data-compact={compact ? "true" : "false"}>
      {items.map((item) => (
        <div key={item.label} className={styles.metaCell}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </section>
  );
}

function GallerySection({
  page,
  materials,
  variant,
}: {
  page: Thoughts2SpecialData;
  materials: MaterialItem[];
  variant: string;
}) {
  return (
    <section id="gallery" className={styles.materialsSection} data-variant={variant}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{page.labels.gallery}</h2>
        <p className={styles.sectionSummary}>{page.currentEdition.description}</p>
      </div>
      <div className={styles.materialsGrid}>
        {materials.map((item) => (
          <figure key={item.key} className={styles.materialCard}>
            <div className={styles.materialFrame}>
              <ThoughtsImage material={item} className={styles.materialImage} />
            </div>
            <figcaption className={styles.materialCaption}>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function TracklistSection({
  page,
  release,
  variant,
  compact = false,
  emphasis = false,
}: {
  page: Thoughts2SpecialData;
  release: ReleaseDetailViewModel;
  variant: string;
  compact?: boolean;
  emphasis?: boolean;
}) {
  const useStaticTracklist = variant === "echo";

  return (
    <section
      id="tracklist"
      className={styles.trackSection}
      data-compact={compact ? "true" : "false"}
      data-emphasis={emphasis ? "true" : "false"}
      data-variant={variant}
    >
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{page.labels.tracklist}</h2>
        {!useStaticTracklist ? <p className={styles.sectionSummary}>{page.tagline}</p> : null}
      </div>
      <div className={styles.trackLayout}>
        {useStaticTracklist ? (
          <div className={styles.trackList}>
            {release.tracksDetailed.map((track, index) => (
              <article key={`${track.number ?? index}-${track.title}`} className={styles.trackRow}>
                <span className={styles.trackNumber}>{track.number ?? String(index + 1).padStart(2, "0")}</span>
                <div className={styles.trackBody}>
                  <h2>{track.title}</h2>
                  <p>{track.artist ?? release.artistName}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <StaggerGroup className={styles.trackList} density="tight" amount={0.04}>
            {release.tracksDetailed.map((track, index) => (
              <StaggerItem key={`${track.number ?? index}-${track.title}`}>
                <article className={styles.trackRow}>
                  <span className={styles.trackNumber}>{track.number ?? String(index + 1).padStart(2, "0")}</span>
                  <div className={styles.trackBody}>
                    <h2>{track.title}</h2>
                    <p>{track.artist ?? release.artistName}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
        <div className={styles.trackAside} data-variant={variant}>
          <p className={styles.sectionLabel}>{page.labels.about}</p>
          <p className={styles.trackAsideText}>{page.currentEdition.summary}</p>
        </div>
      </div>
    </section>
  );
}

function EchoTracklistSection({
  page,
  release,
}: {
  page: Thoughts2SpecialData;
  release: ReleaseDetailViewModel;
}) {
  const midpoint = Math.ceil(release.tracksDetailed.length / 2);
  const trackColumns = [release.tracksDetailed.slice(0, midpoint), release.tracksDetailed.slice(midpoint)].filter(
    (column) => column.length > 0,
  );

  return (
    <section id="tracklist" className={styles.echoTrackSection}>
      <div className={styles.echoTrackHeader}>
        <div className={styles.echoTrackHeaderCopy}>
          <h2 className={styles.sectionTitle}>{page.labels.tracklist}</h2>
        </div>
      </div>

      <div className={styles.echoTrackColumns}>
        {trackColumns.map((column, columnIndex) => (
          <div key={`column-${columnIndex}`} role="group" aria-label={`${page.labels.tracklist} column ${columnIndex + 1}`}>
            <StaggerGroup className={styles.echoTrackColumn} density="tight" amount={0.04}>
              {column.map((track, index) => (
                <StaggerItem key={`${track.number ?? index}-${track.title}`}>
                  <article className={styles.echoTrackRow}>
                    <span className={styles.echoTrackNumber}>{track.number ?? String(index + 1).padStart(2, "0")}</span>
                    <div className={styles.echoTrackBody}>
                      <h3>{track.title}</h3>
                      <p>{track.artist ?? release.artistName}</p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        ))}
      </div>
    </section>
  );
}

function ThoughtsImage({
  material,
  priority = false,
  className,
}: {
  material: MaterialItem;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={withBasePathAsset(material.src)}
      alt={material.alt}
      width={material.width}
      height={material.height}
      priority={priority}
      className={className ? `${styles.image} ${className}` : styles.image}
      sizes="(max-width: 768px) 92vw, (max-width: 1280px) 60vw, 900px"
    />
  );
}

function getEchoActionLabel(locale: Locale, kind: "event" | "mail") {
  const labels = {
    en: {
      event: "Event sale",
      mail: "Mail order",
    },
    zh: {
      event: "场贩信息",
      mail: "通贩",
    },
    ja: {
      event: "会場頒布",
      mail: "通販",
    },
  } as const;

  return labels[locale][kind];
}

function getEchoHeroActionLabel(locale: Locale, kind: "youtube" | "bilibili") {
  const labels = {
    en: {
      youtube: "YouTube",
      bilibili: "Bilibili",
    },
    zh: {
      youtube: "YouTube",
      bilibili: "Bilibili",
    },
    ja: {
      youtube: "YouTube",
      bilibili: "Bilibili",
    },
  } as const;

  return labels[locale][kind];
}

function getEchoMediaMessage(locale: Locale, kind: "youtube" | "bilibili") {
  const labels = {
    en: {
      youtube: "No YouTube preview is configured for this release yet.",
      bilibili: "Open Thoughost's Bilibili page in a new tab.",
    },
    zh: {
      youtube: "这张专辑暂时还没有配置 YouTube 预览。",
      bilibili: "在新标签页打开 Thoughost 的 Bilibili 页面。",
    },
    ja: {
      youtube: "この作品の YouTube プレビューはまだ設定されていません。",
      bilibili: "Thoughost の Bilibili ページを新しいタブで開きます。",
    },
  } as const;

  return labels[locale][kind];
}

function toYouTubeEmbedUrl(url?: string) {
  if (!url) {
    return null;
  }

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      const videoId = parsed.pathname.replace("/", "");

      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
  } catch {
    return null;
  }

  return null;
}

const thoughts2DesignImages = {
  characterDesignOne: {
    key: "thoughts-2-character-design-1",
    src: "/images/special/thoughts-2/design/character-design-1.png",
    width: 1181,
    height: 936,
    alt: "thoughts 2 character design sheet",
    caption: "Official character design",
  },
  characterDesignTwo: {
    key: "thoughts-2-character-design-2",
    src: "/images/special/thoughts-2/design/character-design-2.png",
    width: 2000,
    height: 2900,
    alt: "thoughts 2 full character design sheet",
    caption: "Concept design",
  },
  compositionOne: {
    key: "thoughts-2-composition-1",
    src: "/images/special/thoughts-2/design/composition-1.png",
    width: 3000,
    height: 3000,
    alt: "thoughts 2 composition study 1",
    caption: "Composition study 1",
  },
  compositionTwo: {
    key: "thoughts-2-composition-2",
    src: "/images/special/thoughts-2/design/composition-2.png",
    width: 3000,
    height: 3000,
    alt: "thoughts 2 composition study 2",
    caption: "Composition study 2",
  },
  compositionThree: {
    key: "thoughts-2-composition-3",
    src: "/images/special/thoughts-2/design/composition-3.png",
    width: 3000,
    height: 3000,
    alt: "thoughts 2 composition study 3",
    caption: "Composition study 3",
  },
  finalArtwork: {
    key: "thoughts-2-final-artwork-1",
    src: "/images/special/thoughts-2/design/final-artwork-1.png",
    width: 3000,
    height: 3000,
    alt: "thoughts 2 final artwork",
    caption: "Final artwork",
  },
} satisfies Record<string, ThoughtsSpecialImage>;

function createThoughts2LinkedThoughtsPage(
  locale: Locale,
  page: Thoughts2SpecialData,
  linkedThoughtsPage: ReturnType<typeof getThoughtsSpecial>,
  release: ReleaseDetailViewModel,
  contributors: string[],
): ReturnType<typeof getThoughtsSpecial> {
  const designStatement = page.echoStatements.find((statement) => statement.name === "Konseki Takane");
  const artStatementNames = new Set(["Konseki Takane", "TARA#376"]);
  const artStatementCards = page.echoStatements
    .filter((statement) => artStatementNames.has(statement.name))
    .map((statement) => ({
      title: statement.name,
      subtitle: statement.role ?? "",
      paragraphs: statement.paragraphs,
    }));
  const musicCards = page.echoStatements
    .filter((statement) => !artStatementNames.has(statement.name))
    .map((statement) => ({
      title: statement.name,
      subtitle: statement.role ?? "",
      paragraphs: statement.paragraphs,
    }));

  if (!designStatement) {
    return {
      ...linkedThoughtsPage,
      musicCards,
      artProcessGroups: createThoughts2ArtProcessGroups(),
      credits: createThoughts2Credits(locale, page, release, contributors),
    };
  }

  const designCard = {
    title: designStatement.name,
    subtitle: designStatement.role ?? "",
    paragraphs: designStatement.paragraphs,
  };

  return {
    ...linkedThoughtsPage,
    musicCards,
    artProcessGroups: createThoughts2ArtProcessGroups(),
    artPeople: linkedThoughtsPage.artPeople.map(
      (person) => artStatementCards.find((card) => card.title === person.title) ?? person,
    ),
    konsekiSection: {
      ...linkedThoughtsPage.konsekiSection,
      role: designCard.subtitle,
      paragraphs: designCard.paragraphs,
      images: [
        thoughts2DesignImages.compositionOne,
        thoughts2DesignImages.compositionTwo,
        thoughts2DesignImages.compositionThree,
      ],
    },
    credits: createThoughts2Credits(locale, page, release, contributors),
  };
}

function createThoughts2ArtProcessGroups() {
  return [
    {
      title: "Character Design",
      images: [thoughts2DesignImages.characterDesignOne, thoughts2DesignImages.characterDesignTwo],
    },
    {
      title: "Composition Studies",
      images: [
        thoughts2DesignImages.compositionOne,
        thoughts2DesignImages.compositionTwo,
        thoughts2DesignImages.compositionThree,
      ],
    },
    {
      title: "Final Artwork",
      images: [thoughts2DesignImages.finalArtwork],
    },
  ];
}

function createThoughts2Credits(
  locale: Locale,
  page: Thoughts2SpecialData,
  release: ReleaseDetailViewModel,
  contributors: string[],
): ThoughtsSpecialCreditGroup[] {
  const labels = {
    releaseDate: locale === "zh" ? "发售日期" : locale === "ja" ? "発売日" : "Album Release Date",
    artists: locale === "zh" ? "参与艺术家" : locale === "ja" ? "アーティスト" : "Artist",
  };

  return [
    {
      label: labels.releaseDate,
      values: [release.releaseDateLabel],
    },
    {
      label: labels.artists,
      values: contributors,
    },
    ...page.pageTwo.staffRows.map((row) => ({
      label: row.label,
      values: [row.value],
    })),
  ];
}
