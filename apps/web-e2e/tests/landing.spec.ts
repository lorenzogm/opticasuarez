import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.describe("Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  // TC-LAND-01
  test("homepage loads with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Óptica Suárez/);
  });

  // TC-LAND-02
  test("hero section renders with carousel controls", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Next slide" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Previous slide" })
    ).toBeVisible();
  });

  // TC-LAND-03
  test("services grid shows service cards", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "VISIÓN BINOCULAR" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "TERAPIA VISUAL" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "CONTACTOLOGÍA" })
    ).toBeVisible();
  });

  // TC-LAND-04
  test("page has exactly one H1", async ({ page }) => {
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
  });

  // TC-LAND-05
  test("WhatsApp contact link is visible", async ({ page }) => {
    await expect(page.getByRole("link", { name: /WhatsApp/i })).toBeVisible();
  });

  // TC-LAND-06
  test("locations section renders", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /DÓNDE ESTAMOS/i })
    ).toBeVisible();
  });

  // TC-LAND-07
  test("book appointment CTA renders", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Reserva tu cita/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Reservar Cita/i })
    ).toBeVisible();
  });
});
