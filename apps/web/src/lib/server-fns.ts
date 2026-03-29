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
import { getCookie } from "@tanstack/react-start/server";
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

function isPreviewMode(): boolean {
  try {
    return getCookie("__sanity_preview") === "1";
  } catch {
    return false;
  }
}

// ─── Homepage ────────────────────────────────────────────────

export const fetchHomepageData = createServerFn({ method: "GET" }).handler(
  async () => {
    const preview = isPreviewMode();
    const homepage = await getHomepage(preview);
    return { homepage: homepage as SanityData, isPreview: preview };
  }
);

// ─── Blog ────────────────────────────────────────────────────

export const fetchBlogPosts = createServerFn({ method: "GET" }).handler(
  async () => {
    const preview = isPreviewMode();
    const articles = await getBlogPosts(preview);
    return { articles: articles as SanityData[], isPreview: preview };
  }
);

export const fetchBlogPost = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const preview = isPreviewMode();
    const post = await getBlogPost(slug, preview);
    return { post: post as SanityData, isPreview: preview };
  });

// ─── Tienda ──────────────────────────────────────────────────

export const fetchTiendaData = createServerFn({ method: "GET" }).handler(
  async () => {
    const preview = isPreviewMode();
    const [products, categories, brands] = await Promise.all([
      getProducts(preview),
      getProductCategories(preview),
      getBrands(preview),
    ]);
    return {
      products: products as SanityData[],
      categories: categories as SanityData[],
      brands: brands as SanityData[],
      isPreview: preview,
    };
  }
);

export const fetchProduct = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const preview = isPreviewMode();
    const product = await getProduct(slug, preview);
    return { product: product as SanityData, isPreview: preview };
  });

// ─── Site Settings ──────────────────────────────────────────

export const fetchSiteSettings = createServerFn({ method: "GET" }).handler(
  async () => {
    const preview = isPreviewMode();
    const settings = await getSiteSettings(preview);
    return { settings: settings as SanityData, isPreview: preview };
  }
);

// ─── Catch-all page builder ─────────────────────────────────

export const fetchPage = createServerFn({ method: "GET" })
  .inputValidator((path: string) => path ?? "")
  .handler(async ({ data: path }) => {
    const fullPath = path.startsWith("/") ? path : `/${path}`;
    const preview = isPreviewMode();
    let page: SanityData;
    try {
      page = (await getPage(fullPath, preview)) as SanityData;
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

    return { page: page as SanityData, isPreview: preview };
  });
