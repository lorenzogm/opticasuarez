import { useEffect, useRef } from "react";
import { Button } from "../../../components/button";
import Image from "../../../components/image";
import { Text } from "../../../components/text";

interface TerapiaVisualHeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage: string;
}

export default function TerapiaVisualHero({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  backgroundImage,
}: TerapiaVisualHeroProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 py-32 sm:px-6">
      <div className="absolute inset-0" ref={parallaxRef}>
        <Image
          alt="terapia visual en jaen"
          className="h-full w-full scale-110 transform object-cover"
          priority
          sizes="100vw"
          src={backgroundImage}
          title="terapia visual en jaen"
        />
      </div>
      <div className="container relative z-10 mx-auto max-w-6xl text-center">
        <Text
          as="h1"
          className="mb-4 text-white uppercase tracking-wide drop-shadow-lg"
          variant="heading-1"
        >
          {title}
        </Text>
        <Text as="h2" className="mb-6 text-white drop-shadow-lg">
          {subtitle}
        </Text>
        <Text
          className="mx-auto mb-8 max-w-4xl text-white leading-relaxed drop-shadow-lg"
          variant="body-lg"
        >
          {description}
        </Text>
        {ctaText && ctaLink && (
          <Button className="mt-4" href={ctaLink} variant="primary">
            {ctaText}
          </Button>
        )}
      </div>
    </section>
  );
}
