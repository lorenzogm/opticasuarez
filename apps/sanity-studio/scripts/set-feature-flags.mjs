/**
 * Sets feature flags on the siteSettings document.
 *
 * Usage:
 *   SANITY_TOKEN=<token> node scripts/set-feature-flags.mjs
 *
 * Or if you have the Sanity CLI auth token configured, it will use that automatically.
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
  console.error("No Sanity token found. Set SANITY_TOKEN env var.");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  apiVersion: "2026-03-27",
  useCdn: false,
});

async function main() {
  // Check if siteSettings doc exists
  const existing = await client.fetch('*[_type == "siteSettings"][0]{_id}');

  if (existing) {
    // Patch existing document
    console.log(`Patching siteSettings (${existing._id})...`);
    await client
      .patch(existing._id)
      .set({
        featureFlags: {
          shopEnabled: false,
        },
      })
      .commit();
    console.log("Feature flags updated: shopEnabled = false");
  } else {
    // Create new siteSettings document
    console.log("Creating siteSettings document...");
    await client.create({
      _type: "siteSettings",
      siteName: "Óptica Suárez",
      featureFlags: {
        shopEnabled: false,
      },
    });
    console.log("siteSettings created with shopEnabled = false");
  }
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
