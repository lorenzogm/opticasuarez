import { createFileRoute } from "@tanstack/react-router";
import { getServicePage } from "~/lib/sanity";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import VisionDeportiva from "~/pages/vision-deportiva/vision-deportiva";

export const Route = createFileRoute("/vision-deportiva")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    const data = (loaderData as any)?.data;
    return buildHeadFromSanitySeo({
      seo: data?.seo,
      path: "/vision-deportiva",
      fallback: {
        title: "Visión Deportiva en Jaén | Óptica Suárez",
        description:
          "Optimiza tu rendimiento deportivo con nuestros servicios de visión deportiva. Evaluaciones especializadas, entrenamiento visual y equipamiento para deportistas en Jaén.",
        keywords:
          "visión deportiva Jaén, entrenamiento visual deportistas Jaén, gafas deportivas Jaén",
      },
    });
  },
  loader: async () => {
    const data = await getServicePage("vision-deportiva");
    return { data };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  return <VisionDeportiva data={data} />;
}
