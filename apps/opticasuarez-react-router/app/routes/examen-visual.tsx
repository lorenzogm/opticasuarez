import { BreadcrumbSchema } from "../ui/components/structured-data";
import {
  generateMetaKeywords,
  generatePageKeywords,
} from "../ui/lib/seo-keywords";
import ExamenVisual from "../ui/pages/examen-visual/examen-visual";

export function links() {
  return [
    { rel: "canonical", href: "https://opticasuarezjaen.es/examen-visual" },
  ];
}

export function meta() {
  const examenVisualKeywords = generatePageKeywords("examen-visual");

  return [
    { title: "Examen Visual en Jaén | Óptica Suárez - Graduación de la vista" },
    {
      name: "description",
      content:
        "Realiza un examen visual completo en Óptica Suárez, Jaén. Detectamos problemas como ambliopía, ojo vago o estrabismo. ¡Reserva tu cita hoy!",
    },
    {
      name: "keywords",
      content: generateMetaKeywords(examenVisualKeywords),
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "es_ES" },
    { property: "og:site_name", content: "Óptica Suárez" },
    {
      property: "og:title",
      content: "Examen Visual en Jaén | Óptica Suárez - Graduación de la vista",
    },
    {
      property: "og:description",
      content:
        "Realiza un examen visual completo en Óptica Suárez, Jaén. Detectamos problemas como ambliopía, ojo vago o estrabismo. ¡Reserva tu cita hoy!",
    },
    {
      property: "og:url",
      content: "https://opticasuarezjaen.es/examen-visual",
    },
    {
      property: "og:image",
      content: "https://opticasuarezjaen.es/og-image.jpg",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Examen Visual en Jaén | Óptica Suárez - Graduación de la vista",
    },
    {
      name: "twitter:description",
      content:
        "Realiza un examen visual completo en Óptica Suárez, Jaén. Detectamos problemas como ambliopía, ojo vago o estrabismo. ¡Reserva tu cita hoy!",
    },
    { name: "robots", content: "index, follow" },
  ];
}

export default function ExamenVisualPage() {
  const breadcrumbItems = [
    { name: "Inicio", url: "https://opticasuarezjaen.es/" },
    { name: "Servicios", url: "https://opticasuarezjaen.es/servicios" },
    {
      name: "Examen Visual",
      url: "https://opticasuarezjaen.es/examen-visual",
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ExamenVisual />
    </>
  );
}
