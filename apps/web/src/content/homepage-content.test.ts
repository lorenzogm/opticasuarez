import { describe, expect, it } from "vitest";
import homepage from "./homepage.json" with { type: "json" };
import editorialContent from "./homepage-editorial.json" with { type: "json" };

describe("homepage content", () => {
  it("does not include the deprecated top-level contact block", () => {
    expect(homepage).not.toHaveProperty("contact");
  });

  it("adds enough relevant editorial content to the homepage", () => {
    const words = [
      editorialContent.title,
      ...editorialContent.sections.flatMap((section) => [
        section.title,
        ...section.paragraphs,
      ]),
    ]
      .join(" ")
      .split(/\s+/).length;

    expect(words).toBeGreaterThanOrEqual(520);
  });

  it("uses the correctly accented spelling of visión in image text", () => {
    const imageText = homepage.servicesGrid.items
      .flatMap(({ alt, imageTitle }) => [alt, imageTitle])
      .join(" ");

    expect(imageText).not.toMatch(/\bvision\b/i);
  });
});
