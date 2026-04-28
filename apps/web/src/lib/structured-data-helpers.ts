import contactContent from "~/content/contacto.json" with { type: "json" };

import { getBaseUrl } from "./utils";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

interface BreadcrumbOptions {
  path: string;
  title: string;
  baseUrl?: string;
}

interface BlogBreadcrumbOptions {
  slug: string;
  title: string;
  baseUrl?: string;
}

interface SitemapPage {
  path?: string | null;
}

interface SitemapBlogPost {
  slug?: string | null;
}

interface SitemapProduct {
  slug?: string | null;
}

interface SitemapRouteOptions {
  staticRoutes: string[];
  pages: SitemapPage[];
  blogSlugs: SitemapBlogPost[];
  productSlugs: SitemapProduct[];
  shopEnabled: boolean;
}

interface AccordionEntry {
  title?: string;
  content?: string;
}

interface AccordionSection {
  _type?: string;
  title?: string;
  items?: AccordionEntry[];
  accordionItems?: AccordionEntry[];
}

interface VisibleLocationSchedule {
  weekdaysHours: string;
  saturdayHours: string;
}

interface VisibleLocationContent {
  email: string;
  schedule: VisibleLocationSchedule;
}

interface OpeningHoursSpecification {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
}

const FAQ_TITLE_PATTERN = /(preguntas frecuentes|faq)/i;

function normalizeTime(value: string): string {
  const [hours, minutes = "00"] = value.trim().split(":");

  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
}

function extractTimeRanges(hoursText: string) {
  const segments = hoursText
    .split(/\s+y\s+/i)
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (segments.length === 0) {
    throw new Error(`Missing visible opening hours in "${hoursText}"`);
  }

  return segments.map((segment) => {
    const match = segment.match(/^(\d{1,2}:\d{2})\s*a\s*(\d{1,2}:\d{2})$/);

    if (!match) {
      throw new Error(`Invalid visible opening hours format: "${hoursText}"`);
    }

    const [, opens, closes] = match;

    return {
      opens: normalizeTime(opens),
      closes: normalizeTime(closes),
    };
  });
}

function getVisibleLocationSchedule(
  email: string,
  locations = contactContent.locations.locations as VisibleLocationContent[]
): VisibleLocationSchedule {
  const location = locations.find((candidate) => candidate.email === email);

  if (!location) {
    throw new Error(`Missing visible location schedule for ${email}`);
  }

  return location.schedule;
}

function buildOpeningHoursSpecification(
  schedule: VisibleLocationSchedule
): OpeningHoursSpecification[] {
  const weekdays = extractTimeRanges(schedule.weekdaysHours).map(
    ({ opens, closes }) => ({
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens,
      closes,
    })
  );

  const saturday = extractTimeRanges(schedule.saturdayHours).map(
    ({ opens, closes }) => ({
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: "Saturday",
      opens,
      closes,
    })
  );

  return [...weekdays, ...saturday];
}

const departmentSpecs = [
  {
    id: "bulevar",
    name: "Óptica Suárez Bulevar",
    image: "/images/homepage/locations/optica-bulevar.webp",
    telephone: "+34-953-09-30-62",
    email: "bulevar@opticasuarezjaen.es",
    streetAddress: "C. de Canarias, 6",
    postalCode: "23009",
    latitude: 37.780_796_2,
    longitude: -3.788_001_8,
    hasMap: "https://maps.google.com/maps?q=C.+de+Canarias,+6,+23009+Jaén",
  },
  {
    id: "centro",
    name: "Óptica Suárez Centro",
    image: "/images/homepage/locations/optica-centro.webp",
    telephone: "+34-953-22-31-80",
    email: "centro@opticasuarezjaen.es",
    streetAddress: "P.º de la Estación, 12",
    postalCode: "23003",
    latitude: 37.770_092,
    longitude: -3.788_108,
    hasMap: "https://maps.google.com/maps?q=P.º+de+la+Estación,+12,+23003+Jaén",
  },
] as const;

const primaryOrganizationContact = {
  telephone: "+34-953-09-30-62",
  email: "info@opticasuarezjaen.es",
  streetAddress: "C. de Canarias, 6",
  postalCode: "23009",
} as const;

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, "");
}

export function normalizeRoutePath(path?: string | null): string {
  if (!path) {
    return "";
  }

  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  const withoutTrailingSlash = withLeadingSlash.replace(/\/+$/, "");

  return withoutTrailingSlash || "/";
}

function buildAbsoluteUrl(baseUrl: string, path: string): string {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
  const normalizedPath = normalizeRoutePath(path);

  if (!normalizedPath || normalizedPath === "/") {
    return `${normalizedBaseUrl}/`;
  }

  return `${normalizedBaseUrl}${normalizedPath}`;
}

function getAccordionEntries(section: AccordionSection): AccordionEntry[] {
  if (Array.isArray(section.accordionItems)) {
    return section.accordionItems;
  }

  if (Array.isArray(section.items)) {
    return section.items;
  }

  return [];
}

function isFaqAccordionSection(section: unknown): section is AccordionSection {
  if (!section || typeof section !== "object") {
    return false;
  }

  const candidate = section as AccordionSection;
  return (
    candidate._type === "sectionAccordion" &&
    FAQ_TITLE_PATTERN.test(candidate.title ?? "")
  );
}

export function createWebsiteSchema(baseUrl = getBaseUrl()) {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Óptica Suárez",
    alternateName: "Óptica Suárez Jaén",
    description:
      "Óptica Suárez en Jaén, más de 80 años cuidando tu visión. Especialistas en terapia visual, control de miopía, contactología y visión infantil.",
    url: normalizedBaseUrl,
    inLanguage: "es",
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": `${normalizedBaseUrl}/#organization`,
    },
  };
}

