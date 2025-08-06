import { Text } from '../components/text';

interface ContactHeroProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function ContactHero({
  title,
  subtitle,
  description,
}: ContactHeroProps) {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
        <Text
          as="h1"
          size="4xl"
          weight="bold"
          variant="white"
          align="center"
          className="mb-4 uppercase tracking-wide"
        >
          {title}
        </Text>
        <Text
          as="h2"
          size="xl"
          weight="semibold"
          variant="white"
          align="center"
          className="mb-6 text-blue-100"
        >
          {subtitle}
        </Text>
        <Text
          size="lg"
          variant="white"
          align="center"
          className="text-blue-50 max-w-2xl mx-auto"
        >
          {description}
        </Text>
      </div>
    </section>
  );
}