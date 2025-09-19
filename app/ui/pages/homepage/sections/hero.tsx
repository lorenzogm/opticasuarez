import HeroCarousel from '../../../components/hero-carousel';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
}

export default function Hero({
  title,
  subtitle,
  description,
  cta,
}: HeroProps) {
  const heroImages = [
    {
      src: '/images/homepage/hero/hero-1.webp',
      alt: 'Óptica Suárez - Cuidando tu visión desde 1940',
      title,
      subtitle,
      description,
    },
    {
      src: '/images/homepage/hero/hero-2.webp',
      alt: 'Óptica Suárez - Especialistas en visión',
      title,
      subtitle,
      description,
    },
    {
      src: '/images/homepage/hero/hero-3.webp',
      alt: 'Óptica Suárez - Tu óptica de confianza en Jaén',
      title,
      subtitle,
      description,
    },
  ];

  return <HeroCarousel images={heroImages} cta={cta} />;
}
