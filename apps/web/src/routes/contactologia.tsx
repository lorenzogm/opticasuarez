import { createFileRoute } from "@tanstack/react-router";
import { getServicePage } from "~/lib/sanity";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import Contactologia from "~/pages/contactologia/contactologia";

export const Route = createFileRoute("/contactologia")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    const data = (loaderData as any)?.data;
    return buildHeadFromSanitySeo({
      seo: data?.seo,
      path: "/contactologia",
      fallback: {
        title: "Lentes de contacto en Jaén | Óptica Suárez",
        description:
          "Óptica Suárez, tu centro de contactología en Jaén. Adaptamos tus lentillas con precisión, confort y la última tecnología óptica.",
        keywords:
          "contactología Jaén, lentes de contacto Jaén, lentillas Jaén, adaptación lentillas Jaén",
      },
    });
  },
  loader: async () => {
    const data = await getServicePage("contactologia");
    return { data };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  return <Contactologia data={data} />;
}
