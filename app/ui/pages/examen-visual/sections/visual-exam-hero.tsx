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
      const scrolled = window.scrollY;
      const parallaxElement = document.getElementById('parallax-bg');
      if (parallaxElement) {
        const speed = 0.5; // Adjust this value to change parallax speed
        parallaxElement.style.transform = `translateY(${scrolled * speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        id="parallax-bg"
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <Image
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
          priority={true}
        />
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <Text
          as="h1"
          variant="heading-1"
          className="mb-6 text-white uppercase tracking-wide text-shadow-lg"
        >
          {title}
        </Text>
        <Text 
          as="p" 
          variant="body-lg"
          className="text-white max-w-3xl mx-auto text-shadow-md"
        >
          {subtitle}
        </Text>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}