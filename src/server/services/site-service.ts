import { aboutIntro, members as memberEntries } from "@/content/site/members-data";
import { getDictionary } from "@/content/site/dictionaries";
import {
  navigation,
  blackHole,
  featureFlags,
  pageContent,
  projectCall,
  projects,
  releases,
  siteConfig,
  socialLinks,
} from "@/content/site/data";
import type {
  AboutPageViewModel,
  BlackHolePageViewModel,
  AboutGroupViewModel,
  FooterGroup,
  MemberAppearanceSummary,
  HeroSlide,
  Locale,
  LocalizedText,
  MemberGroupKey,
  MemberProfile,
  MemberProfileMetrics,
  MemberTrackSummary,
  NavItem,
  NewsCardItem,
  ProjectCallViewModel,
  ReleaseDetailViewModel,
  ReleaseEntry,
  ReleaseGridItem,
  ReleaseInfoField,
  ReleaseLink,
  ReleasePurchaseLink,
  ReleasePurchaseLinkKind,
  ReleaseTrack,
  ReleaseType,
  SocialIconLink,
} from "@/types/site";
import { newsContentModules } from "@/content/news";

function pickText<T extends { en: unknown; zh: unknown; jp: unknown }>(locale: Locale, value: T): T["en"] {
  return value[locale] ?? value.en;
}

const heroOrder = ["2000-invasion", "thoughts", "kakusatsu-shoujo-3", "moonshine-001", "asteria"] as const;

function pickMaybeLocalized(locale: Locale, value?: { en: string; zh: string; jp: string } | string) {
  if (!value) {
    return undefined;
  }

  return typeof value === "string" ? value : pickText(locale, value);
}

function castReleaseType(value: string): ReleaseType {
  return value as ReleaseType;
}

function inferPurchaseKind(platform: string): ReleasePurchaseLinkKind {
  const lowered = platform.toLowerCase();

  if (lowered.includes("bandcamp")) {
    return "bandcamp";
  }

  if (lowered.includes("dizzylab")) {
    return "dizzylab";
  }

  if (lowered.includes("diverse")) {
    return "diverse";
  }

  if (lowered.includes("video") || lowered.includes("youtube") || lowered.includes("bilibili")) {
    return "video";
  }

  if (lowered.includes("special")) {
    return "special";
  }

  return "official";
}

function getPurchaseLinks(release: ReleaseEntry): ReleasePurchaseLink[] {
  if (release.purchaseLinks?.length) {
    return release.purchaseLinks;
  }

  return release.links.map((link) => ({
    label: link.label,
    url: link.url,
    kind: inferPurchaseKind(link.platform),
  }));
}

function getStoreLabel(locale: Locale, release: ReleaseEntry, purchaseLinks: ReleasePurchaseLink[]) {
  const explicitStore = pickMaybeLocalized(locale, release.store);

  if (explicitStore) {
    return explicitStore;
  }

  if (!purchaseLinks.length) {
    return undefined;
  }

  return purchaseLinks.map((link) => link.label).join(" / ");
}

function getInfoFieldLabels(locale: Locale) {
  const labels = {
    en: {
      modelNumber: "Model Number",
      releaseDate: "Release Date",
      price: "Price",
      store: "Store",
      illustrator: "Illustrator",
      designer: "Designer",
      mastering: "Mastering",
      producer: "Producer",
    },
    zh: {
      modelNumber: "编号",
      releaseDate: "发行日期",
      price: "价格",
      store: "店铺",
      illustrator: "插画",
      designer: "设计",
      mastering: "母带",
      producer: "制作",
    },
    jp: {
      modelNumber: "型番",
      releaseDate: "発売日",
      price: "価格",
      store: "取扱",
      illustrator: "イラスト",
      designer: "デザイン",
      mastering: "マスタリング",
      producer: "プロデュース",
    },
  } as const;

  return labels[locale];
}

