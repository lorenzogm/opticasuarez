import { Text } from '../../../components/text';
import Image from '../../../components/image';

interface BenefitItem {
  title: string;
  description: string;
  icon: string;
  image: string;
  imageTitle?: string;
  imageAlt?: string;
}

interface BenefitsSectionProps {
  title: string;
  subtitle: string;
  items: BenefitItem[];
}

export default function BenefitsSection({
  title,
  subtitle,
  items,
}: BenefitsSectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Text as="h2" variant="heading-2" className="mb-4 text-gray-900">
            {title}
          </Text>
          <Text variant="body-lg" className="text-gray-600">
            {subtitle}
          </Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {item.image && (
                <div className="h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    title={item.imageTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <Text as="h3" variant="heading-4" className="mb-3 text-gray-900">
                  {item.title}
                </Text>
                <Text variant="body-md" className="text-gray-600">
                  {item.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
