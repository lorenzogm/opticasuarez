import { expect, test } from "@playwright/test";

test.describe("Error Handling", () => {
  // TC-ERR-01
  test("non-existent route shows 404 page, not 500", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist-xyz");
    // Should NOT be a 500 server error — should be a proper 404
    expect(response?.status()).not.toBe(500);
    await page.waitForLoadState("networkidle");
    await expect(page.getByText(/no encontrada|not found/i)).toBeVisible();
  });

  // TC-ERR-02
  test("404 page has link back to homepage", async ({ page }) => {
    await page.goto("/this-page-does-not-exist-xyz");
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("link", { name: /inicio|home/i })
    ).toBeVisible();
  });
});
