import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.resetModules();
  vi.doUnmock("@/content/news");
});

describe("news-service failure paths", () => {
  it("throws when duplicate news slugs are registered", async () => {
    vi.doMock("@/content/news", () => ({
      newsContentModules: [
        {
          meta: {
            slug: "duplicate-slug",
            date: "2026-03-01",
            title: { en: "First", zh: "First", ja: "First" },
            summary: { en: "Summary", zh: "Summary", ja: "Summary" },
            published: true,
          },
        },
        {
          meta: {
            slug: "duplicate-slug",
            date: "2026-03-02",
            title: { en: "Second", zh: "Second", ja: "Second" },
            summary: { en: "Summary", zh: "Summary", ja: "Summary" },
            published: true,
          },
        },
      ],
    }));

    const { getNewsList } = await import("@/server/services/news-service");

    expect(() => getNewsList("en")).toThrowError('Duplicate news slug "duplicate-slug"');
  }, 30000);

  it("throws when a registered news item has no localized markdown file", async () => {
    vi.doMock("@/content/news", () => ({
      newsContentModules: [
        {
          meta: {
            slug: "missing-body",
            date: "2026-03-03",
            title: { en: "Missing", zh: "Missing", ja: "Missing" },
            summary: { en: "Summary", zh: "Summary", ja: "Summary" },
            published: true,
          },
        },
      ],
    }));

    const { getNewsBySlug } = await import("@/server/services/news-service");

    await expect(getNewsBySlug("ja", "missing-body")).rejects.toThrowError(/missing-body\\ja\.md|ENOENT/i);
  }, 30000);
});
