import { db } from "../src/server/db";
import { newsContentModules } from "../src/content/news";
import {
  navigation,
  pageContent,
  projects,
  releases,
  siteConfig,
  socialLinks,
} from "../src/content/site/data";

// Reserved scaffolding only: this mirrors the file-content source so Prisma can
// stay ready for future DB-backed reads without defining the current runtime path.
async function main() {
  await db.releaseLink.deleteMany();
  await db.release.deleteMany();
  await db.newsItem.deleteMany();
  await db.heroProject.deleteMany();
  await db.projectItem.deleteMany();
  await db.navigationLink.deleteMany();
  await db.socialLink.deleteMany();
  await db.pageContent.deleteMany();
  await db.siteConfig.deleteMany();

  await db.siteConfig.create({
    data: {
      defaultLocale: siteConfig.defaultLocale,
      contactEmail: siteConfig.contactEmail,
      copyrightText: siteConfig.copyrightText,
      footerQuoteEn: siteConfig.footerQuote.en,
      footerQuoteZh: siteConfig.footerQuote.zh,
      footerQuoteJa: siteConfig.footerQuote.ja,
    },
  });

  await db.navigationLink.createMany({
    data: navigation.map((item, index) => ({
      key: item.key,
      labelEn: item.label.en,
      labelZh: item.label.zh,
      labelJa: item.label.ja,
      href: item.href,
      sortOrder: index,
      location: "header",
    })),
  });

  await db.socialLink.createMany({
    data: socialLinks.map((item, index) => ({
      platform: item.platform,
      label: item.label,
      url: item.url,
      iconKey: item.iconKey,
      sortOrder: index,
    })),
  });

  await db.heroProject.createMany({
    data: releases
      .filter((item) => item.isHero)
      .map((item, index) => ({
        slug: item.slug,
        titleEn: item.title.en,
        titleZh: item.title.zh,
        titleJa: item.title.ja,
        subtitleEn: item.summary.en,
        subtitleZh: item.summary.zh,
        subtitleJa: item.summary.ja,
        ctaLabelEn: "Learn more",
        ctaLabelZh: "了解更多",
        ctaLabelJa: "もっと見る",
        ctaHref: `/releases/${item.slug}`,
        leftImage: item.coverImage,
        mainImage: item.coverImage,
        rightImage: item.coverImage,
        isActive: true,
        sortOrder: index,
      })),
  });

  await db.newsItem.createMany({
    data: newsContentModules.map(({ meta }) => ({
      slug: meta.slug,
      date: new Date(meta.date),
      titleEn: meta.title.en,
      titleZh: meta.title.zh,
      titleJa: meta.title.ja,
      summaryEn: meta.summary.en,
      summaryZh: meta.summary.zh,
      summaryJa: meta.summary.ja,
      href: meta.externalUrl ?? `/news/${meta.slug}`,
      isPinned: meta.pinned ?? false,
      published: meta.published,
    })),
  });

  for (const [index, item] of releases.entries()) {
    await db.release.create({
      data: {
        slug: item.slug,
        titleEn: item.title.en,
        titleZh: item.title.zh,
        titleJa: item.title.ja,
        artistName: item.artistName,
        releaseType: item.releaseType,
        releaseDate: new Date(item.releaseDate.replace(/\./g, "-")),
        coverImage: item.coverImage,
        heroImage: item.heroImage,
        summaryEn: item.summary.en,
        summaryZh: item.summary.zh,
        summaryJa: item.summary.ja,
        tracklistEn: item.tracklist.en,
        tracklistZh: item.tracklist.zh,
        tracklistJa: item.tracklist.ja,
        isFeatured: item.isFeatured ?? false,
        sortOrder: index,
        published: true,
        links: {
          create: item.links.map((link, linkIndex) => ({
            platform: link.platform,
            url: link.url,
            sortOrder: linkIndex,
          })),
        },
      },
    });
  }

  await db.pageContent.createMany({
    data: Object.entries(pageContent).map(([pageKey, value]) => ({
      pageKey,
      titleEn: value.title.en,
      titleZh: value.title.zh,
      titleJa: value.title.ja,
      bodyEn: value.body.en,
      bodyZh: value.body.zh,
      bodyJa: value.body.ja,
    })),
  });

  await db.projectItem.createMany({
    data: projects.map((item, index) => ({
      slug: item.slug,
      titleEn: item.title.en,
      titleZh: item.title.zh,
      titleJa: item.title.ja,
      summaryEn: item.summary.en,
      summaryZh: item.summary.zh,
      summaryJa: item.summary.ja,
      coverImage: item.coverImage,
      href: item.href,
      published: true,
      sortOrder: index,
    })),
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  });
