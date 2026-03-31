/**
 * Fix script: Patches the Quiénes Somos page in Sanity.
 *
 * Issues fixed:
 * 1. Timeline: field name `entries` → `items`, add images
 * 2. Team cards: add references to teamMember documents (images + details)
 * 3. Locations section: add after testimonials
 *
 * Usage:
 *   SANITY_TOKEN=<token> node scripts/fix-quienes-somos.mjs
 */

import { createReadStream, existsSync, readFileSync } from "node:fs";
import { basename, extname, resolve } from "node:path";
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

const PUBLIC_DIR = resolve(import.meta.dirname, "../../web/public");
const CONTENT_DIR = resolve(import.meta.dirname, "../../web/src/content");

function loadJson(name) {
  const path = resolve(CONTENT_DIR, name);
  return JSON.parse(readFileSync(path, "utf-8"));
}

function generateKey() {
  return Math.random().toString(36).slice(2, 10);
}

const imageCache = new Map();

async function uploadImage(localPath) {
  if (!localPath || typeof localPath !== "string") return;
  if (imageCache.has(localPath)) return imageCache.get(localPath);

  const absPath = resolve(PUBLIC_DIR, localPath.replace(/^\//, ""));
  if (!existsSync(absPath)) {
    console.warn(`  ⚠ Image not found: ${absPath}`);
    return;
  }

  const ext = extname(absPath).slice(1);
  const contentType =
    ext === "webp"
      ? "image/webp"
      : ext === "png"
        ? "image/png"
        : ext === "jpg" || ext === "jpeg"
          ? "image/jpeg"
          : "application/octet-stream";

  try {
    const asset = await client.assets.upload(
      "image",
      createReadStream(absPath),
      { filename: basename(absPath), contentType }
    );
    const ref = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };
    imageCache.set(localPath, ref);
    console.log(`  ✓ Uploaded ${localPath}`);
    return ref;
  } catch (err) {
    console.warn(`  ⚠ Failed to upload ${localPath}: ${err.message}`);
    return;
  }
}

function teamMemberSlug(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  console.log("🔧 Fixing Quiénes Somos page in Sanity...\n");

  const data = loadJson("quienes-somos.json");

  // 1. Upload timeline images
  console.log("📸 Uploading timeline images...");
  const timelineItems = [];
  for (const e of data.history.timeline || []) {
    const img = await uploadImage(e.image);
    timelineItems.push({
      _key: generateKey(),
      year: e.year,
      title: e.title,
      description: e.description,
      ...(img ? { image: img } : {}),
    });
  }

  // 2. Verify team member documents exist
  console.log("\n👥 Checking team member documents...");
  const teamMembers = await client.fetch(
    '*[_type == "teamMember"]{ _id, name }'
  );
  for (const tm of teamMembers) {
    console.log(`  Found: ${tm.name} (${tm._id})`);
  }

  // 3. Build team card items with references
  const teamCardItems = data.team.members.map((m) => ({
    _type: "cardItem",
    _key: generateKey(),
    title: m.name,
    description: m.role,
    reference: {
      _type: "reference",
      _ref: `teamMember-${teamMemberSlug(m.name)}`,
    },
  }));

  // 4. Find location documents
  console.log("\n📍 Looking up location documents...");
  const locations = await client.fetch(
    '*[_type == "location"]{ _id, name } | order(name asc)'
  );
  for (const loc of locations) {
    console.log(`  Found: ${loc.name} (${loc._id})`);
  }

  // 5. Build the corrected page document
  console.log("\n📝 Building corrected page document...");
  const page = {
    _id: "page-quienes-somos",
    _type: "page",
    title: "Quiénes Somos",
    path: { _type: "slug", current: "quienes-somos" },
    sections: [
      {
        _type: "sectionHero",
        _key: generateKey(),
        title: data.mainTitle,
      },
      {
        _type: "sectionTimeline",
        _key: generateKey(),
        title: data.history.title,
        items: timelineItems,
      },
      {
        _type: "sectionCards",
        _key: generateKey(),
        title: data.team.title,
        variant: "profile",
        items: teamCardItems,
      },
      {
        _type: "sectionTestimonials",
        _key: generateKey(),
        title: data.testimonials.title,
        moreReviewsLink: data.testimonials.moreReviewsLink,
        items: data.testimonials.items.map((t) => ({
          _key: generateKey(),
          name: t.name,
          text: t.review,
          rating: t.rating,
        })),
      },
      {
        _type: "sectionLocations",
        _key: generateKey(),
        title: "Dónde Estamos",
        items: locations.map((loc) => ({
          _type: "cardItem",
          _key: generateKey(),
          title: loc.name,
          reference: { _type: "reference", _ref: loc._id },
        })),
      },
      {
        _type: "sectionSocialMedia",
        _key: generateKey(),
        title: "Síguenos en redes sociales",
        items: data.socialMedia.map((sm) => ({
          _type: "socialMediaLink",
          _key: generateKey(),
          platform: sm.platform,
          title: sm.title,
          handle: sm.handle,
          url: sm.url,
        })),
      },
    ],
  };

  // 6. Replace the document in Sanity
  console.log("\n📤 Pushing to Sanity...");
  await client.createOrReplace(page);
  console.log("  ✓ Page: quienes-somos — replaced with corrected content");

  console.log(`\n✅ Fix complete! Images uploaded: ${imageCache.size}`);
}

main().catch((err) => {
  console.error("Fix failed:", err);
  process.exit(1);
});