export function createOpticianSchema(baseUrl = getBaseUrl()) {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);

  return {
    "@context": "https://schema.org",
    "@type": "Optician",
    "@id": `${normalizedBaseUrl}/#organization`,
    name: "Óptica Suárez",
    url: normalizedBaseUrl,
    logo: `${normalizedBaseUrl}/images/optica-suarez-logo.webp`,
    image: `${normalizedBaseUrl}/og-image.jpg`,
    telephone: primaryOrganizationContact.telephone,
    email: primaryOrganizationContact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: primaryOrganizationContact.streetAddress,
      addressLocality: "Jaén",
      addressRegion: "Andalucía",
      postalCode: primaryOrganizationContact.postalCode,
      addressCountry: "ES",
    },
    description:
      "Centro de Optometría y Terapia Visual en Jaén con más de 80 años de experiencia. Especializados en visión infantil, terapia visual, control de miopía y contactología.",
    foundingDate: "1940",
    priceRange: "$$",
    sameAs: [
      "https://www.instagram.com/opticasuarezjaen/",
      "https://www.facebook.com/opticasuarezjaen/",
      "https://x.com/opticasuarez",
      "https://www.youtube.com/c/OpticaSuarezJa%C3%A9n/",
    ],
    serviceArea: {
      "@type": "City",
      name: "Jaén",
      containedIn: {
        "@type": "AdministrativeArea",
        name: "Andalucía",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Óptica y Optometría",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Examen Visual Completo",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Terapia Visual",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Visión Pediátrica",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Control de Miopía",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Contactología",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Visión Deportiva",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ortoqueratología",
          },
        },
      ],
    },
    department: departmentSpecs.map((department) => ({
      "@type": "Optician",
      "@id": `${normalizedBaseUrl}/#${department.id}`,
      name: department.name,
      image: `${normalizedBaseUrl}${department.image}`,
      priceRange: "$$",
      telephone: department.telephone,
      email: department.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: department.streetAddress,
        addressLocality: "Jaén",
        addressRegion: "Andalucía",
        postalCode: department.postalCode,
        addressCountry: "ES",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: department.latitude,
        longitude: department.longitude,
      },
      hasMap: department.hasMap,
      openingHoursSpecification: buildOpeningHoursSpecification(
        getVisibleLocationSchedule(department.email)
      ),
    })),
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function extractServiceFaqItems(
  path: string,
  sections: unknown[] = []
): FaqItem[] {
  const normalizedPath = normalizeRoutePath(path);

  if (!normalizedPath.startsWith("/servicios/")) {
    return [];
  }

  return sections
    .filter(isFaqAccordionSection)
    .flatMap((section) => getAccordionEntries(section))
    .flatMap((item) => {
      const question = item.title?.trim();
      const answer = item.content?.trim();

      if (typeof question !== "string" || question.length === 0) {
        return [];
      }

      if (typeof answer !== "string" || answer.length === 0) {
        return [];
      }

      return [{ question, answer }];
    });
}

export function buildDynamicPageBreadcrumbItems({
  path,
  title,
  baseUrl = getBaseUrl(),
}: BreadcrumbOptions): BreadcrumbItem[] {
  const normalizedPath = normalizeRoutePath(path);
  const home = {
    name: "Inicio",
    url: buildAbsoluteUrl(baseUrl, "/"),
  };

  if (!normalizedPath || normalizedPath === "/") {
    return [home];
  }

  if (normalizedPath === "/servicios") {
    return [
      home,
      {
        name: title,
        url: buildAbsoluteUrl(baseUrl, normalizedPath),
      },
    ];
  }

  if (normalizedPath.startsWith("/servicios/")) {
    return [
      home,
      {
        name: "Servicios",
        url: buildAbsoluteUrl(baseUrl, "/servicios"),
      },
      {
        name: title,
        url: buildAbsoluteUrl(baseUrl, normalizedPath),
      },
    ];
  }

  return [
    home,
    {
      name: title,
      url: buildAbsoluteUrl(baseUrl, normalizedPath),
    },
  ];
}

export function buildBlogPostBreadcrumbItems({
  slug,
  title,
  baseUrl = getBaseUrl(),
}: BlogBreadcrumbOptions): BreadcrumbItem[] {
  return [
    {
      name: "Inicio",
      url: buildAbsoluteUrl(baseUrl, "/"),
    },
    {
      name: "Blog",
      url: buildAbsoluteUrl(baseUrl, "/blog"),
    },
    {
      name: title,
      url: buildAbsoluteUrl(baseUrl, `/blog/${slug}`),
    },
  ];
}

export function buildSitemapRoutes({
  staticRoutes,
  pages,
  blogSlugs,
  productSlugs,
  shopEnabled,
}: SitemapRouteOptions): string[] {
  const routes = [
    ...staticRoutes.map((route) => normalizeRoutePath(route)).filter(Boolean),
    ...pages.map((page) => normalizeRoutePath(page.path)).filter(Boolean),
    ...blogSlugs
      .map((post) =>
        post.slug ? normalizeRoutePath(`/blog/${post.slug}`) : ""
      )
      .filter(Boolean),
  ];

  if (shopEnabled) {
    routes.push(
      "/tienda",
      ...productSlugs
        .map((product) =>
          product.slug ? normalizeRoutePath(`/tienda/${product.slug}`) : ""
        )
        .filter(Boolean)
    );
  }

  return [...new Set(routes)];
}
