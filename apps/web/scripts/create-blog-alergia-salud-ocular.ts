/**
 * Create blog post: Alergia y Salud Ocular
 *
 * Usage: cd apps/web && npx tsx scripts/create-blog-alergia-salud-ocular.ts
 *
 * Uploads local .webp images from public/images/blog and creates the blog post in Sanity.
 * Requires Sanity write access (SANITY_API_TOKEN env var or Sanity CLI login).
 */

import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { createClient } from "@sanity/client";
import { buildAlergiaSaludOcularPost } from "../src/lib/blog-posts/alergia-salud-ocular";

const projectId = process.env.SANITY_PROJECT_ID || "2a24wmex";
const dataset = process.env.SANITY_DATASET || "production";

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

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-23",
  useCdn: false,
  token: resolveToken(),
});

const imageFiles = [
  "alergia-ocular-jaen-1.webp",
  "alergia-ocular-jaen-2.webp",
] as const;

async function uploadImage(filename: string): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "images",
    "blog",
    filename
  );
  const fileBuffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload("image", fileBuffer, { filename });
  return asset._id;
}

async function main() {
  console.log("📷 Uploading local images to Sanity...");

  const imageRefs: string[] = [];
  for (const file of imageFiles) {
    const ref = await uploadImage(file);
    imageRefs.push(ref);
    console.log(`  ✅ ${file} -> ${ref}`);
  }

  const blogPost = buildAlergiaSaludOcularPost({
    featuredImageRef: imageRefs[0],
    imageRefs,
  });

  await client.createOrReplace(blogPost);
  console.log(`✅ Blog post created: ${blogPost.title}`);
  console.log(`   URL: /blog/${blogPost.slug.current}`);
}

main().catch(console.error);
