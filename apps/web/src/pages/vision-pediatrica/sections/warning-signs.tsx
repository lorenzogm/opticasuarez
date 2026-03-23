import { Text } from "../../../components/text";

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
    <section className="bg-red-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <div className="mb-4 font-bold text-3xl text-red-800 uppercase tracking-tight tracking-wide">
            {title}
          </div>
          <div className="mb-6 font-semibold text-2xl text-red-700 tracking-tight">
            {subtitle}
          </div>
          <Text className="text-gray-700 leading-relaxed" variant="body-lg">
            {description}
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {signs.map((sign, index) => (
            <div
              className="rounded-lg border-red-400 border-l-4 bg-white p-4 shadow-sm"
              key={index}
            >
              <Text className="flex items-center text-gray-700">
                <span className="mr-3 text-lg text-red-500">⚠️</span>
                {sign}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
