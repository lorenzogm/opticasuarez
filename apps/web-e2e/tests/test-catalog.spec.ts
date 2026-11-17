import { expect } from "@playwright/test";
import { test } from "./fixtures";

test("test catalog lists each visual test and has SEO metadata", async ({
  page,
}) => {
  await page.goto("/tests");

  await expect(page).toHaveTitle("Tests visuales online | Óptica Suárez Jaén");
  await expect(
    page.getByRole("heading", { level: 1, name: "Tests visuales online" })
  ).toBeVisible();

  const tests = [
    { title: "Test de lectura", href: "/test-lectura" },
    { title: "Test de forias", href: "/test-forias" },
    { title: "Test de visión de cerca", href: "/test-vision-cerca" },
  ];

  for (const { title, href } of tests) {
    await expect(
      page.getByRole("heading", { level: 2, name: title })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: `Hacer ${title.toLowerCase()}` })
    ).toHaveAttribute("href", href);
  }

  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /tests visuales online/i
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/tests$/
  );

  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const sitemapXml = await sitemap.text();
  for (const { href } of tests) {
    expect(sitemapXml).toContain(`${href}</loc>`);
  }
  expect(sitemapXml).toContain("/tests</loc>");
});
