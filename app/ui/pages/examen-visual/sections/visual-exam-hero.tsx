import { Text } from '../../../components/text';
import Image from '../../../components/image';
import { useEffect } from 'react';

interface VisualExamHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export default function VisualExamHero({
  title,
  subtitle,
  backgroundImage,
}: VisualExamHeroProps) {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.parallax-element') as HTMLElement;
      if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative py-32 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 parallax-element">
        <Image
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover transform scale-110"
          priority
          sizes="100vw"
        />
      </div>
      <div className="relative container mx-auto max-w-6xl text-center z-10">
        <Text
          as="h1"
          variant="heading-1"
          className="mb-8 text-white uppercase tracking-wide drop-shadow-lg"
        >
          {title}
        </Text>
        <Text 
          as="p" 
          variant="body-lg"
          className="text-white max-w-3xl mx-auto drop-shadow-lg"
        >
          {subtitle}
        </Text>
      </div>
    </section>
  );
}