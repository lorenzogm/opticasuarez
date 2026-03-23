import Image from '../components/image';
import { Button } from '../components/button';

interface ServiceGridItem {
  title: string;
  description: string;
  url: string;
  image: string;
  alt?: string;
  imageTitle?: string;
}

interface ServicesGridProps {
  items: ServiceGridItem[];
}

export default function ServicesGrid({ items }: ServicesGridProps) {
  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, index) => (
            <article key={index} className="group">
              <Button href={item.url} className="block" unstyled={true}>
                <figure className="mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.alt || item.description}
                    title={item.imageTitle}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </figure>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide group-hover:text-blue-800 transition-colors duration-300 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
