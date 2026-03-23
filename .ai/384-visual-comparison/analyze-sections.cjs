"use strict";
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const DEV = "https://opticasuarez-web-dev.vercel.app";
const PROD = "https://opticasuarezjaen.es";
const outputDir = path.join(__dirname, "section-analysis");

async function analyzePage(browser, label, baseUrl, pageInfo) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await ctx.newPage();
  const url = `${baseUrl}${pageInfo.path}`;

  await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
  await page.waitForTimeout(2000);

  const sections = await page.evaluate(() => {
    const results = [];
    // Get all top-level sections/divs in main or body
    const candidates = document.querySelectorAll(
      "section, main > div, header, footer, nav"
    );
    let idx = 0;
    for (const el of candidates) {
      const rect = el.getBoundingClientRect();
      if (rect.height < 10) continue;
      const tag = el.tagName.toLowerCase();
      const classes = el.className
        ? el.className.toString().substring(0, 80)
        : "";
      const id = el.id || "";
      const text = el.textContent?.substring(0, 60)?.trim() || "";
      results.push({
        idx: idx++,
        tag,
        id,
        classes,
        text,
        top: rect.top + window.scrollY,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
    return results;
  });

  const sectionData = [];
  for (const sec of sections) {
    const filename = `${label}-${pageInfo.slug}-section-${sec.idx}.png`;
    try {
      await page.screenshot({
        path: path.join(outputDir, filename),
        clip: { x: sec.left, y: sec.top, width: sec.width, height: sec.height },
      });
      sectionData.push({ ...sec, screenshot: filename });
    } catch {
      sectionData.push({ ...sec, screenshot: null });
    }
  }

  await ctx.close();
  return sectionData;
}

async function run() {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch();

  // Focus on pages with differences
  const pagesToAnalyze = [
    { slug: "homepage", path: "/" },
    { slug: "contacto", path: "/contacto" },
    { slug: "ortoqueratologia", path: "/ortoqueratologia" },
    { slug: "vision-deportiva", path: "/vision-deportiva" },
    { slug: "planveo", path: "/planveo" },
  ];

  let report = "# Section-by-Section Analysis\n\n";

  for (const pg of pagesToAnalyze) {
    console.log(`\n📄 Analyzing: ${pg.slug}`);

    const devSections = await analyzePage(browser, "dev", DEV, pg);
    const prodSections = await analyzePage(browser, "prod", PROD, pg);

    report += `## ${pg.slug}\n\n`;
    report += `DEV sections: ${devSections.length} | PROD sections: ${prodSections.length}\n\n`;

    if (devSections.length !== prodSections.length) {
      report += `⚠️ **Section count mismatch!** DEV has ${devSections.length}, PROD has ${prodSections.length}\n\n`;
    }

    report += "### DEV sections\n\n";
    report += "| # | Tag | ID | Height | Text Preview |\n";
    report += "|---|-----|-----|--------|---------------|\n";
    for (const s of devSections) {
      report += `| ${s.idx} | ${s.tag} | ${s.id || "-"} | ${Math.round(s.height)}px | ${s.text.substring(0, 40)} |\n`;
    }

    report += "\n### PROD sections\n\n";
    report += "| # | Tag | ID | Height | Text Preview |\n";
    report += "|---|-----|-----|--------|---------------|\n";
    for (const s of prodSections) {
      report += `| ${s.idx} | ${s.tag} | ${s.id || "-"} | ${Math.round(s.height)}px | ${s.text.substring(0, 40)} |\n`;
    }

    // Compare matching sections by height difference
    const maxLen = Math.max(devSections.length, prodSections.length);
    report += "\n### Height Comparison\n\n";
    report += "| # | DEV Height | PROD Height | Diff |\n";
    report += "|---|-----------|-------------|------|\n";
    for (let i = 0; i < maxLen; i++) {
      const dh = devSections[i]?.height || 0;
      const ph = prodSections[i]?.height || 0;
      const diff = Math.round(dh - ph);
      const flag = Math.abs(diff) > 20 ? " ⚠️" : "";
      report += `| ${i} | ${Math.round(dh)}px | ${Math.round(ph)}px | ${diff > 0 ? "+" : ""}${diff}px${flag} |\n`;
    }
    report += "\n---\n\n";
  }

  await browser.close();
  fs.writeFileSync(path.join(__dirname, "section-analysis-report.md"), report);
  console.log("\n📊 Section analysis written to section-analysis-report.md");
}

run().catch(console.error);
