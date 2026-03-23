import { Text } from '../../../components/text';

interface RequirementItem {
  title: string;
  description: string;
}

interface RequirementsSectionProps {
  title: string;
  subtitle: string;
  description: string;
  items: RequirementItem[];
}

export default function RequirementsSection({
  title,
  subtitle,
  description,
  items,
}: RequirementsSectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Text as="h2" variant="heading-2" className="mb-4 text-gray-900">
            {title}
          </Text>
          <Text variant="body-lg" className="text-gray-600 mb-8">
            {subtitle}
          </Text>
          <Text variant="body-md" className="text-gray-700 max-w-3xl mx-auto">
            {description}
          </Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start p-6 bg-blue-50 rounded-lg"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                {index + 1}
              </div>
              <div>
                <Text as="h3" variant="heading-5" className="mb-2 text-gray-900">
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
