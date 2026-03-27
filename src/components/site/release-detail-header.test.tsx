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

vi.mock("@/components/motion/image-reveal", () => ({
  ImageReveal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/motion/stagger-group", () => ({
  StaggerGroup: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  StaggerItem: ({ children }: { children: React.ReactNode }) => <>{children}</>,
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
  heroImage: "/images/releases/2000-invasion.jpg",
  teaser: "A fifth-anniversary rush of 2000s club power, reviving rave euphoria with a full-scale all-star lineup.",
  summary:
    "For anyone who wants to hear the sound of the 2000s on the dancefloor once again, this is the answer.\n\nAcross fourteen tracks, Thoughost’s fifth-anniversary release brings back the rush of rave, eurobeat, bubblegum dance, happy hardcore, and disco.",
  purchaseLinks: [],
  infoFields: [
    { label: "Model Number", value: "THGO-0010" },
    { label: "Release Date", value: "2025.10.26" },
  ],
  tracksDetailed: [],
  trackPreview: { items: [], remainingCount: 0 },
  storeLinks: [],
  links: [],
};

describe("ReleaseDetailHeader", () => {
  it("renders multi-paragraph summaries without credit headings", () => {
    render(<ReleaseDetailHeader release={release} labels={{ linksTitle: "Links", metaTitle: "Release Information" }} />);

    expect(screen.getByText("For anyone who wants to hear the sound of the 2000s on the dancefloor once again, this is the answer.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Across fourteen tracks, Thoughost’s fifth-anniversary release brings back the rush of rave, eurobeat, bubblegum dance, happy hardcore, and disco.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText("CREDIT")).not.toBeInTheDocument();
    expect(screen.queryByText("credits")).not.toBeInTheDocument();
    const cover = screen.getByAltText("2000% INVASION");
    expect(cover).toHaveAttribute("loading", "eager");
    expect(cover).toHaveAttribute("fetchpriority", "high");
  });
});
