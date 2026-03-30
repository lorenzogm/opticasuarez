import { describe, expect, it, vi } from "vitest";

// Mock the sanity module (resolveImage) and utils (getBaseUrl)
vi.mock("./sanity", () => ({
  resolveImage: (img: unknown) => {
    if (!img) return "";
    if (typeof img === "string") return img;
    if (
      typeof img === "object" &&
      img !== null &&
      "asset" in img &&
      typeof (img as { asset?: { url?: string } }).asset?.url === "string"
    ) {
      return (img as { asset: { url: string } }).asset.url;
    }
    return "";
  },
}));

vi.mock("./utils", () => ({
  getBaseUrl: () => "https://opticasuarezjaen.es",
}));

import { buildHeadFromSanitySeo } from "./seo";

describe("buildHeadFromSanitySeo", () => {
  const defaultFallback = {
    title: "Óptica Suárez — Fallback Title",
    description: "Fallback description for the page",
    keywords: "óptica, jaén",
    ogImage: "https://opticasuarezjaen.es/fallback.jpg",
  };

  it("should use fallback values when seo is null", () => {
    const result = buildHeadFromSanitySeo({
      seo: null,
      path: "/test",
      fallback: defaultFallback,
    });

    const titleMeta = result.meta.find((m) => "title" in m);
    expect(titleMeta).toEqual({ title: defaultFallback.title });

    const descMeta = result.meta.find((m) => m.name === "description");
    expect(descMeta?.content).toBe(defaultFallback.description);
  });

  it("should use Sanity seo values when provided", () => {
    const seo = {
      title: "Sanity Title",
      description: "Sanity description",
      keywords: "sanity, keywords",
    };

    const result = buildHeadFromSanitySeo({
      seo,
      path: "/page",
      fallback: defaultFallback,
    });

    const titleMeta = result.meta.find((m) => "title" in m);
    expect(titleMeta).toEqual({ title: "Sanity Title" });

    const descMeta = result.meta.find((m) => m.name === "description");
    expect(descMeta?.content).toBe("Sanity description");

    const kwMeta = result.meta.find((m) => m.name === "keywords");
    expect(kwMeta?.content).toBe("sanity, keywords");
  });

  it("should generate correct canonical URL from path", () => {
    const result = buildHeadFromSanitySeo({
      seo: null,
      path: "/servicios/terapia-visual",
      fallback: defaultFallback,
    });

    expect(result.links).toEqual([
      {
        rel: "canonical",
        href: "https://opticasuarezjaen.es/servicios/terapia-visual",
      },
    ]);
  });

  it("should use seo.canonicalUrl when provided", () => {
    const result = buildHeadFromSanitySeo({
      seo: { canonicalUrl: "https://custom-canonical.com/page" },
      path: "/page",
      fallback: defaultFallback,
    });

    expect(result.links[0].href).toBe("https://custom-canonical.com/page");
  });

  it("should include Open Graph tags", () => {
    const result = buildHeadFromSanitySeo({
      seo: null,
      path: "/",
      fallback: defaultFallback,
    });

    const ogTitle = result.meta.find((m) => m.property === "og:title");
    expect(ogTitle?.content).toBe(defaultFallback.title);

    const ogDesc = result.meta.find((m) => m.property === "og:description");
    expect(ogDesc?.content).toBe(defaultFallback.description);

    const ogUrl = result.meta.find((m) => m.property === "og:url");
    expect(ogUrl?.content).toBe("https://opticasuarezjaen.es/");

    const ogType = result.meta.find((m) => m.property === "og:type");
    expect(ogType?.content).toBe("website");

    const ogLocale = result.meta.find((m) => m.property === "og:locale");
    expect(ogLocale?.content).toBe("es_ES");

    const ogSiteName = result.meta.find((m) => m.property === "og:site_name");
    expect(ogSiteName?.content).toBe("Óptica Suárez");
  });

  it("should include Twitter card tags", () => {
    const result = buildHeadFromSanitySeo({
      seo: null,
      path: "/",
      fallback: defaultFallback,
    });

    const tCard = result.meta.find((m) => m.name === "twitter:card");
    expect(tCard?.content).toBe("summary_large_image");

    const tTitle = result.meta.find((m) => m.name === "twitter:title");
    expect(tTitle?.content).toBe(defaultFallback.title);
  });

  it("should default robots to 'index, follow'", () => {
    const result = buildHeadFromSanitySeo({
      seo: null,
      path: "/",
      fallback: defaultFallback,
    });

    const robots = result.meta.find((m) => m.name === "robots");
    expect(robots?.content).toBe("index, follow");
  });

  it("should use seo.robots when provided", () => {
    const result = buildHeadFromSanitySeo({
      seo: { robots: "noindex, nofollow" },
      path: "/cita",
      fallback: defaultFallback,
    });

    const robots = result.meta.find((m) => m.name === "robots");
    expect(robots?.content).toBe("noindex, nofollow");
  });

  it("should resolve OG image from Sanity seo object", () => {
    const result = buildHeadFromSanitySeo({
      seo: {
        ogImage: { asset: { url: "https://cdn.sanity.io/images/og.jpg" } },
      },
      path: "/",
      fallback: defaultFallback,
    });

    const ogImage = result.meta.find((m) => m.property === "og:image");
    expect(ogImage?.content).toBe("https://cdn.sanity.io/images/og.jpg");
  });

  it("should fall back to default og-image.jpg when no image available", () => {
    const fallbackNoImage = {
      title: "Title",
      description: "Desc",
    };

    const result = buildHeadFromSanitySeo({
      seo: null,
      path: "/",
      fallback: fallbackNoImage,
    });

    const ogImage = result.meta.find((m) => m.property === "og:image");
    expect(ogImage?.content).toBe("https://opticasuarezjaen.es/og-image.jpg");
  });

  it("should not include keywords meta tag when keywords are empty", () => {
    const result = buildHeadFromSanitySeo({
      seo: null,
      path: "/",
      fallback: { title: "T", description: "D" },
    });

    const kwMeta = result.meta.find((m) => m.name === "keywords");
    expect(kwMeta).toBeUndefined();
  });
});
