import { Text } from '../../../components/text';
import { Button } from '../../../components/button';

interface TerapiaVisualCtaProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function TerapiaVisualCta({
  title,
  description,
  buttonText,
  buttonLink,
}: TerapiaVisualCtaProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-blue-900">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
        <Text
          as="p"
          variant="heading-2"
          colour="white"
          className="mb-6 uppercase tracking-wide"
        >
          {title}
        </Text>
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
          className="bg-white text-blue-900 hover:bg-gray-100 border-white"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
