import { Text } from '../../../components/text';
import { Button } from '../../../components/button';

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
    <section className="bg-white pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl text-center">
        <Text
          as="h1"
          variant="heading-1"
          className="mb-4 text-gray-900 uppercase tracking-wide"
        >
          {title}
        </Text>
        <Text as="h2" className="mb-6 text-blue-900">
          {subtitle}
        </Text>
        <Text
          variant="body-lg"
          className="mb-8 text-gray-600 max-w-4xl mx-auto leading-relaxed"
        >
          {description}
        </Text>
        {ctaText && ctaLink && (
          <Button href={ctaLink} variant="primary" className="mt-4">
            {ctaText}
          </Button>
        )}
      </div>
    </section>
  );
}
