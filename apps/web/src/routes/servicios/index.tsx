import { createFileRoute } from "@tanstack/react-router";
import ServicesGrid from "~/components/sections/services-grid";
import { BreadcrumbSchema } from "~/components/structured-data";
import { resolveImage } from "~/lib/sanity";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import { fetchServiciosOverview } from "~/lib/server-fns";
import { getBaseUrl } from "~/lib/utils";

export const Route = createFileRoute("/servicios/")({
  head: ({ loaderData }) => {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    const data = (loaderData as any)?.data;
    return buildHeadFromSanitySeo({
      seo: data?.seo,
      path: "/servicios",
      fallback: {
        title: "Servicios - Óptica Suárez",
        description:
          "¿Conoces nuestros servicios? Entra y y fíjate en todo lo que Óptica Suárez puede ofrecerte: exámenes visuales, terapia visual, contactología y más.",
        keywords:
          "servicios ópticos Jaén, optometría Jaén, terapia visual Jaén, lentes de contacto Jaén",
      },
    });
  },
  loader: () => fetchServiciosOverview(),
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  const breadcrumbItems = [
    { name: "Inicio", url: `${getBaseUrl()}/` },
    { name: "Servicios", url: `${getBaseUrl()}/servicios` },
  ];

  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  const services = (data?.services || []).map((item: any) => ({
    ...item,
    image: resolveImage(item.image),
  }));

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <main className="pt-20">
        <section className="bg-white px-4 py-16 sm:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h1 className="mb-6 font-bold text-4xl text-gray-900 sm:text-5xl md:text-6xl">
                {data?.title}
              </h1>
              <p className="mx-auto max-w-3xl text-gray-600 text-lg sm:text-xl">
                {data?.description}
              </p>
            </div>
            <ServicesGrid items={services} />
          </div>
        </section>
      </main>
    </>
  );
}
