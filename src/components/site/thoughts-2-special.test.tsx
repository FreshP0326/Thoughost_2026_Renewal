import { render, screen, within } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { Thoughts2Special } from "@/components/site/thoughts-2-special";
import { getThoughts2Special } from "@/content/site/thoughts2-special";
import { getReleaseBySlug } from "@/server/services/site-service";

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
  StaggerGroup: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>,
  StaggerItem: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/site/thoughts-special", () => ({
  ThoughtsSpecial: ({
    page,
  }: {
    page: {
      musicCards: Array<{ title: string; subtitle: string }>;
      artPeople: Array<{ title: string; subtitle: string; paragraphs: string[] }>;
      artProcessGroups: Array<{ title: string; images: Array<{ src: string; caption: string }> }>;
      credits: Array<{ label: string; values: string[] }>;
    };
  }) => (
    <div>
      <div>embedded thoughts special</div>
      <div data-testid="embedded-music-cards">
        {page.musicCards.map((card) => (
          <span key={`${card.title}-${card.subtitle}`}>
            {card.title} / {card.subtitle}
          </span>
        ))}
      </div>
      <div data-testid="embedded-art-cards">
        {page.artPeople.map((card) => (
          <span key={`${card.title}-${card.subtitle}`}>
            {card.title} / {card.subtitle} / {card.paragraphs[0]}
          </span>
        ))}
      </div>
      <div data-testid="embedded-art-process">
        {page.artProcessGroups.map((group) => (
          <span key={group.title}>
            {group.title} / {group.images.map((image) => `${image.caption}:${image.src}`).join(", ")}
          </span>
        ))}
      </div>
      <div data-testid="embedded-credits">
        {page.credits.map((group) => (
          <span key={group.label}>
            {group.label} / {group.values.join(", ")}
          </span>
        ))}
      </div>
    </div>
  ),
}));

vi.mock("@/components/site/thoughts-2-special-echo-hero", () => ({
  Thoughts2EchoHero: ({
    title,
    intro,
    actions,
  }: {
    title: string;
    intro: string;
    actions: Array<{ label: string; type: "media" | "link"; href?: string }>;
  }) => (
    <section>
      <h1>{title}</h1>
      <p>{intro}</p>
      <div>
        {actions.map((action) => (
          action.type === "link" ? (
            <a key={`${action.label}-${action.href}`} href={action.href}>
              {action.label}
            </a>
          ) : (
            <button key={action.label} type="button">
              {action.label}
            </button>
          )
        ))}
      </div>
    </section>
  ),
}));

const release = getReleaseBySlug("en", "thoughts-2");
const page = getThoughts2Special("en", "3");

describe("Thoughts2Special", () => {
  it("renders the edition 3 release hero, info card, and embed shell", () => {
    expect(release).not.toBeNull();

    render(<Thoughts2Special locale="en" release={release!} page={page} />);

    expect(screen.getByRole("heading", { name: "thoughts 2" })).toBeInTheDocument();
    expect(screen.getAllByText(/シリーズがここから始まる/).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "YouTube" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Bilibili" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Release Info" })).toBeInTheDocument();
    expect(screen.getByText("embedded thoughts special")).toBeInTheDocument();

    const embeddedMusicCards = screen.getByTestId("embedded-music-cards");
    expect(within(embeddedMusicCards).getByText("nova+z / landingfailure.orz")).toBeInTheDocument();
    expect(within(embeddedMusicCards).getByText("Nirotiy / DEPICT CODE")).toBeInTheDocument();
    expect(within(embeddedMusicCards).queryByText("VeetaCrush / TR 1: palette ii")).not.toBeInTheDocument();

    const embeddedArtCards = screen.getByTestId("embedded-art-cards");
    expect(within(embeddedArtCards).getByText(/Konseki Takane \/ Art Direction & Design/)).toBeInTheDocument();
    expect(within(embeddedArtCards).getByText(/「thoughts」系列的艺术方向/)).toBeInTheDocument();

    const embeddedArtProcess = screen.getByTestId("embedded-art-process");
    expect(within(embeddedArtProcess).getByText(/Composition Studies/)).toBeInTheDocument();
    expect(within(embeddedArtProcess).getByText(/composition-1\.png/)).toBeInTheDocument();
    expect(within(embeddedArtProcess).getByText(/final-artwork-1\.png/)).toBeInTheDocument();

    const embeddedCredits = screen.getByTestId("embedded-credits");
    expect(within(embeddedCredits).getByText(/Album Release Date \/ 2026\.04\.26/)).toBeInTheDocument();
    expect(within(embeddedCredits).getByText(/Artist \/ ARMYTOM/)).toBeInTheDocument();
    expect(within(embeddedCredits).getByText(/Mastering \/ Joulez/)).toBeInTheDocument();
    expect(within(embeddedCredits).getByText(/Illustration \/ TARA#376/)).toBeInTheDocument();
    expect(within(embeddedCredits).getByText(/Design \/ Konseki Takane/)).toBeInTheDocument();
  });

  it("keeps availability placeholders and splits the tracklist into two columns", () => {
    expect(release).not.toBeNull();

    render(<Thoughts2Special locale="en" release={release!} page={page} />);

    expect(screen.getByText(page.placeholders.streaming)).toBeInTheDocument();
    expect(screen.getByText(page.placeholders.mailOrder)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "thoughts 2" })).toHaveAttribute("href", "/en/releases/thoughts-2");

    const columns = [
      screen.getByLabelText("Tracklist column 1"),
      screen.getByLabelText("Tracklist column 2"),
    ];

    expect(within(columns[0]).getByText("Fading Echoes")).toBeInTheDocument();
    expect(within(columns[0]).getByText("Valkyrie")).toBeInTheDocument();
    expect(within(columns[1]).getByText("循環の果てにて、")).toBeInTheDocument();
    expect(within(columns[1]).getByText("ending")).toBeInTheDocument();
  });
});
