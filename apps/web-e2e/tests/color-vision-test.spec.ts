import { expect, test } from "@playwright/test";

test("color vision page has SEO metadata and is linked from the footer", async ({
  page,
}) => {
  await page.goto("/test-daltonismo");
  await expect(page).toHaveTitle(/Test de daltonismo.*Óptica Suárez/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/test-daltonismo$/
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /discromatopsias/
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Test de daltonismo"
  );
  await expect(
    page
      .getByRole("contentinfo")
      .getByRole("link", { name: "Test de daltonismo" })
  ).toHaveAttribute("href", "/test-daltonismo");
});

test("six plates can be answered with the keyboard and repeated on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/test-daltonismo");
  await page.getByRole("button", { name: "Empezar el test" }).click();
  const answers = ["12", "74", "29", "5", "45", "26"];
  for (const [index, answer] of answers.entries()) {
    await expect(
      page.getByText(`Lámina ${index + 1} de 6`, { exact: true })
    ).toBeVisible();
    const canvas = page.getByRole("img", { name: /puntos de colores/ });
    await expect(canvas).toBeVisible();
    expect(
      await canvas.evaluate((element: HTMLCanvasElement) =>
        element
          .getContext("2d")
          ?.getImageData(0, 0, element.width, element.height)
          .data.some((value, index) => index % 4 === 3 && value > 0)
      )
    ).toBe(true);
    await page.getByLabel("¿Qué número ves?").fill(answer);
    await page.getByLabel("¿Qué número ves?").press("Enter");
  }
  await expect(
    page.getByText("Has identificado todas las láminas")
  ).toBeVisible();
  await expect(page.getByText("Coincidencias: 6 de 6.")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Pedir cita para una revisión" })
  ).toHaveAttribute("href", "/cita");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    )
  ).toBe(true);
  await page.getByRole("button", { name: "Repetir el test" }).click();
  await expect(page.getByText("Lámina 1 de 6", { exact: true })).toBeVisible();
  for (const _answer of answers) {
    await page.getByRole("button", { name: "No veo ningún número" }).click();
  }
  await expect(page.getByText("Resultado no válido")).toBeVisible();
});
