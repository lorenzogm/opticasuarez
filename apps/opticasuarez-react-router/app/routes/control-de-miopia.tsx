import content from "../content/control-de-miopia.json" with { type: "json" };
import { BreadcrumbSchema, FAQSchema } from "../ui/components/structured-data";
import {
  generateMetaKeywords,
  generatePageKeywords,
} from "../ui/lib/seo-keywords";
import ControlDeMiopia from "../ui/pages/control-de-miopia/control-de-miopia";

export function links() {
  return [
    { rel: "canonical", href: "https://opticasuarezjaen.es/control-de-miopia" },
  ];
}

export function meta() {
  const controlMiopiaKeywords = generatePageKeywords("control-miopia");

  return [
    { title: "Control de Miopía en Jaén | Especialistas - Óptica Suárez" },
    {
      name: "description",
      content:
        "Especialistas en control de miopía en Jaén. Ofrecemos tratamientos avanzados para frenar la progresión de la miopía en niños y adolescentes.",
    },
    {
      name: "keywords",
      content: generateMetaKeywords(controlMiopiaKeywords),
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "es_ES" },
    { property: "og:site_name", content: "Óptica Suárez" },
    {
      property: "og:title",
      content: "Control de Miopía en Jaén | Especialistas - Óptica Suárez",
    },
    {
      property: "og:description",
      content:
        "Especialistas en control de miopía en Jaén. Ofrecemos tratamientos avanzados para frenar la progresión de la miopía en niños y adolescentes.",
    },
    {
      property: "og:url",
      content: "https://opticasuarezjaen.es/control-de-miopia",
    },
    {
      property: "og:image",
      content: "https://opticasuarezjaen.es/og-image.jpg",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Control de Miopía en Jaén | Especialistas - Óptica Suárez",
    },
    {
      name: "twitter:description",
      content:
        "Especialistas en control de miopía en Jaén. Ofrecemos tratamientos avanzados para frenar la progresión de la miopía en niños y adolescentes.",
    },
    { name: "robots", content: "index, follow" },
  ];
}

export default function ControlDeMiopiaRoute() {
  const breadcrumbItems = [
    { name: "Inicio", url: "https://opticasuarezjaen.es/" },
    { name: "Servicios", url: "https://opticasuarezjaen.es/servicios" },
    {
      name: "Control de Miopía",
      url: "https://opticasuarezjaen.es/control-de-miopia",
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema items={content.faq.items} />
      <ControlDeMiopia />
    </>
  );
}
