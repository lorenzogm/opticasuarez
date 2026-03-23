import { Text } from '../../../components/text';

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
    <section className="bg-white py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Text
            as="h2"
            variant="heading-2"
            className="mb-6 text-gray-900 uppercase tracking-wide"
          >
            {title}
          </Text>
          <Text
            variant="body-lg"
            className="max-w-4xl mx-auto text-gray-600 leading-relaxed"
          >
            {description}
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-blue-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <Text
                as="h3"
                className="mb-3 text-blue-900 uppercase tracking-wide"
              >
                {feature.title}
              </Text>
              <Text variant="body-sm" className="text-gray-600 leading-relaxed">
                {feature.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
