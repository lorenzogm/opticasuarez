import { BreadcrumbSchema } from "../ui/components/structured-data";
import {
  generateMetaKeywords,
  generatePageKeywords,
} from "../ui/lib/seo-keywords";
import Servicios from "../ui/pages/servicios/servicios";

export function links() {
  return [{ rel: "canonical", href: "https://opticasuarezjaen.es/servicios" }];
}

export function meta() {
  const serviciosKeywords = generatePageKeywords("servicios", [
    "Servicios ópticos",
    "Servicios optométricos",
    "Especialidades ópticas",
  ]);

  return [
    { title: "Servicios - Óptica Suárez" },
    {
      name: "description",
      content:
        "¿Conoces nuestros servicios? Entra y y fíjate en todo lo que Óptica Suárez puede ofrecerte: exámenes visuales, terapia visual, contactología y más.",
    },
    {
      name: "keywords",
      content: generateMetaKeywords(serviciosKeywords),
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "es_ES" },
    { property: "og:site_name", content: "Óptica Suárez" },
    {
      property: "og:title",
      content: "Servicios - Óptica Suárez",
    },
    {
      property: "og:description",
      content:
        "¿Conoces nuestros servicios? Entra y y fíjate en todo lo que Óptica Suárez puede ofrecerte: exámenes visuales, terapia visual, contactología y más.",
    },
    {
      property: "og:url",
      content: "https://opticasuarezjaen.es/servicios",
    },
    {
      property: "og:image",
      content: "https://opticasuarezjaen.es/og-image.jpg",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Servicios - Óptica Suárez",
    },
    {
      name: "twitter:description",
      content:
        "¿Conoces nuestros servicios? Entra y fíjate en todo lo que Óptica Suárez puede ofrecerte: exámenes visuales, terapia visual, contactología y más.",
    },
    { name: "robots", content: "index, follow" },
  ];
}

export default function ServiciosRoute() {
  const breadcrumbItems = [
    { name: "Inicio", url: "https://opticasuarezjaen.es/" },
    { name: "Servicios", url: "https://opticasuarezjaen.es/servicios" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Servicios />
    </>
  );
}
