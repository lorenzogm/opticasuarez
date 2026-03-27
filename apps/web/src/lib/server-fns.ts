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
import {
  getAboutPage,
  getBlogPost,
  getBlogPosts,
  getBrands,
  getContactPage,
  getFeaturedProducts,
  getHomepage,
  getPage,
  getPlanVeoPage,
  getProduct,
  getProductCategories,
  getProducts,
  getServicePage,
  getServiciosOverview,
} from "~/lib/sanity";

// biome-ignore lint/suspicious/noExplicitAny: Sanity queries return unknown; we use any for server function compatibility
type SanityData = any;

// ─── Homepage ────────────────────────────────────────────────

export const fetchHomepageData = createServerFn({ method: "GET" }).handler(
  async () => {
    const [homepage, featuredProducts, allProducts] = await Promise.all([
      getHomepage(),
      getFeaturedProducts(),
      getProducts(),
    ]);
    const featured = (featuredProducts || []) as SanityData[];
    const all = (allProducts || []) as SanityData[];
    const products = featured?.length > 0 ? featured : (all || []).slice(0, 4);
    return {
      homepage: homepage as SanityData,
      featuredProducts: products as SanityData[],
    };
  }
);

// ─── Service pages ───────────────────────────────────────────

export const fetchServicePage = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const data = await getServicePage(slug);
    return { data: data as SanityData };
  });

// ─── Servicios overview ──────────────────────────────────────

export const fetchServiciosOverview = createServerFn({
  method: "GET",
}).handler(async () => {
  const data = await getServiciosOverview();
  return { data: data as SanityData };
});

// ─── About page ──────────────────────────────────────────────

export const fetchAboutPage = createServerFn({ method: "GET" }).handler(
  async () => {
    const data = await getAboutPage();
    return { data: data as SanityData };
  }
);

// ─── Contact page ────────────────────────────────────────────

export const fetchContactPage = createServerFn({ method: "GET" }).handler(
  async () => {
    const data = await getContactPage();
    return { data: data as SanityData };
  }
);

// ─── Plan VEO page ───────────────────────────────────────────

export const fetchPlanVeoPage = createServerFn({ method: "GET" }).handler(
  async () => {
    const data = await getPlanVeoPage();
    return { data: data as SanityData };
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

// ─── Catch-all page builder ─────────────────────────────────

export const fetchPage = createServerFn({ method: "GET" })
  .inputValidator((path: string) => path)
  .handler(async ({ data: path }) => {
    const page = await getPage(path);
    return { page: page as SanityData };
  });
