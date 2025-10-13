import { Text } from '../../../components/text';
import Image from '../../../components/image';
import { Link } from 'react-router';

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  image: string;
  imageTitle?: string;
  imageAlt?: string;
  link?: string;
}

interface PediatricServicesProps {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export default function PediatricServices({
  title,
  subtitle,
  items,
}: PediatricServicesProps) {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="text-3xl font-bold tracking-tight mb-4 text-gray-900 uppercase tracking-wide">
            {title}
          </div>
          <Text variant="body-lg" className="text-gray-600">
            {subtitle}
          </Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((service, index) => {
            const content = (
              <>
                <Image
                  src={service.image}
                  alt={service.imageAlt || service.title}
                  title={service.imageTitle}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-2xl font-semibold tracking-tight mb-3 text-blue-900">
                    {service.title}
                  </div>
                  <Text className="text-gray-600 leading-relaxed">
                    {service.description}
                  </Text>
                </div>
              </>
            );

            return service.link ? (
              <Link
                key={index}
                to={service.link}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow block"
              >
                {content}
              </Link>
            ) : (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
