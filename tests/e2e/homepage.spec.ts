import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load the homepage content JSON
const homepageContent = JSON.parse(
  readFileSync(join(process.cwd(), 'app/content/homepage.json'), 'utf8')
);

test.describe('Homepage Content Verification', () => {
  test('should display correct hero section content', async ({ page }) => {
    await page.goto('/');

    // Verify page loads correctly
    await expect(page).toHaveTitle(/Óptica Suárez/);

    // Check hero section content using JSON data - hero uses paragraph tags, not headings
    await expect(page.getByText(homepageContent.hero.title)).toBeVisible();
    await expect(page.getByText(homepageContent.hero.subtitle)).toBeVisible();
    await expect(page.getByText(homepageContent.hero.description)).toBeVisible();
  });

  test('should display correct video about section content', async ({ page }) => {
    await page.goto('/');

    // Check video about section content - This section has the h1
    await expect(page.locator('h1')).toContainText(homepageContent.videoAbout.title);
    await expect(page.getByText(homepageContent.videoAbout.description)).toBeVisible();
  });

  test('should display correct services grid content', async ({ page }) => {
    await page.goto('/');

    // Verify services grid items are displayed with correct content
    // Use more specific selectors to avoid conflicts with content in other sections
    // Target the services grid section specifically by its structure
    for (const service of homepageContent.servicesGrid.items) {
      // Look for the service title within an h3 element inside an article
      await expect(page.locator('article h3').filter({ hasText: service.title })).toBeVisible();
      // Look for the service description within the same article structure
      await expect(page.locator('article').filter({ hasText: service.title }).locator('p').filter({ hasText: service.description })).toBeVisible();
    }
  });

  test('should display correct social media information', async ({ page }) => {
    await page.goto('/');

    // Check social media content - be more specific to avoid multiple matches
    await expect(page.getByText(homepageContent.socialMedia.instagram.title)).toBeVisible();
    await expect(page.getByText(homepageContent.socialMedia.facebook.title)).toBeVisible();
    
    // Check for Instagram section with handle
    const socialMediaSection = page.locator('section').filter({ hasText: 'Estamos en Instagram' });
    await expect(socialMediaSection).toBeVisible();
    
    // Check for Facebook section
    const facebookSection = page.locator('section').filter({ hasText: 'Estamos en Facebook' });
    await expect(facebookSection).toBeVisible();
  });

  test('should display specialists section content', async ({ page }) => {
    await page.goto('/');

    // Check specialists section
    await expect(page.getByText(homepageContent.specialists.title)).toBeVisible();
    await expect(page.getByText(homepageContent.specialists.subtitle)).toBeVisible();
    await expect(page.getByText(homepageContent.specialists.description)).toBeVisible();
  });

  test('should display locations information', async ({ page }) => {
    await page.goto('/');

    // Check locations content
    await expect(page.getByText(homepageContent.locations.title)).toBeVisible();
    
    // Check for location addresses which are more likely to be displayed
    for (const location of homepageContent.locations.locations) {
      await expect(page.getByText(location.address)).toBeVisible();
      // Check for phone numbers with multiple possible formats
      const phoneElement = page.getByText(location.phone).or(
        page.getByText(location.phone.replace(/-/g, ''))
      ).or(
        page.getByText(location.phone.replace(/-/g, ' '))
      );
      await expect(phoneElement).toBeVisible();
    }
  });

  test('should display navigation elements', async ({ page }) => {
    await page.goto('/');

    // Check that navigation is present and functional
    await expect(page.locator('nav')).toBeVisible();
    
    // Verify main navigation links exist (but don't click them)
    await expect(page.locator('nav').getByRole('link', { name: 'Inicio' })).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: 'Quienes Somos' })).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: 'Servicios' })).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: 'Contacto' })).toBeVisible();
  });

  test('should display main content structure', async ({ page }) => {
    await page.goto('/');

    // Check that main page structure elements are present
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    // Note: footer might not exist in this layout, so let's check if it exists
    const footer = page.locator('footer');
    const footerCount = await footer.count();
    if (footerCount > 0) {
      await expect(footer).toBeVisible();
    }
  });

  test('should display WhatsApp booking functionality', async ({ page }) => {
    await page.goto('/');

    // Check for WhatsApp links using content from JSON
    const bookAppointmentSection = homepageContent.bookAppointment;
    await expect(page.getByText(bookAppointmentSection.title)).toBeVisible();
    await expect(page.getByText(bookAppointmentSection.description)).toBeVisible();
    
    // Verify WhatsApp links exist (but don't click them)
    await expect(page.locator('a[href*="whatsapp.com"]').first()).toBeVisible();
  });

  test('should display news section', async ({ page }) => {
    await page.goto('/');

    // Check news section if it exists
    if (homepageContent.news) {
      await expect(page.getByText(homepageContent.news.title)).toBeVisible();
      await expect(page.getByText(homepageContent.news.buttonText)).toBeVisible();
    }
  });
});