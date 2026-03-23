import { BreadcrumbSchema } from "../ui/components/structured-data";
import {
  generateMetaKeywords,
  generatePageKeywords,
} from "../ui/lib/seo-keywords";
import VisionDeportiva from "../ui/pages/vision-deportiva/vision-deportiva";

export function links() {
  return [
    { rel: "canonical", href: "https://opticasuarezjaen.es/vision-deportiva" },
  ];
}

export function meta() {
  const visionDeportivaKeywords = generatePageKeywords("vision-deportiva");

  return [
    {
      title: "Visión Deportiva en Jaén | Óptica Suárez",
    },
    {
      name: "description",
      content:
        "Optimiza tu rendimiento deportivo con nuestros servicios de visión deportiva. Evaluaciones especializadas, entrenamiento visual y equipamiento para deportistas en Jaén.",
    },
    {
      name: "keywords",
      content: generateMetaKeywords(visionDeportivaKeywords),
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "es_ES" },
    { property: "og:site_name", content: "Óptica Suárez" },
    {
      property: "og:title",
      content: "Visión Deportiva en Jaén | Óptica Suárez",
    },
    {
      property: "og:description",
      content:
        "Optimiza tu rendimiento deportivo con nuestros servicios de visión deportiva. Evaluaciones especializadas, entrenamiento visual y equipamiento para deportistas en Jaén.",
    },
    {
      property: "og:url",
      content: "https://opticasuarezjaen.es/vision-deportiva",
    },
    {
      property: "og:image",
      content: "https://opticasuarezjaen.es/og-image.jpg",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Visión Deportiva en Jaén | Óptica Suárez",
    },
    {
      name: "twitter:description",
      content:
        "Optimiza tu rendimiento deportivo con nuestros servicios de visión deportiva. Evaluaciones especializadas, entrenamiento visual y equipamiento para deportistas en Jaén.",
    },
    { name: "robots", content: "index, follow" },
  ];
}

export default function VisionDeportivaPage() {
  const breadcrumbItems = [
    { name: "Inicio", url: "https://opticasuarezjaen.es/" },
    { name: "Servicios", url: "https://opticasuarezjaen.es/servicios" },
    {
      name: "Visión Deportiva",
      url: "https://opticasuarezjaen.es/vision-deportiva",
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <VisionDeportiva />
    </>
  );
}
