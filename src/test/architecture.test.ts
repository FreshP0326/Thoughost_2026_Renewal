import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

vi.mock("next/font/google", () => ({
  Archivo: () => ({ variable: "--font-archivo" }),
  Noto_Sans_JP: () => ({ variable: "--font-noto-sans-jp" }),
  Noto_Sans_SC: () => ({ variable: "--font-noto-sans-sc" }),
}));

describe("architecture boundaries", () => {
  it("keeps locale helpers aligned with the shipped locale set", async () => {
    const { supportedLocales } = await import("@/content/site/data");
    const { stripLocalePrefix, resolveSystemLocale, assertLocale, isLocale, isSiteHomePath } = await import("@/lib/locale");

    expect(supportedLocales).toEqual(["en", "zh", "ja"]);
    expect(isLocale("ja")).toBe(true);
    expect(isSiteHomePath("/", "en")).toBe(true);
    expect(isSiteHomePath("/en", "en")).toBe(true);
    expect(isSiteHomePath("/zh/", "zh")).toBe(true);
    expect(isSiteHomePath("/zh/project", "zh")).toBe(false);
    expect(stripLocalePrefix("/ja/releases/moonshine-001")).toBe("/releases/moonshine-001");
    expect(resolveSystemLocale("ja-JP")).toBe("ja");
    expect(resolveSystemLocale("zh-CN")).toBe("zh");
    expect(resolveSystemLocale("en-US")).toBe("en");
    expect(assertLocale("ja")).toBe("ja");
    expect(() => assertLocale("jp")).toThrowError("NEXT_NOT_FOUND");
  });

  it("exports all locale params for the locale layout", async () => {
    const localeLayout = await import("@/app/(site)/[locale]/layout");

    expect(localeLayout.dynamicParams).toBe(false);
    expect(localeLayout.generateStaticParams()).toEqual([{ locale: "en" }, { locale: "zh" }, { locale: "ja" }]);
  }, 20000);

  it("exports news detail params for every locale and news slug", async () => {
    const newsPage = await import("@/app/(site)/[locale]/news/[slug]/page");
    const { getAllNewsSlugs } = await import("@/server/services/news-service");

    const params = newsPage.generateStaticParams();

    expect(newsPage.dynamicParams).toBe(false);
    expect(params).toHaveLength(getAllNewsSlugs().length * 3);
    expect(params).toContainEqual({ locale: "ja", slug: "moonshine-001-preview" });
  }, 20000);

  it("exports release detail params for every locale and release slug", async () => {
    const releasePage = await import("@/app/(site)/[locale]/releases/[slug]/page");
    const { releases } = await import("@/content/site/data");

    const params = releasePage.generateStaticParams();

    expect(releasePage.dynamicParams).toBe(false);
    expect(params).toHaveLength(releases.length * 3);
    expect(params).toContainEqual({ locale: "zh", slug: "2000-invasion" });
    expect(params).toContainEqual({ locale: "ja", slug: "kakusatsu-shoujo" });
    expect(params).toContainEqual({ locale: "en", slug: "thoughts-2" });
  }, 20000);

  it("ships five static thoughts 2 special entry pages", async () => {
    const editionOne = await import("@/app/(site)/[locale]/special/thoughts-2/1/page");
    const editionThree = await import("@/app/(site)/[locale]/special/thoughts-2/3/page");
    const editionFive = await import("@/app/(site)/[locale]/special/thoughts-2/5/page");

    expect(typeof editionOne.default).toBe("function");
    expect(typeof editionThree.default).toBe("function");
    expect(typeof editionFive.default).toBe("function");
  }, 20000);

  it("renders the root entry as the default home page without redirect script", async () => {
    const rootLayout = await import("@/app/(root)/layout");
    const rootPage = await import("@/app/(root)/page");

    const layoutTree = rootLayout.default({
      children: "child",
    });
    const body = layoutTree.props.children;
    const pageTree = rootPage.default();

    expect(body.type).toBe("body");
    expect(body.props.children.type).toBeDefined();
    expect(pageTree.type.name).toBe("HomeLanding");
    expect(pageTree.props.locale).toBe("en");
  });

  it("prefixes static assets when a base path is configured", async () => {
    vi.resetModules();
    process.env.NEXT_PUBLIC_BASE_PATH = "/thoughost";

    const { withBasePathAsset } = await import("@/lib/base-path");

    expect(withBasePathAsset("/images/releases/2000-invasion.jpg")).toBe("/thoughost/images/releases/2000-invasion.jpg");
    expect(withBasePathAsset("https://example.com/image.jpg")).toBe("https://example.com/image.jpg");
    expect(withBasePathAsset("//cdn.example.com/image.jpg")).toBe("//cdn.example.com/image.jpg");

    delete process.env.NEXT_PUBLIC_BASE_PATH;
    vi.resetModules();
  });

  it("keeps README and architecture docs aligned with the shipped runtime boundary", () => {
    const root = process.cwd();
    const readme = readFileSync(path.join(root, "README.md"), "utf8");
    const architecture = readFileSync(path.join(root, "docs", "current-architecture.md"), "utf8");
    const scaffolding = readFileSync(path.join(root, "docs", "scaffolding-status.md"), "utf8");
    const audit = readFileSync(path.join(root, "docs", "engineering-audit-2026-03-27.md"), "utf8");

    expect(readme).toContain("supports `en`, `zh`, and `ja`");
    expect(readme).toContain("`src/content/**`");
    expect(readme).toContain("The root route `/` renders the default English home page");

    expect(architecture).toContain("source of truth is the file-content layer");
    expect(architecture).toContain("The root entry renders the default English home page");

    expect(scaffolding).toContain("Exit criteria");
    expect(scaffolding).toContain("within 90 days");

    expect(audit).toContain("Supersedes the original 2026-03-27 audit conclusions.");
    expect(audit).toContain("Current verified baseline");
    expect(audit).toContain("63 tests");
    expect(audit).toContain("default English home page");
    expect(audit).not.toContain("`jp`");
  });
});
