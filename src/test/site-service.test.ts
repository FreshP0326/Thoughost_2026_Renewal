import { describe, expect, it } from "vitest";

import {
  getAboutPage,
  getBlackHolePage,
  getFooter,
  getHero,
  getNavigation,
  getNews,
  getPageContent,
  getProjectCall,
  getProjects,
  getReleaseBySlug,
  getReleases,
} from "@/server/services/site-service";

describe("site-service", () => {
  it("returns localized hero slides", () => {
    const slides = getHero("zh");

    expect(slides[0]?.title).toBe("2000%\nINVASION");
    expect(slides[0]?.subtitle).toBe("五周年纪念大作，把 2000s 舞池记忆与全明星阵容一起重新点燃。");
    expect(slides).toHaveLength(5);
  });

  it("returns migrated about intro for all locales", () => {
    const enAbout = getAboutPage("en");
    const zhAbout = getAboutPage("zh");
    const jpAbout = getAboutPage("jp");

    expect(enAbout.introTitle).toBe("ABOUT");
    expect(enAbout.introBody).toContain("doujin circle from China");
    expect(zhAbout.introBody).toContain("来自中国");
    expect(jpAbout.introBody).toContain("中国発");
  });

  it("groups member profiles into members and staff", () => {
    const about = getAboutPage("en");
    const membersGroup = about.groups.find((group) => group.key === "members");
    const staffGroup = about.groups.find((group) => group.key === "staff");

    expect(membersGroup?.label).toBe("MEMBERS");
    expect(membersGroup?.members).toHaveLength(7);
    expect(staffGroup?.label).toBe("STAFF");
    expect(staffGroup?.members).toHaveLength(2);
    expect(membersGroup?.members.some((member) => member.name === "Joulez")).toBe(true);
    expect(staffGroup?.members.some((member) => member.name === "rmdyh")).toBe(true);
  });

  it("maps localized member fields and representative works", () => {
    const about = getAboutPage("zh");
    const kitsune = about.groups.flatMap((group) => group.members).find((member) => member.slug === "kitsune");
    const joulez = about.groups.flatMap((group) => group.members).find((member) => member.slug === "joulez");
    const konseki = about.groups.flatMap((group) => group.members).find((member) => member.slug === "konseki-takane");
    const wheatfox = about.groups.flatMap((group) => group.members).find((member) => member.slug === "wheatfox");
    const nirotiy = about.groups.flatMap((group) => group.members).find((member) => member.slug === "nirotiy");

    expect(kitsune?.bio).toContain("HERkomachi");
    expect(kitsune?.bio).toContain("ななひらForever");
    expect(kitsune?.links[0]?.url).toBe("https://twitter.com/xo_kuroneko");
    expect(joulez?.role).toBe("艺术家 / 母带");
    expect(joulez?.image).toBe("/images/artists/joulez.jpg");
    expect(joulez?.bio).toContain("mastering engineer");
    expect(joulez?.isArtistLike).toBe(true);
    expect(joulez?.metrics?.releaseAppearanceCount).toBeGreaterThan(0);
    expect(joulez?.metrics?.trackAppearanceCount).toBeGreaterThanOrEqual(joulez?.representativeTracks.length ?? 0);
    expect(joulez?.selectedReleases.length).toBeGreaterThan(0);
    expect(joulez?.representativeTracks.slice(0, 3).map((item) => item.trackTitle)).toEqual([
      "春ノ終焉",
      "Tessarect of light and stars",
      "Asteria",
    ]);
    expect(konseki?.representativeTracks).toEqual([]);
    expect(wheatfox?.representativeTracks.map((item) => item.trackTitle)).toEqual([
      "Asteria (wheatfox's Neural Botany Mix)",
      "6 p.m.",
      "zexistenze",
    ]);
    expect(nirotiy?.representativeTracks.some((item) => item.trackTitle === "Series Planet Exploration - Miranda -")).toBe(true);
  });

  it("keeps staff profiles simplified while artists get derived release data", () => {
    const about = getAboutPage("en");
    const rmdyh = about.groups.flatMap((group) => group.members).find((member) => member.slug === "rmdyh");
    const nirotiy = about.groups.flatMap((group) => group.members).find((member) => member.slug === "nirotiy");

    expect(rmdyh?.isArtistLike).toBe(false);
    expect(rmdyh?.metrics).toBeUndefined();
    expect(rmdyh?.selectedReleases).toEqual([]);
    expect(nirotiy?.selectedReleases.some((release) => release.releaseSlug === "s-l-v-t-mixture")).toBe(true);
    expect(nirotiy?.metrics?.latestReleaseDateLabel).toBe("2025.10.26");
  });

  it("dedupes and sorts selected releases while preserving manual representative track order", () => {
    const about = getAboutPage("en");
    const joulez = about.groups.flatMap((group) => group.members).find((member) => member.slug === "joulez");

    expect(joulez?.selectedReleases.map((release) => release.releaseSlug)).toEqual(["haru-no-shuen", "asteria", "16-48"]);
    expect(new Set(joulez?.selectedReleases.map((release) => release.releaseSlug)).size).toBe(
      joulez?.selectedReleases.length,
    );
    expect(joulez?.selectedReleases[0]?.matchKind).toBe("primary");
    expect(joulez?.representativeTracks.slice(0, 3).map((item) => item.trackTitle)).toEqual([
      "春ノ終焉",
      "Tessarect of light and stars",
      "Asteria",
    ]);
  });

  it("matches track credits by partial artist text", () => {
    const about = getAboutPage("en");
    const nirotiy = about.groups.flatMap((group) => group.members).find((member) => member.slug === "nirotiy");

    expect(nirotiy?.metrics?.trackAppearanceCount).toBeGreaterThan(nirotiy?.representativeTracks.length ?? 0);
    expect(nirotiy?.selectedReleases.some((release) => release.releaseSlug === "s-l-v-t-mixture")).toBe(true);
  });

  it("keeps news items available for dual-column layout", () => {
    const news = getNews("en");

    expect(news.length).toBeGreaterThanOrEqual(4);
    expect(news[0]?.dateLabel).toMatch(/2026/);
    expect(news[0]?.href).toBe("/news/site-refresh-archive");
  });

  it("maps release detail view model correctly", () => {
    const release = getReleaseBySlug("en", "kakusatsu-shoujo-2");

    expect(release).not.toBeNull();
    expect(release?.releaseDateLabel).toBe("2022.04.24");
    expect(release?.teaser).toContain("returns");
    expect(release?.tracksDetailed.at(-1)?.title).toBe("LET ME SAY SANK YOU");
    expect(release?.purchaseLinks[0]?.url).toBe("https://thoughost.bandcamp.com/album/kakusatsu-shoujo-2");
    expect(release?.infoFields[0]?.value).toBe("THGO-004");
  });

  it("returns footer groups and socials", () => {
    const footer = getFooter("en");

    expect(footer.groups).toHaveLength(2);
    expect(footer.socialLinks).toHaveLength(5);
    expect(footer.contactLabel).toBe("EMAIL");
    expect(footer.groups[1]?.links[0]?.href).toBe("/special/black-hole");
  });

  it("returns localized project call content for all locales", () => {
    const enProject = getProjectCall("en");
    const zhProject = getProjectCall("zh");
    const jpProject = getProjectCall("jp");

    expect(enProject.title).toBe("KAKUSATSU SHOUJO 4");
    expect(zhProject.deadline).toContain("2026");
    expect(jpProject.commonRules.aboutSubmission.requiredInfo).toHaveLength(6);
    expect(jpProject.submitHref).toMatch(/^https:\/\/forms\.gle\//);
  });

  it("returns japanese navigation and page content", () => {
    const navigation = getNavigation("jp");
    const thoughts = getPageContent("jp", "thoughts");

    expect(navigation[0]?.label).toBe("NEXT PROJECT");
    expect(thoughts.title).toContain("Thoughts");
  });

  it("routes BLACK HOLE project card to the dedicated special page", () => {
    const projects = getProjects("en");
    const blackHole = projects.find((item) => item.slug === "black-hole");

    expect(blackHole?.href).toBe("/special/black-hole");
  });

  it("returns localized BLACK HOLE page copy", () => {
    const enPage = getBlackHolePage("en");
    const zhPage = getBlackHolePage("zh");
    const jpPage = getBlackHolePage("jp");

    expect(enPage.title).toBe("BLACK HOLE");
    expect(enPage.status).toBe("COMING SONG");
    expect(enPage.backLinkHref).toBe("/project");
    expect(zhPage.summary).toContain("下一段声音");
    expect(jpPage.summary).toContain("次の断片");
  });

  it("returns all releases in descending chronology", () => {
    const releases = getReleases("en");

    expect(releases).toHaveLength(18);
    expect(releases[0]?.slug).toBe("2000-invasion");
    expect(releases[1]?.slug).toBe("moonshine-001");
    expect(releases[17]?.slug).toBe("kakusatsu-shoujo");
  });

  it("keeps singles and collaborations distinct", () => {
    const miranda = getReleaseBySlug("en", "series-planet-exploration-miranda");
    const trixxck = getReleaseBySlug("en", "trixxck");
    const split = getReleaseBySlug("en", "s-l-v-t-mixture");
    const allReleases = getReleases("en");

    expect(miranda?.releaseType).toBe("Single");
    expect(miranda?.artistName).toBe("Nirotiy");
    expect(trixxck?.artistName).toContain("Silent Xords");
    expect(split?.releaseType).toBe("Collaboration");
    expect(allReleases.some((item) => item.slug === "16-48")).toBe(true);
    expect(allReleases.some((item) => item.slug === "s-l-v-t-mixture")).toBe(true);
  });

  it("keeps compilation titles and hero curation aligned", () => {
    const blue = getReleaseBySlug("en", "depressive-emotional-compilation");
    const heroes = getHero("en");

    expect(blue?.title).toBe("蒼 -depressive & emotional compilation-");
    expect(blue?.releaseType).toBe("Compilation");
    expect(heroes.map((item) => item.slug)).toEqual([
      "2000-invasion",
      "thoughts",
      "kakusatsu-shoujo-3",
      "moonshine-001",
      "asteria",
    ]);
  });

  it("keeps hero headline original and CTA in english", () => {
    const zhHeroes = getHero("zh");
    const jpHeroes = getHero("jp");

    expect(zhHeroes[1]?.title).toBe("thoughts");
    expect(jpHeroes[0]?.ctaLabel).toBe("Learn More");
  });

  it("includes bilibili and dizzylab in site socials", () => {
    const footer = getFooter("en");

    expect(footer.socialLinks.some((link) => link.iconKey === "bilibili")).toBe(true);
    expect(footer.socialLinks.some((link) => link.iconKey === "dizzylab")).toBe(true);
  });

  it("returns enriched release details when available", () => {
    const release = getReleaseBySlug("en", "2000-invasion");

    expect(release?.subtitle).toBe("5th Anniversary Compilation");
    expect(release?.summary).toContain("For anyone who wants to hear the sound of the 2000s");
    expect(release?.summary).not.toContain("CREDIT");
    expect(release?.summary).not.toContain("credits");
    expect(release?.summary).toContain("\n\n");
    expect(release?.teaser).toBe("A fifth-anniversary rush of 2000s club power, reviving rave euphoria with a full-scale all-star lineup.");
    expect(release?.infoFields[0]).toEqual({ label: "Model Number", value: "THGO-0010" });
    expect(release?.infoFields[2]).toEqual({ label: "Price", value: "¥2,000 JPY or more" });
    expect(release?.infoFields[5]).toEqual({ label: "Designer", value: "Konseki Takane" });
    expect(release?.infoFields[7]).toEqual({ label: "Producer", value: "—" });
    expect(release?.tracksDetailed[0]?.artist).toBe("nova+z");
    expect(release?.purchaseLinks).toHaveLength(3);
    expect(release?.purchaseLinks.some((link) => link.label === "Dizzylab")).toBe(true);
    expect(release?.storeLinks.some((link) => link.label === "DIVERSE DIRECT")).toBe(true);
    expect(release?.trackPreview.items).toHaveLength(4);
    expect(release?.trackPreview.remainingCount).toBe(10);
  });

  it("keeps numbered track rows available after enrichment", () => {
    const release = getReleaseBySlug("en", "16-48");

    expect(release?.tracksDetailed[0]).toMatchObject({
      number: "01",
      title: "to Introduce…",
      artist: "Joulez",
    });
    expect(release?.tracksDetailed[1]?.number).toBe("02");
  });

  it("localizes fixed release info labels", () => {
    const release = getReleaseBySlug("jp", "asteria");

    expect(release?.infoFields[0]?.label).toBe("型番");
    expect(release?.infoFields[0]?.value).toBe("TGEP-003");
    expect(release?.infoFields[1]?.label).toBe("発売日");
  });

  it("includes dizzylab purchase links and shared circle links for supported releases", () => {
    const release = getReleaseBySlug("en", "thoughts");

    expect(release?.purchaseLinks.some((link) => link.label === "Dizzylab")).toBe(true);
    expect(release?.infoFields[2]?.value).toBe("¥1,500 JPY or more");
    expect(release?.storeLinks.some((link) => link.label === "Circle")).toBe(false);
    expect(release?.storeLinks.some((link) => link.label === "Item List")).toBe(false);
  });

  it("builds a four-track preview for longer releases", () => {
    const release = getReleaseBySlug("en", "depressive-emotional-compilation");

    expect(release?.trackPreview.items).toHaveLength(4);
    expect(release?.trackPreview.items[0]?.title).toBe("蒼~track 1 lost~");
    expect(release?.trackPreview.remainingCount).toBe(17);
  });

  it("uses all tracks when the release is shorter than preview limit", () => {
    const release = getReleaseBySlug("en", "haru-no-shuen");

    expect(release?.trackPreview.items).toHaveLength(1);
    expect(release?.trackPreview.remainingCount).toBe(0);
  });

  it("keeps release info field count stable", () => {
    const release = getReleaseBySlug("en", "perpetual-status");

    expect(release?.infoFields).toHaveLength(8);
  });

  it("uses multi-paragraph source-style summaries without credits in chinese and japanese", () => {
    const zhRelease = getReleaseBySlug("zh", "2000-invasion");
    const jpRelease = getReleaseBySlug("jp", "2000-invasion");

    expect(zhRelease?.summary).toContain("献给想再一次在舞池听到2000s声音的你！");
    expect(zhRelease?.summary).toContain("\n\n");
    expect(zhRelease?.summary).not.toContain("CREDIT");
    expect(zhRelease?.teaser).toBe("五周年纪念大作，把 2000s 舞池记忆与全明星阵容一起重新点燃。");
    expect(jpRelease?.summary).toContain("GET YOUR 2000s POWER!!!!!");
    expect(jpRelease?.summary).toContain("\n\n");
    expect(jpRelease?.summary).not.toContain("credits");
  });
});
