import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.describe("Test de lectura", () => {
  test("explica la relación entre lectura y visión y tiene SEO", async ({
    page,
  }) => {
    await page.goto("/test-lectura");
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("heading", { level: 1, name: "Test de lectura" })
    ).toBeVisible();
    await expect(page).toHaveTitle(/Test de lectura.*Óptica Suárez/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/test-lectura$/
    );
    await expect(page.getByText(/sistema visual/)).toBeVisible();
  });

  test("completa el test y ofrece una revisión visual", async ({ page }) => {
    await page.goto("/test-lectura");
    await page.waitForLoadState("networkidle");

    await page.getByLabel(/Un adolescente o adulto/).check();
    await page.getByLabel("Edad").fill("40");
    await page.getByRole("button", { name: "Continuar" }).click();

    await page.getByRole("button", { name: "Empezar" }).click();
    await page.getByRole("button", { name: "He terminado" }).click();

    await page.getByLabel("A pequeños saltos").check();
    await page.getByLabel("Gafas, ejercicios o terapia visual").check();
    await page.getByRole("button", { name: "Ver resultado" }).click();

    await expect(
      page.getByRole("heading", { name: "Tu resultado orientativo" })
    ).toBeVisible();
    await expect(page.getByText(/no es un diagnóstico/)).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Pedir revisión visual" })
    ).toHaveAttribute("href", "/cita");
  });
});
