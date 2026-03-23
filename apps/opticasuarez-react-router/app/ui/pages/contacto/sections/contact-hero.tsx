import { Text } from "../../../components/text";

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
    <section className="bg-gradient-to-br from-blue-900 to-blue-800 pt-24 pb-16 text-white sm:pt-28 sm:pb-20 md:pt-32 md:pb-24">
      <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Text
          align="center"
          as="h1"
          className="mb-4 uppercase tracking-wide"
          colour="white"
          variant="heading-1"
        >
          {title}
        </Text>
        <Text
          align="center"
          as="h2"
          className="mb-6 text-blue-100"
          colour="white"
        >
          {subtitle}
        </Text>
        <Text
          align="center"
          className="mx-auto max-w-2xl text-blue-50"
          colour="white"
          variant="body-lg"
        >
          {description}
        </Text>
      </div>
    </section>
  );
}
