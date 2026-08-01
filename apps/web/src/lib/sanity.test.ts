import { describe, expect, it, vi } from "vitest";
import {
  getAllBlogSlugs,
  getBlogPost,
  getBlogPosts,
  resolveImage,
  sanityImageUrl,
} from "./sanity";

describe("sanityImageUrl", () => {
  it("should convert a standard Sanity image ref to CDN URL", () => {
    const ref = "image-abc123-800x600-jpg";
    const url = sanityImageUrl(ref);
    expect(url).toContain("cdn.sanity.io/images/");
    expect(url).toContain("abc123-800x600.jpg");
  });

  it("should handle png format", () => {
    const ref = "image-def456-1200x900-png";
    const url = sanityImageUrl(ref);
    expect(url).toContain("cdn.sanity.io/images/");
    expect(url).toContain("def456-1200x900.png");
  });

  it("should handle webp format", () => {
    const ref = "image-ghi789-640x480-webp";
    const url = sanityImageUrl(ref);
    expect(url).toContain("cdn.sanity.io/images/");
    expect(url).toContain("ghi789-640x480.webp");
  });

  it("should return empty string for empty input", () => {
    expect(sanityImageUrl("")).toBe("");
  });
});

describe("resolveImage", () => {
  it("should return empty string for undefined", () => {
    expect(resolveImage(undefined)).toBe("");
  });

  it("should return empty string for null-like values", () => {
    expect(resolveImage(undefined)).toBe("");
  });

  it("should return the string directly when input is a URL string", () => {
    const url = "https://example.com/image.jpg";
    expect(resolveImage(url)).toBe(url);
  });

  it("should resolve asset.url from Sanity image object", () => {
    const image = {
      asset: { url: "https://cdn.sanity.io/images/proj/ds/img.jpg" },
    };
    expect(resolveImage(image)).toBe(
      "https://cdn.sanity.io/images/proj/ds/img.jpg"
    );
  });

  it("should resolve asset._ref from Sanity image object", () => {
    const image = { asset: { _ref: "image-abc123-800x600-jpg" } };
    const url = resolveImage(image);
    expect(url).toContain("cdn.sanity.io");
    expect(url).toContain("abc123-800x600.jpg");
  });

  it("should prefer asset.url over asset._ref", () => {
    const image = {
      asset: {
        url: "https://direct-url.com/img.jpg",
        _ref: "image-abc123-800x600-jpg",
      },
    };
    expect(resolveImage(image)).toBe("https://direct-url.com/img.jpg");
  });

  it("should resolve top-level url field", () => {
    const image = { url: "https://fallback-url.com/img.jpg" };
    expect(resolveImage(image)).toBe("https://fallback-url.com/img.jpg");
  });

  it("should return empty string for object with no recognizable fields", () => {
    const image = { something: "else" } as unknown as Parameters<
      typeof resolveImage
    >[0];
    expect(resolveImage(image)).toBe("");
  });
});

describe("sanity configuration fallback", () => {
  it("uses safe defaults when SANITY_PROJECT_ID is not URL-safe", async () => {
    const originalProjectId = process.env.SANITY_PROJECT_ID;
    process.env.SANITY_PROJECT_ID = "enc:invalid/project$id";
    vi.resetModules();

    const sanityModule = await import("./sanity");
    const url = sanityModule.sanityImageUrl("image-abc123-800x600-jpg");

    expect(url).toContain("/images/2a24wmex/");

    process.env.SANITY_PROJECT_ID = originalProjectId;
  });
});

describe("sanity preview queries", () => {
  it("uses previewDrafts perspective when preview mode is enabled", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ result: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    await getBlogPosts(true);

    const requestedUrl = new URL(fetchMock.mock.calls[0][0] as string);
    expect(requestedUrl.hostname).toContain(".api.sanity.io");
    expect(requestedUrl.searchParams.get("perspective")).toBe("previewDrafts");

    fetchMock.mockRestore();
  });

  it("does not set previewDrafts perspective outside preview mode", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ result: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    await getBlogPosts(false);

    const requestedUrl = new URL(fetchMock.mock.calls[0][0] as string);
    expect(requestedUrl.hostname).toContain(".apicdn.sanity.io");
    expect(requestedUrl.searchParams.get("perspective")).toBeNull();

    fetchMock.mockRestore();
  });
});

describe("fallback blog posts", () => {
  interface BlogPostWithBody {
    slug: string;
    featured_image?: {
      asset?: {
        url?: string;
      };
    };
    body?: Record<string, unknown>[];
  }

  it("merges local fallback articles into the blog listing when Sanity omits them", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          result: [
            {
              _id: "blog-alergia-y-salud-ocular",
              title:
                "Alergia y Salud Ocular: guía práctica para aliviar tus síntomas",
              slug: "alergia-y-salud-ocular",
              date: "2026-05-12",
              excerpt: "Ejemplo",
              author: "Óptica Suárez",
              categories: ["Salud Visual"],
            },
          ],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
    );

    const posts = await getBlogPosts(false);
    const slugs = posts.map((post) => post.slug);

    expect(slugs).toContain("alergia-y-salud-ocular");
    expect(slugs).toContain("eclipse-solar-como-verlo-correctamente");
    expect(slugs).toContain("que-son-las-cataratas-y-como-tratarlas");
    expect(posts[0]?.slug).toBe("eclipse-solar-como-verlo-correctamente");

    fetchMock.mockRestore();
  });

  it("returns the local fallback article when Sanity does not have the requested slug", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ result: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const post = (await getBlogPost(
      "que-son-las-cataratas-y-como-tratarlas",
      false
    )) as BlogPostWithBody | null;

    expect(post?.slug).toBe("que-son-las-cataratas-y-como-tratarlas");
    expect(post?.featured_image).toMatchObject({
      asset: { url: "/images/blog/cataratas-jaen-1.webp" },
    });
    expect(JSON.stringify(post?.body)).toContain(
      "/images/blog/cataratas-jaen-2.webp"
    );

    fetchMock.mockRestore();
  });

  it("adds fallback slugs to the sitemap/prerender slug source", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          result: [{ slug: "alergia-y-salud-ocular" }],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
    );

    const slugs = await getAllBlogSlugs(false);

    expect(slugs).toEqual(
      expect.arrayContaining([
        { slug: "alergia-y-salud-ocular" },
        { slug: "eclipse-solar-como-verlo-correctamente" },
        { slug: "que-son-las-cataratas-y-como-tratarlas" },
      ])
    );

    fetchMock.mockRestore();
  });
});
