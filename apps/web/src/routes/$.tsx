import { createFileRoute } from "@tanstack/react-router";
import SectionRenderer from "~/components/sections/section-renderer";
import { Text } from "~/components/text";
import { fetchPage } from "~/lib/server-fns";

// biome-ignore lint/suspicious/noExplicitAny: dynamic page data from Sanity
type PageData = Record<string, any>;

export const Route = createFileRoute("/$")({
  loader: async ({ params }) => {
    const splat = (params as Record<string, string>)._splat || "";
    const path = `/${splat}`;
    const { page } = await fetchPage({ data: path });
    if (!page) {
      throw new Error("Page not found");
    }
    return { page };
  },
  errorComponent: NotFoundPage,
  component: PageComponent,
});

function PageComponent() {
  const { page } = Route.useLoaderData() as { page: PageData };
  return <SectionRenderer sections={page.sections || []} />;
}

function NotFoundPage() {
  return (
    <section className="flex min-h-[50vh] items-center justify-center px-4 py-16">
      <div className="text-center">
        <Text as="h1" className="mb-4 text-gray-900" variant="heading-1">
          Página no encontrada
        </Text>
        <Text as="p" className="mb-8 text-gray-600" variant="body-lg">
          La página que buscas no existe.
        </Text>
        <a
          className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
          href="/"
        >
          Volver al inicio
        </a>
      </div>
    </section>
  );
}
