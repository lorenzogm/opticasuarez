import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.describe("<Journey Name>", () => {
  // TC-<PREFIX>-01 — Entry point: SSR load
  test("<journey entry point>", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Verify entry point rendered
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-<PREFIX>-02 — Step: CSR navigation to next page
  test("<navigate to destination via click>", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Click a link to navigate (CSR)
    await page.locator("nav").getByRole("link", { name: "Blog" }).click();
    await page.waitForLoadState("networkidle");

    // Verify destination rendered with content
    await expect(page).toHaveURL(/blog/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

/*
GUIDELINES — Journey-Based Tests:
- Import { test, expect } from "./fixtures" — NEVER from "@playwright/test"
  The fixture auto-detects JS errors; any pageerror fails the test automatically.
- One spec file per journey: test-cases/site-navigation.md → tests/site-navigation.spec.ts
- Each test() must have a comment with its TC-ID (e.g. // TC-SNAV-01)
- Journey prefixes: LAND, SNAV, SERV, BLOG, ERR, SEO, APPT, ABOUT
- Tests follow user flows: entry point (page.goto) → CSR navigation (clicks) → assertions
- page.goto() is only for the entry point; all subsequent navigation uses clicks
- After every navigation, assert: URL changed + H1/content visible
  (The fixture handles JS error detection automatically)
- Selector priority: getByRole > getByText > getByLabel > locator("css")
- Always call page.waitForLoadState("networkidle") after navigation
- Assert meaningful content (text, headings), not just DOM existence
- No hardcoded CMS strings — test structural elements instead
- Each test is independent — no shared state between tests
*/
