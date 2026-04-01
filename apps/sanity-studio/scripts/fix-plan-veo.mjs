/**
 * Fix script: Patches the Plan VEO page in Sanity to correct card images and FAQ items.
 *
 * Issues fixed:
 * 1. Card images: Uploads benefit card images and adds them to card items
 * 2. FAQ accordion: Uses correct field names (title/content instead of question/answer)
 * 3. Hero image: Uploads and sets hero background image
 *
 * Usage:
 *   SANITY_TOKEN=<token> node scripts/fix-plan-veo.mjs
 *
 * Or, if authenticated via Sanity CLI:
 *   node scripts/fix-plan-veo.mjs
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

async function main() {
  console.log("🔧 Fixing Plan VEO page in Sanity...\n");

  const planVeoData = loadJson("plan-veo.json");

  // 1. Upload images
  console.log("📸 Uploading images...");
  const heroImage = await uploadImage(planVeoData.hero.image);

  const cardItems = [];
  for (const b of planVeoData.benefits.items) {
    const cardImage = await uploadImage(b.image);
    cardItems.push({
      _type: "cardItem",
      _key: generateKey(),
      title: b.title,
      description: b.description,
      icon: b.icon,
      ...(cardImage ? { image: cardImage } : {}),
    });
  }

  // 2. Build corrected page document
  console.log("\n📝 Building corrected page document...");
  const planVeoPage = {
    _id: "page-planveo",
    _type: "page",
    title: "Plan VEO",
    path: { _type: "slug", current: "/planveo" },
    sections: [
      {
        _type: "sectionHero",
        _key: generateKey(),
        title: planVeoData.hero.title,
        subtitle: planVeoData.hero.subtitle,
        description: planVeoData.hero.description,
        ...(heroImage ? { image: heroImage } : {}),
        imageAlt: planVeoData.hero.imageAlt,
      },
      {
        _type: "sectionText",
        _key: generateKey(),
        title: planVeoData.introduction.title,
        content: [
          {
            _type: "block",
            _key: generateKey(),
            children: [
              {
                _type: "span",
                _key: generateKey(),
                text: planVeoData.introduction.content,
                marks: [],
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
      },
      {
        _type: "sectionCards",
        _key: generateKey(),
        title: planVeoData.benefits.title,
        subtitle: planVeoData.benefits.subtitle,
        variant: "grid-3",
        items: cardItems,
      },
      {
        _type: "sectionFeatures",
        _key: generateKey(),
        title: planVeoData.requirements.title,
        subtitle: planVeoData.requirements.subtitle,
        items: planVeoData.requirements.items.map((r) => ({
          _key: generateKey(),
          title: r.title,
          description: r.description,
        })),
      },
      {
        _type: "sectionProcessSteps",
        _key: generateKey(),
        title: planVeoData.howItWorks.title,
        subtitle: planVeoData.howItWorks.subtitle,
        items: planVeoData.howItWorks.steps.map((s) => ({
          _type: "processStep",
          _key: generateKey(),
          stepNumber: Number(s.number),
          title: s.title,
          description: s.description,
        })),
      },
      {
        _type: "sectionAccordion",
        _key: generateKey(),
        title: planVeoData.faq.title,
        items: planVeoData.faq.items.map((q) => ({
          _key: generateKey(),
          title: q.question,
          content: q.answer,
        })),
      },
      {
        _type: "sectionCTA",
        _key: generateKey(),
        title: planVeoData.cta.title,
        description: planVeoData.cta.description,
        buttonText: planVeoData.cta.buttonText,
        buttonUrl: planVeoData.cta.buttonLink,
      },
    ],
  };

  // 3. Replace the document in Sanity
  console.log("\n📤 Pushing to Sanity...");
  await client.createOrReplace(planVeoPage);
  console.log("  ✓ Page: planveo — replaced with corrected content");

  console.log(`\n✅ Fix complete! Images uploaded: ${imageCache.size}`);
  console.log("   Visit the page at /planveo to verify the changes.");
}

main().catch((err) => {
  console.error("Fix failed:", err);
  process.exit(1);
});
