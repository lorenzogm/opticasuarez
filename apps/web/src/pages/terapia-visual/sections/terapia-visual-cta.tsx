import { Button } from "../../../components/button";
import { Text } from "../../../components/text";

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
    <section className="bg-blue-900 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Text
          as="p"
          className="mb-6 uppercase tracking-wide"
          colour="white"
          variant="heading-2"
        >
          {title}
        </Text>
        <Text
          className="mb-8 leading-relaxed opacity-90"
          colour="white"
          variant="body-lg"
        >
          {description}
        </Text>
        <Button
          className="border-white bg-white text-blue-900 hover:bg-gray-100"
          href={buttonLink}
          rel={
            buttonLink.startsWith("http") ? "noopener noreferrer" : undefined
          }
          target={buttonLink.startsWith("http") ? "_blank" : undefined}
          variant="primary"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
