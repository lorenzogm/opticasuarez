import { test as base, expect } from "@playwright/test";

/**
 * Shared Playwright fixture that auto-attaches a `pageerror` listener.
 * Any uncaught JS error in ANY test = automatic test failure.
 *
 * Usage: import { test } from "./fixtures" and { expect } from "@playwright/test"
 */
export const test = base.extend<{ jsErrors: string[] }>({
  jsErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await use(errors);
      expect(errors, "Uncaught JavaScript errors detected during test").toEqual(
        []
      );
    },
    { auto: true },
  ],
});
