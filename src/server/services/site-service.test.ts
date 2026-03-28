import { describe, expect, it } from "vitest";

import { getReleaseBySlug } from "@/server/services/site-service";

describe("getReleaseBySlug", () => {
  it("uses explicit detail meta credits when present", () => {
    const release = getReleaseBySlug("en", "16-48");

    expect(release).not.toBeNull();
    expect(release?.heroEyebrow).toBe("Joulez 1st Solo Album.");
    expect(release?.discTitle).toBe("DISC 1");
    expect(release?.artworkDownloadUrl).toBe("/images/releases/16-48.jpg");
    expect(release?.creditPanelFields).toEqual([
      { label: "Mastering", value: "Joulez" },
      { label: "Poetry", value: "Joulez, odorin, lola螺旯" },
      { label: "Vocal", value: "lola螺旯 (9 & 12), 除名システム (2 & 9)" },
      { label: "Design", value: "紺 aka Konseki Takane" },
    ]);
  });

  it("falls back to existing release credits and caps hero links at two", () => {
    const release = getReleaseBySlug("en", "asteria");

    expect(release).not.toBeNull();
    expect(release?.heroPrimaryLinks).toHaveLength(2);
    expect(release?.creditPanelFields).toEqual([
      { label: "Mastering", value: "Joulez / Joulez" },
      { label: "Poetry", value: "—" },
      { label: "Vocal", value: "—" },
      { label: "Design", value: "Konseki Takane" },
    ]);
  });

  it("aggregates related links from purchase and release-level sources without duplicates", () => {
    const release = getReleaseBySlug("en", "thoughts");

    expect(release).not.toBeNull();
    expect(release?.relatedLinks.map((item) => item.label)).toEqual(["Bandcamp", "Dizzylab", "Special"]);
  });
});
