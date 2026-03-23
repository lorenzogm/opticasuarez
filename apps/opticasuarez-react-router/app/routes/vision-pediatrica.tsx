import { BreadcrumbSchema } from "../ui/components/structured-data";
import {
  generateMetaKeywords,
  generatePageKeywords,
} from "../ui/lib/seo-keywords";
import VisionPediatrica from "../ui/pages/vision-pediatrica/vision-pediatrica";

export function links() {
  return [
    { rel: "canonical", href: "https://opticasuarezjaen.es/vision-pediatrica" },
  ];
}

export function meta() {
  const visionPediatricaKeywords = generatePageKeywords("vision-pediatrica");

  return [
    {
      title:
        "Visión Pediátrica y Examen Visual Infantil en Jaén – Óptica Suárez",
    },
    {
      name: "description",
      content:
        "Realizamos exámenes visuales infantiles en Jaén para detectar de forma temprana ojo vago, miopía o estrabismo. Prevención y cuidado visual desde la infancia.",
    },
    {
      name: "keywords",
      content: generateMetaKeywords(visionPediatricaKeywords),
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "es_ES" },
    { property: "og:site_name", content: "Óptica Suárez" },
    {
      property: "og:title",
      content:
        "Visión Pediátrica y Examen Visual Infantil en Jaén – Óptica Suárez",
    },
    {
      property: "og:description",
      content:
        "Realizamos exámenes visuales infantiles en Jaén para detectar de forma temprana ojo vago, miopía o estrabismo. Prevención y cuidado visual desde la infancia.",
    },
    {
      property: "og:url",
      content: "https://opticasuarezjaen.es/vision-pediatrica",
    },
    {
      property: "og:image",
      content: "https://opticasuarezjaen.es/og-image.jpg",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content:
        "Visión Pediátrica y Examen Visual Infantil en Jaén – Óptica Suárez",
    },
    {
      name: "twitter:description",
      content:
        "Realizamos exámenes visuales infantiles en Jaén para detectar de forma temprana ojo vago, miopía o estrabismo. Prevención y cuidado visual desde la infancia.",
    },
    { name: "robots", content: "index, follow" },
  ];
}

export default function VisionPediatricaRoute() {
  const breadcrumbItems = [
    { name: "Inicio", url: "https://opticasuarezjaen.es/" },
    { name: "Servicios", url: "https://opticasuarezjaen.es/servicios" },
    {
      name: "Visión Infantil",
      url: "https://opticasuarezjaen.es/vision-pediatrica",
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <VisionPediatrica />
    </>
  );
}
