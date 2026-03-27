export type Locale = "en" | "zh" | "jp";

export type LocalizedText = {
  en: string;
  zh: string;
  jp: string;
};

export type NavItem = {
  key: string;
  href: string;
  label: string;
};

export type SocialIconLink = {
  platform: string;
  label: string;
  url: string;
  iconKey: string;
};

export type ReleaseType = "Album" | "EP" | "Single" | "Compilation" | "Collaboration";

export type ReleaseLink = {
  platform: string;
  label: string;
  url: string;
};

export type ReleasePurchaseLinkKind = "bandcamp" | "dizzylab" | "diverse" | "official" | "video" | "special";

export type ReleasePurchaseLink = {
  label: string;
  url: string;
  kind: ReleasePurchaseLinkKind;
};

export type ReleaseCredits = {
  illustrator?: string;
  designer?: string;
  mastering?: string;
  producer?: string;
};

export type ReleaseTrack = {
  number?: string;
  title: string;
  artist?: string;
  disc?: string;
};

export type ReleaseInfoField = {
  label: string;
  value: string;
};

export type ReleaseTrackPreviewViewModel = {
  items: ReleaseTrack[];
  remainingCount: number;
};

export type ReleaseEntry = {
  slug: string;
  title: LocalizedText;
  artistName: string;
  releaseType: ReleaseType;
  releaseDate: string;
  coverImage: string;
  heroImage?: string;
  teaser: LocalizedText;
  summary: LocalizedText;
  tracklist: {
    en: string[];
    zh: string[];
    jp: string[];
  };
  links: ReleaseLink[];
  subtitle?: LocalizedText;
  price?: LocalizedText | string;
  store?: LocalizedText | string;
  modelNumber?: string;
  format?: LocalizedText | string;
  edition?: LocalizedText | string;
  credits?: ReleaseCredits;
  purchaseLinks?: ReleasePurchaseLink[];
  tracks?: {
    en: ReleaseTrack[];
    zh: ReleaseTrack[];
    jp: ReleaseTrack[];
  };
  circleLink?: string;
  itemListLink?: string;
  videoLink?: string;
  specialLink?: string;
  isHero?: boolean;
  isFeatured?: boolean;
  heroTitle?: LocalizedText;
};

export type HeroSlide = {
  slug: string;
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  leftImage: string;
  mainImage: string;
  rightImage: string;
  desktopImagePosition?: {
    left?: string;
    main?: string;
    right?: string;
  };
  mobileImagePosition?: string;
};

export type NewsCardItem = {
  slug: string;
  title: string;
  dateLabel: string;
  href: string;
  isExternal?: boolean;
};

export type NewsCategory = "release" | "event" | "site" | "collab";

export type NewsEntryMeta = {
  slug: string;
  date: string;
  title: LocalizedText;
  summary: LocalizedText;
  coverImage?: string;
  coverAlt?: LocalizedText;
  published: boolean;
  pinned?: boolean;
  externalUrl?: string;
  category?: NewsCategory;
  seoTitle?: LocalizedText;
  seoDescription?: LocalizedText;
};

export type NewsLocaleContent = {
  body: string;
};

export type NewsListItem = {
  slug: string;
  title: string;
  summary: string;
  dateLabel: string;
  href: string;
  coverImage?: string;
  coverAlt?: string;
  pinned: boolean;
  isExternal?: boolean;
  category?: NewsCategory;
};

export type NewsAdjacentItem = {
  slug: string;
  title: string;
  href: string;
  dateLabel: string;
  isExternal?: boolean;
};

export type NewsArticleViewModel = {
  slug: string;
  title: string;
  summary: string;
  dateLabel: string;
  href: string;
  coverImage?: string;
  coverAlt?: string;
  html: string;
  pinned: boolean;
  category?: NewsCategory;
  seoTitle?: string;
  seoDescription?: string;
};

export type ReleaseGridItem = {
  slug: string;
  title: string;
  artistName: string;
  releaseType: ReleaseType;
  releaseDateLabel: string;
  coverImage: string;
};

export type ReleaseDetailViewModel = {
  slug: string;
  title: string;
  subtitle?: string;
  artistName: string;
  releaseType: ReleaseType;
  releaseDateLabel: string;
  coverImage: string;
  heroImage?: string;
  teaser: string;
  summary: string;
  purchaseLinks: ReleasePurchaseLink[];
  infoFields: ReleaseInfoField[];
  tracksDetailed: ReleaseTrack[];
  trackPreview: ReleaseTrackPreviewViewModel;
  storeLinks: ReleaseLink[];
  circleLink?: string;
  itemListLink?: string;
  videoLink?: string;
  specialLink?: string;
  links: ReleaseLink[];
};

