import { test, expect } from '@playwright/test';

test.describe('Sitemap and 404 Error Handling', () => {
  test('sitemap.xml should contain only legitimate URLs', async ({ page }) => {
    await page.goto('/sitemap.xml');
    
    const content = await page.content();
    
    // Verify sitemap contains legitimate URLs
    expect(content).toContain('https://opticasuarezjaen.es/');
    expect(content).toContain('https://opticasuarezjaen.es/quienes-somos');
    expect(content).toContain('https://opticasuarezjaen.es/servicios');
    expect(content).toContain('https://opticasuarezjaen.es/blog');
    
    // Verify problematic URLs are NOT in sitemap
    expect(content).not.toContain('https://opticasuarezjaen.es/$');
    expect(content).not.toContain('https://opticasuarezjaen.es/ver-bien-sin-necesidad-de-gafas-ni-lentillas');
  });

  test('problematic URLs should return 404', async ({ page }) => {
    // Test the $ route returns 404
    const response1 = await page.goto('/$', { waitUntil: 'networkidle' });
    expect(response1?.status()).toBe(404);

    // Test the problematic route returns 404
    const response2 = await page.goto('/ver-bien-sin-necesidad-de-gafas-ni-lentillas', { waitUntil: 'networkidle' });
    expect(response2?.status()).toBe(404);
  });

  test('legitimate URLs should work correctly', async ({ page }) => {
    // Test home page
    const response1 = await page.goto('/', { waitUntil: 'networkidle' });
    expect(response1?.status()).toBe(200);

    // Test a legitimate page
    const response2 = await page.goto('/quienes-somos', { waitUntil: 'networkidle' });
    expect(response2?.status()).toBe(200);
  });
});