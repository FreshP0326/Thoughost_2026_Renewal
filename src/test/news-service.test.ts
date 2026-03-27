import { describe, expect, it } from "vitest";

import { getAdjacentNews, getAllNewsSlugs, getNewsBySlug, getNewsList, getNewsPreview } from "@/server/services/news-service";

describe("news-service", () => {
  it("returns published news with pinned items first", () => {
    const items = getNewsList("en");

    expect(items).toHaveLength(4);
    expect(items[0]?.slug).toBe("site-refresh-archive");
    expect(items[0]?.pinned).toBe(true);
    expect(items[1]?.dateLabel).toBe("2026.02.18");
  });

  it("builds homepage preview entries from the same content source", () => {
    const preview = getNewsPreview("zh", 3);

    expect(preview).toHaveLength(3);
    expect(preview[0]?.href).toBe("/news/site-refresh-archive");
    expect(preview[1]?.title).toContain("征稿");
  });

  it("returns localized article HTML", async () => {
    const article = await getNewsBySlug("jp", "moonshine-001-preview");

    expect(article).not.toBeNull();
    expect(article?.title).toContain("MOONSHINE 001");
    expect(article?.html).toContain("<ol>");
    expect(article?.html).toContain("最終シーケンス");
  });

  it("returns adjacent article links from archive order", () => {
    const adjacent = getAdjacentNews("en", "kakusatsu-shoujo-4-open-call");

    expect(adjacent.previous?.slug).toBe("site-refresh-archive");
    expect(adjacent.next?.slug).toBe("moonshine-001-preview");
  });

  it("returns all static slugs", () => {
    expect(getAllNewsSlugs()).toEqual([
      "site-refresh-archive",
      "kakusatsu-shoujo-4-open-call",
      "moonshine-001-preview",
      "broadcast-column-start",
    ]);
  });

  it("returns null for unknown articles", async () => {
    await expect(getNewsBySlug("en", "missing-news")).resolves.toBeNull();
  });
});
