import { buildCataratasPost } from "./cataratas";
import { buildEclipseSolarPost } from "./eclipse-solar";

interface FallbackBlogPostSummary {
  _id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  author: string;
  categories: string[];
  featured_image?: {
    asset: {
      url: string;
    };
  };
}

interface FallbackBlogPostDetail extends FallbackBlogPostSummary {
  body: Record<string, unknown>[];
  seo: {
    _type: "seo";
    title: string;
    description: string;
    keywords: string;
    canonicalUrl: string;
    robots: string;
  };
}

interface FallbackBlogPostDefinition {
  bodyImageUrls: string[];
  featuredImageUrl: string;
  post:
    | ReturnType<typeof buildCataratasPost>
    | ReturnType<typeof buildEclipseSolarPost>;
}

function withLocalImages(
  definition: FallbackBlogPostDefinition
): FallbackBlogPostDetail {
  let imageIndex = 0;
  const body = definition.post.body.map((block) => {
    if (block._type !== "image") {
      return block;
    }

    const imageUrl = definition.bodyImageUrls[imageIndex];
    imageIndex += 1;

    if (!imageUrl) {
      return block;
    }

    return {
      ...block,
      asset: {
        url: imageUrl,
      },
    };
  });

  return {
    _id: definition.post._id,
    title: definition.post.title,
    slug: definition.post.slug.current,
    date: definition.post.date,
    excerpt: definition.post.excerpt,
    author: definition.post.author,
    categories: definition.post.categories,
    featured_image: {
      asset: {
        url: definition.featuredImageUrl,
      },
    },
    body,
    seo: definition.post.seo,
  };
}

const fallbackBlogPosts = [
  withLocalImages({
    post: buildEclipseSolarPost({
      featuredImageRef: "local-featured",
      imageRefs: ["local-image-1", "local-image-2"],
    }),
    featuredImageUrl: "/images/blog/eclipse-solar-jaen-gafas.webp",
    bodyImageUrls: [
      "/images/blog/eclipse-solar-jaen-gafas.webp",
      "/images/blog/eclipse-solar-jaen-cielo.webp",
    ],
  }),
  withLocalImages({
    post: buildCataratasPost({
      featuredImageRef: "local-featured",
      imageRefs: ["local-image-1", "local-image-2", "local-image-3"],
    }),
    featuredImageUrl: "/images/blog/cataratas-jaen-1.webp",
    bodyImageUrls: [
      "/images/blog/cataratas-jaen-1.webp",
      "/images/blog/cataratas-jaen-2.webp",
      "/images/blog/cataratas-jaen-3.webp",
    ],
  }),
].sort((a, b) => b.date.localeCompare(a.date));

export function getFallbackBlogPosts(): FallbackBlogPostSummary[] {
  return fallbackBlogPosts.map(({ body: _body, seo: _seo, ...summary }) => ({
    ...summary,
  }));
}

export function getFallbackBlogPost(
  slug: string
): FallbackBlogPostDetail | null {
  return fallbackBlogPosts.find((post) => post.slug === slug) ?? null;
}

export function getFallbackBlogSlugs(): Array<{ slug: string }> {
  return fallbackBlogPosts.map((post) => ({ slug: post.slug }));
}
