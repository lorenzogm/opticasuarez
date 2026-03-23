import { Text } from "../../../components/text";

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
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <Text as="h2" className="mb-4 text-gray-900" variant="heading-2">
            {title}
          </Text>
          <Text className="mb-8 text-gray-600" variant="body-lg">
            {subtitle}
          </Text>
          <Text className="mx-auto max-w-3xl text-gray-700" variant="body-md">
            {description}
          </Text>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {items.map((item, index) => (
            <div
              className="flex items-start rounded-lg bg-blue-50 p-6"
              key={index}
            >
              <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white text-xl">
                {index + 1}
              </div>
              <div>
                <Text
                  as="h3"
                  className="mb-2 text-gray-900"
                  variant="heading-5"
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
