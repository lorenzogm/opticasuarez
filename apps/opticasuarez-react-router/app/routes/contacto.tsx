import { BreadcrumbSchema } from "../ui/components/structured-data";
import ContactoPage from "../ui/pages/contacto/contacto";

export function links() {
  return [{ rel: "canonical", href: "https://opticasuarezjaen.es/contacto" }];
}

export function meta() {
  return [
    { title: "Contacto - Óptica Suárez Jaén" },
    {
      name: "description",
      content:
        "¿Tienes alguna duda o pregunta? Ponte en contacto con nosotros. Encuentra nuestra información de contacto y ubicación.",
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "es_ES" },
    { property: "og:site_name", content: "Óptica Suárez" },
    {
      property: "og:title",
      content: "Contacto - Óptica Suárez Jaén",
    },
    {
      property: "og:description",
      content:
        "¿Tienes alguna duda o pregunta? Ponte en contacto con nosotros. Encuentra nuestra información de contacto y ubicación.",
    },
    {
      property: "og:url",
      content: "https://opticasuarezjaen.es/contacto",
    },
    {
      property: "og:image",
      content: "https://opticasuarezjaen.es/og-image.jpg",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Contacto - Óptica Suárez Jaén",
    },
    {
      name: "twitter:description",
      content:
        "¿Tienes alguna duda o pregunta? Ponte en contacto con nosotros. Encuentra nuestra información de contacto y ubicación.",
    },
    { name: "robots", content: "index, follow" },
  ];
}

export default function Contacto() {
  const breadcrumbItems = [
    { name: "Inicio", url: "https://opticasuarezjaen.es/" },
    { name: "Contacto", url: "https://opticasuarezjaen.es/contacto" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ContactoPage />
    </>
  );
}
