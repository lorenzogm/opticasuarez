import { getBaseUrl } from "~/lib/utils";

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
    url: getBaseUrl(),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${getBaseUrl()}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": `${getBaseUrl()}/#organization`,
    },
  };

  return <StructuredData schema={websiteSchema} />;
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
