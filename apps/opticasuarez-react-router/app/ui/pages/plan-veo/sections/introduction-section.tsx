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
        <Text as="h2" className="mb-8 text-gray-900" variant="heading-2">
          {title}
        </Text>
        <Text className="text-gray-600 leading-relaxed" variant="body-lg">
          {content}
        </Text>
      </div>
    </section>
  );
}
