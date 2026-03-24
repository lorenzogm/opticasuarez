import { resolveImage } from "../../lib/sanity";
import ServicesGrid from "../../sections/services-grid";

// biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
export default function Servicios({ data }: { data: any }) {
  if (!data) return null;

  const services = (data.services || []).map(
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    (item: any) => ({
      ...item,
      image: resolveImage(item.image),
    })
  );

  return (
    <main className="pt-20">
      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h1 className="mb-6 font-bold text-4xl text-gray-900 sm:text-5xl md:text-6xl">
              {data.title}
            </h1>
            <p className="mx-auto max-w-3xl text-gray-600 text-lg sm:text-xl">
              {data.description}
            </p>
          </div>
          <ServicesGrid items={services} />
        </div>
      </section>
    </main>
  );
}
