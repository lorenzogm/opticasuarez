import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.describe("About & Contact", () => {
  // TC-ABOUT-01
  test("navigate to Quienes Somos via nav and verify content", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page
      .locator("nav")
      .getByRole("link", { name: "Quienes Somos" })
      .click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/quienes-somos/);
    // Reload to ensure fresh SSR render with full data
    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Verify timeline section has content
    const timelineHeading = page.getByRole("heading", {
      name: /NUESTRA HISTORIA/i,
    });
    await expect(timelineHeading).toBeVisible({ timeout: 15_000 });
    const timelineSection = timelineHeading.locator("..").locator("..");
    const timelineItems = timelineSection.locator("[class*='space-y'] > *");
    const count = await timelineItems.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Verify team section
    await expect(
      page.getByRole("heading", { name: /NUESTRO EQUIPO/i })
    ).toBeVisible();
  });

  // TC-ABOUT-02
  test("navigate to Contacto via nav and verify content", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.locator("nav").getByRole("link", { name: "Contacto" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/contacto/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Página no encontrada")).not.toBeVisible();
  });

  // TC-ABOUT-03
  test("Quienes Somos renders via SSR with full content", async ({ page }) => {
    await page.goto("/quienes-somos");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Quiénes Somos|Óptica Suárez/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Verify timeline has events
    const timelineHeading = page.getByRole("heading", {
      name: /NUESTRA HISTORIA/i,
    });
    await expect(timelineHeading).toBeVisible();
    const timelineSection = timelineHeading.locator("..").locator("..");
    const timelineItems = timelineSection.locator("[class*='space-y'] > *");
    const count = await timelineItems.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  // TC-ABOUT-04
  test("Contacto page shows store locations", async ({ page }) => {
    await page.goto("/contacto");
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: /NUESTRAS TIENDAS/i })
    ).toBeVisible();
    await expect(page.getByText(/Bulevar/i)).toBeVisible();
    await expect(page.getByText(/Centro/i).first()).toBeVisible();
  });

  // TC-ABOUT-05
  test("Contacto page has contact form", async ({ page }) => {
    await page.goto("/contacto");
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: /ENVÍANOS UN MENSAJE|MENSAJE/i })
    ).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: /nombre/i })
    ).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: /email/i })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /enviar/i })
    ).toBeVisible();
  });
});
