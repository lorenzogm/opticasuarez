/**
 * Server functions for data fetching.
 *
 * TanStack Start requires loaders that fetch external data to be wrapped
 * in createServerFn so they always execute server-side — both during SSR
 * and on client-side navigation. Without this, client navigations try to
 * call the Sanity API directly from the browser, which fails with a
 * NetworkError (CORS / connectivity).
 */
import { createServerFn } from "@tanstack/react-start";
import quienesNosotrosContent from "~/content/quienes-somos.json" with {
  type: "json",
};
import {
  getBlogPost,
  getBlogPosts,
  getBrands,
  getHomepage,
  getPage,
  getProduct,
  getProductCategories,
  getProducts,
  getSiteSettings,
} from "~/lib/sanity";

// biome-ignore lint/suspicious/noExplicitAny: Sanity queries return unknown; we use any for server function compatibility
type SanityData = any;

// ─── Homepage ────────────────────────────────────────────────

export const fetchHomepageData = createServerFn({ method: "GET" }).handler(
  async () => {
    const homepage = await getHomepage();
    return { homepage: homepage as SanityData };
  }
);

// ─── Blog ────────────────────────────────────────────────────

export const fetchBlogPosts = createServerFn({ method: "GET" }).handler(
  async () => {
    const articles = await getBlogPosts();
    return { articles: articles as SanityData[] };
  }
);

export const fetchBlogPost = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const post = await getBlogPost(slug);
    return { post: post as SanityData };
  });

// ─── Tienda ──────────────────────────────────────────────────

export const fetchTiendaData = createServerFn({ method: "GET" }).handler(
  async () => {
    const [products, categories, brands] = await Promise.all([
      getProducts(),
      getProductCategories(),
      getBrands(),
    ]);
    return {
      products: products as SanityData[],
      categories: categories as SanityData[],
      brands: brands as SanityData[],
    };
  }
);

export const fetchProduct = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const product = await getProduct(slug);
    return { product: product as SanityData };
  });

// ─── Site Settings ──────────────────────────────────────────

export const fetchSiteSettings = createServerFn({ method: "GET" }).handler(
  async () => {
    const settings = await getSiteSettings();
    return { settings: settings as SanityData };
  }
);

// ─── Catch-all page builder ─────────────────────────────────

export const fetchPage = createServerFn({ method: "GET" })
  .inputValidator((path: string) => path ?? "")
  .handler(async ({ data: path }) => {
    const fullPath = path.startsWith("/") ? path : `/${path}`;
    let page: SanityData;
    try {
      page = (await getPage(fullPath)) as SanityData;
    } catch {
      return { page: null as SanityData };
    }

    // Fallback: populate empty timeline sections with JSON content
    if (fullPath === "/quienes-somos" && page?.sections) {
      let hasTimeline = false;
      for (const section of page.sections) {
        if (section._type === "sectionTimeline") {
          hasTimeline = true;
          if (!section.title) {
            section.title = quienesNosotrosContent.history.title;
          }
          if (!section.timelineItems || section.timelineItems.length === 0) {
            section.timelineItems = quienesNosotrosContent.history.timeline.map(
              (
                item: {
                  year: string;
                  title: string;
                  description: string;
                  image: string;
                },
                i: number
              ) => ({
                _key: `fallback-${i}`,
                ...item,
              })
            );
          }
        }
      }
      // Inject a full timeline section if Sanity has none
      if (!hasTimeline) {
        const teamIndex = page.sections.findIndex(
          (s: SanityData) => s._type === "sectionTeam"
        );
        const timelineSection = {
          _type: "sectionTimeline",
          _key: "fallback-timeline",
          title: quienesNosotrosContent.history.title,
          timelineItems: quienesNosotrosContent.history.timeline.map(
            (
              item: {
                year: string;
                title: string;
                description: string;
                image: string;
              },
              i: number
            ) => ({
              _key: `fallback-${i}`,
              ...item,
            })
          ),
        };
        if (teamIndex > 0) {
          page.sections.splice(teamIndex, 0, timelineSection);
        } else {
          page.sections.push(timelineSection);
        }
      }
    }

    return { page: page as SanityData };
  });
