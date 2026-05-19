import { describe, expect, it } from "vitest";
import { buildAlergiaSaludOcularPost } from "./alergia-salud-ocular";

describe("buildAlergiaSaludOcularPost", () => {
  it("creates the post with fixed slug, date and standardized categories", () => {
    const post = buildAlergiaSaludOcularPost({
      featuredImageRef: "image-featured",
      imageRefs: ["image-1", "image-2"],
    });

    expect(post.slug.current).toBe("alergia-y-salud-ocular");
    expect(post.date).toBe("2026-05-12");
    expect(post.categories).toEqual(["Salud Visual", "Educación Visual"]);
  });

  it("includes canonical SEO, internal links and image blocks with alt text", () => {
    const post = buildAlergiaSaludOcularPost({
      featuredImageRef: "image-featured",
      imageRefs: ["image-1", "image-2"],
    });

    expect(post.seo.canonicalUrl).toBe(
      "https://opticasuarezjaen.es/blog/alergia-y-salud-ocular"
    );
    expect(post.seo.robots).toBe("index, follow");

    const bodyText = JSON.stringify(post.body);
    expect(bodyText).toContain("/examen-visual");
    expect(bodyText).toContain("/cita");
    expect(bodyText).toContain("/");

    const bodyImages = post.body.filter((block) => block._type === "image");
    expect(bodyImages).toHaveLength(2);
    expect(bodyImages[0]).toMatchObject({
      asset: { _ref: "image-1" },
      alt: expect.stringContaining("alergia"),
    });
    expect(bodyImages[1]).toMatchObject({
      asset: { _ref: "image-2" },
      alt: expect.stringContaining("Jaén"),
    });
  });
});
