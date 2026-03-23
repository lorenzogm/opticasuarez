"use strict";
const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

let pixelmatch;
async function init() {
  const mod = await import("pixelmatch");
  pixelmatch = mod.default;
}

const screenshotDir = path.join(__dirname, "screenshots");
const diffDir = path.join(__dirname, "diffs");
const reportPath = path.join(__dirname, "visual-comparison-report.md");

const pages = [
  "homepage",
  "quienes-somos",
  "servicios",
  "examen-visual",
  "contactologia",
  "control-de-miopia",
  "terapia-visual",
  "vision-pediatrica",
  "vision-deportiva",
  "ortoqueratologia",
  "planveo",
  "contacto",
  "blog",
  "blog-post",
  "cita",
];
const viewports = ["desktop", "mobile"];

function loadPng(filePath) {
  return PNG.sync.read(fs.readFileSync(filePath));
}

function comparePair(devPath, prodPath, diffPath) {
  const dev = loadPng(devPath);
  const prod = loadPng(prodPath);

  const width = Math.max(dev.width, prod.width);
  const height = Math.max(dev.height, prod.height);

  const devResized = new PNG({ width, height });
  const prodResized = new PNG({ width, height });

  PNG.bitblt(dev, devResized, 0, 0, dev.width, dev.height, 0, 0);
  PNG.bitblt(prod, prodResized, 0, 0, prod.width, prod.height, 0, 0);

  const diff = new PNG({ width, height });
  const numDiffPixels = pixelmatch(
    devResized.data,
    prodResized.data,
    diff.data,
    width,
    height,
    { threshold: 0.3 }
  );

  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const totalPixels = width * height;
  const pctDiff = ((numDiffPixels / totalPixels) * 100).toFixed(2);

  return {
    diffPixels: numDiffPixels,
    totalPixels,
    pctDiff: Number.parseFloat(pctDiff),
    devSize: { w: dev.width, h: dev.height },
    prodSize: { w: prod.width, h: prod.height },
    sizeMismatch: dev.width !== prod.width || dev.height !== prod.height,
  };
}

function run() {
  fs.mkdirSync(diffDir, { recursive: true });

  const results = [];
  for (const page of pages) {
    for (const vp of viewports) {
      const devFile = path.join(screenshotDir, `dev-${page}-${vp}.png`);
      const prodFile = path.join(screenshotDir, `prod-${page}-${vp}.png`);
      const diffFile = path.join(diffDir, `diff-${page}-${vp}.png`);

      if (!(fs.existsSync(devFile) && fs.existsSync(prodFile))) {
        console.log(`⏭️  Skipping ${page} ${vp} — missing file`);
        continue;
      }

      console.log(`🔍 Comparing: ${page} (${vp})`);
      const result = comparePair(devFile, prodFile, diffFile);
      results.push({ page, viewport: vp, ...result });

      const status =
        result.pctDiff < 1 ? "✅" : result.pctDiff < 5 ? "⚠️" : "❌";
      console.log(
        `   ${status} ${result.pctDiff}% different (${result.diffPixels} pixels)`
      );

      if (result.sizeMismatch) {
        console.log(
          `   📏 Size mismatch: DEV ${result.devSize.w}×${result.devSize.h} vs PROD ${result.prodSize.w}×${result.prodSize.h}`
        );
      }
    }
  }

  let report = "# Visual Comparison Report\n\n";
  report += `**Date**: ${new Date().toISOString()}\n`;
  report += "**DEV**: https://opticasuarez-web-dev.vercel.app\n";
  report += "**PROD**: https://opticasuarezjaen.es\n\n";

  report += "## Summary\n\n";
  report += "| Page | Viewport | Diff % | Pixels | Size Match | Status |\n";
  report += "|------|----------|--------|--------|------------|--------|\n";
  for (const r of results) {
    const status =
      r.pctDiff < 1 ? "✅ Match" : r.pctDiff < 5 ? "⚠️ Minor" : "❌ Mismatch";
    const sizeMatch = r.sizeMismatch
      ? `❌ DEV ${r.devSize.w}×${r.devSize.h} vs PROD ${r.prodSize.w}×${r.prodSize.h}`
      : "✅";
    report += `| ${r.page} | ${r.viewport} | ${r.pctDiff}% | ${r.diffPixels} | ${sizeMatch} | ${status} |\n`;
  }

  report += "\n## Pages with significant differences (>5%)\n\n";
  const significant = results.filter((r) => r.pctDiff >= 5);
  if (significant.length === 0) {
    report += "None — all pages are within acceptable thresholds.\n";
  } else {
    for (const r of significant) {
      report += `### ${r.page} (${r.viewport})\n`;
      report += `- **Diff**: ${r.pctDiff}% (${r.diffPixels} pixels)\n`;
      if (r.sizeMismatch) {
        report += `- **Size mismatch**: DEV ${r.devSize.w}×${r.devSize.h} vs PROD ${r.prodSize.w}×${r.prodSize.h}\n`;
      }
      report += `- **Diff image**: diffs/diff-${r.page}-${r.viewport}.png\n\n`;
    }
  }

  report += "\n## Pages with minor differences (1-5%)\n\n";
  const minor = results.filter((r) => r.pctDiff >= 1 && r.pctDiff < 5);
  if (minor.length === 0) {
    report += "None.\n";
  } else {
    for (const r of minor) {
      report += `- **${r.page} (${r.viewport})**: ${r.pctDiff}%\n`;
    }
  }

  fs.writeFileSync(reportPath, report);
  console.log(`\n📊 Report saved to: ${reportPath}`);
}

init().then(run);
