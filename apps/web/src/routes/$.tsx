import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import SectionRenderer from "~/components/sections/section-renderer";
import { buildHeadFromSanitySeo } from "~/lib/seo";
import { fetchPage } from "~/lib/server-fns";

// biome-ignore lint/suspicious/noExplicitAny: dynamic page data from Sanity
type PageData = Record<string, any>;

export const Route = createFileRoute("/$")({
  loader: async ({ params }) => {
    const splat = (params as Record<string, string>)._splat || "";
    const { page } = await fetchPage({ data: splat });
    if (!page) {
      throw notFound();
    }
    return { page };
  },
  errorComponent: RouteErrorComponent,
  notFoundComponent: RouteNotFoundComponent,
  head: ({ loaderData }) => {
    const page = (loaderData as { page: PageData } | undefined)?.page;
    const path = page?.path || "/";
    return buildHeadFromSanitySeo({
      seo: page?.seo,
      path,
      fallback: {
        title: `${page?.title || "Página"} | Óptica Suárez`,
        description: "Óptica Suárez — tu óptica de confianza en Jaén.",
      },
    });
  },
  component: PageComponent,
});

function PageComponent() {
  const { page } = Route.useLoaderData() as { page: PageData };
  return <SectionRenderer sections={page.sections || []} />;
}

function RouteNotFoundComponent() {
  return (
    <section className="flex min-h-[50vh] items-center justify-center px-4 py-16">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-3xl text-gray-900">
          Página no encontrada
        </h1>
        <p className="mb-8 text-gray-600">La página que buscas no existe.</p>
        <Link
          className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
          to="/"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}

function RouteErrorComponent() {
  return (
    <section className="flex min-h-[50vh] items-center justify-center px-4 py-16">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-3xl text-gray-900">
          Página no encontrada
        </h1>
        <p className="mb-8 text-gray-600">La página que buscas no existe.</p>
        <Link
          className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
          to="/"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
