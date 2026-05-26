/**
 * Fix script: Updates the SEO meta title for the Ortoqueratología page.
 *
 * Changes:
 * 1. Sets seo.title to "Ortoqueratología en Jaén | Óptica Suárez"
 *    (removing the "| Orto-K" segment added by the original migration)
 *
 * The FAQPage structured data is generated automatically by the web app
 * route (apps/web/src/routes/$.tsx) via extractServiceFaqItems(), which
 * detects accordion sections whose title contains "Preguntas Frecuentes".
 * No Sanity changes are needed for that feature.
 *
 * Usage:
 *   SANITY_TOKEN=<token> node scripts/fix-ortoqueratologia-seo.mjs
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@sanity/client";

const PROJECT_ID = "2a24wmex";
const DATASET = "production";

let TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) {
  try {
    const configPath = resolve(
      process.env.HOME || process.env.USERPROFILE,
      ".config/sanity/config.json"
    );
    const config = JSON.parse(readFileSync(configPath, "utf-8"));
    TOKEN = config.authToken;
    if (TOKEN) {
      console.log(
        "Using Sanity CLI auth token from ~/.config/sanity/config.json"
      );
    }
  } catch {
    // ignore
  }
}

if (!TOKEN) {
  console.error(
    "Missing SANITY_TOKEN. Create a write token at:\nhttps://www.sanity.io/manage/project/2a24wmex/api#tokens"
  );
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2026-03-27",
  token: TOKEN,
  useCdn: false,
});

async function main() {
  console.log("🔧 Fixing Ortoqueratología SEO in Sanity...\n");

  // 1. Fetch the current page document
  console.log("📄 Fetching current page...");
  const page = await client.fetch(
    '*[_type == "page" && path.current == "/servicios/ortoqueratologia"][0]{ _id, title, seo }'
  );

  if (!page) {
    console.error("❌ Page not found. Run migrate-service-pages.mjs first.");
    process.exit(1);
  }

  console.log(`  Found: ${page.title} (${page._id})`);
  console.log(`  Current SEO title: ${page.seo?.title || "(none)"}`);

  const desiredTitle = "Ortoqueratología en Jaén | Óptica Suárez";

  if (page.seo?.title === desiredTitle) {
    console.log("\n✅ SEO title is already correct. Nothing to do.");
    return;
  }

  // 2. Patch the SEO title
  console.log(`\n📝 Setting SEO title to: "${desiredTitle}"`);
  await client.patch(page._id).set({ "seo.title": desiredTitle }).commit();

  console.log(`  ✓ Updated SEO title for ${page._id}`);

  console.log("\n✅ Fix complete!");
  console.log(
    "\nNote: FAQPage structured data is generated automatically by the web app"
  );
  console.log(
    "via extractServiceFaqItems() in apps/web/src/routes/$.tsx — no Sanity"
  );
  console.log(
    'changes needed. It detects accordion sections with "Preguntas Frecuentes"'
  );
  console.log("in the title and renders the corresponding JSON-LD schema.");
}

main().catch((err) => {
  console.error("Fix failed:", err);
  process.exit(1);
});
