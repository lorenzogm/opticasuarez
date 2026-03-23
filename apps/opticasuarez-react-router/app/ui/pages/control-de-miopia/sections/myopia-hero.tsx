import { Button } from "../../../components/button";
import Image from "../../../components/image";
import { Text } from "../../../components/text";

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
    <section className="bg-blue-50 px-4 pt-24 pb-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <Text
              as="h2"
              className="mb-4 text-blue-900 uppercase tracking-wide"
              variant="heading-2"
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
              className="mb-8 text-gray-600 leading-relaxed"
              variant="body-lg"
            >
              {description}
            </Text>
            <Button
              href="https://api.whatsapp.com/send?phone=34953093062&text=Hola,%20me%20gustaría%20información%20sobre%20control%20de%20miopía"
              rel="noopener noreferrer"
              target="_blank"
              variant="primary"
            >
              Solicitar Información
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              alt={imageAlt || "Control de Miopía"}
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
