import path from "node:path";
import tailwindcss from "@tailwindcss/postcss";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || "2a24wmex";
const SANITY_DATASET = process.env.SANITY_DATASET || "production";
const SANITY_API_VERSION = "2026-03-23";
const SANITY_CDN_URL = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;

async function sanityQuery<T>(query: string): Promise<T> {
  const url = new URL(SANITY_CDN_URL);
  url.searchParams.set("query", query);
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(
      `Sanity query failed during prerender route enumeration: ${res.status} ${res.statusText}`
    );
  }
  const json = (await res.json()) as { result: T };
  return json.result;
}

async function getPrerenderPages(): Promise<Array<{ path: string }>> {
  const [blogSlugs, pages] = await Promise.all([
    sanityQuery<Array<{ slug: string }>>(
      '*[_type == "blogPost"]{ "slug": slug.current }'
    ),
    sanityQuery<Array<{ path: string }>>(
      '*[_type == "page"]{ "path": path.current }'
    ),
  ]);

  const routes = [
    "/",
    ...blogSlugs.map((p) => `/blog/${p.slug}`),
    ...pages.map((p) => `/${p.path.replace(/^\//, "")}`),
  ];

  return routes.map((r) => ({ path: r }));
}

export default defineConfig(async () => {
  const isBuild = process.argv.includes("build");
  const prerenderPages = isBuild ? await getPrerenderPages() : [];

  return {
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      tanstackStart({
        prerender: {
          enabled: isBuild,
          crawlLinks: true,
          failOnError: false,
          filter: ({ path }) => {
            if (path.startsWith("/cita") || path.startsWith("/tienda")) {
              return false;
            }
            // Legacy service paths (moved to /servicios/ in Sanity)
            const legacyServicePaths = [
              "/examen-visual",
              "/vision-pediatrica",
              "/terapia-visual",
              "/control-de-miopia",
              "/contactologia",
              "/ortoqueratologia",
              "/vision-deportiva",
            ];
            if (legacyServicePaths.includes(path)) {
              return false;
            }
            return true;
          },
        },
        pages: prerenderPages,
      }),
      nitro({
        serverDir: "server",
        prerender: {
          routes: ["/sitemap.xml", "/robots.txt"],
        },
        routeRules: {
          "/_serverFn/**": { swr: false },
        },
      }),
      viteReact(),
    ],
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
  };
});
