import { describe, expect, it } from "vitest";

import { getThoughtsSpecial } from "@/content/site/thoughts-special";
import { getReleaseBySlug } from "@/server/services/site-service";
import type { Locale } from "@/types/site";

const locales: Locale[] = ["en", "zh", "ja"];

describe("thoughts special content", () => {
  it("builds the full special-page data model for every locale", () => {
    for (const locale of locales) {
      const page = getThoughtsSpecial(locale);
      const release = getReleaseBySlug(locale, "thoughts");

      expect(release).not.toBeNull();
      expect(page.title).toBe("thoughts");
      expect(page.introSection.tracklist).toHaveLength(10);
      expect(page.introSection.storyParagraphs.length).toBeGreaterThanOrEqual(6);
      expect(page.musicCards).toHaveLength(7);
      expect(page.artPeople).toHaveLength(2);
      expect(page.artCards).toHaveLength(1);
      expect(page.artProcessGroups).toHaveLength(5);
      expect(page.konsekiSection.name).toBe("Konseki Takane");
      expect(page.konsekiSection.images).toHaveLength(3);
      expect(page.credits).toHaveLength(6);
      expect(page.labels.previousPreview.length).toBeGreaterThan(0);
      expect(page.labels.nextPreview.length).toBeGreaterThan(0);
      expect(page.credits.map((group) => group.values.length > 0)).not.toContain(false);
      expect(page.introSection.tracklist.map((track) => track.title)).toEqual(release?.tracksDetailed.map((track) => track.title));
    }
  });

  it("points every special-page image to localized local assets", () => {
    for (const locale of locales) {
      const page = getThoughtsSpecial(locale);
      const imageSources = [
        page.introSection.coverImage.src,
        ...page.artProcessGroups.flatMap((group) => group.images.map((image) => image.src)),
        ...page.konsekiSection.images.map((image) => image.src),
      ];

      expect(imageSources.every((src) => src.startsWith("/images/special/thoughts/"))).toBe(true);
      expect(imageSources.some((src) => src.startsWith("https://"))).toBe(false);
    }
  });

  it("keeps the credits groups required by the rebuilt release page", () => {
    const page = getThoughtsSpecial("en");

    expect(page.credits.map((group) => group.label)).toEqual([
      "Album Release Date",
      "Artist",
      "Mastering",
      "Illustration",
      "Art Direction & Design",
      "Special Page Web Design",
    ]);
  });
});
