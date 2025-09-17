import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Image from '../../../components/image';

interface NewsProps {
  title: string;
  buttonText: string;
  url: string;
}

export default function News({ title, buttonText, url }: NewsProps) {
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative py-16 px-4 sm:px-6 overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateY(${scrollY * -0.3}px)`,
        }}
      >
        <div className="relative h-[120%] w-full">
          <Image
            src="/images/homepage/news/news-background.webp"
            alt="Noticias de Óptica Suárez"
            className="h-full w-full object-cover"
            priority={true}
          />
          {/* Watermark overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-4xl text-center">
        <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-white uppercase tracking-wide drop-shadow-lg">
          {title}
        </h3>
        <Link
          to={url}
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
