import { test, expect } from '@playwright/test';

test.describe('Redirect Configuration Verification', () => {
  test('vercel.json should have proper redirect configuration', async () => {
    // Read the vercel.json file to verify the redirect configuration
    const fs = await import('fs');
    const path = await import('path');
    
    const vercelJsonPath = path.join(process.cwd(), 'vercel.json');
    const vercelJsonContent = fs.readFileSync(vercelJsonPath, 'utf-8');
    const vercelConfig = JSON.parse(vercelJsonContent);
    
    // Verify that redirects are configured
    expect(vercelConfig.redirects).toBeDefined();
    expect(vercelConfig.redirects).toHaveLength(1);
    
    const redirect = vercelConfig.redirects[0];
    
    // Verify the redirect configuration for www to non-www
    expect(redirect.source).toBe('/(.*)');;
    expect(redirect.destination).toBe('https://opticasuarezjaen.es/$1');
    expect(redirect.permanent).toBe(true);
    expect(redirect.has).toBeDefined();
    expect(redirect.has[0].type).toBe('host');
    expect(redirect.has[0].value).toBe('www.opticasuarezjaen.es');
  });

  test('canonical URLs should be consistent across pages', async ({ page }) => {
    // Test key pages mentioned in the issue
    // Note: Blog post dynamic routes don't have canonical tags due to React Router v7 limitations
    const pagesToTest = [
      { url: '/', expectedCanonical: 'https://opticasuarezjaen.es/' },
      { url: '/quienes-somos', expectedCanonical: 'https://opticasuarezjaen.es/quienes-somos' },
    ];

    for (const { url, expectedCanonical } of pagesToTest) {
      await page.goto(url);
      
      // Check that the page loads successfully
      expect(await page.locator('html').count()).toBeGreaterThan(0);
      
      // Check for canonical tag - using proper <link rel="canonical"> element per Google's specification
      const canonicalTag = page.locator('link[rel="canonical"]');
      await expect(canonicalTag).toHaveAttribute('href', expectedCanonical);
      
      // Verify Open Graph URL matches canonical
      const ogUrlTag = page.locator('meta[property="og:url"]');
      await expect(ogUrlTag).toHaveAttribute('content', expectedCanonical);
    }
  });

  test('sitemap should use canonical domain', async ({ page }) => {
    await page.goto('/sitemap.xml');
    
    // Get the sitemap content
    const content = await page.locator('body').textContent();
    
    // Verify that all URLs in the sitemap use the canonical domain (non-www)
    expect(content).toContain('https://opticasuarezjaen.es/');
    expect(content).toContain('https://opticasuarezjaen.es/quienes-somos');
    expect(content).toContain('https://opticasuarezjaen.es/blog/terapia-visual-rehabilitacion-funcion-visual');
    
    // Ensure no www URLs are present in the sitemap
    expect(content).not.toContain('https://www.opticasuarezjaen.es');
    // Ensure no HTTP URLs are used for site pages (excluding XML namespace)
    expect(content).not.toContain('http://opticasuarezjaen.es');
    expect(content).not.toContain('http://www.opticasuarezjaen.es');
  });
});