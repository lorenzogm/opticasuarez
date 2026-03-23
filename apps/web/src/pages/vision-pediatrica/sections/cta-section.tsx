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
    <section className="bg-blue-900 py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <Text
          as="h2"
          variant="heading-2"
          colour="white"
          className="mb-4 uppercase tracking-wide"
        >
          {title}
        </Text>
        <div className="text-2xl font-semibold tracking-tight text-white mb-6">
          {subtitle}
        </div>
        <Text
          variant="body-lg"
          colour="white"
          className="mb-8 leading-relaxed opacity-90"
        >
          {description}
        </Text>
        <Button
          href={buttonLink}
          variant="primary"
          target={buttonLink.startsWith('http') ? '_blank' : undefined}
          rel={
            buttonLink.startsWith('http') ? 'noopener noreferrer' : undefined
          }
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
