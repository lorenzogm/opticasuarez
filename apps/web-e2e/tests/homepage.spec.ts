import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  // TC-HOME-01
  test("page title contains Óptica Suárez", async ({ page }) => {
    await expect(page).toHaveTitle(/Óptica Suárez/);
  });

  // TC-HOME-02
  test("hero section renders with carousel controls", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Next slide" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Previous slide" })
    ).toBeVisible();
  });

  // TC-HOME-03
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

  // TC-HOME-04
  test("page has exactly one H1", async ({ page }) => {
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
  });

  // TC-HOME-05
  test("WhatsApp contact link is visible", async ({ page }) => {
    await expect(page.getByRole("link", { name: /WhatsApp/i })).toBeVisible();
  });

  // TC-HOME-06
  test("locations section renders", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /DÓNDE ESTAMOS/i })
    ).toBeVisible();
  });

  // TC-HOME-07
  test("book appointment CTA renders", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Reserva tu cita/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Reservar Cita/i })
    ).toBeVisible();
  });

  // TC-HOME-08
  test("no JavaScript errors on page load", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  // TC-HOME-09 — Bug: backlog/403-hero-cta-button-noop/
  test("hero CTA button navigates to services", async ({ page }) => {
    const ctaButton = page.getByRole("link", {
      name: /Descubre nuestros servicios/i,
    });
    await expect(ctaButton).toBeVisible();

    const scrollBefore = await page.evaluate(() => window.scrollY);
    await ctaButton.click();
    await page.waitForTimeout(1000);

    const url = page.url();
    const scrollAfter = await page.evaluate(() => window.scrollY);

    const navigated = url.includes("/servicios");
    const scrolled = scrollAfter > scrollBefore + 100;
    expect(navigated || scrolled).toBe(true);
  });
});
