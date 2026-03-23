import { test } from "@playwright/test";

const DEV = "https://opticasuarez-web-dev.vercel.app";
const PROD = "https://opticasuarezjaen.es";

const pages = [
  { name: "homepage", path: "/" },
  { name: "quienes-somos", path: "/quienes-somos" },
  { name: "servicios", path: "/servicios" },
  { name: "examen-visual", path: "/examen-visual" },
  { name: "contactologia", path: "/contactologia" },
  { name: "control-de-miopia", path: "/control-de-miopia" },
  { name: "terapia-visual", path: "/terapia-visual" },
  { name: "vision-pediatrica", path: "/vision-pediatrica" },
  { name: "vision-deportiva", path: "/vision-deportiva" },
  { name: "ortoqueratologia", path: "/ortoqueratologia" },
  { name: "planveo", path: "/planveo" },
  { name: "contacto", path: "/contacto" },
  { name: "blog", path: "/blog" },
  { name: "blog-post", path: "/blog/ojo-vago" },
  { name: "cita", path: "/cita" },
];

for (const page of pages) {
  test.describe(`Visual comparison: ${page.name}`, () => {
    test(`DEV screenshot - ${page.name} (desktop)`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
      });
      const tab = await context.newPage();
      await tab.goto(`${DEV}${page.path}`, { waitUntil: "networkidle" });
      await tab.waitForTimeout(1000);
      await tab.screenshot({
        path: `screenshots/dev-${page.name}-desktop.png`,
        fullPage: true,
      });
      await context.close();
    });

    test(`PROD screenshot - ${page.name} (desktop)`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
      });
      const tab = await context.newPage();
      await tab.goto(`${PROD}${page.path}`, { waitUntil: "networkidle" });
      await tab.waitForTimeout(1000);
      await tab.screenshot({
        path: `screenshots/prod-${page.name}-desktop.png`,
        fullPage: true,
      });
      await context.close();
    });

    test(`DEV screenshot - ${page.name} (mobile)`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 375, height: 667 },
      });
      const tab = await context.newPage();
      await tab.goto(`${DEV}${page.path}`, { waitUntil: "networkidle" });
      await tab.waitForTimeout(1000);
      await tab.screenshot({
        path: `screenshots/dev-${page.name}-mobile.png`,
        fullPage: true,
      });
      await context.close();
    });

    test(`PROD screenshot - ${page.name} (mobile)`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 375, height: 667 },
      });
      const tab = await context.newPage();
      await tab.goto(`${PROD}${page.path}`, { waitUntil: "networkidle" });
      await tab.waitForTimeout(1000);
      await tab.screenshot({
        path: `screenshots/prod-${page.name}-mobile.png`,
        fullPage: true,
      });
      await context.close();
    });
  });
}
