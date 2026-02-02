import { Text } from '../../../components/text';
import { Button } from '../../../components/button';
import Image from '../../../components/image';

interface MyopiaHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt?: string;
  imageTitle?: string;
}

export default function MyopiaHero({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  imageTitle,
}: MyopiaHeroProps) {
  return (
    <section className="bg-blue-50 pt-24 pb-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Text
              as="h2"
              variant="heading-2"
              className="mb-4 text-blue-900 uppercase tracking-wide"
            >
              {title}
            </Text>
            <Text
              as="h3"
              className="mb-6 text-gray-700 uppercase tracking-wide"
            >
              {subtitle}
            </Text>
            <Text
              variant="body-lg"
              className="mb-8 text-gray-600 leading-relaxed"
            >
              {description}
            </Text>
            <Button
              variant="primary"
              href="https://api.whatsapp.com/send?phone=34953093062&text=Hola,%20me%20gustaría%20información%20sobre%20control%20de%20miopía"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar Información
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              src={image}
              alt={imageAlt || "Control de Miopía"}
              title={imageTitle}
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
