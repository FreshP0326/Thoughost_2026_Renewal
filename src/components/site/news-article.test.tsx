import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { NewsArticle } from "@/components/site/news-article";
import type { NewsArticleViewModel } from "@/types/site";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => React.createElement("img", { alt, ...props }),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/motion/fade-in", () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const article: NewsArticleViewModel = {
  slug: "moonshine-001-preview",
  title: "MOONSHINE 001",
  summary: "Preview article",
  dateLabel: "2026.02.18",
  href: "/news/moonshine-001-preview",
  html: "<p>Preview article</p>",
  pinned: false,
};

describe("NewsArticle", () => {
  it("keeps external adjacent links unprefixed by locale", () => {
    render(
      <NewsArticle
        locale="en"
        article={article}
        backLabel="Back"
        publishedLabel="Published"
        moreLabel="More"
        adjacent={{
          previous: {
            slug: "external-news",
            title: "External News",
            href: "https://example.com/news",
            dateLabel: "2026.02.10",
            isExternal: true,
          },
        }}
      />,
    );

    const externalLink = screen.getByRole("link", { name: /external news/i });
    expect(externalLink).toHaveAttribute("href", "https://example.com/news");
    expect(externalLink).toHaveAttribute("target", "_blank");
    expect(externalLink).toHaveAttribute("rel", "noreferrer");
  });
});
