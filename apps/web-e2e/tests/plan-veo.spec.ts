import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.describe("Plan VEO", () => {
  // TC-PVEO-01
  test("Plan VEO page loads with correct heading", async ({ page }) => {
    await page.goto("/planveo");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Plan VEO|Óptica Suárez/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Página no encontrada")).not.toBeVisible();
  });

  // TC-PVEO-02
  test("Plan VEO page shows FAQ and CTA sections", async ({ page }) => {
    await page.goto("/planveo");
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: /Preguntas Frecuentes/i })
    ).toBeVisible();
    await expect(
      page.locator("main").getByRole("link", { name: "Solicitar Plan VEO" })
    ).toBeVisible();
  });

  // TC-PVEO-03
  test("Plan VEO page accessible via link from homepage", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Plan VEO is under the Servicios dropdown — hover to open it
    await page.getByRole("link", { name: "Servicios" }).hover();
    const planVeoLink = page.getByRole("menuitem", { name: "Plan VEO" });
    await expect(planVeoLink).toBeVisible();
    await planVeoLink.click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/planveo/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
