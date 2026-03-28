import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.describe("Error Resilience", () => {
  // TC-ERR-01
  test("non-existent route shows 404 page, not 500", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist-xyz");
    expect(response?.status()).not.toBe(500);
    await page.waitForLoadState("networkidle");
    await expect(page.getByText(/no encontrada|not found/i)).toBeVisible();
  });

  // TC-ERR-02
  test("404 page recovery to homepage", async ({ page }) => {
    await page.goto("/this-page-does-not-exist-xyz");
    await page.waitForLoadState("networkidle");
    const homeLink = page.getByRole("link", { name: "Volver al inicio" });
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
