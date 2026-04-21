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
    fetchFromSanity<{ slug: string; updatedAt: string }>(
      '*[_type == "blogPost"]{ "slug": slug.current, "updatedAt": _updatedAt }'
    ),
    fetchFromSanity<{ path: string; updatedAt: string }>(
      '*[_type == "page"]{ "path": path.current, "updatedAt": _updatedAt }'
    ),
    fetchFromSanity<{ slug: string; updatedAt: string }>(
      '*[_type == "product"]{ "slug": slug.current, "updatedAt": _updatedAt }'
    ),
  ]);

  const today = new Date().toISOString().split("T")[0];
  const normalizeRoute = (route: string) =>
    route.startsWith("/") ? route : `/${route}`;

  const allRoutes: { loc: string; lastmod: string }[] = [
    ...staticRoutes.map((route) => ({
      loc: normalizeRoute(route),
      lastmod: today,
    })),
    ...pages
      .filter((page) => page.path)
      .map((page) => ({
        loc: normalizeRoute(page.path),
        lastmod: page.updatedAt?.split("T")[0] || today,
      })),
    ...blogSlugs
      .filter((blogPost) => blogPost.slug)
      .map((blogPost) => ({
        loc: normalizeRoute(`blog/${blogPost.slug}`),
        lastmod: blogPost.updatedAt?.split("T")[0] || today,
      })),
    ...productSlugs
      .filter((product) => product.slug)
      .map((product) => ({
        loc: normalizeRoute(`tienda/${product.slug}`),
        lastmod: product.updatedAt?.split("T")[0] || today,
      })),
  ];

  // Deduplicate by loc
  const seen = new Set<string>();
  const uniqueRoutes = allRoutes.filter((r) => {
    if (seen.has(r.loc)) return false;
    seen.add(r.loc);
    return true;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueRoutes
  .map(
    (route) => `  <url>
    <loc>${domain}${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
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
