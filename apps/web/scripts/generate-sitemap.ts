import * as fs from "node:fs";
import * as path from "node:path";

const domain = (
  process.env.VITE_BASE_URL || "https://opticasuarezjaen.es"
).replace(/\/+$/, "");

const projectId = process.env.SANITY_PROJECT_ID || "2a24wmex";
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = "2026-03-23";
const SANITY_CDN_URL = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`;

async function fetchSanitySlugs(query: string): Promise<{ slug: string }[]> {
  const url = new URL(SANITY_CDN_URL);
  url.searchParams.set("query", query);
  const res = await fetch(url.toString());
  if (!res.ok) return [];
  const json = (await res.json()) as { result: { slug: string }[] };
  return json.result || [];
}

const staticRoutes = [
  "/",
  "/quienes-somos",
  "/servicios",
  "/servicios/examen-visual",
  "/servicios/terapia-visual",
  "/servicios/contactologia",
  "/servicios/vision-pediatrica",
  "/servicios/vision-deportiva",
  "/servicios/control-de-miopia",
  "/servicios/ortoqueratologia",
  "/planveo",
  "/contacto",
  "/blog",
];

async function generateSitemap() {
  const blogSlugs = await fetchSanitySlugs(
    '*[_type == "blogPost"]{ "slug": slug.current }'
  );

  const allRoutes = [
    ...staticRoutes,
    ...blogSlugs.map((item) => `/blog/${item.slug}`),
  ].map((route) => (route.startsWith("/") ? route : `/${route}`));

  const today = new Date().toISOString().split("T")[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
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

  fs.writeFileSync(path.join(process.cwd(), "public/sitemap.xml"), sitemap);
  console.log(
    `Generated sitemap.xml with ${allRoutes.length} URLs for domain: ${domain}`
  );

  const robotsTxt = `User-agent: *
Allow: /

# Sitemap location
Sitemap: ${domain}/sitemap.xml
`;
  fs.writeFileSync(path.join(process.cwd(), "public/robots.txt"), robotsTxt);
  console.log("Generated robots.txt");
}

generateSitemap();
