import { describe, expect, it } from "vitest";
import { buildEclipseSolarPost } from "./eclipse-solar";

describe("buildEclipseSolarPost", () => {
  it("creates the post with fixed slug, date and standardized categories", () => {
    const post = buildEclipseSolarPost({
      featuredImageRef: "image-featured",
      imageRefs: ["image-1", "image-2"],
    });

    expect(post.slug.current).toBe("eclipse-solar-como-verlo-correctamente");
    expect(post.date).toBe("2026-07-30");
    expect(post.categories).toEqual([
      "Salud Visual",
      "Gafas de Sol",
      "Educación Visual",
    ]);
  });

  it("includes canonical SEO, internal links, official references and image blocks", () => {
    const post = buildEclipseSolarPost({
      featuredImageRef: "image-featured",
      imageRefs: ["image-1", "image-2"],
    });

    expect(post.seo.canonicalUrl).toBe(
      "https://opticasuarezjaen.es/blog/eclipse-solar-como-verlo-correctamente"
    );
    expect(post.seo.robots).toBe("index, follow");

    const bodyText = JSON.stringify(post.body);
    expect(bodyText).toContain("/servicios/examen-visual");
    expect(bodyText).toContain("/servicios/vision-pediatrica");
    expect(bodyText).toContain("/cita");
    expect(bodyText).toContain("https://www.trioeclipses.es/");
    expect(bodyText).toContain(
      "https://eclipses.ign.es/eclipse-total-sol-de-12-de-agosto-2026.html"
    );

    const bodyImages = post.body.filter((block) => block._type === "image");
    expect(bodyImages).toHaveLength(2);
    expect(bodyImages[0]).toMatchObject({
      asset: { _ref: "image-1" },
      alt: expect.stringContaining("gafas homologadas"),
      caption: expect.stringContaining("observación segura"),
    });
    expect(bodyImages[1]).toMatchObject({
      asset: { _ref: "image-2" },
      alt: expect.stringContaining("eclipse solar parcial"),
      caption: expect.stringContaining("Jaén"),
    });
  });
});
