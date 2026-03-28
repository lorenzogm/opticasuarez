import { expect, test } from "@playwright/test";

test.describe("Content Pages — SSR", () => {
  // TC-CONTENT-01
  test("/quienes-somos renders", async ({ page }) => {
    await page.goto("/quienes-somos");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Quiénes Somos|Óptica Suárez/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Página no encontrada")).not.toBeVisible();
  });

  // TC-CONTENT-02
  test("/contacto renders", async ({ page }) => {
    await page.goto("/contacto");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Contacto|Óptica Suárez/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Página no encontrada")).not.toBeVisible();
  });

  // TC-CONTENT-03
  test("/servicios/examen-visual renders", async ({ page }) => {
    await page.goto("/servicios/examen-visual");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Examen Visual|Óptica Suárez/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-CONTENT-04
  test("/servicios/terapia-visual renders", async ({ page }) => {
    await page.goto("/servicios/terapia-visual");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Terapia Visual|Óptica Suárez/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-CONTENT-05
  test("/servicios/contactologia renders", async ({ page }) => {
    await page.goto("/servicios/contactologia");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Contactología|Óptica Suárez/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-CONTENT-06
  test("/servicios/vision-pediatrica renders", async ({ page }) => {
    await page.goto("/servicios/vision-pediatrica");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Visión Pediátrica|Óptica Suárez/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-CONTENT-07
  test("/servicios/control-de-miopia renders", async ({ page }) => {
    await page.goto("/servicios/control-de-miopia");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Control de Miopía|Óptica Suárez/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-CONTENT-08
  test("/servicios/ortoqueratologia renders", async ({ page }) => {
    await page.goto("/servicios/ortoqueratologia");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Ortoqueratología|Óptica Suárez/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-CONTENT-09
  test("/cita renders", async ({ page }) => {
    await page.goto("/cita");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Reservar Cita|Óptica Suárez/);
  });
});
