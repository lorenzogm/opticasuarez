import { describe, expect, it } from "vitest";
import { buildCataratasPost } from "./cataratas";

describe("buildCataratasPost", () => {
  it("creates the post with fixed slug, date and canonical SEO metadata", () => {
    const post = buildCataratasPost({
      featuredImageRef: "image-featured",
      imageRefs: ["image-1", "image-2", "image-3"],
    });

    expect(post.slug.current).toBe("que-son-las-cataratas-y-como-tratarlas");
    expect(post.date).toBe("2026-06-15");
    expect(post.seo.canonicalUrl).toBe(
      "https://opticasuarezjaen.es/blog/que-son-las-cataratas-y-como-tratarlas"
    );
    expect(post.seo.robots).toBe("index, follow");
  });

  it("includes internal links and image blocks with alt/caption", () => {
    const post = buildCataratasPost({
      featuredImageRef: "image-featured",
      imageRefs: ["image-1", "image-2", "image-3"],
    });

    const bodyText = JSON.stringify(post.body);
    expect(bodyText).toContain("/examen-visual");
    expect(bodyText).toContain("/cita");
    expect(bodyText).toContain("/");

    const bodyImages = post.body.filter((block) => block._type === "image");
    expect(bodyImages).toHaveLength(3);
    expect(bodyImages[0]).toMatchObject({
      asset: { _ref: "image-1" },
      alt: expect.stringContaining("cataratas"),
      caption: expect.stringContaining("cataratas"),
    });
    expect(bodyImages[2]).toMatchObject({
      asset: { _ref: "image-3" },
      alt: expect.stringContaining("Jaén"),
    });
  });
});
