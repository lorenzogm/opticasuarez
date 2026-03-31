/**
 * Fix script: Patches the homepage in Sanity to add location references.
 *
 * Issue: The homepage's locations section shows only the title but no location
 * items because `locations.items` was not populated with references to the
 * location documents during migration.
 *
 * Usage:
 *   SANITY_TOKEN=<token> node scripts/fix-homepage-locations.mjs
 *
 * Or, if authenticated via Sanity CLI:
 *   node scripts/fix-homepage-locations.mjs
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

function generateKey() {
  return Math.random().toString(36).slice(2, 10);
}

async function main() {
  console.log("🔧 Fixing homepage locations in Sanity...\n");

  // 1. Find existing location documents
  console.log("📍 Looking up location documents...");
  const locations = await client.fetch(
    '*[_type == "location"]{ _id, name } | order(name asc)'
  );

  if (locations.length === 0) {
    console.error(
      "❌ No location documents found in Sanity. Run migrate-content.mjs first."
    );
    process.exit(1);
  }

  for (const loc of locations) {
    console.log(`  Found: ${loc.name} (${loc._id})`);
  }

  // 2. Patch the homepage to add location references
  console.log("\n📤 Patching homepage locations...");
  await client
    .patch("homepage")
    .set({
      "locations.items": locations.map((loc) => ({
        _type: "reference",
        _ref: loc._id,
        _key: generateKey(),
      })),
    })
    .commit();

  console.log("  ✓ Homepage locations updated with references");

  // 3. Verify
  const homepage = await client.fetch(
    '*[_type == "homepage"][0]{ locations { title, "itemCount": count(items) } }'
  );
  console.log(
    `\n✅ Fix complete! Locations section: "${homepage.locations?.title}" with ${homepage.locations?.itemCount || 0} items`
  );
}

main().catch((err) => {
  console.error("Fix failed:", err);
  process.exit(1);
});
