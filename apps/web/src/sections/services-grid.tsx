import { Button } from "../components/button";
import Image from "../components/image";

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
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-3">
          {items.map((item, index) => (
            <article className="group" key={index}>
              <Button className="block" href={item.url} unstyled={true}>
                <figure className="mb-4 overflow-hidden rounded-lg">
                  <Image
                    alt={item.alt || item.description}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={item.image}
                    title={item.imageTitle}
                  />
                </figure>
                <div className="text-center">
                  <h3 className="mb-2 font-bold text-gray-900 text-lg uppercase tracking-wide transition-colors duration-300 group-hover:text-blue-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
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
