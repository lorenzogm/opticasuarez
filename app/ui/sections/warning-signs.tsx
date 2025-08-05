import { Text } from '../components/text';

interface WarningSingsProps {
  title: string;
  subtitle: string;
  description: string;
  signs: string[];
}

export default function WarningSigns({
  title,
  subtitle,
  description,
  signs,
}: WarningSingsProps) {
  return (
    <section className="bg-red-50 py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <Text
            as="h2"
            size="3xl"
            weight="bold"
            className="mb-4 text-red-800 uppercase tracking-wide"
          >
            {title}
          </Text>
          <Text
            as="h3"
            size="xl"
            weight="semibold"
            className="mb-6 text-red-700"
          >
            {subtitle}
          </Text>
          <Text
            size="lg"
            className="text-gray-700 leading-relaxed"
          >
            {description}
          </Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {signs.map((sign, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-red-400"
            >
              <Text
                className="text-gray-700 flex items-center"
              >
                <span className="text-red-500 mr-3 text-lg">⚠️</span>
                {sign}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}