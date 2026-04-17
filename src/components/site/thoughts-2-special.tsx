import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import type { Thoughts2Edition, getThoughts2Special } from "@/content/site/thoughts2-special";
import { withBasePathAsset } from "@/lib/base-path";
import { withLocale } from "@/lib/locale";
import type { Locale, ReleaseDetailViewModel } from "@/types/site";
import { Thoughts2Share } from "@/components/site/thoughts-2-share";

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

  return (
    <div className={styles.shell} data-edition={page.edition}>
      <VersionSwitcher locale={locale} page={page} />
      <EditionLayout locale={locale} release={release} page={page} contributors={contributors} />
    </div>
  );
}

function EditionLayout({
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
        <OverviewSection locale={locale} release={release} page={page} variant="poster" />
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
        <section className={styles.heroEcho}>
          <div className={styles.echoBackground}>
            <div className={styles.echoRingLarge} />
            <div className={styles.echoRingMedium} />
            <div className={styles.echoRingSmall} />
          </div>
          <div className={styles.echoCopy}>
            <FadeIn delay={0.04} y={12}>
              <p className={styles.eyebrow}>{page.currentEdition.shortTitle}</p>
            </FadeIn>
            <FadeIn delay={0.08} y={18}>
              <h1 className={styles.echoTitle}>{page.title}</h1>
            </FadeIn>
            <FadeIn delay={0.12} y={16}>
              <p className={styles.echoIntro}>{page.currentEdition.summary}</p>
            </FadeIn>
            <FadeIn delay={0.16} y={18}>
              <p className={styles.echoText}>{page.intro}</p>
            </FadeIn>
          </div>
          <div className={styles.echoMedia}>
            <ThoughtsImage material={page.materials[0]} priority />
          </div>
        </section>
        <OverviewSection locale={locale} release={release} page={page} variant="echo" />
        <AboutSection page={page} variant="echo" />
        <TracklistSection page={page} release={release} variant="echo" emphasis />
        <section className={styles.echoBottom}>
          <GallerySection page={page} materials={[page.materials[4], page.materials[3], page.materials[5]]} variant="echo" />
          <StaffSection page={page} contributors={contributors} variant="echo" />
        </section>
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
        <OverviewSection locale={locale} release={release} page={page} variant="material" />
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
        <OverviewSection locale={locale} release={release} page={page} variant="ring" />
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
  locale,
  release,
  page,
  variant,
}: {
  locale: Locale;
  release: ReleaseDetailViewModel;
  page: Thoughts2SpecialData;
  variant: string;
}) {
  return (
    <section id="overview" className={styles.infoDeck} data-variant={variant}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{page.labels.overview}</h2>
        <p className={styles.sectionSummary}>{page.currentEdition.description}</p>
      </div>
      <MetaRail page={page} compact />
      <div className={styles.infoDeckBody}>
        <section className={styles.infoDeckPanel}>
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
        <section className={styles.infoDeckPanel}>
          <p className={styles.sectionLabel}>{page.labels.about}</p>
          <div className={styles.infoDeckCopy}>
            <p>{page.intro}</p>
            <p>{page.currentEdition.summary}</p>
          </div>
        </section>
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
  return (
    <section id="about" className={styles.copyBlock} data-variant={variant}>
      <h2 className={styles.sectionTitle}>{page.labels.about}</h2>
      <p className={styles.sectionLabel}>{page.labels.manifesto}</p>
      <div className={styles.copyText}>
        {page.manifesto.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
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
  page,
  compact = false,
}: {
  page: Thoughts2SpecialData;
  compact?: boolean;
}) {
  return (
    <section className={styles.metaRail} data-compact={compact ? "true" : "false"}>
      {page.meta.map((item) => (
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
        <p className={styles.sectionSummary}>{page.tagline}</p>
      </div>
      <div className={styles.trackLayout}>
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
        <div className={styles.trackAside} data-variant={variant}>
          <p className={styles.sectionLabel}>{page.labels.about}</p>
          <p className={styles.trackAsideText}>{page.currentEdition.summary}</p>
        </div>
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
