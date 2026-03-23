import { Text } from "../../../components/text";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface MyopiaInfoProps {
  title: string;
  description: string;
  features: Feature[];
}

export default function MyopiaInfo({
  title,
  description,
  features,
}: MyopiaInfoProps) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <Text
            as="h2"
            className="mb-6 text-gray-900 uppercase tracking-wide"
            variant="heading-2"
          >
            {title}
          </Text>
          <Text
            className="mx-auto max-w-4xl text-gray-600 leading-relaxed"
            variant="body-lg"
          >
            {description}
          </Text>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              className="rounded-lg bg-blue-50 p-6 text-center transition-shadow hover:shadow-md"
              key={index}
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <Text
                as="h3"
                className="mb-3 text-blue-900 uppercase tracking-wide"
              >
                {feature.title}
              </Text>
              <Text className="text-gray-600 leading-relaxed" variant="body-sm">
                {feature.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
