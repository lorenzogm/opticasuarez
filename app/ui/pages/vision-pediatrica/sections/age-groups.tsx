import { Text } from '../../../components/text';

interface AgeGroup {
  title: string;
  description: string;
  recommendations: string[];
}

interface AgeGroupsProps {
  title: string;
  subtitle: string;
  groups: AgeGroup[];
}

export default function AgeGroups({
  title,
  subtitle,
  groups,
}: AgeGroupsProps) {
  return (
    <section className="bg-white py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Text
            as="h2"
            variant="heading-2"
            className="mb-4 text-gray-900 uppercase tracking-wide"
          >
            {title}
          </Text>
          <Text
            variant="body-lg"
            className="text-gray-600"
          >
            {subtitle}
          </Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((group, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-lg p-6 text-center hover:bg-blue-100 transition-colors"
            >
              <Text
                as="h3"
                variant="heading-3"
                className="mb-4 text-blue-900"
              >
                {group.title}
              </Text>
              <Text
                className="mb-4 text-gray-700 leading-relaxed"
              >
                {group.description}
              </Text>
              <div className="space-y-2">
                {group.recommendations.map((rec, recIndex) => (
                  <Text
                    key={recIndex}
                    variant="body-sm"
                    className="text-gray-600 border-l-2 border-blue-400 pl-3 text-left"
                  >
                    {rec}
                  </Text>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}