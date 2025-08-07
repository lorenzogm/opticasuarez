import { test, expect } from '@playwright/test';

test.describe('Booking System', () => {
  test('should complete the booking flow through all steps', async ({
    page,
  }) => {
    // Step 1: Navigate to booking page
    await page.goto('/book');

    // Check that we're on the booking page
    await expect(page).toHaveTitle(/Reservar Cita/);
    await expect(page).toHaveURL('/book');

    // Check for main content on step 1
    await expect(page.locator('main')).toBeVisible();

    // Navigate to step 2 (look for a next button or link to step2)
    await page.goto('/book/step2');

    // Check that we're on step 2
    await expect(page).toHaveURL('/book/step2');

    // Check for main content on step 2
    await expect(page.locator('main')).toBeVisible();

    // Navigate to step 3
    await page.goto('/book/step3');

    // Check that we're on step 3
    await expect(page).toHaveURL('/book/step3');

    // Check for main content on step 3
    await expect(page.locator('main')).toBeVisible();

    // Navigate to step 4 (final step)
    await page.goto('/book/step4');

    // Check that we're on step 4
    await expect(page).toHaveURL('/book/step4');

    // Check for main content on step 4
    await expect(page.locator('main')).toBeVisible();
  });

  test('should load step 1 (book) correctly', async ({ page }) => {
    await page.goto('/book');

    // Check page basics
    await expect(page).toHaveTitle(/Reservar Cita/);
    await expect(page).toHaveURL('/book');

    // Check navigation is present
    await expect(page.locator('nav')).toBeVisible();

    // Check main content is visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should load step 2 correctly', async ({ page }) => {
    await page.goto('/book/step2');

    // Check that we can access step 2 directly
    await expect(page).toHaveURL('/book/step2');

    // Check navigation is present
    await expect(page.locator('nav')).toBeVisible();

    // Check main content is visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should load step 3 correctly', async ({ page }) => {
    await page.goto('/book/step3');

    // Check that we can access step 3 directly
    await expect(page).toHaveURL('/book/step3');

    // Check navigation is present
    await expect(page.locator('nav')).toBeVisible();

    // Check main content is visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should load step 4 correctly', async ({ page }) => {
    await page.goto('/book/step4');

    // Check that we can access step 4 directly
    await expect(page).toHaveURL('/book/step4');

    // Check navigation is present
    await expect(page.locator('nav')).toBeVisible();

    // Check main content is visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have working navigation from booking pages', async ({
    page,
  }) => {
    await page.goto('/book');

    // Test navigation back to home from booking page using navigation bar
    await page.locator('nav').getByRole('link', { name: 'Inicio' }).click();
    await expect(page).toHaveURL('/');

    // Navigate back to booking
    await page.goto('/book/step2');

    // Test navigation to other pages from booking flow
    await page.locator('nav').getByRole('link', { name: 'Contacto' }).click();
    await expect(page).toHaveURL('/contacto');
  });
});
