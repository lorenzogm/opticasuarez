import { expect, test } from "@playwright/test";

test.describe("Blog", () => {
  // TC-BLOG-01
  test("blog list page renders", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Blog|Óptica Suárez/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-BLOG-02
  test("blog list has articles", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");
    const articleLinks = page.getByRole("link", { name: /Leer más/i });
    await expect(articleLinks.first()).toBeVisible();
  });

  // TC-BLOG-03
  test("blog article renders via SSR", async ({ page }) => {
    // First get a real article URL from the blog list
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");
    const firstArticleLink = page.locator("a[href*='/blog/']").first();
    const href = await firstArticleLink.getAttribute("href");
    expect(href).toBeTruthy();

    // Navigate directly to the article (SSR)
    await page.goto(href as string);
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Artículo no encontrado")).not.toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-BLOG-04
  test("blog article via CSR from list", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");
    const firstArticleLink = page.locator("a[href*='/blog/']").first();
    await firstArticleLink.click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/blog\/.+/);
    await expect(page.getByText("Artículo no encontrado")).not.toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
