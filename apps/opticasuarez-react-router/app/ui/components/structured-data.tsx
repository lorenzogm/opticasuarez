interface StructuredDataProps {
  schema: Record<string, unknown>;
}

export default function StructuredData({ schema }: StructuredDataProps) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
      type="application/ld+json"
    />
  );
}

// Website Schema with Sitelinks Search Box
export function WebsiteSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Óptica Suárez",
    alternateName: "Óptica Suárez Jaén",
    description:
      "Óptica Suárez en Jaén, más de 80 años cuidando tu visión. Especialistas en terapia visual, control de miopía, contactología y visión infantil.",
    url: "https://opticasuarezjaen.es",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://opticasuarezjaen.es/blog?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "Optician",
      "@id": "https://opticasuarezjaen.es/#organization",
    },
  };

  return <StructuredData schema={websiteSchema} />;
}

// Organization Schema
export function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Optician",
    "@id": "https://opticasuarezjaen.es/#organization",
    name: "Óptica Suárez",
    image: "https://opticasuarezjaen.es/og-image.jpg",
    telephone: "+34953093062",
    email: "info@opticasuarezjaen.es",
    address: {
      "@type": "PostalAddress",
      streetAddress: "C. de Canarias, 6",
      addressLocality: "Jaén",
      addressRegion: "Andalucía",
      postalCode: "23009",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.7796,
      longitude: -3.787,
    },
    url: "https://opticasuarezjaen.es",
    logo: {
      "@type": "ImageObject",
      url: "https://opticasuarezjaen.es/images/optica-suarez-logo.webp",
    },
    description:
      "Centro de Optometría y Terapia Visual en Jaén con más de 80 años de experiencia. Especializados en visión infantil, terapia visual, control de miopía y contactología.",
    foundingDate: "1940",
    slogan: "Desde 1940 al cuidado de tu visión",
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:30",
        closes: "13:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "17:00",
        closes: "20:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "13:00",
      },
    ],
    department: [
      {
        "@type": "Optician",
        name: "Óptica Suárez Bulevar",
        telephone: "+34953093062",
        address: {
          "@type": "PostalAddress",
          streetAddress: "C. de Canarias, 6",
          addressLocality: "Jaén",
          addressRegion: "Andalucía",
          postalCode: "23009",
          addressCountry: "ES",
        },
      },
      {
        "@type": "Optician",
        name: "Óptica Suárez Centro",
        telephone: "+34953223180",
        address: {
          "@type": "PostalAddress",
          streetAddress: "P.º de la Estación, 12",
          addressLocality: "Jaén",
          addressRegion: "Andalucía",
          postalCode: "23003",
          addressCountry: "ES",
        },
      },
    ],
    serviceArea: {
      "@type": "City",
      name: "Jaén",
      containedIn: {
        "@type": "State",
        name: "Andalucía",
        containedIn: {
          "@type": "Country",
          name: "España",
        },
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
            description:
              "Evaluación completa de la salud visual y detección temprana de problemas oculares.",
            url: "https://opticasuarezjaen.es/examen-visual",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Terapia Visual",
            description:
              "Programas personalizados de entrenamiento visual para mejorar habilidades visuales.",
            url: "https://opticasuarezjaen.es/terapia-visual",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Visión Pediátrica",
            description: "Cuidado especializado de la salud visual infantil.",
            url: "https://opticasuarezjaen.es/vision-pediatrica",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Control de Miopía",
            description:
              "Tratamientos avanzados para el control y prevención de la miopía.",
            url: "https://opticasuarezjaen.es/control-de-miopia",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Contactología",
            description:
              "Adaptación y seguimiento de lentes de contacto especializadas.",
            url: "https://opticasuarezjaen.es/contactologia",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ortoqueratología",
            description:
              "Corrección visual nocturna mediante lentes de contacto especiales para frenar la miopía.",
            url: "https://opticasuarezjaen.es/ortoqueratologia",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Visión Deportiva",
            description:
              "Optimización del rendimiento visual para deportistas.",
            url: "https://opticasuarezjaen.es/vision-deportiva",
          },
        },
      ],
    },
    sameAs: [
      "https://www.facebook.com/opticasuarezjaen",
      "https://www.instagram.com/opticasuarezjaen",
      "https://www.youtube.com/@OpticaSuarezJaen",
    ],
  };

  return <StructuredData schema={organizationSchema} />;
}

// Breadcrumb Schema Generator
export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <StructuredData schema={breadcrumbSchema} />;
}

// FAQ Schema Generator
export function FAQSchema({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  const faqSchema = {
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

  return <StructuredData schema={faqSchema} />;
}
