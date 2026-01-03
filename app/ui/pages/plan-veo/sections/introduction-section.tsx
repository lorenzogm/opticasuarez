import { Text } from '../../../components/text';

interface IntroductionSectionProps {
  title: string;
  content: string;
}

export default function IntroductionSection({
  title,
  content,
}: IntroductionSectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="container mx-auto max-w-4xl text-center">
        <Text
          as="h2"
          variant="heading-2"
          className="mb-8 text-gray-900"
        >
          {title}
        </Text>
        <Text
          variant="body-lg"
          className="text-gray-600 leading-relaxed"
        >
          {content}
        </Text>
      </div>
    </section>
  );
}
