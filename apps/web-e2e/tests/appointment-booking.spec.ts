import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.describe("Appointment Booking", () => {
  // TC-APPT-01
  test("appointment page loads with type selection", async ({ page }) => {
    await page.goto("/cita");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Reservar Cita/);
    await expect(
      page.getByRole("heading", { name: "Selecciona el tipo de cita" })
    ).toBeVisible();
    // Verify at least 3 appointment type options are visible
    const typeCards = page.getByRole("heading", { level: 3 });
    await expect(typeCards).not.toHaveCount(0);
    const count = await typeCards.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  // TC-APPT-02
  test("select appointment type and advance to center selection", async ({
    page,
  }) => {
    await page.goto("/cita");
    await page.waitForLoadState("networkidle");

    // Click an appointment type card (click the heading text)
    await page.getByRole("heading", { name: "Cita refracción" }).click();

    // Click the Continuar button
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");

    // Verify navigation to center selection
    await expect(page).toHaveURL(/cita\/centro/);
  });

  // TC-APPT-03
  test("select center and advance to schedule", async ({ page }) => {
    await page.goto("/cita");
    await page.waitForLoadState("networkidle");

    // Step 1: Select appointment type
    await page.getByRole("heading", { name: "Cita refracción" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/cita\/centro/);

    // Step 2: Verify center options are visible and select one
    await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
    // Click the first available center option
    const centerOption = page.getByRole("heading", { level: 3 }).first();
    await expect(centerOption).toBeVisible();
    await centerOption.click();

    // Click continue to advance to schedule
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");

    // Verify navigation to schedule page
    await expect(page).toHaveURL(/cita\/horario/);
  });

  // TC-APPT-04
  test("schedule page renders with date/time selection", async ({ page }) => {
    await page.goto("/cita");
    await page.waitForLoadState("networkidle");

    // Navigate through steps to reach schedule
    await page.getByRole("heading", { name: "Cita refracción" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");

    // Select first center
    const centerOption = page.getByRole("heading", { level: 3 }).first();
    await expect(centerOption).toBeVisible();
    await centerOption.click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");

    // Verify schedule page renders
    await expect(page).toHaveURL(/cita\/horario/);
    await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
  });
});
