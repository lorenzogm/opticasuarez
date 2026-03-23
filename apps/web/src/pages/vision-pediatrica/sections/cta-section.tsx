import { Button } from "../../../components/button";
import { Text } from "../../../components/text";

interface CTASectionProps {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function CTASection({
  title,
  subtitle,
  description,
  buttonText,
  buttonLink,
}: CTASectionProps) {
  return (
    <section className="bg-blue-900 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <Text
          as="h2"
          className="mb-4 uppercase tracking-wide"
          colour="white"
          variant="heading-2"
        >
          {title}
        </Text>
        <div className="mb-6 font-semibold text-2xl text-white tracking-tight">
          {subtitle}
        </div>
        <Text
          className="mb-8 leading-relaxed opacity-90"
          colour="white"
          variant="body-lg"
        >
          {description}
        </Text>
        <Button
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
