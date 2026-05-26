import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.describe("SEO Metadata", () => {
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

    expect(aboutTitle).not.toBe(homepageTitle);
    expect(blogTitle).not.toBe(homepageTitle);
    expect(blogTitle).not.toBe(aboutTitle);
  });

  // TC-SEO-05
  test("service pages have meta description", async ({ page }) => {
    const servicePages = [
      "/servicios/examen-visual",
      "/servicios/terapia-visual",
    ];

    for (const servicePath of servicePages) {
      await page.goto(servicePath);
      await page.waitForLoadState("networkidle");
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(
        description,
        `Missing meta description on ${servicePath}`
      ).toBeTruthy();
    }
  });

  // TC-SEO-06
  test("ortoqueratologia page has correct SEO title", async ({ page }) => {
    await page.goto("/servicios/ortoqueratologia");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Ortoqueratología en Jaén \| Óptica Suárez/);
  });

  // TC-SEO-07
  test("ortoqueratologia page has FAQPage JSON-LD structured data", async ({
    page,
  }) => {
    await page.goto("/servicios/ortoqueratologia");
    await page.waitForLoadState("networkidle");
    const faqSchema = await page.evaluate(() => {
      const scripts = Array.from(
        document.querySelectorAll('script[type="application/ld+json"]')
      );
      for (const script of scripts) {
        try {
          const data = JSON.parse(script.textContent || "");
          if (data["@type"] === "FAQPage") return data;
        } catch {
          // ignore parse errors
        }
      }
      return null;
    });
    expect(faqSchema, "FAQPage JSON-LD not found").not.toBeNull();
    expect(faqSchema?.["@context"]).toBe("https://schema.org");
    expect(Array.isArray(faqSchema?.mainEntity)).toBe(true);
    expect(faqSchema?.mainEntity.length).toBeGreaterThan(0);
  });
});
