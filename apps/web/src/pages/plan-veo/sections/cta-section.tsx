import { Button } from "../../../components/button";
import { Text } from "../../../components/text";

interface CTASectionProps {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function CTASection({
  title,
  subtitle,
  description,
  buttonText,
  buttonLink,
}: CTASectionProps) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <Text as="h2" className="mb-4 text-white" variant="heading-2">
          {title}
        </Text>
        <Text as="h3" className="mb-6 text-blue-100" variant="heading-4">
          {subtitle}
        </Text>
        <Text
          className="mx-auto mb-8 max-w-2xl text-blue-50 leading-relaxed"
          variant="body-lg"
        >
          {description}
        </Text>
        <Button
          className="inline-block"
          href={buttonLink}
          rel="noopener noreferrer"
          target="_blank"
          variant="secondary"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