function getInfoFields(locale: Locale, release: ReleaseEntry, purchaseLinks: ReleasePurchaseLink[]): ReleaseInfoField[] {
  const labels = getInfoFieldLabels(locale);
  const dash = "—";

  return [
    { label: labels.modelNumber, value: release.modelNumber ?? dash },
    { label: labels.releaseDate, value: release.releaseDate ?? dash },
    { label: labels.price, value: pickMaybeLocalized(locale, release.price) ?? dash },
    { label: labels.store, value: getStoreLabel(locale, release, purchaseLinks) ?? dash },
    { label: labels.illustrator, value: release.credits?.illustrator ?? dash },
    { label: labels.designer, value: release.credits?.designer ?? dash },
    { label: labels.mastering, value: release.credits?.mastering ?? dash },
    { label: labels.producer, value: release.credits?.producer ?? dash },
  ];
}

function getTracksDetailed(locale: Locale, release: ReleaseEntry): ReleaseTrack[] {
  if (release.tracks) {
    return pickText(locale, release.tracks);
  }

  return pickText(locale, release.tracklist).map((title, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title,
  }));
}

function getTrackPreview(tracksDetailed: ReleaseTrack[]) {
  const items = tracksDetailed.slice(0, 4);

  return {
    items,
    remainingCount: Math.max(tracksDetailed.length - items.length, 0),
  };
}

