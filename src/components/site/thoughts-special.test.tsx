import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { ThoughtsSpecial } from "@/components/site/thoughts-special";
import { getThoughtsSpecial } from "@/content/site/thoughts-special";
import { getReleaseBySlug } from "@/server/services/site-service";

vi.mock("@/components/motion/fade-in", () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/motion/stagger-group", () => ({
  StaggerGroup: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  StaggerItem: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const release = getReleaseBySlug("en", "thoughts");
const page = getThoughtsSpecial("en");

describe("ThoughtsSpecial", () => {
  it("opens a deduplicated design gallery from konseki images", () => {
    expect(release).not.toBeNull();

    render(<ThoughtsSpecial release={release!} page={page} />);

    const compositionButtons = screen.getAllByRole("button", { name: "Composition study 1" });
    fireEvent.click(compositionButtons[1]);

    const dialog = screen.getByRole("dialog", { name: "thoughts composition study one" });

    expect(within(dialog).getByText("4 / 12")).toBeInTheDocument();
    expect(within(dialog).getAllByRole("button", { name: "Next image" }).length).toBeGreaterThan(0);

    fireEvent.click(within(dialog).getAllByRole("button", { name: "Next image" })[0]);

    expect(within(dialog).getByText("5 / 12")).toBeInTheDocument();
    expect(within(dialog).getByText("Composition study 2")).toBeInTheDocument();
  });

  it("loops through the design gallery with keyboard navigation and closes on escape", () => {
    expect(release).not.toBeNull();

    render(<ThoughtsSpecial release={release!} page={page} />);

    fireEvent.click(screen.getByRole("button", { name: "Initial concept 1" }));

    let dialog = screen.getByRole("dialog", { name: "thoughts initial concept sketch one" });
    expect(within(dialog).getByText("1 / 12")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "ArrowLeft" });

    dialog = screen.getByRole("dialog", { name: "thoughts background artwork" });
    expect(within(dialog).getByText("12 / 12")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "ArrowRight" });

    dialog = screen.getByRole("dialog", { name: "thoughts initial concept sketch one" });
    expect(within(dialog).getByText("1 / 12")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps non-design previews as single-image dialogs without gallery controls", () => {
    expect(release).not.toBeNull();

    const { container } = render(<ThoughtsSpecial release={release!} page={page} />);

    const coverButtons = screen.getAllByRole("button", { name: "Cover" });
    fireEvent.click(coverButtons[0]);

    const dialog = screen.getByRole("dialog", { name: "thoughts cover artwork" });

    expect(within(dialog).getByText("1 / 1")).toBeInTheDocument();
    expect(within(dialog).queryAllByRole("button", { name: "Previous image" })).toHaveLength(0);
    expect(within(dialog).queryAllByRole("button", { name: "Next image" })).toHaveLength(0);

    fireEvent.click(container.querySelector('[class*="previewOverlay"]') as HTMLElement);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("uses a two-person art switcher in echo embed", () => {
    expect(release).not.toBeNull();

    const { container } = render(<ThoughtsSpecial release={release!} page={page} variant="echo-embed" />);

    expect(screen.queryByRole("heading", { name: "thoughts" })).not.toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "TARA#376 / Illustration" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Konseki Takane / Art Direction & Design" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Konseki Takane / Art Direction & Design" }));

    const artPanel = container.querySelector("#thoughts-art-panel");
    expect(artPanel).not.toBeNull();
    expect(within(artPanel as HTMLElement).getByText(/From the very beginning, I wanted to find a "series illustrator"/)).toBeInTheDocument();
    expect(within(artPanel as HTMLElement).getByText("Konseki Takane")).toBeInTheDocument();

    const artControls = (artPanel as HTMLElement).parentElement;
    expect(artControls).not.toBeNull();
    fireEvent.click(within(artControls as HTMLElement).getByRole("button", { name: "Previous card" }));

    expect(screen.getByRole("tab", { name: "TARA#376 / Illustration" })).toHaveAttribute("aria-selected", "true");
    const taraPanel = container.querySelector("#thoughts-art-panel");
    expect(taraPanel).not.toBeNull();
    expect(within(taraPanel as HTMLElement).getByText(/I was very happy to be responsible for the cover illustration/)).toBeInTheDocument();
  });
});
