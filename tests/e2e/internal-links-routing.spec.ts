import { test, expect } from '@playwright/test';

test.describe('Internal Links Routing Issues', () => {
  test('should verify navigation links work in development but demonstrate the potential static hosting issue', async ({
    page,
  }) => {
    // This test verifies the current state and documents the routing issue
    // The issue occurs because:
    // 1. Navigation links point to /servicios (without trailing slash)
    // 2. But prerendered files are generated as /servicios/index.html (requiring trailing slash)
    // 3. Static hosting doesn't automatically redirect /servicios to /servicios/

    // Start on home page
    await page.goto('/');
    await expect(page).toHaveTitle(/Óptica Suárez/);

    // Click on "Servicios" link in navigation
    const serviciosLink = page
      .locator('nav')
      .getByRole('link', { name: 'Servicios' });

    // Get the href attribute to verify it doesn't have trailing slash
    const href = await serviciosLink.getAttribute('href');
    expect(href).toBe('/servicios'); // This shows the routing mismatch

    // Try to click the link
    await serviciosLink.click();

    // In development, this works due to React Router's client-side routing
    await expect(page).toHaveURL('/servicios');

    // Check if we can access the page content
    await expect(page).toHaveTitle(/Servicios/);
  });

  test('should verify direct URL access works in development', async ({
    page,
  }) => {
    // Test direct navigation to URLs without trailing slash
    // In development these work due to React Router's client-side routing
    // In static hosting they would fail without proper configuration

    const routesWithoutSlash = [
      '/servicios',
      '/quienes-somos',
      '/blog',
      '/contacto',
    ];

    for (const route of routesWithoutSlash) {
      // Try to navigate directly to the route without trailing slash
      await page.goto(route);

      // Should be able to access the page in development
      await expect(page).toHaveURL(route);

      // Page should load successfully
      const title = await page.title();
      expect(title).not.toBe(''); // Should have a title if page loaded
      expect(title).not.toContain('404'); // Should not be a 404 page
    }
  });

  test('should document the mismatch between link hrefs and generated file structure', async ({
    page,
  }) => {
    // This test documents the core issue:
    // Links point to /servicios but files are generated as /servicios/index.html

    await page.goto('/');

    // Check all main navigation links
    const navLinks = [
      { name: 'Servicios', expectedHref: '/servicios' },
      { name: 'Quienes Somos', expectedHref: '/quienes-somos' },
      { name: 'Blog', expectedHref: '/blog' },
      { name: 'Contacto', expectedHref: '/contacto' },
    ];

    for (const link of navLinks) {
      const linkElement = page
        .locator('nav')
        .getByRole('link', { name: link.name });
      const href = await linkElement.getAttribute('href');

      // Verify the current implementation (without trailing slash)
      expect(href).toBe(link.expectedHref);
    }
  });

  test('should verify that page reload works correctly', async ({ page }) => {
    // This test shows why "reloading works" - because the server
    // can handle the request differently on a fresh page load

    // Navigate to a page via link click
    await page.goto('/');
    await page.locator('nav').getByRole('link', { name: 'Servicios' }).click();
    await expect(page).toHaveURL('/servicios');

    // Add a marker to track if page reloads
    await page.evaluate(() => {
      (window as Window & { testMarker?: string }).testMarker = 'before-reload';
    });

    // Reload the page
    await page.reload();

    // Check if we're still on the same page after reload
    await expect(page).toHaveURL('/servicios');

    // Marker should be gone after reload (page was actually reloaded)
    const marker = await page.evaluate(
      () => (window as Window & { testMarker?: string }).testMarker
    );
    expect(marker).toBeUndefined();

    // Page should still work after reload
    await expect(page).toHaveTitle(/Servicios/);
  });
});
