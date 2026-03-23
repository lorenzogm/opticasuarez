import { Text } from '../../../components/text';
import { Button } from '../../../components/button';
import Image from '../../../components/image';
import { useEffect, useRef } from 'react';

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative py-32 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0" ref={parallaxRef}>
        <Image
          src={backgroundImage}
          alt="terapia visual en jaen"
          title="terapia visual en jaen"
          className="w-full h-full object-cover transform scale-110"
          priority
          sizes="100vw"
        />
      </div>
      <div className="relative container mx-auto max-w-6xl text-center z-10">
        <Text
          as="h1"
          variant="heading-1"
          className="mb-4 text-white uppercase tracking-wide drop-shadow-lg"
        >
          {title}
        </Text>
        <Text 
          as="h2" 
          className="mb-6 text-white drop-shadow-lg"
        >
          {subtitle}
        </Text>
        <Text
          variant="body-lg"
          className="mb-8 text-white max-w-4xl mx-auto leading-relaxed drop-shadow-lg"
        >
          {description}
        </Text>
        {ctaText && ctaLink && (
          <Button href={ctaLink} variant="primary" className="mt-4">
            {ctaText}
          </Button>
        )}
      </div>
    </section>
  );
}
