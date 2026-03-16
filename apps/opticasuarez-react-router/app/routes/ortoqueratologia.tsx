import { BreadcrumbSchema } from "../ui/components/structured-data";
import {
  generateMetaKeywords,
  generatePageKeywords,
} from "../ui/lib/seo-keywords";
import Ortoqueratologia from "../ui/pages/ortoqueratologia/ortoqueratologia";

export function links() {
  return [
    { rel: "canonical", href: "https://opticasuarezjaen.es/ortoqueratologia" },
  ];
}

export function meta() {
  const ortoqueratologiaKeywords = generatePageKeywords("ortoqueratologia");

  return [
    { title: "Ortoqueratología en Jaén | Óptica Suárez" },
    {
      name: "description",
      content:
        "En Óptica Suárez somos especialistas en ortoqueratología, para frenar la miopía y mejorar la visión sin necesidad de gafas. Más de 80 años de experiencia nos avalan ofreciendo Orto-K en Jaén.",
    },
    {
      name: "keywords",
      content: generateMetaKeywords(ortoqueratologiaKeywords),
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "es_ES" },
    { property: "og:site_name", content: "Óptica Suárez" },
    {
      property: "og:title",
      content: "Ortoqueratología en Jaén | Óptica Suárez",
    },
    {
      property: "og:description",
      content:
        "En Óptica Suárez somos especialistas en ortoqueratología, para frenar la miopía y mejorar la visión sin necesidad de gafas. Más de 80 años de experiencia nos avalan ofreciendo Orto-K en Jaén.",
    },
    {
      property: "og:url",
      content: "https://opticasuarezjaen.es/ortoqueratologia",
    },
    {
      property: "og:image",
      content: "https://opticasuarezjaen.es/og-image.jpg",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Ortoqueratología en Jaén | Óptica Suárez",
    },
    {
      name: "twitter:description",
      content:
        "En Óptica Suárez somos especialistas en ortoqueratología, para frenar la miopía y mejorar la visión sin necesidad de gafas. Más de 80 años de experiencia nos avalan ofreciendo Orto-K en Jaén.",
    },
    { name: "robots", content: "index, follow" },
  ];
}

export default function OrtoqueratologiaRoute() {
  const breadcrumbItems = [
    { name: "Inicio", url: "https://opticasuarezjaen.es/" },
    { name: "Servicios", url: "https://opticasuarezjaen.es/servicios" },
    {
      name: "Ortoqueratología",
      url: "https://opticasuarezjaen.es/ortoqueratologia",
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Ortoqueratologia />
    </>
  );
}
