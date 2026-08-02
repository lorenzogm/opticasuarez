/**
 * Create blog post: ¿Qué son las cataratas y cómo tratarlas?
 *
 * Usage: npx tsx apps/web/scripts/create-blog-cataratas.ts
 *
 * Uploads local .webp images from public/images/blog and creates the blog post in Sanity.
 * Defaults to publishing in production and development datasets.
 * You can override with SANITY_DATASET or SANITY_TARGET_DATASETS=production,development.
 * Set SANITY_CREATE_DRAFT=true to create/update the post as a draft document.
 * Requires Sanity write access (SANITY_API_TOKEN env var or Sanity CLI login).
 */

import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import { buildCataratasPost } from "../src/lib/blog-posts/cataratas";
import { resolveTargetDatasets } from "../src/lib/sanity-datasets";

const projectId = process.env.SANITY_PROJECT_ID || "2a24wmex";
const targetDatasets = resolveTargetDatasets({
  sanityDataset: process.env.SANITY_DATASET,
  sanityTargetDatasets: process.env.SANITY_TARGET_DATASETS,
});
const createDraft = process.env.SANITY_CREATE_DRAFT === "true";

function resolveToken(): string {
  if (process.env.SANITY_API_TOKEN) return process.env.SANITY_API_TOKEN;
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
    "Error: SANITY_API_TOKEN is required. Set it or run `npx sanity login`."
  );
  process.exit(1);
}

const token = resolveToken();

const imageFiles = [
  "cataratas-jaen-1.webp",
  "cataratas-jaen-2.webp",
  "cataratas-jaen-3.webp",
] as const;

async function uploadImage(
  filename: string,
  datasetClient: ReturnType<typeof createClient>
): Promise<string> {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.join(process.cwd(), "public", "images", "blog", filename),
    path.join(scriptDir, "..", "public", "images", "blog", filename),
  ];
  const filePath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!filePath) {
    throw new Error(`Image file not found for upload: ${filename}`);
  }
  const fileBuffer = fs.readFileSync(filePath);
  const asset = await datasetClient.assets.upload("image", fileBuffer, {
    filename,
  });
  return asset._id;
}

async function publishToDataset(dataset: string) {
  const datasetClient = createClient({
    projectId,
    dataset,
    apiVersion: "2026-03-23",
    useCdn: false,
    token,
  });

  console.log(`📷 [${dataset}] Uploading local images to Sanity...`);

  const imageRefs: string[] = [];
  for (const file of imageFiles) {
    const ref = await uploadImage(file, datasetClient);
    imageRefs.push(ref);
    console.log(`  ✅ [${dataset}] ${file} -> ${ref}`);
  }

  const blogPost = buildCataratasPost({
    featuredImageRef: imageRefs[0],
    imageRefs,
  });
  if (createDraft) {
    blogPost._id = `drafts.${blogPost._id}`;
  }

  await datasetClient.createOrReplace(blogPost);
  console.log(
    `✅ [${dataset}] Blog post ${createDraft ? "draft" : "published"}: ${blogPost.title}`
  );
  console.log(`   [${dataset}] URL: /blog/${blogPost.slug.current}`);
}

async function main() {
  for (const dataset of targetDatasets) {
    await publishToDataset(dataset);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
