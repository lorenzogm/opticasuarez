import ServicesGrid from '../../sections/services-grid';
import content from '../../../content/servicios.json';

export default function Servicios() {
  return (
    <main className="pt-20">
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {content.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {content.description}
            </p>
          </div>
          <ServicesGrid items={content.services} />
        </div>
      </section>
    </main>
  );
}