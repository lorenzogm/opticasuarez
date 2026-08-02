/**
 * Verify canonical blog posts are published in Sanity.
 *
 * Usage: cd apps/web && npx tsx scripts/verify-blog-posts.ts
 *
 * Queries each target dataset (production by default in CI) and asserts that
 * every canonical blog post exists. Exits with a non-zero code — failing the
 * workflow — when the Sanity token is invalid/unauthorized (auth error) or when
 * any expected article is missing from the dataset.
 *
 * Defaults to verifying the production and development datasets.
 * You can override with SANITY_DATASET or SANITY_TARGET_DATASETS=production,development.
 * Requires Sanity read access (SANITY_EDITOR_TOKEN env var or Sanity CLI login).
 */

import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { createClient } from "@sanity/client";
import { buildAlergiaSaludOcularPost } from "../src/lib/blog-posts/alergia-salud-ocular";
import { buildCataratasPost } from "../src/lib/blog-posts/cataratas";
import { buildEclipseSolarPost } from "../src/lib/blog-posts/eclipse-solar";
import { resolveTargetDatasets } from "../src/lib/sanity-datasets";

const projectId = process.env.SANITY_PROJECT_ID || "2a24wmex";
const targetDatasets = resolveTargetDatasets({
  sanityDataset: process.env.SANITY_DATASET,
  sanityTargetDatasets: process.env.SANITY_TARGET_DATASETS,
});

function resolveToken(): string {
  if (process.env.SANITY_EDITOR_TOKEN) return process.env.SANITY_EDITOR_TOKEN;
  const configPath = path.join(
    os.homedir(),
    ".config",
    "sanity",
    "config.json"
  );
  try {
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    if (config.authToken) return config.authToken;
  } catch {
    // ignore
  }
  console.error(
    "Error: SANITY_EDITOR_TOKEN is required. Set it or run `npx sanity login`."
  );
  process.exit(1);
}

const token = resolveToken();

// The canonical posts published by `sync:canonical-blog-posts`. A dummy image
// ref is enough to derive each document's `_id` and slug from its builder.
const dummyImageRef = "image-verify";
const expectedPosts = [
  buildAlergiaSaludOcularPost({ featuredImageRef: dummyImageRef }),
  buildCataratasPost({ featuredImageRef: dummyImageRef }),
  buildEclipseSolarPost({ featuredImageRef: dummyImageRef }),
].map((post) => ({ id: post._id, slug: post.slug.current }));

async function verifyDataset(dataset: string) {
  const datasetClient = createClient({
    projectId,
    dataset,
    apiVersion: "2026-03-23",
    useCdn: false,
    token,
  });

  console.log(`🔎 [${dataset}] Verifying canonical blog posts...`);

  const ids = expectedPosts.map((post) => post.id);
  // A 401 here (invalid/unauthorized token) rejects and fails the step.
  const foundIds = await datasetClient.fetch<string[]>(
    `*[_type == "blogPost" && _id in $ids]._id`,
    { ids }
  );

  const missing = expectedPosts.filter((post) => !foundIds.includes(post.id));
  for (const post of expectedPosts) {
    const status = missing.includes(post) ? "❌ MISSING" : "✅ found";
    console.log(`  ${status} [${dataset}] ${post.slug}`);
  }

  if (missing.length > 0) {
    throw new Error(
      `[${dataset}] Missing ${missing.length} canonical blog post(s): ${missing
        .map((post) => post.slug)
        .join(", ")}`
    );
  }

  console.log(
    `✅ [${dataset}] All ${expectedPosts.length} canonical blog posts are published.`
  );
}

async function main() {
  for (const dataset of targetDatasets) {
    await verifyDataset(dataset);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
