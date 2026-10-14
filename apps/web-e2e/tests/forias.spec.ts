import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.describe("Test de forias", () => {
  test("explica las forias y ofrece una ruta de cita", async ({ page }) => {
    await page.goto("/test-forias");
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("heading", {
        name: "Test de forias y alineamiento ocular",
      })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "¿Qué es una foria?" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Pedir una cita" })
    ).toHaveAttribute("href", "/cita");
  });

  test("recomienda una revisión ante respuestas con señales", async ({
    page,
  }) => {
    await page.goto("/test-forias");
    await page.waitForLoadState("networkidle");
    await page
      .getByRole("button", { name: "No tengo gafas de colores" })
      .click();

    for (let question = 0; question < 10; question += 1) {
      await page.getByRole("button", { name: "Casi siempre" }).click();
    }

    await page
      .getByRole("button", {
        name: "Se desdobla o un ojo se desvía a más de 10 cm, o no consigo mantenerla única",
      })
      .click();

    await expect(
      page.getByRole("heading", { name: "Te recomendamos una revisión" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Pedir cita de revisión" })
    ).toHaveAttribute("href", "/cita");
  });

  test("completa las seis rondas de la prueba con gafas", async ({ page }) => {
    await page.goto("/test-forias");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Tengo gafas rojo/cian" }).click();
    await page.getByRole("button", { name: "Comenzar prueba" }).click();

    for (let round = 0; round < 6; round += 1) {
      await expect(page.getByText(`Ronda ${round + 1} de 6`)).toBeVisible();
      await page.getByRole("button", { name: "Listo" }).click();
    }

    await expect(
      page.getByRole("heading", { name: "Prueba completada" })
    ).toBeVisible();
    await expect(
      page.getByText(/no mide ni diagnostica una foria/)
    ).toBeVisible();
  });
});
