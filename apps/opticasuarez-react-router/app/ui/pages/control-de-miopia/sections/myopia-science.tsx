import { Text } from "../../../components/text";

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
    <section className="bg-blue-900 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <Text
            as="h2"
            className="mb-6 uppercase tracking-wide"
            colour="white"
            variant="heading-2"
          >
            {title}
          </Text>
          <Text
            className="mx-auto max-w-4xl leading-relaxed opacity-90"
            colour="white"
            variant="body-lg"
          >
            {description}
          </Text>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {studies.map((study, index) => (
            <div
              className="rounded-lg bg-white p-8 text-center transition-shadow hover:shadow-lg"
              key={index}
            >
              <div className="mb-4">
                <Text className="text-blue-600" variant="heading-1">
                  {study.percentage}
                </Text>
                <Text
                  className="text-gray-500 uppercase tracking-wider"
                  variant="body-sm"
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
              <Text className="text-gray-600 leading-relaxed" variant="body-sm">
                {study.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
