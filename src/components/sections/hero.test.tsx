import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { HeroSection } from "@/components/sections/hero";
import type { HeroSlide } from "@/types/site";

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

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => <span {...props}>{children}</span>,
  },
  useReducedMotion: () => true,
}));

const slides: HeroSlide[] = [
  {
    slug: "slide-1",
    title: "First\nSlide",
    subtitle: "First subtitle",
    ctaLabel: "Learn More",
    ctaHref: "/releases/slide-1",
    leftImage: "/images/hero/slide-1-left.jpg",
    mainImage: "/images/hero/slide-1-main.jpg",
    rightImage: "/images/hero/slide-1-right.jpg",
  },
  {
    slug: "slide-2",
    title: "Second\nSlide",
    subtitle: "Second subtitle",
    ctaLabel: "Learn More",
    ctaHref: "/releases/slide-2",
    leftImage: "/images/hero/slide-2-left.jpg",
    mainImage: "/images/hero/slide-2-main.jpg",
    rightImage: "/images/hero/slide-2-right.jpg",
  },
  {
    slug: "slide-3",
    title: "Third\nSlide",
    subtitle: "Third subtitle",
    ctaLabel: "Learn More",
    ctaHref: "/releases/slide-3",
    leftImage: "/images/hero/slide-3-left.jpg",
    mainImage: "/images/hero/slide-3-main.jpg",
    rightImage: "/images/hero/slide-3-right.jpg",
  },
];

describe("HeroSection", () => {
  it("updates the active slide when a progress control is clicked", () => {
    render(<HeroSection locale="en" slides={slides} />);

    fireEvent.click(screen.getByRole("button", { name: "Go to slide 2" }));

    expect(screen.getByRole("button", { name: "Go to slide 2" })).toHaveAttribute("aria-current", "true");
  });

  it("renders desktop preview buttons and keeps the center CTA link active", () => {
    render(<HeroSection locale="en" slides={slides} />);

    expect(screen.getByRole("button", { name: "Show Third Slide" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show Second Slide" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /First\s*Slide/i })[0]).toHaveAttribute("href", "/en/releases/slide-1");
  });
});
