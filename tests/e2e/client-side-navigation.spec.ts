import { test, expect } from '@playwright/test';

// Extend Window interface for test markers
declare global {
  interface Window {
    navigationTestMarker?: string;
    multiPageNavTest?: string;
    mobileNavTest?: string;
  }
}

test.describe('Client-Side Navigation Tests', () => {
  test('should work with client-side navigation in development', async ({
    page,
  }) => {
    // Start on home page
    await page.goto('/');

    // Verify we're on the home page
    await expect(page).toHaveTitle(/Óptica Suárez/);

    // Add a client-side marker to detect page reloads
    await page.evaluate(() => {
      window.navigationTestMarker = 'initial-load';
    });

    // Click on a navigation link - this should use client-side routing
    await page.locator('nav').getByRole('link', { name: 'Servicios' }).click();

    // Verify navigation worked
    await expect(page).toHaveURL('/servicios');
    await expect(page).toHaveTitle(/Servicios/);

    // Check if client-side navigation preserved our marker (no page reload)
    const marker = await page.evaluate(() => window.navigationTestMarker);
    expect(marker).toBe('initial-load');

    // Try another navigation to ensure client-side routing continues to work
    await page
      .locator('nav')
      .getByRole('link', { name: 'Quienes Somos' })
      .click();
    await expect(page).toHaveURL('/quienes-somos');
    await expect(page).toHaveTitle(/Quiénes somos/);

    // Check marker is still preserved
    const marker2 = await page.evaluate(() => window.navigationTestMarker);
    expect(marker2).toBe('initial-load');

    // Navigate back to home
    await page.locator('nav').getByRole('link', { name: 'Inicio' }).click();
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(/Óptica Suárez/);

    // Final check - marker should still be preserved
    const marker3 = await page.evaluate(() => window.navigationTestMarker);
    expect(marker3).toBe('initial-load');
  });

  test('should handle navigation from different starting pages', async ({
    page,
  }) => {
    // Test navigation starting from a different page
    await page.goto('/quienes-somos');
    await expect(page).toHaveTitle(/Quiénes somos/);

    // Add marker
    await page.evaluate(() => {
      window.multiPageNavTest = 'from-about-page';
    });

    // Navigate to another page
    await page.locator('nav').getByRole('link', { name: 'Servicios' }).click();
    await expect(page).toHaveURL('/servicios');
    await expect(page).toHaveTitle(/Servicios/);

    // Check if navigation was client-side (marker preserved)
    const marker = await page.evaluate(() => window.multiPageNavTest);
    expect(marker).toBe('from-about-page');

    // Navigate to blog
    await page.locator('nav').getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL('/blog');
    await expect(page).toHaveTitle(/Blog/);

    // Final check
    const marker2 = await page.evaluate(() => window.multiPageNavTest);
    expect(marker2).toBe('from-about-page');
  });

  test('should work with mobile navigation menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    // Add marker for mobile test
    await page.evaluate(() => {
      window.mobileNavTest = 'mobile-navigation';
    });

    // Click on mobile menu button
    await page.getByRole('button', { name: /Abrir menú principal/i }).click();

    // Check that mobile menu is visible
    await expect(page.locator('.md\\:hidden .space-y-1')).toBeVisible();

    // Click on Quienes Somos in mobile menu
    await page
      .locator('.md\\:hidden')
      .getByRole('link', { name: 'Quienes Somos' })
      .click();

    // Check that we're on the correct page
    await expect(page).toHaveURL('/quienes-somos');
    await expect(page).toHaveTitle(/Quiénes somos/);

    // Verify client-side navigation (marker preserved)
    const marker = await page.evaluate(() => window.mobileNavTest);
    expect(marker).toBe('mobile-navigation');
  });
});
