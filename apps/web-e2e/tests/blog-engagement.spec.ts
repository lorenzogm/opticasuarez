import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.describe("Blog Engagement", () => {
  // TC-BLOG-01
  test("navigate to blog via nav and see articles", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.locator("nav").getByRole("link", { name: "Blog" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/blog/);
    await expect(page).toHaveTitle(/Blog|Óptica Suárez/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const articleLinks = page.getByRole("link", { name: /Leer más/i });
    await expect(articleLinks.first()).toBeVisible();
  });

  // TC-BLOG-02
  test("click article from blog list (CSR)", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");
    const firstArticleLink = page.locator("a[href*='/blog/']").first();
    await firstArticleLink.click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/blog\/.+/);
    await expect(page.getByText("Artículo no encontrado")).not.toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-BLOG-03
  test("blog article renders via SSR", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");
    const firstArticleLink = page.locator("a[href*='/blog/']").first();
    const href = await firstArticleLink.getAttribute("href");
    expect(href).toBeTruthy();

    await page.goto(href as string);
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Artículo no encontrado")).not.toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-BLOG-04
  test("blog category filter tabs are visible and interactive", async ({
    page,
  }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");

    // Desktop: buttons visible at md+ breakpoint
    const todasButton = page.getByRole("button", { name: /^Todas$/i });
    await expect(todasButton).toBeVisible();

    // Click a category filter button and verify page doesn't break
    const categoryButtons = page.locator(
      "button.rounded-full:not(:has-text('Todas'))"
    );
    if ((await categoryButtons.count()) > 0) {
      await categoryButtons.first().click();
      await page.waitForLoadState("networkidle");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });
});
