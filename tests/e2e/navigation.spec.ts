import { test, expect } from '@playwright/test';

test.describe('Navigation Links', () => {
  test('should navigate to home page (Inicio)', async ({ page }) => {
    await page.goto('/');
    
    // Check that we're on the home page
    await expect(page).toHaveTitle(/Óptica Suárez/);
    
    // Check for presence of navigation
    await expect(page.locator('nav')).toBeVisible();
    
    // Check for main content
    await expect(page.locator('main')).toBeVisible();
  });

  test('should navigate to Quienes Somos page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Quienes Somos link using more specific selector
    await page.locator('nav').getByRole('link', { name: 'Quienes Somos' }).click();
    
    // Check that we're on the correct page
    await expect(page).toHaveURL('/quienes-somos');
    await expect(page).toHaveTitle(/Quiénes somos/);
    
    // Check for main content
    await expect(page.locator('main')).toBeVisible();
  });

  test('should navigate to Servicios page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Servicios link using more specific selector (navigation only)
    await page.locator('nav').getByRole('link', { name: 'Servicios' }).click();
    
    // Check that we're on the correct page
    await expect(page).toHaveURL('/servicios');
    await expect(page).toHaveTitle(/Servicios/);
    
    // Check for main content
    await expect(page.locator('main')).toBeVisible();
  });

  test('should navigate to Blog page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Blog link
    await page.locator('nav').getByRole('link', { name: 'Blog' }).click();
    
    // Check that we're on the correct page
    await expect(page).toHaveURL('/blog');
    await expect(page).toHaveTitle(/Blog/);
    
    // Check for main content
    await expect(page.locator('main')).toBeVisible();
  });

  test('should navigate to Contacto page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Contacto link using more specific selector
    await page.locator('nav').getByRole('link', { name: 'Contacto' }).click();
    
    // Check that we're on the correct page
    await expect(page).toHaveURL('/contacto');
    await expect(page).toHaveTitle(/Contacto/);
    
    // Check for main content
    await expect(page.locator('main')).toBeVisible();
  });

  test('should navigate using mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Click on mobile menu button
    await page.getByRole('button', { name: /Abrir menú principal/i }).click();
    
    // Check that mobile menu is visible
    await expect(page.locator('.md\\:hidden .space-y-1')).toBeVisible();
    
    // Click on Quienes Somos in mobile menu (use a more specific selector)
    await page.locator('.md\\:hidden').getByRole('link', { name: 'Quienes Somos' }).click();
    
    // Check that we're on the correct page
    await expect(page).toHaveURL('/quienes-somos');
  });
});