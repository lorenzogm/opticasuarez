import { Text } from "../../../components/text";

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

export default function AgeGroups({ title, subtitle, groups }: AgeGroupsProps) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mb-4 font-bold text-3xl text-gray-900 uppercase tracking-tight tracking-wide">
            {title}
          </div>
          <Text className="text-gray-600" variant="body-lg">
            {subtitle}
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, index) => (
            <div
              className="rounded-lg bg-blue-50 p-6 text-center transition-colors hover:bg-blue-100"
              key={index}
            >
              <div className="mb-4 font-semibold text-2xl text-blue-900 tracking-tight">
                {group.title}
              </div>
              <Text className="mb-4 text-gray-700 leading-relaxed">
                {group.description}
              </Text>
              <div className="space-y-2">
                {group.recommendations.map((rec, recIndex) => (
                  <Text
                    className="border-blue-400 border-l-2 pl-3 text-left text-gray-600"
                    key={recIndex}
                    variant="body-sm"
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
