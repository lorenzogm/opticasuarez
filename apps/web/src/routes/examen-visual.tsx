import { createFileRoute } from "@tanstack/react-router";
import { getServicePage } from "~/lib/sanity";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import ExamenVisual from "~/pages/examen-visual/examen-visual";

export const Route = createFileRoute("/examen-visual")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    const data = (loaderData as any)?.data;
    return buildHeadFromSanitySeo({
      seo: data?.seo,
      path: "/examen-visual",
      fallback: {
        title: "Examen Visual en Jaén | Óptica Suárez - Graduación de la vista",
        description:
          "Realiza un examen visual completo en Óptica Suárez, Jaén. Detectamos problemas como ambliopía, ojo vago o estrabismo. ¡Reserva tu cita hoy!",
        keywords:
          "examen visual Jaén, graduación vista Jaén, revisión ocular Jaén, optometrista Jaén",
      },
    });
  },
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
