import { Text } from "../../../components/text";

interface IntroductionSectionProps {
  title: string;
  content: string;
}

export default function IntroductionSection({
  title,
  content,
}: IntroductionSectionProps) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-8 font-bold text-3xl text-gray-900 uppercase tracking-tight tracking-wide">
          {title}
        </div>
        <Text className="text-gray-700 leading-relaxed" variant="body-lg">
          {content}
        </Text>
      </div>
    </section>
  );
}
