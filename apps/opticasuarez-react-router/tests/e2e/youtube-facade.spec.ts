import { test, expect } from '@playwright/test';

test.describe('YouTube Facade Performance', () => {
  test('should display YouTube thumbnail initially without loading iframe', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the video section to be visible
    await expect(page.getByText('Tu óptica de confianza en Jaén')).toBeVisible();
    
    // Check that YouTube thumbnail image is displayed
    const thumbnail = page.locator('img[src*="img.youtube.com"]');
    await expect(thumbnail).toBeVisible();
    
    // Verify that no YouTube iframe is present initially
    const iframe = page.locator('iframe[src*="youtube.com"]');
    await expect(iframe).toHaveCount(0);
    
    // Check that the play button overlay container is present
    const playButtonContainer = page.locator('[role="button"][aria-label*="Play video"]');
    await expect(playButtonContainer).toBeVisible();
  });

  test('should load YouTube iframe when clicked', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the video section to be visible
    await expect(page.getByText('Tu óptica de confianza en Jaén')).toBeVisible();
    
    // Click on the video thumbnail
    const videoContainer = page.locator('[role="button"][aria-label*="Play video"]');
    await videoContainer.click();
    
    // Wait for iframe to load
    await page.waitForSelector('iframe[src*="youtube.com"]');
    
    // Verify that YouTube iframe is now present with autoplay
    const iframe = page.locator('iframe[src*="youtube.com"]');
    await expect(iframe).toBeVisible();
    await expect(iframe).toHaveAttribute('src', /autoplay=1/);
    
    // Verify thumbnail image is replaced
    const thumbnail = page.locator('img[src*="img.youtube.com"]');
    await expect(thumbnail).toHaveCount(0);
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the video section to be visible
    await expect(page.getByText('Tu óptica de confianza en Jaén')).toBeVisible();
    
    // Tab to the video container
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // May need several tabs to reach video
    
    // Find the video container and focus it
    const videoContainer = page.locator('[role="button"][aria-label*="Play video"]');
    await videoContainer.focus();
    
    // Press Enter to activate
    await videoContainer.press('Enter');
    
    // Wait for iframe to load
    await page.waitForSelector('iframe[src*="youtube.com"]', { timeout: 5000 });
    
    // Verify that YouTube iframe is now present
    const iframe = page.locator('iframe[src*="youtube.com"]');
    await expect(iframe).toBeVisible();
  });
});