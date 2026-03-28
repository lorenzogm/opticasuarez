import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
  // TC-NAV-01
  test("navigation bar is visible on homepage", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("nav")).toBeVisible();
  });

  // TC-NAV-02
  test("navigation bar has all main links", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const nav = page.locator("nav");
    await expect(nav.getByRole("link", { name: "Inicio" })).toBeVisible();
    await expect(
      nav.getByRole("link", { name: "Quienes Somos" })
    ).toBeVisible();
    await expect(nav.getByRole("link", { name: "Blog" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Contacto" })).toBeVisible();
  });

  // TC-NAV-03
  test("client-side navigation to /quienes-somos", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page
      .locator("nav")
      .getByRole("link", { name: "Quienes Somos" })
      .click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/quienes-somos/);
    await expect(page.getByText("Página no encontrada")).not.toBeVisible();
  });

  // TC-NAV-04
  test("client-side navigation to /blog", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.locator("nav").getByRole("link", { name: "Blog" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/blog/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-NAV-05
  test("client-side navigation to /contacto", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.locator("nav").getByRole("link", { name: "Contacto" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/contacto/);
    await expect(page.getByText("Página no encontrada")).not.toBeVisible();
  });

  // TC-NAV-06
  test("servicios dropdown opens on click", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const serviciosLink = page
      .locator("nav")
      .getByRole("link", { name: "Servicios" });
    await serviciosLink.click();
    await expect(
      page.getByRole("menuitem", { name: "Examen Visual" })
    ).toBeVisible();
  });

  // TC-NAV-07
  test("navigate to homepage via logo", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");
    await page
      .locator("nav")
      .getByRole("link", { name: "Óptica Suárez" })
      .click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/$/);
  });

  // TC-NAV-08
  test("mobile menu opens", async ({ page }) => {
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
});
