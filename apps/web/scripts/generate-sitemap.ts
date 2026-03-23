import * as fs from "node:fs";
import * as path from "node:path";

const domain = "https://opticasuarezjaen.es";

const staticRoutes = [
  "/",
  "/quienes-somos",
  "/servicios",
  "/vision-deportiva",
  "/control-de-miopia",
  "/vision-pediatrica",
  "/terapia-visual",
  "/contactologia",
  "/examen-visual",
  "/ortoqueratologia",
  "/planveo",
  "/contacto",
  "/blog",
];

const contentDir = path.join(process.cwd(), "src/content/blog");
const blogSlugs = fs
  .readdirSync(contentDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => file.replace(".md", ""));

const allRoutes = [
  ...staticRoutes,
  ...blogSlugs.map((slug) => `/blog/${slug}`),
];

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
console.log(`Generated sitemap.xml with ${allRoutes.length} URLs`);
