import { describe, expect, it } from "vitest";
import { resolveImage, sanityImageUrl } from "./sanity";

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
