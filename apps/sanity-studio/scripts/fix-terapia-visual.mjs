/**
 * Fix script: Patches the Terapia Visual page in Sanity.
 *
 * Issues fixed:
 * 1. Hero description moved to sectionText "¿Qué es la terapia visual?"
 * 2. Condition card icons changed from English words to emojis
 * 3. Specialists section changed from text to profile card with Juan Pedro reference
 * 4. sectionText content converted from plain strings to PortableText blocks
 * 5. Missing locations section at end of page
 *
 * Usage:
 *   SANITY_TOKEN=<token> node scripts/fix-terapia-visual.mjs
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

// Map English icon names to contextual emojis
const iconMap = {
  focus: "🔍",
  tracking: "👁️",
  alignment: "↔️",
  "lazy-eye": "👁️‍🗨️",
  perception: "🧠",
  fatigue: "😫",
};

async function main() {
  console.log("🔧 Fixing Terapia Visual page in Sanity...\n");

  // 1. Fetch the current page
  console.log("📄 Fetching current page...");
  const page = await client.fetch(
    '*[_type == "page" && path.current == "/servicios/terapia-visual"][0]'
  );

  if (!page) {
    console.error("❌ Page not found. Run migrate-service-pages.mjs first.");
    process.exit(1);
  }

  console.log(`  Found: ${page.title} (${page._id})`);
  console.log(`  Sections: ${page.sections?.length || 0}`);

  // 2. Fix hero — remove description
  console.log("\n🖼️ Fixing hero section...");
  for (const section of page.sections) {
    if (section._type === "sectionHero") {
      if (section.description) {
        console.log("  ✓ Removed description from hero");
        delete section.description;
      }
    }
  }

  // 3. Fix sectionText content (plain string → PortableText)
  console.log("\n📝 Fixing sectionText content...");
  let textFixed = 0;
  for (const section of page.sections) {
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
          children: [
            { _type: "span", _key: generateKey(), text, marks: [] },
          ],
          markDefs: [],
          style: "normal",
        },
      ];
      textFixed++;
      console.log(`  ✓ Fixed: "${section.title}"`);
    }
  }
  console.log(`  Fixed ${textFixed} sectionText block(s)`);

  // 4. Fix condition card icons
  console.log("\n🎨 Fixing condition icons...");
  for (const section of page.sections) {
    if (section._type === "sectionCards" && section.title?.toUpperCase().includes("CONDICIONES")) {
      for (const item of section.items || []) {
        if (item.icon && iconMap[item.icon]) {
          console.log(`  ✓ ${item.icon} → ${iconMap[item.icon]} (${item.title})`);
          item.icon = iconMap[item.icon];
        }
      }
    }
  }

  // 5. Replace specialists sectionText with profile card
  console.log("\n👨‍⚕️ Replacing specialists section with profile card...");
  const specialistIndex = page.sections.findIndex(
    (s) =>
      s._type === "sectionText" &&
      s.title?.toUpperCase().includes("ESPECIALISTA")
  );

  if (specialistIndex !== -1) {
    page.sections[specialistIndex] = {
      _type: "sectionCards",
      _key: generateKey(),
      title: "NUESTROS ESPECIALISTAS",
      subtitle: "Profesionales especializados en terapia visual",
      variant: "profile",
      items: [
        {
          _type: "cardItem",
          _key: generateKey(),
          title: "JUAN PEDRO TOLEDANO BERMEJO",
          description: "Óptico-Optometrista",
          reference: {
            _type: "reference",
            _ref: "teamMember-juan-pedro-toledano-bermejo",
          },
        },
      ],
    };
    console.log("  ✓ Replaced with profile card referencing Juan Pedro");
  }

  // 6. Add sectionLocations if missing
  console.log("\n📍 Adding locations section...");
  const hasLocations = page.sections?.some(
    (s) => s._type === "sectionLocations"
  );

  if (!hasLocations) {
    const locations = await client.fetch(
      '*[_type == "location"]{ _id, name } | order(name asc)'
    );
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
    console.log(`  ✓ Added sectionLocations (${locations.length} locations)`);
  }

  // 7. Save
  console.log("\n📤 Pushing to Sanity...");
  await client.createOrReplace(page);
  console.log(`  ✓ Page updated: ${page.sections.length} sections`);

  console.log("\n✅ Fix complete!");
}

main().catch((err) => {
  console.error("Fix failed:", err);
  process.exit(1);
});