function getStoreLinks(release: ReleaseEntry): ReleaseLink[] {
  const links = [
    ...release.links,
    ...(release.purchaseLinks ?? []).map((link) => ({
      platform: link.label,
      label: link.label,
      url: link.url,
    })),
  ];

  const seen = new Set<string>();
  const deduped = links.filter((link) => {
    const key = `${link.label}:${link.url}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });

  if (release.videoLink) {
    deduped.push({
      platform: "Video",
      label: "Video",
      url: release.videoLink,
    });
  }

  if (release.specialLink) {
    deduped.push({
      platform: "Special",
      label: "Special",
      url: release.specialLink,
    });
  }

  return deduped;
}

function getRepresentativeTracks(
  locale: Locale,
  trackRefs: Array<{
    releaseSlug: string;
    trackNumbers: string[];
  }>,
): MemberTrackSummary[] {
  return trackRefs.flatMap((trackRef) => {
    const release = releases.find((item) => item.slug === trackRef.releaseSlug);

    if (!release) {
      return [];
    }

    const tracks = getTracksDetailed(locale, release).filter((track) =>
      track.number ? trackRef.trackNumbers.includes(track.number) : false,
    );

    return tracks.map((track) => ({
      releaseSlug: release.slug,
      releaseTitle: pickText(locale, release.title),
      releaseHref: `/releases/${release.slug}`,
      trackNumber: track.number,
      trackTitle: track.title,
      trackArtist: track.artist,
    }));
  });
}

function tokenizeArtistCredits(artistName: string) {
  return artistName
    .split(/[,;/&、]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function matchesMemberName(text: string, memberName: string) {
  return text.toLowerCase().includes(memberName.toLowerCase());
}

function getReleaseTimestamp(label: string) {
  return Date.parse(label.replaceAll(".", "-"));
}

function sortAppearances(a: { releaseDateLabel: string; sortIndex: number }, b: { releaseDateLabel: string; sortIndex: number }) {
  const timestampDiff = getReleaseTimestamp(b.releaseDateLabel) - getReleaseTimestamp(a.releaseDateLabel);

  if (timestampDiff !== 0) {
    return timestampDiff;
  }

  return a.sortIndex - b.sortIndex;
}

function getMemberAppearances(
  locale: Locale,
  member: Pick<MemberProfile, "name">,
): MemberAppearanceSummary[] {
  const appearances = releases.flatMap((release, sortIndex) => {
    const primaryMatch = tokenizeArtistCredits(release.artistName).includes(member.name);
    const tracksDetailed = getTracksDetailed(locale, release);
    const matchedTrackCount = tracksDetailed.filter((track) =>
      track.artist ? matchesMemberName(track.artist, member.name) : false,
    ).length;

    if (!primaryMatch && matchedTrackCount === 0) {
      return [];
    }

    return [
      {
        releaseSlug: release.slug,
        releaseTitle: pickText(locale, release.title),
        releaseHref: `/releases/${release.slug}`,
        releaseType: castReleaseType(release.releaseType),
        releaseDateLabel: release.releaseDate,
        coverImage: release.coverImage,
        matchKind: primaryMatch ? ("primary" as const) : ("track" as const),
        matchedTrackCount,
        sortIndex,
      },
    ];
  });

  return appearances
    .sort(sortAppearances)
    .map(({ sortIndex, ...appearance }) => {
      void sortIndex;

      return appearance;
    });
}

function getSelectedReleases(appearances: MemberAppearanceSummary[]) {
  const primaryMatches = appearances.filter((appearance) => appearance.matchKind === "primary");
  const trackMatches = appearances.filter((appearance) => appearance.matchKind === "track");
  const selected = [...primaryMatches];

  for (const appearance of trackMatches) {
    if (selected.length >= 3) {
      break;
    }

    selected.push(appearance);
  }

  return selected
    .sort((a, b) =>
      sortAppearances(
        { releaseDateLabel: a.releaseDateLabel, sortIndex: releases.findIndex((release) => release.slug === a.releaseSlug) },
        { releaseDateLabel: b.releaseDateLabel, sortIndex: releases.findIndex((release) => release.slug === b.releaseSlug) },
      ),
    )
    .slice(0, 3);
}

function getMemberMetrics(
  member: Pick<MemberProfile, "representativeTracks">,
  appearances: MemberAppearanceSummary[],
): MemberProfileMetrics | undefined {
  if (!appearances.length) {
    return {
      featuredTrackCount: member.representativeTracks.length,
      releaseAppearanceCount: 0,
      trackAppearanceCount: 0,
    };
  }

  const latestRelease = appearances[0];

  return {
    featuredTrackCount: member.representativeTracks.length,
    releaseAppearanceCount: appearances.length,
    trackAppearanceCount: appearances.reduce((total, appearance) => total + appearance.matchedTrackCount, 0),
    latestReleaseTitle: latestRelease.releaseTitle,
    latestReleaseDateLabel: latestRelease.releaseDateLabel,
  };
}

export function getAboutPage(locale: Locale): AboutPageViewModel {
  const dictionary = getDictionary(locale);
  const groupLabels: Record<MemberGroupKey, string> = {
    members: dictionary.about.membersHeading,
    staff: dictionary.about.staffHeading,
  };

  const mappedMembers = memberEntries.map<MemberProfile>((member) => {
    const representativeTracks = getRepresentativeTracks(locale, member.representativeTracks);
    const mappedMemberBase = {
      slug: member.slug,
      name: pickText(locale, member.name),
      role: pickText(locale, member.role),
      group: member.group,
      isArtistLike: member.group === "members",
      image: member.image,
      bio: member.bio ? pickText(locale, member.bio) : undefined,
      representativeTracks,
      links: member.links,
    };

    if (member.group !== "members") {
      return {
        ...mappedMemberBase,
        selectedReleases: [],
      };
    }

    const appearances = getMemberAppearances(locale, { name: mappedMemberBase.name });

    return {
      ...mappedMemberBase,
      metrics: getMemberMetrics({ representativeTracks }, appearances),
      selectedReleases: getSelectedReleases(appearances),
    };
  });

  const groups = (["members", "staff"] as const).map<AboutGroupViewModel>((groupKey) => ({
    key: groupKey,
    label: groupLabels[groupKey],
    members: mappedMembers.filter((member) => member.group === groupKey),
  }));

  return {
    introTitle: pickText(locale, aboutIntro.title),
    introBody: pickText(locale, aboutIntro.body),
    labels: dictionary.about,
    groups,
  };
}

export function getSiteConfig(locale: Locale) {
  return {
    ...siteConfig,
    footerQuote: pickText(locale, siteConfig.footerQuote),
    dictionary: getDictionary(locale),
  };
}

function mapNewsPreview(locale: Locale) {
  return newsContentModules
    .filter((item) => item.meta.published)
    .sort((a, b) => {
      const pinDiff = Number(Boolean(b.meta.pinned)) - Number(Boolean(a.meta.pinned));

      if (pinDiff !== 0) {
        return pinDiff;
      }

      const dateDiff = Date.parse(b.meta.date) - Date.parse(a.meta.date);

      if (dateDiff !== 0) {
        return dateDiff;
      }

      return a.meta.slug.localeCompare(b.meta.slug);
    })
    .slice(0, 4)
    .map((item) => ({
      slug: item.meta.slug,
      title: pickText(locale, item.meta.title as LocalizedText),
      dateLabel: item.meta.date.replaceAll("-", "."),
      href: item.meta.externalUrl ?? `/news/${item.meta.slug}`,
      isExternal: Boolean(item.meta.externalUrl),
    }));
}

export function getNavigation(locale: Locale): NavItem[] {
  return navigation
    .filter((item) => item.key !== "news" || featureFlags.showNewsInNavigation)
    .map((item) => ({
      key: item.key,
      href: item.href,
      label: pickText(locale, item.label),
    }));
}

export function getSocialLinks(): SocialIconLink[] {
  return socialLinks;
}

export function getHero(locale: Locale): HeroSlide[] {
  return heroOrder
    .map((slug) => releases.find((item) => item.slug === slug && item.isHero))
    .filter((item): item is ReleaseEntry => Boolean(item))
    .map((item) => ({
      slug: item.slug,
      title: pickText(locale, item.heroTitle ?? item.title),
      subtitle: pickText(locale, item.teaser),
      ctaLabel: "Learn More",
      ctaHref: `/releases/${item.slug}`,
      leftImage: item.heroImage ?? item.coverImage,
      mainImage: item.heroImage ?? item.coverImage,
      rightImage: item.heroImage ?? item.coverImage,
    }));
}

export function getNews(locale: Locale): NewsCardItem[] {
  return mapNewsPreview(locale);
}

export function getReleases(locale: Locale): ReleaseGridItem[] {
  return releases.map((item) => ({
    slug: item.slug,
    title: pickText(locale, item.title),
    artistName: item.artistName,
    releaseType: castReleaseType(item.releaseType),
    releaseDateLabel: item.releaseDate,
    coverImage: item.coverImage,
  }));
}

export function getFeaturedReleases(locale: Locale): ReleaseGridItem[] {
  const featured = releases.filter((item) => item.isFeatured);

  return featured.map((item) => ({
    slug: item.slug,
    title: pickText(locale, item.title),
    artistName: item.artistName,
    releaseType: castReleaseType(item.releaseType),
    releaseDateLabel: item.releaseDate,
    coverImage: item.coverImage,
  }));
}

export function getReleaseBySlug(locale: Locale, slug: string): ReleaseDetailViewModel | null {
  const release = releases.find((item) => item.slug === slug);

  if (!release) {
    return null;
  }

  const purchaseLinks = getPurchaseLinks(release);
  const tracksDetailed = getTracksDetailed(locale, release);

  return {
    slug: release.slug,
    title: pickText(locale, release.title),
    subtitle: pickMaybeLocalized(locale, release.subtitle),
    artistName: release.artistName,
    releaseType: castReleaseType(release.releaseType),
    releaseDateLabel: release.releaseDate,
    coverImage: release.coverImage,
    heroImage: release.heroImage,
    teaser: pickText(locale, release.teaser),
    summary: pickText(locale, release.summary),
    purchaseLinks,
    infoFields: getInfoFields(locale, release, purchaseLinks),
    tracksDetailed,
    trackPreview: getTrackPreview(tracksDetailed),
    storeLinks: getStoreLinks(release),
    circleLink: release.circleLink,
    itemListLink: release.itemListLink,
    videoLink: release.videoLink,
    specialLink: release.specialLink,
    links: release.links,
  };
}

export function getProjects(locale: Locale) {
  return projects.map((item) => ({
    slug: item.slug,
    title: pickText(locale, item.title),
    summary: pickText(locale, item.summary),
    coverImage: item.coverImage,
    href: item.href,
  }));
}

export function getProjectCall(locale: Locale): ProjectCallViewModel {
  return {
    sectionLabel: pickText(locale, projectCall.labels.section),
    title: pickText(locale, projectCall.title),
    summary: pickText(locale, projectCall.summary),
    intro: pickText(locale, projectCall.intro),
    deadlineLabel: pickText(locale, projectCall.labels.deadline),
    deadline: pickText(locale, projectCall.deadline),
    releaseLabel: pickText(locale, projectCall.labels.release),
    release: pickText(locale, projectCall.release),
    submitLabel: pickText(locale, projectCall.labels.submit),
    submitHref: projectCall.submitHref,
    projectBriefLabel: pickText(locale, projectCall.labels.projectBrief),
    projectRulesLabel: pickText(locale, projectCall.labels.projectRules),
    projectRules: projectCall.projectRules.map((rule) => pickText(locale, rule)),
    commonRulesHeading: pickText(locale, projectCall.labels.commonRules),
    commonRules: {
      musicSubmission: {
        title: pickText(locale, projectCall.commonRules.musicSubmission.title),
        introLabel: pickText(locale, projectCall.commonRules.musicSubmission.introLabel),
        intro: pickText(locale, projectCall.commonRules.musicSubmission.intro),
        bulletsLabel: pickText(locale, projectCall.commonRules.musicSubmission.bulletsLabel),
        bullets: projectCall.commonRules.musicSubmission.bullets.map((item) => pickText(locale, item)),
      },
      aboutSubmission: {
        title: pickText(locale, projectCall.commonRules.aboutSubmission.title),
        body: pickText(locale, projectCall.commonRules.aboutSubmission.body),
        requiredInfoLabel: pickText(locale, projectCall.commonRules.aboutSubmission.requiredInfoLabel),
        requiredInfo: projectCall.commonRules.aboutSubmission.requiredInfo.map((item) => pickText(locale, item)),
        specNote: pickText(locale, projectCall.commonRules.aboutSubmission.specNote),
      },
    },
    rewards: {
      title: pickText(locale, projectCall.rewards.title),
      introLabel: pickText(locale, projectCall.rewards.introLabel),
      intro: pickText(locale, projectCall.rewards.intro),
      bullets: projectCall.rewards.bullets.map((item) => pickText(locale, item)),
    },
    judgment: {
      title: pickText(locale, projectCall.judgment.title),
      body: pickText(locale, projectCall.judgment.body),
    },
    warning: pickText(locale, projectCall.labels.warning),
    finalCtaTitle: pickText(locale, projectCall.labels.finalCtaTitle),
    finalCtaBody: pickText(locale, projectCall.labels.finalCtaBody),
    fallbackLabel: pickText(locale, projectCall.labels.fallback),
    contactEmail: siteConfig.contactEmail,
  };
}

export function getBlackHolePage(locale: Locale): BlackHolePageViewModel {
  return {
    title: pickText(locale, blackHole.title),
    status: pickText(locale, blackHole.status),
    summary: pickText(locale, blackHole.summary),
    backLinkLabel: pickText(locale, blackHole.backLinkLabel),
    backLinkHref: blackHole.backLinkHref,
  };
}

export function getPageContent(locale: Locale, key: keyof typeof pageContent) {
  const page = pageContent[key];

  return {
    title: pickText(locale, page.title),
    body: pickText(locale, page.body),
  };
}

export function getFooter(locale: Locale): {
  groups: FooterGroup[];
  socialLinks: SocialIconLink[];
  contactEmail: string;
  contactLabel: string;
  followUsLabel: string;
  quote: string;
  copyrightText: string;
} {
  const dictionary = getDictionary(locale);

  return {
    groups: [
      {
        links: [
          { key: "about", href: "/about", label: dictionary.nav.about },
          { key: "discography", href: "/releases", label: dictionary.nav.discography },
          { key: "contact", href: "/#contact", label: dictionary.nav.contact },
        ],
      },
      {
        title: dictionary.footer.blackHole,
        links: [{ key: "black-hole", href: "/special/black-hole", label: "BLACK HOLE" }],
      },
    ],
    socialLinks,
    contactEmail: siteConfig.contactEmail,
    contactLabel: dictionary.footer.email,
    followUsLabel: dictionary.footer.followUs,
    quote: pickText(locale, siteConfig.footerQuote),
    copyrightText: siteConfig.copyrightText,
  };
}
