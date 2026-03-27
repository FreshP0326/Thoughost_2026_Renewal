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

vi.mock("next/script", () => ({
  default: ({ children, ...props }: React.ScriptHTMLAttributes<HTMLScriptElement>) => ({
    type: "script",
    props: {
      ...props,
      children,
    },
  }),
}));

describe("architecture boundaries", () => {
  it("keeps locale helpers aligned with the shipped locale set", async () => {
    const { supportedLocales } = await import("@/content/site/data");
    const { stripLocalePrefix, resolveSystemLocale, assertLocale, isLocale } = await import("@/lib/locale");

    expect(supportedLocales).toEqual(["en", "zh", "ja"]);
    expect(isLocale("ja")).toBe(true);
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
  }, 20000);

  it("uses a relative root redirect and a locale fallback link", async () => {
    const rootLayout = await import("@/app/(root)/layout");
    const rootPage = await import("@/app/(root)/page");

    const layoutTree = rootLayout.default({
      children: "child",
    });
    const body = layoutTree.props.children;
    const scriptElement = body.props.children[0];
    const pageTree = rootPage.default();
    const linkElement = pageTree.props.children;

    expect(scriptElement.props.id).toBe("root-redirect");
    expect(scriptElement.props.children).toContain("./en/");
    expect(linkElement.props.href).toBe("/en");
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
});
