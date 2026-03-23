import { Text } from '../../../components/text';
import { Button } from '../../../components/button';

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
    <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="container mx-auto max-w-4xl text-center">
        <Text
          as="h2"
          variant="heading-2"
          className="mb-4 text-white"
        >
          {title}
        </Text>
        <Text
          as="h3"
          variant="heading-4"
          className="mb-6 text-blue-100"
        >
          {subtitle}
        </Text>
        <Text
          variant="body-lg"
          className="mb-8 text-blue-50 leading-relaxed max-w-2xl mx-auto"
        >
          {description}
        </Text>
        <Button
          href={buttonLink}
          variant="secondary"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
