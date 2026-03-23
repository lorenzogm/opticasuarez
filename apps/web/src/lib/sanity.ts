import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || "2a24wmex";
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = "2026-03-23";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "previewDrafts",
  token: process.env.SANITY_API_TOKEN,
});

export function getClient(preview = false) {
  return preview ? previewClient : sanityClient;
}

// Image URL helper — converts Sanity image reference to CDN URL
export function sanityImageUrl(ref: string): string {
  if (!ref) return "";
  // ref format: image-<id>-<width>x<height>-<format>
  const parts = ref.replace("image-", "").split("-");
  const id = parts[0];
  const dimensions = parts[1];
  const format = parts[2];
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
}

// Resolve image field — handles both Sanity image objects and plain URL strings
export function resolveImage(
  image:
    | { asset?: { url?: string; _ref?: string }; url?: string }
    | string
    | undefined
): string {
  if (!image) return "";
  if (typeof image === "string") return image;
  if (image.asset?.url) return image.asset.url;
  if (image.asset?._ref) return sanityImageUrl(image.asset._ref);
  if (image.url) return image.url;
  return "";
}

// Common image projection for GROQ queries
const imageProjection = `{
  asset->{url, _ref}
}`;

// Location projection used across multiple queries
const locationProjection = `{
  _id,
  name,
  "image": image ${imageProjection},
  imageTitle,
  address,
  schedule,
  phone,
  phoneUrl,
  whatsappUrl,
  email,
  mapUrl,
  contactUrl
}`;

// Team member projection
const teamMemberProjection = `{
  _id,
  name,
  role,
  "image": image ${imageProjection},
  details
}`;

// Homepage
export async function getHomepage(preview = false) {
  const client = getClient(preview);
  return client.fetch(`*[_type == "homepage"][0]{
    hero,
    servicesGrid{
      items[]{
        title,
        description,
        url,
        "image": image ${imageProjection},
        alt,
        imageTitle
      }
    },
    videoAbout,
    socialMedia,
    specialists,
    news,
    locations{
      title,
      "items": items[]->${locationProjection}
    },
    partners{
      title,
      items[]{
        name,
        "image": image ${imageProjection}
      }
    },
    services,
    about,
    brands{
      title,
      description,
      "items": items[]{
        name,
        "image": image ${imageProjection}
      }
    },
    testimonials,
    bookAppointment,
    contact,
    seo
  }`);
}

// Service page by slug
export async function getServicePage(slug: string, preview = false) {
  const client = getClient(preview);
  return client.fetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      mainTitle,
      subtitle,
      "heroImage": heroImage ${imageProjection},
      intro,
      itemsSectionTitle,
      itemsSectionSubtitle,
      items[]{
        title,
        description,
        icon,
        "image": image ${imageProjection},
        imageTitle,
        imageAlt,
        link,
        benefits
      },
      process{
        title,
        description,
        steps[]{
          stepNumber,
          title,
          description,
          "image": image ${imageProjection}
        }
      },
      benefits,
      frequency,
      faq,
      cta,
      "locations": locations[]->${locationProjection},
      seo
    }`,
    { slug }
  );
}

// About page
export async function getAboutPage(preview = false) {
  const client = getClient(preview);
  return client.fetch(`*[_type == "aboutPage"][0]{
    mainTitle,
    history{
      title,
      timeline[]{
        year,
        title,
        description,
        "image": image ${imageProjection}
      }
    },
    team{
      title,
      "members": members[]->${teamMemberProjection}
    },
    testimonials{
      title,
      moreReviewsLink,
      items[]
    },
    "locations": locations[]->${locationProjection},
    socialMedia[],
    seo
  }`);
}

// Contact page
export async function getContactPage(preview = false) {
  const client = getClient(preview);
  return client.fetch(`*[_type == "contactPage"][0]{
    hero,
    contactInfo,
    locations{
      title,
      subtitle,
      "items": items[]->${locationProjection}
    },
    contactForm,
    socialMedia,
    seo
  }`);
}

// Servicios overview
export async function getServiciosOverview(preview = false) {
  const client = getClient(preview);
  return client.fetch(`*[_type == "serviciosOverview"][0]{
    title,
    description,
    services[]{
      title,
      description,
      url,
      "image": image ${imageProjection},
      alt,
      imageTitle
    },
    seo
  }`);
}

// Plan VEO page
export async function getPlanVeoPage(preview = false) {
  const client = getClient(preview);
  return client.fetch(`*[_type == "planVeoPage"][0]{
    mainTitle,
    hero{
      title,
      subtitle,
      description,
      ctaText,
      ctaUrl,
      "image": image ${imageProjection},
      imageTitle,
      imageAlt
    },
    introduction,
    benefits{
      title,
      subtitle,
      items[]{
        title,
        description,
        icon,
        "image": image ${imageProjection},
        imageTitle,
        imageAlt
      }
    },
    requirements,
    howItWorks{
      title,
      subtitle,
      steps[]{
        stepNumber,
        title,
        description,
        "image": image ${imageProjection}
      }
    },
    faq,
    cta,
    seo
  }`);
}

// Site settings
export async function getSiteSettings(preview = false) {
  const client = getClient(preview);
  return client.fetch(`*[_type == "siteSettings"][0]{
    siteName,
    phone,
    phoneUrl,
    email,
    whatsappUrl,
    address,
    socialMedia[],
    navigationItems[]
  }`);
}

// Blog posts (listing)
export async function getBlogPosts(preview = false) {
  const client = getClient(preview);
  return client.fetch(`*[_type == "blogPost"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    excerpt,
    author,
    categories,
    "featured_image": featuredImage ${imageProjection}
  }`);
}

// Single blog post by slug
export async function getBlogPost(slug: string, preview = false) {
  const client = getClient(preview);
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      date,
      excerpt,
      author,
      categories,
      "featured_image": featuredImage ${imageProjection},
      body,
      seo
    }`,
    { slug }
  );
}

// All blog slugs (for sitemap)
export async function getAllBlogSlugs(preview = false) {
  const client = getClient(preview);
  return client.fetch(`*[_type == "blogPost"]{ "slug": slug.current }`);
}

// All service page slugs (for sitemap)
export async function getAllServiceSlugs(preview = false) {
  const client = getClient(preview);
  return client.fetch(`*[_type == "servicePage"]{ "slug": slug.current }`);
}
