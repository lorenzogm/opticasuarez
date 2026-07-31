import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.describe("Location Pages", () => {
  // TC-SEO-LOC-01
  test("Bulevar page renders contact data, map and Google reviews links", async ({
    page,
  }) => {
    const main = page.locator("main");

    await page.goto("/bulevar");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(/bulevar/);
    await expect(
      main.getByRole("heading", { level: 1, name: "Óptica Suárez Bulevar" })
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: /C\. de Canarias, 6, 23009 Jaén/i })
    ).toHaveAttribute("href", /maps\.app\.goo\.gl/);
    await expect(
      main.getByRole("link", { name: /\+34 953 093 062/i })
    ).toHaveAttribute("href", "tel:+34953093062");
    await expect(
      main.getByRole("link", { name: /WhatsApp Bulevar/i })
    ).toHaveAttribute("href", "https://wa.me/34953093062");
    await expect(
      main.getByRole("link", { name: /bulevar@opticasuarezjaen\.es/i })
    ).toHaveAttribute("href", "mailto:bulevar@opticasuarezjaen.es");
    await expect(
      main.getByTitle(/Mapa de Óptica Suárez Bulevar/i)
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: /Ver opiniones en Google/i })
    ).toHaveAttribute("href", "https://maps.app.goo.gl/G6fLtLamfj1wQVjr8");
  });

  // TC-SEO-LOC-02
  test("Centro page renders SEO title, contact data, map and Google reviews links", async ({
    page,
  }) => {
    const main = page.locator("main");

    await page.goto("/centro");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(/centro/);
    await expect(page).toHaveTitle(/Óptica Suárez Centro en Jaén/i);
    await expect(
      main.getByRole("heading", { level: 1, name: "Óptica Suárez Centro" })
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: /P\.º de la Estación, 12, 23003 Jaén/i })
    ).toHaveAttribute("href", /maps\.app\.goo\.gl/);
    await expect(
      main.getByRole("link", { name: /\+34 953 223 180/i })
    ).toHaveAttribute("href", "tel:+34953223180");
    await expect(
      main.getByRole("link", { name: /WhatsApp Centro/i })
    ).toHaveAttribute("href", "https://wa.me/34953223180");
    await expect(
      main.getByRole("link", { name: /centro@opticasuarezjaen\.es/i })
    ).toHaveAttribute("href", "mailto:centro@opticasuarezjaen.es");
    await expect(
      main.getByTitle(/Mapa de Óptica Suárez Centro/i)
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: /Ver opiniones en Google/i })
    ).toHaveAttribute("href", "https://maps.app.goo.gl/17ZkGLbx8gELpTAw7");
  });
});
