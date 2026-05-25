/**
 * Create blog post: Alergia y Salud Ocular
 *
 * Usage: cd apps/web && npx tsx scripts/create-blog-alergia-salud-ocular.ts
 *
 * Uploads local .webp images from public/images/blog and creates the blog post in Sanity.
 * Defaults to publishing in production and development datasets.
 * You can override with SANITY_DATASET or SANITY_TARGET_DATASETS=production,development.
 * Requires Sanity write access (SANITY_API_TOKEN env var or Sanity CLI login).
 */

import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { createClient } from "@sanity/client";
import { buildAlergiaSaludOcularPost } from "../src/lib/blog-posts/alergia-salud-ocular";
import { resolveTargetDatasets } from "../src/lib/sanity-datasets";

const projectId = process.env.SANITY_PROJECT_ID || "2a24wmex";
const targetDatasets = resolveTargetDatasets({
  sanityDataset: process.env.SANITY_DATASET,
  sanityTargetDatasets: process.env.SANITY_TARGET_DATASETS,
});

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
  "alergia-ocular-jaen-1.webp",
  "alergia-ocular-jaen-2.webp",
] as const;

async function uploadImage(
  filename: string,
  datasetClient: ReturnType<typeof createClient>
): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "images",
    "blog",
    filename
  );
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

  const blogPost = buildAlergiaSaludOcularPost({
    featuredImageRef: imageRefs[0],
    imageRefs,
  });

  await datasetClient.createOrReplace(blogPost);
  console.log(`✅ [${dataset}] Blog post created: ${blogPost.title}`);
  console.log(`   [${dataset}] URL: /blog/${blogPost.slug.current}`);
}

async function main() {
  for (const dataset of targetDatasets) {
    await publishToDataset(dataset);
  }
}

main().catch(console.error);
