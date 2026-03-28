import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { ReleaseDetailHeader } from "@/components/site/release-detail-header";
import type { ReleaseDetailViewModel } from "@/types/site";

vi.mock("next/image", () => ({
  default: (imageProps: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => {
    const { alt, fill, ...props } = imageProps;
    void fill;

    return React.createElement("img", { alt, ...props });
  },
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/motion/fade-in", () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const release: ReleaseDetailViewModel = {
  slug: "2000-invasion",
  title: "2000% INVASION",
  subtitle: "5th Anniversary Compilation",
  artistName: "Thoughost",
  releaseType: "Compilation",
  releaseDateLabel: "2025.10.26",
  coverImage: "/images/releases/2000-invasion.jpg",
  heroImage: "/images/releases/hero-variant.jpg",
  teaser: "A fifth-anniversary rush of 2000s club power.",
  summary: "First paragraph.\n\nSecond paragraph.",
  heroEyebrow: "Thoughost Compilation",
  discTitle: "DISC 1",
  artworkDownloadUrl: "/images/releases/2000-invasion.jpg",
  purchaseLinks: [],
  heroPrimaryLinks: [
    { label: "Bandcamp", url: "https://example.com/bandcamp", kind: "bandcamp" },
    { label: "Dizzylab", url: "https://example.com/dizzylab", kind: "dizzylab" },
  ],
  infoFields: [],
  infoPanelFields: [],
  creditPanelFields: [],
  tracksDetailed: [],
  trackPreview: { items: [], remainingCount: 0 },
  storeLinks: [],
  relatedLinks: [],
  links: [],
};

describe("ReleaseDetailHeader", () => {
  it("renders hero copy, primary links, and prefers hero image", () => {
    render(<ReleaseDetailHeader release={release} />);

    expect(screen.getByText("Thoughost Compilation")).toBeInTheDocument();
    expect(screen.getByText("2000% INVASION")).toBeInTheDocument();
    expect(screen.getByText("First paragraph.")).toBeInTheDocument();
    expect(screen.getByText("Second paragraph.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Bandcamp" })).toHaveAttribute("href", "https://example.com/bandcamp");
    expect(screen.getByRole("link", { name: "Dizzylab" })).toHaveAttribute("href", "https://example.com/dizzylab");

    const cover = screen.getByAltText("2000% INVASION");
    expect(cover).toHaveAttribute("src", expect.stringContaining("/images/releases/hero-variant.jpg"));
    expect(cover).toHaveAttribute("loading", "eager");
    expect(cover).toHaveAttribute("fetchpriority", "high");
  });
});
