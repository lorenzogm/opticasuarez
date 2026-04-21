import { resolveImage } from "./sanity";
import { getBaseUrl } from "./utils";

interface SanitySeo {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: unknown;
  canonicalUrl?: string;
  robots?: string;
}

interface SeoFallback {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

/**
 * Builds a TanStack Router `head()` config from a Sanity `seo` object.
 * Falls back to provided defaults when Sanity fields are empty.
 */
export function buildHeadFromSanitySeo(opts: {
  seo?: SanitySeo | null;
  path: string;
  fallback: SeoFallback;
  ogType?: string;
  publishedTime?: string;
  modifiedTime?: string;
}) {
  const { seo, path, fallback, ogType, publishedTime, modifiedTime } = opts;
  const baseUrl = getBaseUrl();

  const title = seo?.title || fallback.title;
  const description = seo?.description || fallback.description;
  const keywords = seo?.keywords || fallback.keywords || "";
  const robots = seo?.robots || "index, follow, max-image-preview:large";
  const canonical = seo?.canonicalUrl || `${baseUrl}${path}`;
  const ogImage =
    resolveImage(seo?.ogImage as Parameters<typeof resolveImage>[0]) ||
    fallback.ogImage ||
    `${baseUrl}/og-image.jpg`;

  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { name: "robots", content: robots },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: `${baseUrl}${path}` },
    { property: "og:type", content: ogType || "website" },
    { property: "og:locale", content: "es_ES" },
    { property: "og:site_name", content: "Óptica Suárez" },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
  ];

  if (keywords) {
    meta.push({ name: "keywords", content: keywords });
  }

  if (publishedTime) {
    meta.push({ property: "article:published_time", content: publishedTime });
  }
  if (modifiedTime) {
    meta.push({ property: "article:modified_time", content: modifiedTime });
  }

  return {
    meta,
    links: [{ rel: "canonical", href: canonical }],
  };
}
