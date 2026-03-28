import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { ReleaseTabs } from "@/components/site/release-tabs";
import type { ReleaseGridItem } from "@/types/site";

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

const labels = {
  All: "All",
  Album: "Album",
  EP: "EP",
  Single: "Single",
  Compilation: "Compilation",
  Collaboration: "Collaboration",
} as const;

const items: ReleaseGridItem[] = [
  {
    slug: "album-1",
    title: "Album 1",
    artistName: "Thoughost",
    releaseType: "Album",
    releaseDateLabel: "2025.01.01",
    coverImage: "/images/releases/album-1.jpg",
  },
  {
    slug: "ep-1",
    title: "EP 1",
    artistName: "Thoughost",
    releaseType: "EP",
    releaseDateLabel: "2025.01.02",
    coverImage: "/images/releases/ep-1.jpg",
  },
];

describe("ReleaseTabs", () => {
  it("defaults to all items and does not render the repeated releases heading", () => {
    render(<ReleaseTabs locale="en" items={items} labels={labels} />);

    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Album 1")).toBeInTheDocument();
    expect(screen.getByText("EP 1")).toBeInTheDocument();
    expect(screen.queryByText("RELEASES")).not.toBeInTheDocument();
    expect(screen.queryByText("MORE →")).not.toBeInTheDocument();
  });

  it("filters the wall when a category is selected", () => {
    render(<ReleaseTabs locale="en" items={items} labels={labels} />);

    fireEvent.click(screen.getByRole("button", { name: "Album" }));

    expect(screen.getByRole("button", { name: "Album" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Album 1")).toBeInTheDocument();
    expect(screen.queryByText("EP 1")).not.toBeInTheDocument();
  });
});
