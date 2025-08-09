interface StructuredDataProps {
  schema: Record<string, unknown>;
}

export default function StructuredData({ schema }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
}

// Website Schema with Sitelinks Search Box
export function WebsiteSchema() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Óptica Suárez',
    alternateName: 'Óptica Suárez Jaén',
    description:
      'Óptica Suárez, tu Centro de Optometría y Terapia Visual en Jaén, con más de 80 años cuidando de la salud visual. Especializados en visión infantil, Terapia Visual Comportamental, Control de Miopía, Contactología y visión deportiva.',
    url: 'https://opticasuarezjaen.es',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://opticasuarezjaen.es/blog?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    mainEntity: {
      '@type': 'LocalBusiness',
      '@id': 'https://opticasuarezjaen.es/#organization',
    },
  };

  return <StructuredData schema={websiteSchema} />;
}

// Organization Schema
export function OrganizationSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://opticasuarezjaen.es/#organization',
    name: 'Óptica Suárez',
    image: 'https://opticasuarezjaen.es/og-image.jpg',
    telephone: '+34953123456',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Ejemplo, 123',
      addressLocality: 'Jaén',
      addressRegion: 'Andalucía',
      postalCode: '23001',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.7749,
      longitude: -3.7900,
    },
    url: 'https://opticasuarezjaen.es',
    logo: 'https://opticasuarezjaen.es/logo.png',
    description:
      'Centro de Optometría y Terapia Visual en Jaén con más de 80 años de experiencia. Especializados en visión infantil, terapia visual, control de miopía y contactología.',
    foundingDate: '1940',
    slogan: 'Desde 1940 al cuidado de tu visión',
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:30',
        closes: '13:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '17:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:30',
        closes: '13:30',
      },
    ],
    serviceArea: {
      '@type': 'City',
      name: 'Jaén',
      containedIn: {
        '@type': 'State',
        name: 'Andalucía',
        containedIn: {
          '@type': 'Country',
          name: 'España',
        },
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Óptica y Optometría',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Examen Visual Completo',
            description: 'Evaluación completa de la salud visual y detección temprana de problemas oculares.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Terapia Visual',
            description: 'Programas personalizados de entrenamiento visual para mejorar habilidades visuales.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Visión Pediátrica',
            description: 'Cuidado especializado de la salud visual infantil.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Control de Miopía',
            description: 'Tratamientos avanzados para el control y prevención de la miopía.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Contactología',
            description: 'Adaptación y seguimiento de lentes de contacto especializadas.',
          },
        },
      ],
    },
    sameAs: [
      'https://www.facebook.com/opticasuarezjaen',
      'https://www.instagram.com/opticasuarezjaen',
    ],
  };

  return <StructuredData schema={organizationSchema} />;
}

// Breadcrumb Schema Generator
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <StructuredData schema={breadcrumbSchema} />;
}