export type FooterGroup = {
  title?: string;
  links: NavItem[];
};

export type MemberGroupKey = "members" | "staff";

export type MemberProfileLink = {
  label: string;
  url: string;
};

export type MemberProfileSummary = {
  slug: string;
  title: string;
  artistName: string;
  href: string;
};

export type MemberTrackSummary = {
  releaseSlug: string;
  releaseTitle: string;
  releaseHref: string;
  trackNumber?: string;
  trackTitle: string;
  trackArtist?: string;
};

export type MemberAppearanceMatchKind = "primary" | "track";

export type MemberAppearanceSummary = {
  releaseSlug: string;
  releaseTitle: string;
  releaseHref: string;
  releaseType: ReleaseType;
  releaseDateLabel: string;
  coverImage: string;
  matchKind: MemberAppearanceMatchKind;
  matchedTrackCount: number;
};

export type MemberProfileMetrics = {
  featuredTrackCount: number;
  releaseAppearanceCount: number;
  trackAppearanceCount: number;
  latestReleaseTitle?: string;
  latestReleaseDateLabel?: string;
};

export type MemberProfile = {
  slug: string;
  name: string;
  role: string;
  group: MemberGroupKey;
  isArtistLike: boolean;
  image: string;
  bio?: string;
  metrics?: MemberProfileMetrics;
  selectedReleases: MemberAppearanceSummary[];
  representativeTracks: MemberTrackSummary[];
  links: MemberProfileLink[];
};

export type AboutGroupViewModel = {
  key: MemberGroupKey;
  label: string;
  members: MemberProfile[];
};

export type AboutPageViewModel = {
  introTitle: string;
  introBody: string;
  labels: {
    aboutIntroHeading: string;
    membersHeading: string;
    staffHeading: string;
    viewProfile: string;
    profileOverview: string;
    representativeWorks: string;
    featuredTracks: string;
    selectedReleases: string;
    releaseAppearances: string;
    trackAppearances: string;
    latestRelease: string;
    links: string;
    close: string;
    memberNotFound: string;
  };
  groups: AboutGroupViewModel[];
};

export type Dictionary = {
  localeLabel: string;
  home: {
    news: string;
    releases: string;
    more: string;
    learnMore: string;
  };
  nav: {
    nextProject: string;
    about: string;
    news: string;
    discography: string;
    contact: string;
    thoughts: string;
  };
  footer: {
    email: string;
    followUs: string;
    blackHole: string;
    quote: string;
  };
  pages: {
    aboutHeading: string;
    newsHeading: string;
    discographyHeading: string;
    projectHeading: string;
    thoughtsHeading: string;
  };
  news: {
    archiveLabel: string;
    backToNews: string;
    publishedOn: string;
    latestNews: string;
    emptyState: string;
    moreNews: string;
  };
  about: {
    aboutIntroHeading: string;
    membersHeading: string;
    staffHeading: string;
    viewProfile: string;
    profileOverview: string;
    representativeWorks: string;
    featuredTracks: string;
    selectedReleases: string;
    releaseAppearances: string;
    trackAppearances: string;
    latestRelease: string;
    links: string;
    close: string;
    memberNotFound: string;
  };
};

export type ProjectCallRuleGroup = {
  title: string;
  introLabel?: string;
  intro?: string;
  body?: string;
  bulletsLabel?: string;
  bullets?: string[];
  requiredInfoLabel?: string;
  requiredInfo?: string[];
  specNote?: string;
};

export type ProjectCallViewModel = {
  sectionLabel: string;
  title: string;
  summary: string;
  intro: string;
  deadlineLabel: string;
  deadline: string;
  releaseLabel: string;
  release: string;
  submitLabel: string;
  submitHref: string;
  projectBriefLabel: string;
  projectRulesLabel: string;
  projectRules: string[];
  commonRulesHeading: string;
  commonRules: {
    musicSubmission: ProjectCallRuleGroup;
    aboutSubmission: ProjectCallRuleGroup;
  };
  rewards: ProjectCallRuleGroup;
  judgment: ProjectCallRuleGroup;
  warning: string;
  finalCtaTitle: string;
  finalCtaBody: string;
  fallbackLabel: string;
  contactEmail: string;
};

export type BlackHolePageViewModel = {
  title: string;
  status: string;
  summary: string;
  backLinkLabel: string;
  backLinkHref: string;
};
