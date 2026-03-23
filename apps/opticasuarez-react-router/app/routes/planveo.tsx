import { BreadcrumbSchema } from "../ui/components/structured-data";
import {
  generateMetaKeywords,
  generatePageKeywords,
} from "../ui/lib/seo-keywords";
import PlanVeo from "../ui/pages/plan-veo/plan-veo";

export function links() {
  return [{ rel: "canonical", href: "https://opticasuarezjaen.es/planveo" }];
}

export function meta() {
  const planVeoKeywords = generatePageKeywords("plan-veo");

  return [
    { title: "Plan VEO en Jaén | Óptica Suárez" },
    {
      name: "description",
      content:
        "En Óptica Suárez Jaén tramitamos el Plan VEO para que tu hijo obtenga gafas o lentillas con hasta 100€ de ayuda del Ministerio de Sanidad.",
    },
    {
      name: "keywords",
      content: generateMetaKeywords([
        ...planVeoKeywords,
        "plan veo jaen",
        "plan veo optica jaen",
        "ayuda gafas niños jaen",
        "ayuda lentillas niños jaen",
        "gafas infantiles plan veo jaen",
        "ministerio sanidad plan veo jaen",
        "optica plan veo jaen",
        "tramitar plan veo jaen",
        "solicitar plan veo jaen",
        "plan veo ministerio sanidad jaen",
      ]),
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "es_ES" },
    { property: "og:site_name", content: "Óptica Suárez" },
    {
      property: "og:title",
      content: "Plan VEO en Jaén | Óptica Suárez",
    },
    {
      property: "og:description",
      content:
        "En Óptica Suárez Jaén tramitamos el Plan VEO para que tu hijo obtenga gafas o lentillas con hasta 100€ de ayuda del Ministerio de Sanidad.",
    },
    {
      property: "og:url",
      content: "https://opticasuarezjaen.es/planveo",
    },
    {
      property: "og:image",
      content: "https://opticasuarezjaen.es/og-image.jpg",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Plan VEO en Jaén | Óptica Suárez",
    },
    {
      name: "twitter:description",
      content:
        "En Óptica Suárez Jaén tramitamos el Plan VEO para que tu hijo obtenga gafas o lentillas con hasta 100€ de ayuda del Ministerio de Sanidad.",
    },
    { name: "robots", content: "index, follow" },
  ];
}

export default function PlanVeoRoute() {
  const breadcrumbItems = [
    { name: "Inicio", url: "https://opticasuarezjaen.es/" },
    { name: "Servicios", url: "https://opticasuarezjaen.es/servicios" },
    {
      name: "Plan VEO",
      url: "https://opticasuarezjaen.es/planveo",
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <PlanVeo />
    </>
  );
}
