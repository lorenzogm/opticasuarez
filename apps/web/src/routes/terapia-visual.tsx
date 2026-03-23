import { createFileRoute } from "@tanstack/react-router";
import { BreadcrumbSchema } from "~/components/structured-data";
import { generateMetaKeywords, generatePageKeywords } from "~/lib/seo-keywords";
import TerapiaVisual from "~/pages/terapia-visual/terapia-visual";

const terapiaVisualKeywords = generatePageKeywords("terapia-visual");

export const Route = createFileRoute("/terapia-visual")({
  head: () => ({
    meta: [
      {
        title:
          "Terapia Visual en Jaén para Ojo Vago y Estrabismo | Óptica Suárez",
      },
      {
        name: "description",
        content:
          "Mejora tu sistema visual con terapia visual en Jaén. En Óptica Suárez ayudamos a niños y adultos a mejorar ojo vago, estrabismo y habilidades visuales para un mayor confort y rendimiento.",
      },
      {
        name: "keywords",
        content: generateMetaKeywords(terapiaVisualKeywords),
      },
      {
        property: "og:title",
        content:
          "Terapia Visual en Jaén para Ojo Vago y Estrabismo | Óptica Suárez",
      },
      {
        property: "og:description",
        content:
          "Mejora tu sistema visual con terapia visual en Jaén. En Óptica Suárez ayudamos a niños y adultos a mejorar ojo vago, estrabismo y habilidades visuales para un mayor confort y rendimiento.",
      },
      {
        property: "og:url",
        content: "https://opticasuarezjaen.es/terapia-visual",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://opticasuarezjaen.es/terapia-visual" },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const breadcrumbItems = [
    { name: "Inicio", url: "https://opticasuarezjaen.es/" },
    { name: "Servicios", url: "https://opticasuarezjaen.es/servicios" },
    {
      name: "Terapia Visual",
      url: "https://opticasuarezjaen.es/terapia-visual",
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <TerapiaVisual />
    </>
  );
}
