import { render, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MemberDetailDialog } from "@/components/site/member-detail-dialog";
import type { MemberProfile } from "@/types/site";

let currentMemberSlug = "joulez";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en/about",
  useRouter: () => ({
    replace: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(currentMemberSlug ? `member=${currentMemberSlug}` : ""),
}));

vi.mock("next/image", () => ({
  default: ({ alt, fill: _fill, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) =>
    React.createElement("img", { alt, ...props }),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
}));

const labels = {
  profileOverview: "Profile Overview",
  representativeWorks: "Representative Works",
  featuredTracks: "Featured Tracks",
  selectedReleases: "Selected Releases",
  releaseAppearances: "Release Appearances",
  trackAppearances: "Track Appearances",
  latestRelease: "Latest Release",
  links: "Links",
  close: "Close",
  memberNotFound: "Missing",
};

const artistMember: MemberProfile = {
  slug: "joulez",
  name: "Joulez",
  role: "ARTIST&MASTERING",
  group: "members",
  isArtistLike: true,
  image: "/images/artists/joulez.jpg",
  bio: "Lead paragraph.\n\nSecond paragraph.",
  metrics: {
    featuredTrackCount: 6,
    releaseAppearanceCount: 4,
    trackAppearanceCount: 12,
    latestReleaseTitle: "春ノ終焉",
    latestReleaseDateLabel: "2025.07.25",
  },
  selectedReleases: [
    {
      releaseSlug: "haru-no-shuen",
      releaseTitle: "春ノ終焉",
      releaseHref: "/releases/haru-no-shuen",
      releaseType: "Single",
      releaseDateLabel: "2025.07.25",
      coverImage: "/images/releases/haru-no-shuen.jpg",
      matchKind: "primary",
      matchedTrackCount: 1,
    },
  ],
  representativeTracks: [
    {
      releaseSlug: "haru-no-shuen",
      releaseTitle: "春ノ終焉",
      releaseHref: "/releases/haru-no-shuen",
      trackNumber: "01",
      trackTitle: "春ノ終焉",
      trackArtist: "Joulez",
    },
  ],
  links: [{ label: "Twitter", url: "https://example.com" }],
};

const staffMember: MemberProfile = {
  slug: "rmdyh",
  name: "rmdyh",
  role: "WEB",
  group: "staff",
  isArtistLike: false,
  image: "/images/artists/rmdyh.jpg",
  bio: "Staff intro.",
  selectedReleases: [],
  representativeTracks: [],
  links: [{ label: "Github", url: "https://example.com" }],
};

describe("MemberDetailDialog", () => {
  beforeEach(() => {
    currentMemberSlug = "joulez";
  });

  it("shows profile metrics and selected releases for artists", () => {
    render(<MemberDetailDialog locale="en" members={[artistMember, staffMember]} labels={labels} />);

    expect(screen.getByTestId("member-profile-metrics")).toBeInTheDocument();
    expect(screen.getByTestId("member-profile-bio")).toBeInTheDocument();
    expect(screen.getByText("Lead paragraph.")).toBeInTheDocument();
    expect(screen.getByText("Second paragraph.")).toBeInTheDocument();
    expect(screen.getAllByText("Second paragraph.")).toHaveLength(1);
    expect(screen.getByTestId("member-selected-releases")).toBeInTheDocument();
    expect(screen.getAllByText("春ノ終焉").length).toBeGreaterThan(0);
    expect(screen.getByAltText("Joulez")).toHaveAttribute("loading", "eager");
  });

  it("hides artist-only sections for staff profiles", () => {
    currentMemberSlug = "rmdyh";

    render(<MemberDetailDialog locale="en" members={[artistMember, staffMember]} labels={labels} />);

    expect(screen.queryByTestId("member-profile-metrics")).not.toBeInTheDocument();
    expect(screen.queryByTestId("member-selected-releases")).not.toBeInTheDocument();
    expect(screen.getByTestId("member-links")).toBeInTheDocument();
  });
});
