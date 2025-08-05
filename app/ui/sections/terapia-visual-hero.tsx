import { Text } from '../components/text';
import { Button } from '../components/button';

interface TerapiaVisualHeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function TerapiaVisualHero({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
}: TerapiaVisualHeroProps) {
  return (
    <section className="bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl text-center">
        <Text
          as="h1"
          size="4xl"
          weight="bold"
          className="mb-4 text-gray-900 uppercase tracking-wide"
        >
          {title}
        </Text>
        <Text as="h2" size="xl" weight="medium" className="mb-6 text-blue-900">
          {subtitle}
        </Text>
        <Text
          size="lg"
          className="mb-8 text-gray-600 max-w-4xl mx-auto leading-relaxed"
        >
          {description}
        </Text>
        {ctaText && ctaLink && (
          <Button href={ctaLink} size="lg" className="mt-4">
            {ctaText}
          </Button>
        )}
      </div>
    </section>
  );
}
