import { expect, test } from "@playwright/test";

test.describe("SEO", () => {
  // TC-SEO-01
  test("homepage has meta description", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description).toBeTruthy();
    expect(description?.length).toBeGreaterThan(10);
  });

  // TC-SEO-02
  test("homepage has Open Graph tags", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const ogTitle = await page
      .locator('meta[property="og:title"]')
      .getAttribute("content");
    const ogDescription = await page
      .locator('meta[property="og:description"]')
      .getAttribute("content");
    const ogImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(ogTitle).toBeTruthy();
    expect(ogDescription).toBeTruthy();
    expect(ogImage).toBeTruthy();
  });

  // TC-SEO-03
  test("homepage has canonical URL", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonical).toBeTruthy();
  });

  // TC-SEO-04
  test("content pages have unique titles", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const homepageTitle = await page.title();

    await page.goto("/quienes-somos");
    await page.waitForLoadState("networkidle");
    const aboutTitle = await page.title();

    await page.goto("/blog");
    await page.waitForLoadState("networkidle");
    const blogTitle = await page.title();

    // All titles should be different
    expect(aboutTitle).not.toBe(homepageTitle);
    expect(blogTitle).not.toBe(homepageTitle);
    expect(blogTitle).not.toBe(aboutTitle);
  });
});
