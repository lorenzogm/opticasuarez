import type { FullConfig } from "@playwright/test";

/**
 * Warms up the Vercel preview deployment before running E2E tests.
 * Cold serverless functions can take 10-30s on first request, causing
 * test timeouts when tests go directly to SSR-rendered pages.
 *
 * Retries each URL up to 3 times to ensure the serverless function is
 * fully warmed and returns real content (not a 0-byte cached page).
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
  const maxRetries = 3;
  const retryDelay = 5000;

  for (const url of warmupUrls) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(`${baseURL}${url}`, {
          headers,
          signal: AbortSignal.timeout(30_000),
        });
        const body = await response.text();
        console.log(
          `[warmup] ${url} → ${response.status} (${body.length} bytes, attempt ${attempt})`
        );
        if (response.ok && body.length > 100) break;
        console.warn(
          `[warmup] ${url} returned insufficient content, retrying...`
        );
      } catch (error) {
        console.warn(`[warmup] ${url} attempt ${attempt} failed:`, error);
      }
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, retryDelay));
      }
    }
  }
}

export default globalSetup;
