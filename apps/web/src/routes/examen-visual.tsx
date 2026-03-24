import { createFileRoute } from "@tanstack/react-router";
import { getServicePage } from "~/lib/sanity";
import { generateMetaKeywords, generatePageKeywords } from "~/lib/seo-keywords";
import { getBaseUrl } from "~/lib/utils";
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
        content: `${getBaseUrl()}/examen-visual`,
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${getBaseUrl()}/examen-visual` }],
  }),
  loader: async () => {
    const data = await getServicePage("examen-visual");
    return { data };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  return <ExamenVisual data={data} />;
}
