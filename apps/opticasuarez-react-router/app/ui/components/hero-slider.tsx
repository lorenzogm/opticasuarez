import { useEffect, useState } from "react";
import Image from "./image";

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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              key={index}
            >
              <Image
                alt={image.alt}
                className="hero-zoom-animation h-full w-full scale-105 object-cover"
                priority={index === 0}
                src={image.src}
              />
              {/* Watermark overlay for better text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto max-w-6xl px-4 text-center text-white">
          <div className="hero-content-animation">
            <h1 className="mb-4 font-bold text-4xl uppercase tracking-wide drop-shadow-lg sm:text-5xl md:text-6xl">
              {currentImage.title}
            </h1>
            <h2 className="mb-6 font-semibold text-2xl text-blue-300 uppercase tracking-wide drop-shadow-lg sm:text-3xl md:text-4xl">
              {currentImage.subtitle}
            </h2>
            <h3 className="mb-8 font-medium text-lg uppercase tracking-wide drop-shadow-lg sm:text-xl md:text-2xl">
              {currentImage.description}
            </h3>
            {cta && (
              <button className="inline-block transform rounded-lg bg-blue-600 px-8 py-3 font-semibold text-lg text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-xl">
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
            aria-label="Previous slide"
            className="-translate-y-1/2 absolute top-1/2 left-4 z-20 rounded-full bg-white bg-opacity-20 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-opacity-30"
            onClick={prevSlide}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>
          <button
            aria-label="Next slide"
            className="-translate-y-1/2 absolute top-1/2 right-4 z-20 rounded-full bg-white bg-opacity-20 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-opacity-30"
            onClick={nextSlide}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {images.length > 1 && (
        <div className="-translate-x-1/2 absolute bottom-8 left-1/2 z-20 flex space-x-2">
          {images.map((_, index) => (
            <button
              aria-label={`Go to slide ${index + 1}`}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              key={index}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}

      {/* Inline styles for animations */}
      <style
        dangerouslySetInnerHTML={{
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
        `,
        }}
      />
    </section>
  );
}
