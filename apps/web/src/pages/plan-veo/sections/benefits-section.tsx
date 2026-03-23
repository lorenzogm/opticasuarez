import Image from "../../../components/image";
import { Text } from "../../../components/text";

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
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <Text as="h2" className="mb-4 text-gray-900" variant="heading-2">
            {title}
          </Text>
          <Text className="text-gray-600" variant="body-lg">
            {subtitle}
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((item, index) => (
            <div
              className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
              key={index}
            >
              {item.image && (
                <div className="h-48 overflow-hidden">
                  <Image
                    alt={item.imageAlt || item.title}
                    className="h-full w-full object-cover"
                    src={item.image}
                    title={item.imageTitle}
                  />
                </div>
              )}
              <div className="p-6">
                <Text
                  as="h3"
                  className="mb-3 text-gray-900"
                  variant="heading-4"
                >
                  {item.title}
                </Text>
                <Text className="text-gray-600" variant="body-md">
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
