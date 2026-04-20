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

  // TC-APPT-05
  test("select date/time and advance to contact details", async ({ page }) => {
    // Navigate to schedule page (steps 1-3)
    await page.goto("/cita");
    await page.waitForLoadState("networkidle");
    await page.getByRole("heading", { name: "Cita refracción" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");
    const centerOption = page.getByRole("heading", { level: 3 }).first();
    await expect(centerOption).toBeVisible();
    await centerOption.click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/cita\/horario/);

    // Select an available date from the calendar
    const calendarDate = page
      .locator(".space-y-1 button:not([disabled])")
      .first();
    await expect(calendarDate).toBeVisible();
    await calendarDate.click();

    // Select time period (Mañana)
    await page.getByRole("button", { name: /Mañana/i }).click();

    // Click continue
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");

    // Verify navigation to contact details
    await expect(page).toHaveURL(/cita\/contacto/);
    await expect(
      page.getByRole("heading", { name: /Datos de contacto/i })
    ).toBeVisible();
  });

  // TC-APPT-06
  test("contact details form renders with required fields", async ({
    page,
  }) => {
    // Navigate to contact page (steps 1-4)
    await page.goto("/cita");
    await page.waitForLoadState("networkidle");
    await page.getByRole("heading", { name: "Cita refracción" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");
    const centerOption = page.getByRole("heading", { level: 3 }).first();
    await expect(centerOption).toBeVisible();
    await centerOption.click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");

    // Select date and time
    const calendarDate = page
      .locator(".space-y-1 button:not([disabled])")
      .first();
    await expect(calendarDate).toBeVisible();
    await calendarDate.click();
    await page.getByRole("button", { name: /Mañana/i }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/cita\/contacto/);

    // Verify form fields are present
    await expect(page.getByLabel(/Nombre completo/i)).toBeVisible();
    await expect(page.getByLabel(/Teléfono móvil/i)).toBeVisible();
    await expect(page.getByLabel(/Edad del paciente/i)).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toBeVisible();
    await expect(page.getByLabel(/Observaciones/i)).toBeVisible();
  });

  // TC-APPT-07
  test("contact form validation shows errors for empty required fields", async ({
    page,
  }) => {
    // Navigate to contact page (steps 1-4)
    await page.goto("/cita");
    await page.waitForLoadState("networkidle");
    await page.getByRole("heading", { name: "Cita refracción" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");
    const centerOption = page.getByRole("heading", { level: 3 }).first();
    await expect(centerOption).toBeVisible();
    await centerOption.click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");

    // Select date and time
    const calendarDate = page
      .locator(".space-y-1 button:not([disabled])")
      .first();
    await expect(calendarDate).toBeVisible();
    await calendarDate.click();
    await page.getByRole("button", { name: /Mañana/i }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/cita\/contacto/);

    // Touch each required field and blur to trigger validation
    const nombreInput = page.getByLabel(/Nombre completo/i);
    await nombreInput.click();
    await nombreInput.press("Tab");

    const telefonoInput = page.getByLabel(/Teléfono móvil/i);
    await telefonoInput.click();
    await telefonoInput.press("Tab");

    const edadInput = page.getByLabel(/Edad del paciente/i);
    await edadInput.click();
    await edadInput.press("Tab");

    const emailInput = page.getByLabel(/Email/i);
    await emailInput.click();
    await emailInput.press("Tab");

    // Verify validation errors appear
    await expect(page.getByText(/El nombre es requerido/i)).toBeVisible();
    await expect(
      page.getByText(/El teléfono móvil es requerido/i)
    ).toBeVisible();
    await expect(page.getByText(/La edad es requerida/i)).toBeVisible();
    await expect(page.getByText(/El email es requerido/i)).toBeVisible();
  });

  // TC-APPT-08
  test("confirmation page renders with booking summary", async ({ page }) => {
    // Navigate through all steps to confirmation
    await page.goto("/cita");
    await page.waitForLoadState("networkidle");
    await page.getByRole("heading", { name: "Cita refracción" }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");
    const centerOption = page.getByRole("heading", { level: 3 }).first();
    await expect(centerOption).toBeVisible();
    await centerOption.click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");

    // Select date and time
    const calendarDate = page
      .locator(".space-y-1 button:not([disabled])")
      .first();
    await expect(calendarDate).toBeVisible();
    await calendarDate.click();
    await page.getByRole("button", { name: /Mañana/i }).click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/cita\/contacto/);

    // Fill contact form with valid data
    await page.getByLabel(/Nombre completo/i).fill("Test Usuario");
    await page.getByLabel(/Teléfono móvil/i).fill("612345678");
    await page.getByLabel(/Edad del paciente/i).fill("35");
    await page.getByLabel(/Email/i).fill("test@example.com");

    // Click continue to confirmation
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForLoadState("networkidle");

    // Verify confirmation page
    await expect(page).toHaveURL(/cita\/confirmacion/);
    await expect(
      page.getByRole("heading", { name: /Confirmar cita/i })
    ).toBeVisible();

    // Verify booking summary has key sections
    await expect(page.getByText(/Tipo de servicio/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: /Centro/i })).toBeVisible();
    await expect(page.getByText(/Fecha y hora/i)).toBeVisible();
    await expect(page.getByText(/Datos de contacto/i)).toBeVisible();

    // Verify contact data appears
    await expect(page.getByText("Test Usuario")).toBeVisible();
    await expect(page.getByText("612345678")).toBeVisible();
    await expect(page.getByText("test@example.com")).toBeVisible();

    // Verify confirm button is visible
    await expect(
      page.getByRole("button", { name: /Confirmar cita/i })
    ).toBeVisible();
  });
});
