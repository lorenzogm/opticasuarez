import content from "../../content/servicios.json" with { type: "json" };
import ServicesGrid from "../../sections/services-grid";

export default function Servicios() {
  return (
    <main className="pt-20">
      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h1 className="mb-6 font-bold text-4xl text-gray-900 sm:text-5xl md:text-6xl">
              {content.title}
            </h1>
            <p className="mx-auto max-w-3xl text-gray-600 text-lg sm:text-xl">
              {content.description}
            </p>
          </div>
          <ServicesGrid items={content.services} />
        </div>
      </section>
    </main>
  );
}
