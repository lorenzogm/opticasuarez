/**
 * Fix script: Patches the Examen Visual page in Sanity.
 *
 * Issues fixed:
 * 1. sectionText content stored as plain string instead of PortableText blocks
 * 2. Missing sectionLocations at the end of the page
 *
 * Usage:
 *   SANITY_TOKEN=<token> node scripts/fix-examen-visual.mjs
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
  console.log("🔧 Fixing Examen Visual page in Sanity...\n");

  // 1. Fetch the current page document
  console.log("📄 Fetching current page...");
  const page = await client.fetch(
    '*[_type == "page" && path.current == "/servicios/examen-visual"][0]'
  );

  if (!page) {
    console.error("❌ Page not found. Run migrate-service-pages.mjs first.");
    process.exit(1);
  }

  console.log(`  Found: ${page.title} (${page._id})`);
  console.log(`  Sections: ${page.sections?.length || 0}`);

  // 2. Fix sectionText content (convert plain strings to PortableText blocks)
  console.log("\n📝 Fixing sectionText content...");
  let textFixed = 0;
  for (const section of page.sections || []) {
    if (
      section._type === "sectionText" &&
      section.content &&
      typeof section.content === "string"
    ) {
      const text = section.content;
      section.content = [
        {
          _type: "block",
          _key: generateKey(),
          children: [{ _type: "span", _key: generateKey(), text, marks: [] }],
          markDefs: [],
          style: "normal",
        },
      ];
      textFixed++;
      console.log(`  ✓ Fixed: "${section.title}"`);
    }
  }
  console.log(`  Fixed ${textFixed} sectionText block(s)`);

  // 3. Add sectionLocations if missing
  console.log("\n📍 Adding locations section...");
  const hasLocations = page.sections?.some(
    (s) => s._type === "sectionLocations"
  );

  if (hasLocations) {
    console.log("  Locations section already exists, skipping.");
  } else {
    const locations = await client.fetch(
      '*[_type == "location"]{ _id, name } | order(name asc)'
    );
    console.log(`  Found ${locations.length} location(s)`);

    page.sections.push({
      _type: "sectionLocations",
      _key: generateKey(),
      title: "Dónde Estamos",
      items: locations.map((loc) => ({
        _type: "cardItem",
        _key: generateKey(),
        title: loc.name,
        reference: { _type: "reference", _ref: loc._id },
      })),
    });
    console.log("  ✓ Added sectionLocations");
  }

  // 4. Save
  console.log("\n📤 Pushing to Sanity...");
  await client.createOrReplace(page);
  console.log(`  ✓ Page updated: ${page.sections.length} sections`);

  console.log("\n✅ Fix complete!");
}

main().catch((err) => {
  console.error("Fix failed:", err);
  process.exit(1);
});
