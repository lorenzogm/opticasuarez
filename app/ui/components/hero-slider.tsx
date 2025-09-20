import { useState, useEffect } from 'react';
import Image from './image';

interface HeroSliderProps {
  images: {
    src: string;
    alt: string;
    title: string;
    subtitle: string;
    description: string;
  }[];
  cta?: string;
  autoSlide?: boolean;
  slideInterval?: number;
}

export default function HeroSlider({
  images,
  cta,
  autoSlide = true,
  slideInterval = 5000,
}: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (!autoSlide) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, slideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, slideInterval, images.length]);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="relative h-[120%] w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover scale-105 hero-zoom-animation"
                priority={index === 0}
              />
              {/* Watermark overlay for better text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto max-w-6xl px-4 text-center text-white">
          <div className="hero-content-animation">
            <h1 className="mb-4 text-4xl font-bold uppercase tracking-wide drop-shadow-lg sm:text-5xl md:text-6xl">
              {currentImage.title}
            </h1>
            <h2 className="mb-6 text-2xl font-semibold uppercase tracking-wide drop-shadow-lg sm:text-3xl md:text-4xl text-blue-300">
              {currentImage.subtitle}
            </h2>
            <h3 className="mb-8 text-lg font-medium uppercase tracking-wide drop-shadow-lg sm:text-xl md:text-2xl">
              {currentImage.description}
            </h3>
            {cta && (
              <button className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                {cta}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white bg-opacity-20 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30 hover:scale-110"
            aria-label="Previous slide"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white bg-opacity-20 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30 hover:scale-110"
            aria-label="Next slide"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Inline styles for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .hero-zoom-animation {
            animation: heroZoomIn 20s ease-out infinite alternate;
          }
          .hero-content-animation {
            animation: heroFadeInUp 1s ease-out;
          }
          @keyframes heroZoomIn {
            0% { transform: scale(1.05); }
            100% { transform: scale(1.1); }
          }
          @keyframes heroFadeInUp {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
      }} />
    </section>
  );
}