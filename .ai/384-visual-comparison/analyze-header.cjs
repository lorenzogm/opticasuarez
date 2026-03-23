"use strict";
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const DEV = "https://opticasuarez-web-dev.vercel.app";
const PROD = "https://opticasuarezjaen.es";
const outputDir = path.join(__dirname, "header-analysis");

async function analyzeHeader(browser, label, baseUrl) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await ctx.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 30_000 });
  await page.waitForTimeout(2000);

  // Screenshot just the top 120px (header area)
  await page.screenshot({
    path: path.join(outputDir, `${label}-header.png`),
    clip: { x: 0, y: 0, width: 1440, height: 120 },
  });

  // Get header/nav HTML structure
  const headerInfo = await page.evaluate(() => {
    const header = document.querySelector("header");
    const nav = document.querySelector("nav");
    const headerHtml = header
      ? header.outerHTML.substring(0, 500)
      : "NO <header> FOUND";
    const navHtml = nav ? nav.outerHTML.substring(0, 500) : "NO <nav> FOUND";
    const headerRect = header ? header.getBoundingClientRect() : null;
    const navRect = nav ? nav.getBoundingClientRect() : null;
    const links = Array.from(document.querySelectorAll("nav a, header a")).map(
      (a) => ({
        text: a.textContent?.trim(),
        href: a.href,
      })
    );
    return { headerHtml, navHtml, headerRect, navRect, links };
  });

  await ctx.close();
  return headerInfo;
}

async function analyzeHomepageSections(browser, label, baseUrl) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await ctx.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 30_000 });
  await page.waitForTimeout(3000);

  // Capture individual section screenshots (first 900px chunks)
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const chunks = [
    { name: "hero", y: 0, h: 900 },
    { name: "services", y: 900, h: 900 },
    { name: "about", y: 1800, h: 600 },
    { name: "instagram", y: 2400, h: 400 },
    { name: "specialists", y: 2800, h: 400 },
    { name: "news", y: 3200, h: 300 },
    { name: "locations", y: 3500, h: 1600 },
    { name: "cta", y: 5100, h: 400 },
  ];

  for (const chunk of chunks) {
    if (chunk.y + chunk.h > pageHeight) continue;
    try {
      await page.screenshot({
        path: path.join(outputDir, `${label}-homepage-${chunk.name}.png`),
        clip: { x: 0, y: chunk.y, width: 1440, height: chunk.h },
      });
    } catch {
      /* section might not exist */
    }
  }

  await ctx.close();
  return pageHeight;
}

async function run() {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch();

  console.log("🔍 Analyzing headers...\n");

  const devHeader = await analyzeHeader(browser, "dev", DEV);
  const prodHeader = await analyzeHeader(browser, "prod", PROD);

  let report = "# Header & Homepage Deep Analysis\n\n";

  report += "## Header Comparison\n\n";
  report += "### DEV Header\n";
  report += `- Header rect: ${devHeader.headerRect ? `${devHeader.headerRect.width}×${devHeader.headerRect.height}px at (${devHeader.headerRect.x},${devHeader.headerRect.y})` : "NOT FOUND"}\n`;
  report += `- Nav rect: ${devHeader.navRect ? `${devHeader.navRect.width}×${devHeader.navRect.height}px at (${devHeader.navRect.x},${devHeader.navRect.y})` : "NOT FOUND"}\n`;
  report += `- Navigation links: ${devHeader.links.length}\n`;
  for (const link of devHeader.links) {
    report += `  - "${link.text}" → ${link.href}\n`;
  }
  report += `- HTML: \`${devHeader.headerHtml.substring(0, 200)}\`\n\n`;

  report += "### PROD Header\n";
  report += `- Header rect: ${prodHeader.headerRect ? `${prodHeader.headerRect.width}×${prodHeader.headerRect.height}px at (${prodHeader.headerRect.x},${prodHeader.headerRect.y})` : "NOT FOUND"}\n`;
  report += `- Nav rect: ${prodHeader.navRect ? `${prodHeader.navRect.width}×${prodHeader.navRect.height}px at (${prodHeader.navRect.x},${prodHeader.navRect.y})` : "NOT FOUND"}\n`;
  report += `- Navigation links: ${prodHeader.links.length}\n`;
  for (const link of prodHeader.links) {
    report += `  - "${link.text}" → ${link.href}\n`;
  }
  report += `- HTML: \`${prodHeader.headerHtml.substring(0, 200)}\`\n\n`;

  console.log("📸 Capturing homepage sections...\n");
  const devHeight = await analyzeHomepageSections(browser, "dev", DEV);
  const prodHeight = await analyzeHomepageSections(browser, "prod", PROD);

  report += "## Homepage Page Height\n\n";
  report += `- DEV: ${devHeight}px\n`;
  report += `- PROD: ${prodHeight}px\n`;
  report += `- Difference: ${devHeight - prodHeight}px\n\n`;

  await browser.close();

  fs.writeFileSync(path.join(__dirname, "header-analysis-report.md"), report);
  console.log("📊 Report saved to header-analysis-report.md");
}

run().catch(console.error);
