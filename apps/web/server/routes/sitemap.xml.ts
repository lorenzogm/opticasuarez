import { defineEventHandler, setResponseHeaders } from "nitro/h3";

const projectId = process.env.SANITY_PROJECT_ID || "2a24wmex";
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = "2026-03-23";
const SANITY_CDN_URL = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`;

const domain =
  process.env.VITE_BASE_URL?.replace(/\/+$/, "") ||
  "https://opticasuarezjaen.es";

const staticRoutes = ["/", "/contacto", "/blog"];

async function fetchFromSanity<T>(query: string): Promise<T[]> {
  const url = new URL(SANITY_CDN_URL);
  url.searchParams.set("query", query);

  const res = await fetch(url.toString());
  if (!res.ok) return [];

  const json = (await res.json()) as { result: T[] };
  return json.result || [];
}

export default defineEventHandler(async (event) => {
  const [blogSlugs, pages, productSlugs] = await Promise.all([
    fetchFromSanity<{ slug: string }>(
      '*[_type == "blogPost"]{ "slug": slug.current }'
    ),
    fetchFromSanity<{ path: string }>(
      '*[_type == "page"]{ "path": path.current }'
    ),
    fetchFromSanity<{ slug: string }>(
      '*[_type == "product"]{ "slug": slug.current }'
    ),
  ]);

  const allRoutes = [
    ...staticRoutes,
    ...pages.map((p) => p.path).filter(Boolean),
    ...blogSlugs.map((b) => `/blog/${b.slug}`).filter(Boolean),
    ...productSlugs.map((p) => `/tienda/${p.slug}`).filter(Boolean),
  ];

  // Deduplicate routes
  const uniqueRoutes = [...new Set(allRoutes)];

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
