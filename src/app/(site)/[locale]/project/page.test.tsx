import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import ProjectPage from "@/app/(site)/[locale]/project/page";

vi.mock("@/components/motion/fade-in", () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("ProjectPage", () => {
  it("renders the source-aligned english copy without the removed CTA block", async () => {
    render(await ProjectPage({ params: Promise.resolve({ locale: "en" }) }));

    expect(screen.getByText("COMMON RULES")).toBeInTheDocument();
    expect(screen.getByText("Please attention!!!")).toBeInTheDocument();
    expect(screen.queryByText("Send us your next cut.")).not.toBeInTheDocument();
    expect(screen.queryByText("An open call for the next chapter of Thoughost’s anime-sampled, violence-and-cuteness compilation line.")).not.toBeInTheDocument();
  });

  it("renders the source-aligned chinese sections", async () => {
    render(await ProjectPage({ params: Promise.resolve({ locale: "zh" }) }));

    expect(screen.getByText("作品规则")).toBeInTheDocument();
    expect(screen.getByText("请注意！！！")).toBeInTheDocument();
    expect(screen.getByText(/一如既往，风格不限/)).toBeInTheDocument();
    expect(screen.getByText("请注意，如果您的曲目不符合以上规则，我们将不会进行收录。")).toBeInTheDocument();
    expect(screen.queryByText(/We're looking forward to your creative sound!/)).not.toBeInTheDocument();
  });

  it("renders the source-aligned japanese headings", async () => {
    render(await ProjectPage({ params: Promise.resolve({ locale: "ja" }) }));

    expect(screen.getByText(/いつも通りジャンルは自由です/)).toBeInTheDocument();
    expect(screen.getByText("WHAT WE WANT:（サウンドについて）")).toBeInTheDocument();
    expect(screen.getByText("ATTENTION:（共通ルールについて）")).toBeInTheDocument();
    expect(screen.getByText("JUDGMENT（審査について）")).toBeInTheDocument();
  });
});
