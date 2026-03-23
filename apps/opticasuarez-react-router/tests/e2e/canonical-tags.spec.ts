import { test, expect } from '@playwright/test';

test.describe('Canonical Tags Verification', () => {
  test('should have proper canonical tags on all pages', async ({ page }) => {
    // Test pages that should have canonical tags
    // Note: Blog post dynamic routes don't have canonical tags due to React Router v7 limitations
    const pagesToTest = [
      { url: '/contactologia', expectedCanonical: 'https://opticasuarezjaen.es/contactologia' },
      { url: '/control-de-miopia', expectedCanonical: 'https://opticasuarezjaen.es/control-de-miopia' },
      { url: '/examen-visual', expectedCanonical: 'https://opticasuarezjaen.es/examen-visual' },
    ];

    for (const { url, expectedCanonical } of pagesToTest) {
      await page.goto(url);
      
      // Check that the page loads successfully
      expect(await page.locator('html').count()).toBeGreaterThan(0);
      
      // Check for canonical tag - using proper <link rel="canonical"> element per Google's specification
      const canonicalTag = page.locator('link[rel="canonical"]');
      await expect(canonicalTag).toHaveAttribute('href', expectedCanonical);
    }
  });

  test('should have proper Open Graph URLs matching canonical URLs', async ({ page }) => {
    const pagesToTest = [
      { url: '/contactologia', expectedOgUrl: 'https://opticasuarezjaen.es/contactologia' },
      { url: '/control-de-miopia', expectedOgUrl: 'https://opticasuarezjaen.es/control-de-miopia' },
      { url: '/examen-visual', expectedOgUrl: 'https://opticasuarezjaen.es/examen-visual' },
    ];

    for (const { url, expectedOgUrl } of pagesToTest) {
      await page.goto(url);
      
      // Check for og:url meta tag
      const ogUrlTag = page.locator('meta[property="og:url"]');
      await expect(ogUrlTag).toHaveAttribute('content', expectedOgUrl);
    }
  });

  test('homepage should have canonical tag', async ({ page }) => {
    await page.goto('/');
    
    // Check for canonical tag - using proper <link rel="canonical"> element per Google's specification
    const canonicalTag = page.locator('link[rel="canonical"]');
    await expect(canonicalTag).toHaveAttribute('href', 'https://opticasuarezjaen.es/');
  });
});