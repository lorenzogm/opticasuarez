import { Text } from '../../../components/text';
import Image from '../../../components/image';

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  image: string;
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
          <Text
            as="h2"
            variant="heading-2"
            className="mb-4 text-gray-900 uppercase tracking-wide"
          >
            {title}
          </Text>
          <Text variant="body-lg" className="text-gray-600">
            {subtitle}
          </Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Image
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <Text as="h3" className="mb-3 text-blue-900">
                  {service.title}
                </Text>
                <Text className="text-gray-600 leading-relaxed">
                  {service.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
