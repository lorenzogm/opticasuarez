import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.describe("Site Navigation", () => {
  // TC-SNAV-01
  test("CSR navigation to Quienes Somos", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page
      .locator("nav")
      .getByRole("link", { name: "Quienes Somos" })
      .click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/quienes-somos/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-SNAV-02
  test("CSR navigation to Blog", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.locator("nav").getByRole("link", { name: "Blog" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/blog/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-SNAV-03
  test("CSR navigation to Contacto", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.locator("nav").getByRole("link", { name: "Contacto" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/contacto/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-SNAV-04
  test("Servicios dropdown opens and navigates to service page", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const serviciosLink = page
      .locator("nav")
      .getByRole("link", { name: "Servicios" });
    await serviciosLink.click();
    await expect(
      page.getByRole("menuitem", { name: "Examen Visual" })
    ).toBeVisible();
    await page.getByRole("menuitem", { name: "Examen Visual" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/servicios\/examen-visual/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-SNAV-05
  test("navigate back to homepage via logo", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");
    await page.locator("nav a[href='/']").first().click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/$/);
  });

  // TC-SNAV-06
  test("mobile menu opens and shows links", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: /menú/i }).click();
    await expect(page.getByRole("link", { name: "Inicio" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Blog" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Contacto", exact: true })
    ).toBeVisible();
  });

  // TC-SNAV-07
  test("navigation bar has all main links", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: "Inicio" })).toBeVisible();
    await expect(
      nav.getByRole("link", { name: "Quienes Somos" })
    ).toBeVisible();
    await expect(nav.getByRole("link", { name: "Blog" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Contacto" })).toBeVisible();
  });
});
