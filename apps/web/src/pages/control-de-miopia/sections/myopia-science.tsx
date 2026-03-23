import { Text } from '../../../components/text';

interface Study {
  title: string;
  description: string;
  percentage: string;
}

interface MyopiaScienceProps {
  title: string;
  description: string;
  studies: Study[];
}

export default function MyopiaScience({
  title,
  description,
  studies,
}: MyopiaScienceProps) {
  return (
    <section className="bg-blue-900 py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Text
            as="h2"
            variant="heading-2"
            colour="white"
            className="mb-6 uppercase tracking-wide"
          >
            {title}
          </Text>
          <Text
            variant="body-lg"
            colour="white"
            className="max-w-4xl mx-auto leading-relaxed opacity-90"
          >
            {description}
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {studies.map((study, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <Text variant="heading-1" className="text-blue-600">
                  {study.percentage}
                </Text>
                <Text
                  variant="body-sm"
                  className="text-gray-500 uppercase tracking-wider"
                >
                  REDUCCIÓN
                </Text>
              </div>
              <Text
                as="h3"
                className="mb-3 text-gray-900 uppercase tracking-wide"
              >
                {study.title}
              </Text>
              <Text variant="body-sm" className="text-gray-600 leading-relaxed">
                {study.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
