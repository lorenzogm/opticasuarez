import { BreadcrumbSchema } from "../ui/components/structured-data";
import {
  generateMetaKeywords,
  generatePageKeywords,
} from "../ui/lib/seo-keywords";
import Contactologia from "../ui/pages/contactologia/contactologia";

export function links() {
  return [
    { rel: "canonical", href: "https://opticasuarezjaen.es/contactologia" },
  ];
}

export function meta() {
  const contactologiaKeywords = generatePageKeywords("contactologia");

  return [
    {
      title: "Lentes de contacto en Jaén | Óptica Suárez",
    },
    {
      name: "description",
      content:
        "Óptica Suárez, tu centro de contactología en Jaén. Adaptamos tus lentillas con precisión, confort y la última tecnología óptica.",
    },
    {
      name: "keywords",
      content: generateMetaKeywords(contactologiaKeywords),
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "es_ES" },
    { property: "og:site_name", content: "Óptica Suárez" },
    {
      property: "og:title",
      content: "Lentes de contacto en Jaén | Óptica Suárez",
    },
    {
      property: "og:description",
      content:
        "Óptica Suárez, tu centro de contactología en Jaén. Adaptamos tus lentillas con precisión, confort y la última tecnología óptica.",
    },
    {
      property: "og:url",
      content: "https://opticasuarezjaen.es/contactologia",
    },
    {
      property: "og:image",
      content: "https://opticasuarezjaen.es/og-image.jpg",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Lentes de contacto en Jaén | Óptica Suárez",
    },
    {
      name: "twitter:description",
      content:
        "Óptica Suárez, tu centro de contactología en Jaén. Adaptamos tus lentillas con precisión, confort y la última tecnología óptica.",
    },
    { name: "robots", content: "index, follow" },
  ];
}

export default function ContactologiaPage() {
  const breadcrumbItems = [
    { name: "Inicio", url: "https://opticasuarezjaen.es/" },
    { name: "Servicios", url: "https://opticasuarezjaen.es/servicios" },
    {
      name: "Contactología",
      url: "https://opticasuarezjaen.es/contactologia",
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Contactologia />
    </>
  );
}
