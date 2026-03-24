import { createFileRoute } from "@tanstack/react-router";
import { getServicePage } from "~/lib/sanity";
import { generateMetaKeywords, generatePageKeywords } from "~/lib/seo-keywords";
import { getBaseUrl } from "~/lib/utils";
import Contactologia from "~/pages/contactologia/contactologia";

const contactologiaKeywords = generatePageKeywords("contactologia");

export const Route = createFileRoute("/contactologia")({
  head: () => ({
    meta: [
      {
        title: "Lentes de contacto en Jaén | Óptica Suárez",
      },
      {
        name: "description",
        content:
          "Óptica Suárez, tu centro de contactología en Jaén. Adaptamos tus lentillas con precisión, confort y la última tecnología óptica.",
      },
      {
        name: "keywords",
        content: generateMetaKeywords(contactologiaKeywords),
      },
      {
        property: "og:title",
        content: "Lentes de contacto en Jaén | Óptica Suárez",
      },
      {
        property: "og:description",
        content:
          "Óptica Suárez, tu centro de contactología en Jaén. Adaptamos tus lentillas con precisión, confort y la última tecnología óptica.",
      },
      {
        property: "og:url",
        content: `${getBaseUrl()}/contactologia`,
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${getBaseUrl()}/contactologia` }],
  }),
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
