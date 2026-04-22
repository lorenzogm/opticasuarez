import {
  type BreadcrumbItem,
  createBreadcrumbSchema,
  createFaqSchema,
  createOpticianSchema,
  createWebsiteSchema,
  type FaqItem,
} from "~/lib/structured-data-helpers";

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

export function WebsiteSchema() {
  return <StructuredData schema={createWebsiteSchema()} />;
}

export function OrganizationSchema() {
  return <StructuredData schema={createOpticianSchema()} />;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  return <StructuredData schema={createBreadcrumbSchema(items)} />;
}

export function FaqSchema({ items }: { items: FaqItem[] }) {
  return <StructuredData schema={createFaqSchema(items)} />;
}
