import { createFileRoute } from "@tanstack/react-router";
import { BreadcrumbSchema } from "~/components/structured-data";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import { fetchServicePage } from "~/lib/server-fns";
import { getBaseUrl } from "~/lib/utils";

import Contactologia from "~/pages/contactologia/contactologia";
import ControlDeMiopia from "~/pages/control-de-miopia/control-de-miopia";
import ExamenVisual from "~/pages/examen-visual/examen-visual";
import Ortoqueratologia from "~/pages/ortoqueratologia/ortoqueratologia";
import TerapiaVisual from "~/pages/terapia-visual/terapia-visual";
import VisionDeportiva from "~/pages/vision-deportiva/vision-deportiva";
import VisionPediatrica from "~/pages/vision-pediatrica/vision-pediatrica";

// biome-ignore lint/suspicious/noExplicitAny: Sanity data
const serviceComponents: Record<string, React.ComponentType<{ data: any }>> = {
  "examen-visual": ExamenVisual,
  "terapia-visual": TerapiaVisual,
  contactologia: Contactologia,
  "control-de-miopia": ControlDeMiopia,
  ortoqueratologia: Ortoqueratologia,
  "vision-deportiva": VisionDeportiva,
  "vision-pediatrica": VisionPediatrica,
};

export const Route = createFileRoute("/servicios/$slug")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    const data = (loaderData as any)?.data;
    return buildHeadFromSanitySeo({
      seo: data?.seo,
      path: `/servicios/${data?.slug || ""}`,
      fallback: {
        title: data?.mainTitle
          ? `${data.mainTitle} | Óptica Suárez`
          : "Servicios | Óptica Suárez",
        description:
          data?.heroDescription ||
          "Servicios profesionales de Óptica Suárez en Jaén.",
        keywords: "servicios ópticos Jaén, optometría Jaén",
      },
    });
  },
  loader: ({ params }) => fetchServicePage({ data: params.slug }),
  component: RouteComponent,
});

function RouteComponent() {
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  const { data } = Route.useLoaderData() as { data: any };
  const { slug } = Route.useParams();

  const breadcrumbItems = [
    { name: "Inicio", url: `${getBaseUrl()}/` },
    { name: "Servicios", url: `${getBaseUrl()}/servicios` },
    {
      name: data?.mainTitle || slug,
      url: `${getBaseUrl()}/servicios/${slug}`,
    },
  ];

  const PageComponent = serviceComponents[slug];

  if (!PageComponent) {
    return (
      <section className="flex min-h-[50vh] items-center justify-center px-4 py-16">
        <div className="text-center">
          <h1 className="mb-4 font-bold text-2xl text-gray-900">
            Servicio no encontrado
          </h1>
          <p className="mb-8 text-gray-600">
            El servicio que buscas no existe.
          </p>
          <a
            className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            href="/servicios"
          >
            Ver todos los servicios
          </a>
        </div>
      </section>
    );
  }

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <PageComponent data={data} />
    </>
  );
}
