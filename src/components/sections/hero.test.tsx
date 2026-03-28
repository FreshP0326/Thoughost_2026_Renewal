import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HeroSection } from "@/components/sections/hero";
import type { HeroSlide } from "@/types/site";

let mockReducedMotion = true;

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
  useReducedMotion: () => mockReducedMotion,
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

const originalRequestAnimationFrame = globalThis.requestAnimationFrame;
const originalCancelAnimationFrame = globalThis.cancelAnimationFrame;

function settleDesktopTrack() {
  act(() => {
    vi.advanceTimersByTime(820);
  });
}

function advanceDesktopTrack(milliseconds: number) {
  act(() => {
    vi.advanceTimersByTime(milliseconds);
  });
}

describe("HeroSection", () => {
  beforeEach(() => {
    mockReducedMotion = true;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    globalThis.requestAnimationFrame = originalRequestAnimationFrame;
    globalThis.cancelAnimationFrame = originalCancelAnimationFrame;
  });

  it("returns null when there are no slides", () => {
    const { container } = render(<HeroSection locale="en" slides={[]} />);

    expect(container.firstChild).toBeNull();
  });

  it("updates the active slide when a progress control is clicked", () => {
    render(<HeroSection locale="en" slides={slides} />);

    fireEvent.click(screen.getByRole("button", { name: "Go to slide 2" }));
    settleDesktopTrack();

    expect(screen.getByRole("button", { name: "Go to slide 2" })).toHaveAttribute("aria-current", "true");
  });

  it("ignores repeated indicator clicks while the track is animating", () => {
    render(<HeroSection locale="en" slides={slides} />);

    fireEvent.click(screen.getByRole("button", { name: "Go to slide 2" }));
    fireEvent.click(screen.getByRole("button", { name: "Go to slide 3" }));

    expect(screen.getByRole("button", { name: "Go to slide 1" })).toHaveAttribute("aria-current", "true");

    settleDesktopTrack();

    expect(screen.getByRole("button", { name: "Go to slide 2" })).toHaveAttribute("aria-current", "true");
  });

  it("renders desktop preview buttons and keeps the center CTA link active", () => {
    render(<HeroSection locale="en" slides={slides} />);

    expect(screen.getAllByRole("button", { name: "Show Third Slide" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Show Second Slide" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /First\s*Slide/i }).some((link) => link.getAttribute("href") === "/en/releases/slide-1")).toBe(true);
  });

  it("moves to adjacent slides from desktop preview buttons", () => {
    render(<HeroSection locale="en" slides={slides} />);

    fireEvent.click(screen.getByRole("button", { name: "Show Second Slide" }));
    settleDesktopTrack();

    expect(screen.getByRole("button", { name: "Go to slide 2" })).toHaveAttribute("aria-current", "true");

    fireEvent.click(screen.getByRole("button", { name: "Show First Slide" }));
    settleDesktopTrack();

    expect(screen.getByRole("button", { name: "Go to slide 1" })).toHaveAttribute("aria-current", "true");
  });

  it("animates non-adjacent indicator jumps as sequential steps", () => {
    mockReducedMotion = false;
    render(<HeroSection locale="en" slides={slides} />);

    fireEvent.click(screen.getByRole("button", { name: "Go to slide 3" }));
    advanceDesktopTrack(760);

    expect(screen.getByRole("button", { name: "Go to slide 2" })).toHaveAttribute("aria-current", "true");

    advanceDesktopTrack(680);

    expect(screen.getByRole("button", { name: "Go to slide 3" })).toHaveAttribute("aria-current", "true");
  });

  it("renders a single slide without enabling extra navigation", () => {
    render(<HeroSection locale="en" slides={[slides[0]]} />);

    expect(screen.getByRole("button", { name: "Go to slide 1" })).toHaveAttribute("aria-current", "true");
    expect(screen.queryByRole("button", { name: "Go to slide 2" })).not.toBeInTheDocument();
  });

  it("autoplays to the next slide and resets progress after settling", () => {
    mockReducedMotion = false;
    vi.useFakeTimers();

    globalThis.requestAnimationFrame = ((callback: FrameRequestCallback) =>
      window.setTimeout(() => callback(Date.now()), 16)) as typeof requestAnimationFrame;
    globalThis.cancelAnimationFrame = ((handle: number) => {
      window.clearTimeout(handle);
    }) as typeof cancelAnimationFrame;

    render(<HeroSection locale="en" slides={slides} />);

    act(() => {
      vi.advanceTimersByTime(7100);
    });
    settleDesktopTrack();

    expect(screen.getByRole("button", { name: "Go to slide 2" })).toHaveAttribute("aria-current", "true");
  });
});
