import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { ReleasesGridSection } from "@/components/sections/releases-grid";
import { MemberGrid } from "@/components/site/member-grid";
import { NewsList } from "@/components/site/news-list";
import { ProjectList } from "@/components/site/project-list";
import type { AboutGroupViewModel, NewsListItem, ReleaseGridItem } from "@/types/site";

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

vi.mock("@/components/motion/stagger-group", () => ({
  StaggerGroup: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  StaggerItem: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const releaseItems: ReleaseGridItem[] = Array.from({ length: 6 }, (_, index) => ({
  slug: `release-${index + 1}`,
  title: `Release ${index + 1}`,
  artistName: "Thoughost",
  releaseType: "Compilation",
  releaseDateLabel: "2025.01.01",
  coverImage: `/images/releases/release-${index + 1}.jpg`,
}));

const projectItems = Array.from({ length: 3 }, (_, index) => ({
  slug: `project-${index + 1}`,
  title: `Project ${index + 1}`,
  summary: "Summary",
  coverImage: `/images/projects/project-${index + 1}.jpg`,
  href: `/project-${index + 1}`,
}));

const newsItems: NewsListItem[] = Array.from({ length: 3 }, (_, index) => ({
  slug: `news-${index + 1}`,
  title: `News ${index + 1}`,
  summary: "Summary",
  dateLabel: "2025.01.01",
  href: `/news/${index + 1}`,
  coverImage: `/images/news/news-${index + 1}.jpg`,
  coverAlt: `News Cover ${index + 1}`,
  pinned: false,
}));

const memberGroups: AboutGroupViewModel[] = [
  {
    key: "members",
    label: "MEMBERS",
    members: Array.from({ length: 5 }, (_, index) => ({
      slug: `member-${index + 1}`,
      name: `Member ${index + 1}`,
      role: "Artist",
      group: "members",
      isArtistLike: true,
      image: `/images/artists/member-${index + 1}.jpg`,
      selectedReleases: [],
      representativeTracks: [],
      links: [],
    })),
  },
];

describe("image loading strategy", () => {
  it("eager loads the first five release covers", () => {
    render(<ReleasesGridSection locale="en" title="RELEASES" moreLabel="MORE" items={releaseItems} />);

    expect(screen.getByAltText("Release 1")).toHaveAttribute("loading", "eager");
    expect(screen.getByAltText("Release 5")).toHaveAttribute("loading", "eager");
    expect(screen.getByAltText("Release 6")).toHaveAttribute("loading", "lazy");
  });

  it("can render release covers without heading and more link", () => {
    render(<ReleasesGridSection locale="en" items={releaseItems} />);

    expect(screen.queryByText("RELEASES")).not.toBeInTheDocument();
    expect(screen.queryByText("MORE →")).not.toBeInTheDocument();
    expect(screen.getByAltText("Release 1")).toBeInTheDocument();
  });

  it("eager loads the first two project covers and first two news covers", () => {
    render(
      <>
        <ProjectList locale="en" items={projectItems} />
        <NewsList locale="en" items={newsItems} emptyLabel="Empty" />
      </>,
    );

    expect(screen.getByAltText("Project 1")).toHaveAttribute("loading", "eager");
    expect(screen.getByAltText("Project 2")).toHaveAttribute("loading", "eager");
    expect(screen.getByAltText("Project 3")).toHaveAttribute("loading", "lazy");
    expect(screen.getByAltText("News Cover 1")).toHaveAttribute("loading", "eager");
    expect(screen.getByAltText("News Cover 2")).toHaveAttribute("loading", "eager");
    expect(screen.getByAltText("News Cover 3")).toHaveAttribute("loading", "lazy");
  });

  it("eager loads the first four member cards", () => {
    render(<MemberGrid locale="en" groups={memberGroups} viewProfileLabel="View Profile" />);

    expect(screen.getByAltText("Member 1")).toHaveAttribute("loading", "eager");
    expect(screen.getByAltText("Member 4")).toHaveAttribute("loading", "eager");
    expect(screen.getByAltText("Member 5")).toHaveAttribute("loading", "lazy");
  });
});
