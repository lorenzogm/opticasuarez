import { Text } from '../../../components/text';
import { Button } from '../../../components/button';
import Image from '../../../components/image';

interface PediatricHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export default function PediatricHero({
  title,
  subtitle,
  description,
  image,
}: PediatricHeroProps) {
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
            <Text as="h2" className="mb-6 text-gray-700">
              {subtitle}
            </Text>
            <Text
              variant="body-lg"
              className="mb-8 text-gray-600 leading-relaxed"
            >
              {description}
            </Text>
            <Button href="/book" variant="primary">
              Reservar Cita
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              src={image}
              alt={title}
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
