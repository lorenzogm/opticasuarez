const projectId = process.env.SANITY_PROJECT_ID || "2a24wmex";
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = "2026-03-23";

const SANITY_API_URL = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`;
const SANITY_CDN_URL = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`;

async function sanityFetch<T>(
  query: string,
  params?: Record<string, string>,
  preview = false
): Promise<T> {
  const baseUrl = preview ? SANITY_API_URL : SANITY_CDN_URL;
  const url = new URL(baseUrl);
  url.searchParams.set("query", query);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(`$${key}`, `"${value}"`);
    }
  }
  const headers: Record<string, string> = {};
  if (preview && process.env.SANITY_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.SANITY_API_TOKEN}`;
  }
  const res = await fetch(url.toString(), { headers });
  if (!res.ok) {
    throw new Error(`Sanity query failed: ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as { result: T };
  return json.result;
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
  return sanityFetch(
    `*[_type == "homepage"][0]{
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
  }`,
    undefined,
    preview
  );
}

// Service page by slug
export async function getServicePage(slug: string, preview = false) {
  return sanityFetch(
    `*[_type == "servicePage" && slug.current == $slug][0]{
      mainTitle,
      subtitle,
      "heroImage": heroImage ${imageProjection},
      heroDescription,
      intro,
      introduction,
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
      testimonials{
        title,
        items[]
      },
      visualTherapy{
        title,
        description,
        skills[],
        improvements,
        images[]{
          "src": src ${imageProjection},
          alt,
          title
        },
        ctaButton
      },
      ageGroups{
        title,
        subtitle,
        groups[]
      },
      warningSign,
      science,
      candidates,
      whyChooseUs,
      "locations": locations[]->${locationProjection},
      seo
    }`,
    { slug },
    preview
  );
}

// About page
export async function getAboutPage(preview = false) {
  return sanityFetch(
    `*[_type == "aboutPage"][0]{
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
  }`,
    undefined,
    preview
  );
}

// Contact page
export async function getContactPage(preview = false) {
  return sanityFetch(
    `*[_type == "contactPage"][0]{
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
  }`,
    undefined,
    preview
  );
}

// Servicios overview
export async function getServiciosOverview(preview = false) {
  return sanityFetch(
    `*[_type == "serviciosOverview"][0]{
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
  }`,
    undefined,
    preview
  );
}

// Plan VEO page
export async function getPlanVeoPage(preview = false) {
  return sanityFetch(
    `*[_type == "planVeoPage"][0]{
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
  }`,
    undefined,
    preview
  );
}

// Site settings
export async function getSiteSettings(preview = false) {
  return sanityFetch(
    `*[_type == "siteSettings"][0]{
    siteName,
    phone,
    phoneUrl,
    email,
    whatsappUrl,
    address,
    socialMedia[],
    navigationItems[]
  }`,
    undefined,
    preview
  );
}

// Blog posts (listing)
export async function getBlogPosts(preview = false) {
  return sanityFetch(
    `*[_type == "blogPost"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    excerpt,
    author,
    categories,
    "featured_image": featuredImage ${imageProjection}
  }`,
    undefined,
    preview
  );
}

// Single blog post by slug
export async function getBlogPost(slug: string, preview = false) {
  return sanityFetch(
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
    { slug },
    preview
  );
}

// All blog slugs (for sitemap)
export async function getAllBlogSlugs(preview = false) {
  return sanityFetch(
    `*[_type == "blogPost"]{ "slug": slug.current }`,
    undefined,
    preview
  );
}

// All service page slugs (for sitemap)
export async function getAllServiceSlugs(preview = false) {
  return sanityFetch(
    `*[_type == "servicePage"]{ "slug": slug.current }`,
    undefined,
    preview
  );
}

// ──────────────────────────────────────
// New Page + Sections system
// ──────────────────────────────────────

const cardItemProjection = `{
  _key,
  title,
  description,
  "image": image ${imageProjection},
  icon,
  link,
  "ref": reference->{
    _type,
    _id,
    title,
    "name": name,
    "slug": slug.current,
    description,
    "image": image ${imageProjection},
    icon,
    role,
    details,
    address,
    schedule,
    phone,
    phoneUrl,
    whatsappUrl,
    email,
    mapUrl,
    contactUrl,
    imageTitle
  }
}`;

