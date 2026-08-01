import path from "node:path";
import tailwindcss from "@tailwindcss/postcss";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { getFallbackBlogSlugs } from "./src/lib/blog-posts/fallback-posts";

function resolveSanityEnvValue(
  value: string | undefined,
  fallback: string,
  pattern: RegExp
): string {
  if (!(value && pattern.test(value))) {
    return fallback;
  }
  return value;
}

const SANITY_PROJECT_ID = resolveSanityEnvValue(
  process.env.SANITY_PROJECT_ID,
  "2a24wmex",
  /^[a-z0-9-]+$/i
);
const SANITY_DATASET = resolveSanityEnvValue(
  process.env.SANITY_DATASET,
  "production",
  /^[a-z0-9_-]+$/i
);
const SANITY_API_VERSION = "2026-03-23";
const SANITY_CDN_URL = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;
const SANITY_API_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;
const SANITY_QUERY_TIMEOUT_MS = 15_000;
const SANITY_QUERY_MAX_ATTEMPTS = 3;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchSanityResult<T>(
  baseUrl: string,
  query: string
): Promise<T> {
  const url = new URL(baseUrl);
  url.searchParams.set("query", query);
  const res = await fetch(url.toString(), {
    signal: AbortSignal.timeout(SANITY_QUERY_TIMEOUT_MS),
  });
  if (!res.ok) {
    throw new Error(
      `Sanity query failed during prerender route enumeration: ${res.status} ${res.statusText}`
    );
  }
  const json = (await res.json()) as { result: T };
  return json.result;
}

async function sanityQuery<T>(query: string): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= SANITY_QUERY_MAX_ATTEMPTS; attempt++) {
    try {
      return await fetchSanityResult<T>(SANITY_CDN_URL, query);
    } catch (error) {
      lastError = error;
      if (attempt < SANITY_QUERY_MAX_ATTEMPTS) {
        await sleep(2 ** (attempt - 1) * 1000);
      }
    }
  }
  // Fall back to the non-CDN endpoint in case the CDN is unreachable or slow.
  try {
    return await fetchSanityResult<T>(SANITY_API_URL, query);
  } catch {
    throw lastError instanceof Error
      ? lastError
      : new Error("Sanity query failed during prerender route enumeration");
  }
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
  const mergedBlogSlugs = new Map(
    getFallbackBlogSlugs().map((post) => [post.slug, post])
  );
  for (const post of blogSlugs) {
    mergedBlogSlugs.set(post.slug, post);
  }

  const routes = [
    "/",
    ...Array.from(mergedBlogSlugs.values()).map((p) => `/blog/${p.slug}`),
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
            // Exclude blog index and category-filter pages; let SSR handle them
            // so BlogIndexRoute is rendered via client-side hydration (same as /cita)
            if (
              path === "/blog" ||
              path === "/blog/" ||
              path.startsWith("/blog?")
            ) {
              return false;
            }
            if (
              path.startsWith("/cita") ||
              path.startsWith("/tienda") ||
              path.startsWith("/carrito") ||
              path.startsWith("/checkout")
            ) {
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
          routes: ["/sitemap.xml", "/robots.txt", "/llms.txt"],
        },
        routeRules: {
          "/_serverFn/**": { swr: false },
          "/api/**": { swr: false },
          "/examen-visual": {
            redirect: { to: "/servicios/examen-visual", statusCode: 301 },
          },
          "/terapia-visual": {
            redirect: { to: "/servicios/terapia-visual", statusCode: 301 },
          },
          "/contactologia": {
            redirect: { to: "/servicios/contactologia", statusCode: 301 },
          },
          "/vision-pediatrica": {
            redirect: { to: "/servicios/vision-pediatrica", statusCode: 301 },
          },
          "/vision-deportiva": {
            redirect: { to: "/servicios/vision-deportiva", statusCode: 301 },
          },
          "/control-de-miopia": {
            redirect: { to: "/servicios/control-de-miopia", statusCode: 301 },
          },
          "/ortoqueratologia": {
            redirect: { to: "/servicios/ortoqueratologia", statusCode: 301 },
          },
        },
      }),
      viteReact(),
    ],
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
    test: {
      environment: "jsdom",
      include: ["src/**/*.test.{ts,tsx}"],
      setupFiles: ["./src/test-setup.ts"],
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  };
});
