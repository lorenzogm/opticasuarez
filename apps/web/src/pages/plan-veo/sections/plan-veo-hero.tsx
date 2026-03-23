import { Text } from '../../../components/text';
import { Button } from '../../../components/button';
import Image from '../../../components/image';

interface PlanVeoHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageTitle?: string;
  imageAlt?: string;
}

export default function PlanVeoHero({
  title,
  subtitle,
  description,
  image,
  imageTitle,
  imageAlt,
}: PlanVeoHeroProps) {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <Text
              as="h1"
              variant="heading-1"
              className="mb-4 text-blue-900 uppercase tracking-wide"
            >
              {title}
            </Text>
            <Text as="h2" className="mb-6 text-gray-700 text-2xl font-semibold">
              {subtitle}
            </Text>
            <Text
              variant="body-lg"
              className="mb-8 text-gray-600 leading-relaxed"
            >
              {description}
            </Text>
            <Button
              href="https://api.whatsapp.com/send?phone=34953093062&text=Hola,%20me%20gustaría%20solicitar%20información%20sobre%20el%20Plan%20VEO"
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar Plan VEO
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              src={image}
              alt={imageAlt || title}
              title={imageTitle}
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
