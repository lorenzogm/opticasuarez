import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.describe("Service Discovery", () => {
  // TC-SERV-01
  test("hero CTA navigates to services overview", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const ctaLink = page.getByRole("link", {
      name: /Descubre nuestros servicios/i,
    });
    await expect(ctaLink).toBeVisible();
    await ctaLink.click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/servicios/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-SERV-02
  test("service page renders via CSR from servicios dropdown", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.locator("nav").getByRole("link", { name: "Servicios" }).click();
    await page.getByRole("menuitem", { name: "Terapia Visual" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/servicios\/terapia-visual/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-SERV-03
  test("multiple service pages render via SSR", async ({ page }) => {
    const services = [
      {
        path: "/servicios/examen-visual",
        title: /Examen Visual|Óptica Suárez/,
      },
      {
        path: "/servicios/contactologia",
        title: /Contactología|Óptica Suárez/,
      },
      {
        path: "/servicios/vision-pediatrica",
        title: /Visión Pediátrica|Óptica Suárez/,
      },
      {
        path: "/servicios/control-de-miopia",
        title: /Control de Miopía|Óptica Suárez/,
      },
      {
        path: "/servicios/ortoqueratologia",
        title: /Ortoqueratología|Óptica Suárez/,
      },
      {
        path: "/servicios/vision-deportiva",
        title: /Visión Deportiva|Óptica Suárez/,
      },
    ];

    for (const service of services) {
      await page.goto(service.path);
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveTitle(service.title);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });

  // TC-SERV-04
  test("service page has FAQ accordion section", async ({ page }) => {
    await page.goto("/servicios/examen-visual");
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: /Preguntas Frecuentes/i })
    ).toBeVisible();
    const accordionButtons = page.getByRole("button").filter({
      has: page.locator("text=/\\?/"),
    });
    const count = await accordionButtons.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  // TC-SERV-05
  test("service page has CTA section with booking link", async ({ page }) => {
    await page.goto("/servicios/examen-visual");
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("link", { name: /Reservar Cita/i }).first()
    ).toBeVisible();
  });
});
