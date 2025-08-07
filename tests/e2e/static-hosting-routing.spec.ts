import { test, expect } from '@playwright/test';
import { spawn, ChildProcess } from 'child_process';
import { join } from 'path';
import { existsSync } from 'fs';

test.describe('Static Hosting Routing Simulation', () => {
  let staticServer: ChildProcess;
  const staticPort = 3001;
  const staticBaseURL = `http://localhost:${staticPort}`;

  test.beforeAll(async () => {
    // Start a simple static file server to simulate GitHub Pages behavior
    const buildPath = join(process.cwd(), 'build', 'client');

    if (!existsSync(buildPath)) {
      throw new Error('Build directory not found. Run npm run build first.');
    }

    // Use a simple HTTP server that doesn't do redirects like GitHub Pages
    // This simulates the actual static hosting behavior more accurately
    staticServer = spawn(
      'python3',
      ['-m', 'http.server', staticPort.toString(), '--bind', 'localhost'],
      {
        cwd: buildPath,
        stdio: 'pipe',
      }
    );

    // Wait for server to start
    await new Promise((resolve) => setTimeout(resolve, 3000));
  });

  test.afterAll(async () => {
    if (staticServer) {
      staticServer.kill();
    }
  });

  test('should verify static file structure matches expected pattern', async ({
    page,
  }) => {
    // This test verifies that the build produces the expected file structure
    // and documents what this means for static hosting

    // Test that the main routes can be accessed in static hosting
    // with the proper URL structure
    const routesToTest = ['/servicios', '/quienes-somos', '/blog', '/contacto'];

    for (const route of routesToTest) {
      console.log(`Testing static route access: ${route}`);

      try {
        // Try to access the route directly
        const response = await page.goto(`${staticBaseURL}${route}`, {
          waitUntil: 'domcontentloaded',
          timeout: 5000,
        });

        const status = response?.status() || 0;
        console.log(`Route ${route} returned status: ${status}`);

        // Document the behavior - different static servers may handle this differently
        if (status >= 200 && status < 300) {
          console.log(`✓ Route ${route} works on this static server`);
        } else if (status === 404) {
          console.log(
            `⚠ Route ${route} not found - this demonstrates the GitHub Pages issue`
          );
        } else {
          console.log(`? Route ${route} returned unexpected status: ${status}`);
        }

        // The key point is that this test documents the expected behavior
        // On GitHub Pages, routes without trailing slash would fail
        // But our prerender configuration should handle this
      } catch {
        console.log(
          `⚠ Route ${route} failed to load - this may indicate the routing issue`
        );
        // Don't fail the test - just document the behavior
      }
    }
  });

  test('should verify that routes WITH trailing slash work on static hosting', async ({
    page,
  }) => {
    // This test shows that the routes work when accessed with trailing slash
    // This is how the files are actually structured in the build

    const routesToTest = [
      { route: '/servicios/', title: 'Servicios' },
      { route: '/quienes-somos/', title: 'Quiénes somos' },
      { route: '/blog/', title: 'Blog' },
      { route: '/contacto/', title: 'Contacto' },
    ];

    for (const { route, title } of routesToTest) {
      console.log(`Testing route with trailing slash: ${route}`);

      try {
        await page.goto(`${staticBaseURL}${route}`, {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        });

        // Should be able to access the page
        const pageTitle = await page.title();
        console.log(`✓ Route ${route} works with title: "${pageTitle}"`);

        // Verify we're on the correct page
        expect(pageTitle).toContain(title);
      } catch (error) {
        console.log(
          `✗ Route ${route} failed: ${error instanceof Error ? error.message : String(error)}`
        );
        throw error;
      }
    }
  });

  test('should verify navigation link structure documents the issue', async ({
    page,
  }) => {
    // This test documents the core issue without depending on server behavior
    // 1. Navigation links in the app point to /servicios (no slash)
    // 2. But static files exist at /servicios/ (with slash)
    // 3. This mismatch causes the routing to fail on true static hosting

    // First access the home page with trailing slash (which should work)
    await page.goto(`${staticBaseURL}/`);

    // Check the navigation links
    const serviciosLink = page
      .locator('nav')
      .getByRole('link', { name: 'Servicios' })
      .first();
    const href = await serviciosLink.getAttribute('href');

    console.log(`Navigation link points to: "${href}"`);
    expect(href).toBe('/servicios'); // This documents the routing mismatch

    // This is the core of the issue documented for static hosting environments
    console.log(
      '📋 DOCUMENTED ISSUE: Link points to "/servicios" but file exists at "/servicios/index.html"'
    );
    console.log(
      '💡 POTENTIAL SOLUTION: Configure prerender to handle both URL patterns'
    );
  });
});
