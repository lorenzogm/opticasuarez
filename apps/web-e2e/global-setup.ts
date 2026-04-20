import type { FullConfig } from "@playwright/test";

/**
 * Warms up the Vercel preview deployment before running E2E tests.
 * Cold serverless functions can take 10-30s on first request, causing
 * test timeouts when tests go directly to SSR-rendered pages.
 */
async function globalSetup(config: FullConfig) {
  const baseURL =
    config.projects[0]?.use?.baseURL ||
    process.env.PLAYWRIGHT_BASE_URL ||
    "http://localhost:3000";

  const headers: Record<string, string> = {};
  if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
    headers["x-vercel-protection-bypass"] =
      process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  }

  const warmupUrls = ["/", "/blog"];

  for (const url of warmupUrls) {
    try {
      const response = await fetch(`${baseURL}${url}`, { headers });
      console.log(`[warmup] ${url} → ${response.status}`);
    } catch (error) {
      console.warn(`[warmup] ${url} failed:`, error);
    }
  }
}

export default globalSetup;
