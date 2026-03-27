import { describe, expect, it } from "vitest";

import { renderMarkdown } from "@/lib/markdown";

describe("renderMarkdown", () => {
  it("removes dangerous href protocols and inline event handlers", async () => {
    const html = await renderMarkdown(
      [
        '[bad link](javascript:alert("xss"))',
        "",
        '<img src="/cover.jpg" alt="cover" onerror="alert(1)" />',
      ].join("\n"),
    );

    expect(html).not.toContain("javascript:alert");
    expect(html).not.toContain("onerror");
    expect(html).toContain("<a>bad link</a>");
    expect(html).not.toContain("<img");
  });
});