const sectionProjection = `{
  _type,
  _key,
  title,
  subtitle,
  description,
  // sectionHero
  "image": image ${imageProjection},
  imageAlt,
  ctaText,
  ctaUrl,
  // sectionCards
  variant,
  "items": items[]${cardItemProjection},
  // sectionFeatures
  "featureItems": items[]{
    _key,
    icon,
    title,
    description,
    "image": image ${imageProjection},
    link
  },
  // sectionText
  content,
  imagePosition,
  // sectionAccordion
  "accordionItems": items[]{
    _key,
    title,
    content
  },
  // sectionTeaser
  buttonText,
  buttonUrl,
  // sectionTestimonials
  moreReviewsLink,
  "testimonialItems": items[]{
    _key,
    name,
    text,
    rating
  },
  // sectionTimeline
  "timelineItems": items[]{
    _key,
    year,
    title,
    description,
    "image": image ${imageProjection}
  }
}`;

// Get a page by path (new system)
export async function getPage(path: string, preview = false) {
  return sanityFetch(
    `*[_type == "page" && path.current == $path][0]{
      _id,
      title,
      "path": path.current,
      "sections": sections[]${sectionProjection},
      seo
    }`,
    { path },
    preview
  );
}

// Get all pages (for sitemap)
export async function getAllPages(preview = false) {
  return sanityFetch(
    `*[_type == "page"]{ _id, title, "path": path.current }`,
    undefined,
    preview
  );
}

// Services (structured data)
export async function getServices(preview = false) {
  return sanityFetch(
    `*[_type == "service"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      "image": image ${imageProjection},
      icon,
      order
    }`,
    undefined,
    preview
  );
}

export async function getService(slug: string, preview = false) {
  return sanityFetch(
    `*[_type == "service" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      description,
      "image": image ${imageProjection},
      icon
    }`,
    { slug },
    preview
  );
}

// Locations (structured data)
export async function getLocations(preview = false) {
  return sanityFetch(
    `*[_type == "location"]{
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
    }`,
    undefined,
    preview
  );
}

// Team members (structured data)
export async function getTeamMembers(preview = false) {
  return sanityFetch(
    `*[_type == "teamMember"]{
      _id,
      name,
      role,
      "image": image ${imageProjection},
      details
    }`,
    undefined,
    preview
  );
}

// ──────────────────────────────────────
// Tienda — Products, Brands, Categories
// ──────────────────────────────────────

// Product listing with optional filters
export async function getProducts(preview = false) {
  return sanityFetch(
    `*[_type == "product"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      "images": images[] ${imageProjection},
      price,
      salePrice,
      "brand": brand->{_id, name, "slug": slug.current, "logo": logo ${imageProjection}},
      "category": category->{_id, name, "slug": slug.current},
      availability,
      tags,
      featured
    }`,
    undefined,
    preview
  );
}

// Single product by slug
export async function getProduct(slug: string, preview = false) {
  return sanityFetch(
    `*[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      "slug": slug.current,
      "images": images[] ${imageProjection},
      price,
      salePrice,
      "brand": brand->{_id, name, "slug": slug.current, "logo": logo ${imageProjection}},
      "category": category->{_id, name, "slug": slug.current},
      description,
      specs{
        material,
        gender,
        frameDimensions
      },
      colors[]{
        name,
        hex,
        "image": image ${imageProjection}
      },
      availability,
      tags,
      featured,
      seo
    }`,
    { slug },
    preview
  );
}

// Featured products (for homepage)
export async function getFeaturedProducts(preview = false) {
  return sanityFetch(
    `*[_type == "product" && featured == true] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      "images": images[] ${imageProjection},
      price,
      salePrice,
      "brand": brand->{_id, name, "slug": slug.current},
      "category": category->{_id, name, "slug": slug.current},
      availability
    }`,
    undefined,
    preview
  );
}

// Brands
export async function getBrands(preview = false) {
  return sanityFetch(
    `*[_type == "brand"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      "logo": logo ${imageProjection}
    }`,
    undefined,
    preview
  );
}

// Product categories
export async function getProductCategories(preview = false) {
  return sanityFetch(
    `*[_type == "productCategory"] | order(order asc) {
      _id,
      name,
      "slug": slug.current,
      description,
      "image": image ${imageProjection},
      order
    }`,
    undefined,
    preview
  );
}

// All product slugs (for sitemap)
export async function getAllProductSlugs(preview = false) {
  return sanityFetch(
    `*[_type == "product"]{ "slug": slug.current }`,
    undefined,
    preview
  );
}
