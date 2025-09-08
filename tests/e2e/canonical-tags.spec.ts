import { test, expect } from '@playwright/test';

test.describe('Canonical Tags Verification', () => {
  test('should have proper canonical tags on all pages', async ({ page }) => {
    // Test pages that were missing canonical tags and now should have them
    const pagesToTest = [
      { url: '/contactologia', expectedCanonical: 'https://opticasuarezjaen.es/contactologia' },
      { url: '/control-de-miopia', expectedCanonical: 'https://opticasuarezjaen.es/control-de-miopia' },
      { url: '/examen-visual', expectedCanonical: 'https://opticasuarezjaen.es/examen-visual' },
      { url: '/blog/control-miopia-ninos-adolescentes', expectedCanonical: 'https://opticasuarezjaen.es/blog/control-miopia-ninos-adolescentes' },
    ];

    for (const { url, expectedCanonical } of pagesToTest) {
      await page.goto(url);
      
      // Check that the page loads successfully
      expect(await page.locator('html').count()).toBeGreaterThan(0);
      
      // Check for canonical tag - React Router v7 renders it as a meta tag
      const canonicalTag = page.locator('meta[rel="canonical"]');
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
    
    // Check for canonical tag
    const canonicalTag = page.locator('meta[rel="canonical"]');
    await expect(canonicalTag).toHaveAttribute('href', 'https://opticasuarezjaen.es/');
  });
});