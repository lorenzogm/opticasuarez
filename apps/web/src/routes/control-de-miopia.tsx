import { createFileRoute } from "@tanstack/react-router";
import { generateMetaKeywords, generatePageKeywords } from "~/lib/seo-keywords";
import ControlDeMiopia from "~/pages/control-de-miopia/control-de-miopia";

const controlMiopiaKeywords = generatePageKeywords("control-miopia");

export const Route = createFileRoute("/control-de-miopia")({
  head: () => ({
    meta: [
      { title: "Control de Miopía Jaén - Óptica Suárez" },
      {
        name: "description",
        content:
          "Especialistas en control de miopía en Jaén. Ofrecemos tratamientos avanzados para frenar la progresión de la miopía en niños y adolescentes.",
      },
      {
        name: "keywords",
        content: generateMetaKeywords(controlMiopiaKeywords),
      },
      {
        property: "og:title",
        content: "Control de Miopía Jaén - Óptica Suárez",
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
      { name: "robots", content: "index, follow" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://opticasuarezjaen.es/control-de-miopia",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <ControlDeMiopia />;
}
