"use strict";
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const DEV = "https://opticasuarez-web-dev.vercel.app";
const PROD = "https://opticasuarezjaen.es";

const screenshotDir = path.join(__dirname, "screenshots");

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

async function captureScreenshots() {
  fs.mkdirSync(screenshotDir, { recursive: true });

  const browser = await chromium.launch();

  for (const page of pages) {
    console.log(`\n📸 Capturing: ${page.name}`);

    for (const viewport of [
      { name: "desktop", width: 1440, height: 900 },
      { name: "mobile", width: 375, height: 667 },
    ]) {
      for (const [label, baseUrl] of [
        ["dev", DEV],
        ["prod", PROD],
      ]) {
        const ctx = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
        });
        const tab = await ctx.newPage();
        const url = `${baseUrl}${page.path}`;
        const filename = `${label}-${page.name}-${viewport.name}.png`;

        try {
          await tab.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
          await tab.waitForTimeout(2000);
          await tab.screenshot({
            path: path.join(screenshotDir, filename),
            fullPage: true,
          });
          console.log(`  ✅ ${filename}`);
        } catch (err) {
          console.log(`  ❌ ${filename}: ${err.message}`);
        }

        await ctx.close();
      }
    }
  }

  await browser.close();
  console.log("\n✅ All screenshots saved to:", screenshotDir);
}

captureScreenshots().catch(console.error);
