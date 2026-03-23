import { createFileRoute } from "@tanstack/react-router";
import { generateMetaKeywords, generatePageKeywords } from "~/lib/seo-keywords";
import ExamenVisual from "~/pages/examen-visual/examen-visual";

const examenVisualKeywords = generatePageKeywords("examen-visual");

export const Route = createFileRoute("/examen-visual")({
  head: () => ({
    meta: [
      {
        title: "Examen Visual en Jaén | Óptica Suárez - Graduación de la vista",
      },
      {
        name: "description",
        content:
          "Realiza un examen visual completo en Óptica Suárez, Jaén. Detectamos problemas como ambliopía, ojo vago o estrabismo. ¡Reserva tu cita hoy!",
      },
      {
        name: "keywords",
        content: generateMetaKeywords(examenVisualKeywords),
      },
      {
        property: "og:title",
        content:
          "Examen Visual en Jaén | Óptica Suárez - Graduación de la vista",
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
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://opticasuarezjaen.es/examen-visual" },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <ExamenVisual />;
}
