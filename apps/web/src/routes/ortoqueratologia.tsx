import { createFileRoute } from "@tanstack/react-router";
import { generateMetaKeywords, generatePageKeywords } from "~/lib/seo-keywords";
import { getBaseUrl } from "~/lib/utils";
import Ortoqueratologia from "~/pages/ortoqueratologia/ortoqueratologia";

const ortoqueratologiaKeywords = generatePageKeywords("ortoqueratologia");

export const Route = createFileRoute("/ortoqueratologia")({
  head: () => ({
    meta: [
      { title: "Ortoqueratología en Jaén | Óptica Suárez" },
      {
        name: "description",
        content:
          "En Óptica Suárez somos especialistas en ortoqueratología, para frenar la miopía y mejorar la visión sin necesidad de gafas. Más de 80 años de experiencia nos avalan ofreciendo Orto-K en Jaén.",
      },
      {
        name: "keywords",
        content: generateMetaKeywords(ortoqueratologiaKeywords),
      },
      {
        property: "og:title",
        content: "Ortoqueratología en Jaén | Óptica Suárez",
      },
      {
        property: "og:description",
        content:
          "En Óptica Suárez somos especialistas en ortoqueratología, para frenar la miopía y mejorar la visión sin necesidad de gafas. Más de 80 años de experiencia nos avalan ofreciendo Orto-K en Jaén.",
      },
      {
        property: "og:url",
        content: `${getBaseUrl()}/ortoqueratologia`,
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      {
        rel: "canonical",
        href: `${getBaseUrl()}/ortoqueratologia`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Ortoqueratologia />;
}
