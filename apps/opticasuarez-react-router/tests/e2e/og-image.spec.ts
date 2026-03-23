import { expect, test } from "@playwright/test";

test.describe("Resource Routes", () => {
  test("og-image.jpg should serve PNG image", async ({ page }) => {
    const response = await page.goto("/og-image.jpg");

    // Should return 200 OK
    expect(response?.status()).toBe(200);

    // Should have correct content type
    const contentType = response?.headers()["content-type"];
    expect(contentType).toBe("image/png");

    // Should have caching headers
    const cacheControl = response?.headers()["cache-control"];
    expect(cacheControl).toContain("public");
    expect(cacheControl).toContain("max-age=86400");
  });

  test("og-image.jpg should serve actual image data", async ({ page }) => {
    // Create a request to get the image
    const response = await page.request.get("/og-image.jpg");

    // Check response status
    expect(response.status()).toBe(200);

    // Check content type
    expect(response.headers()["content-type"]).toBe("image/png");

    // Check that we get binary data (PNG images start with specific bytes)
    const buffer = await response.body();
    expect(buffer.length).toBeGreaterThan(1000); // Should be a reasonably sized image

    // Check PNG signature (first 8 bytes)
    const pngSignature = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);
    const fileHeader = buffer.subarray(0, 8);
    expect(Buffer.compare(fileHeader, pngSignature)).toBe(0);
  });
});
