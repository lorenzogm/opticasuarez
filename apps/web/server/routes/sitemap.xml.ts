import { defineEventHandler, setResponseHeaders } from "nitro/h3";
import { resolveFeatureFlags } from "~/lib/feature-flags";
import { buildSitemapRoutes } from "~/lib/structured-data-helpers";

const projectId = process.env.SANITY_PROJECT_ID || "2a24wmex";
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = "2026-03-23";
const SANITY_CDN_URL = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`;

const domain =
  process.env.VITE_BASE_URL?.replace(/\/+$/, "") ||
  "https://opticasuarezjaen.es";

const staticRoutes = ["/", "/contacto", "/blog"];

async function fetchCollectionFromSanity<T>(query: string): Promise<T[]> {
  const url = new URL(SANITY_CDN_URL);
  url.searchParams.set("query", query);

  const res = await fetch(url.toString());
  if (!res.ok) return [];

  const json = (await res.json()) as { result: T[] };
  return json.result || [];
}

async function fetchSingleFromSanity<T>(query: string): Promise<T | null> {
  const url = new URL(SANITY_CDN_URL);
  url.searchParams.set("query", query);

  const res = await fetch(url.toString());
  if (!res.ok) return null;

  const json = (await res.json()) as { result: T | null };
  return json.result ?? null;
}

export default defineEventHandler(async (event) => {
  const [blogSlugs, pages, siteSettings] = await Promise.all([
    fetchCollectionFromSanity<{ slug: string }>(
      '*[_type == "blogPost"]{ "slug": slug.current }'
    ),
    fetchCollectionFromSanity<{ path: string }>(
      '*[_type == "page"]{ "path": path.current }'
    ),
    fetchSingleFromSanity<{
      featureFlags?: { shopEnabled?: boolean; ecommerce?: boolean };
    }>('*[_type == "siteSettings"][0]{ featureFlags }'),
  ]);

  const featureFlags = resolveFeatureFlags(
    siteSettings?.featureFlags ?? {},
    () => ""
  );

  const productSlugs = featureFlags.shopEnabled
    ? await fetchCollectionFromSanity<{ slug: string }>(
        '*[_type == "product"]{ "slug": slug.current }'
      )
    : [];

  const uniqueRoutes = buildSitemapRoutes({
    staticRoutes,
    pages,
    blogSlugs,
    productSlugs,
    shopEnabled: featureFlags.shopEnabled,
  });

  const today = new Date().toISOString().split("T")[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueRoutes
  .map(
    (route) => `  <url>
    <loc>${domain}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  setResponseHeaders(event, {
    "Content-Type": "application/xml",
    "Cache-Control": "public, max-age=86400",
  });

  return sitemap;
});
