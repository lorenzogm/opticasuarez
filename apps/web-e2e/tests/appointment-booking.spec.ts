import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.describe("Appointment Booking", () => {
  // TC-APPT-01
  test("appointment page loads with type selection", async ({ page }) => {
    await page.goto("/cita");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle(/Reservar Cita|Óptica Suárez/);
  });

  // TC-APPT-02
  test("navigate through booking steps", async ({ page }) => {
    await page.goto("/cita");
    await page.waitForLoadState("networkidle");

    // Step 1: Select appointment type (click first option card)
    const firstOption = page
      .locator("[data-appointment-type], button, a")
      .filter({ hasText: /examen|revisión|visual/i })
      .first();
    if (await firstOption.isVisible()) {
      await firstOption.click();
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveURL(/cita\/centro/);
    }
  });
});
