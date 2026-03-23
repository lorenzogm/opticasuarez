import { Button } from "../../../components/button";
import Image from "../../../components/image";
import { Text } from "../../../components/text";

interface PediatricHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageTitle?: string;
  imageAlt?: string;
}

export default function PediatricHero({
  title,
  subtitle,
  description,
  image,
  imageTitle,
  imageAlt,
}: PediatricHeroProps) {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <Text
              as="h1"
              className="mb-4 text-blue-900 uppercase tracking-wide"
              variant="heading-1"
            >
              {title}
            </Text>
            <Text as="h2" className="mb-6 text-gray-700">
              {subtitle}
            </Text>
            <Text
              className="mb-8 text-gray-600 leading-relaxed"
              variant="body-lg"
            >
              {description}
            </Text>
            <Button
              href="https://api.whatsapp.com/send?phone=34953093062&text=Hola,%20me%20gustaría%20reservar%20una%20cita%20para%20visión%20pediátrica"
              rel="noopener noreferrer"
              target="_blank"
              variant="primary"
            >
              Reservar Cita
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              alt={imageAlt || title}
              className="h-auto max-w-full rounded-lg shadow-lg"
              src={image}
              title={imageTitle}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
