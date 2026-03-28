import { expect, test } from "@playwright/test";

test.describe("<Suite Name>", () => {
  // TC-<PREFIX>-01
  test("<descriptive test name matching the test case>", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Use semantic selectors: getByRole, getByText, getByLabel
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TC-<PREFIX>-02
  test("<another test>", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Use locator chaining for specificity
    await expect(
      page.locator("nav").getByRole("link", { name: "Contacto", exact: true })
    ).toBeVisible();
  });
});

/*
GUIDELINES:
- One spec file per test case file: test-cases/navigation.md → tests/navigation.spec.ts
- Each test() must have a comment with its TC-ID (e.g. // TC-NAV-01)
- Selector priority: getByRole > getByText > getByLabel > locator("css")
- Always call page.waitForLoadState("networkidle") after navigation (content from Sanity CMS)
- Use exact: true when a selector matches multiple elements
- Test SSR with page.goto(), test CSR by clicking in-page links
- Assert meaningful content (text, headings), not just DOM existence
- No hardcoded CMS strings — test structural elements instead
- No shared state between tests — each test is independent
- No non-null assertions (!) — use optional chaining (?.) or type guards
*/
