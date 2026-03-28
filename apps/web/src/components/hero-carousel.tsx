import { Link } from "@tanstack/react-router";
import * as React from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

interface HeroCarouselProps {
  images: {
    src: string;
    alt: string;
    title: string;
    subtitle: string;
    description: string;
  }[];
  cta?: string;
  ctaHref?: string;
  autoSlide?: boolean;
  slideInterval?: number;
}

export default function HeroCarousel({
  images,
  cta,
  ctaHref,
  autoSlide = true,
  slideInterval = 5000,
}: HeroCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Auto-slide functionality
  React.useEffect(() => {
    if (!(api && autoSlide)) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, slideInterval);

    return () => clearInterval(interval);
  }, [api, autoSlide, slideInterval]);

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[current - 1] || images[0];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "16/9" }}
    >
      <div className="absolute inset-0">
        <Carousel
          className="h-full w-full"
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
        >
          <CarouselContent className="-ml-0 h-full">
            {images.map((image, index) => (
              <CarouselItem className="h-full pl-0" key={index}>
                <div className="relative h-full w-full">
                  <img
                    alt={image.alt}
                    className="h-full w-full object-cover object-center"
                    loading={index === 0 ? "eager" : "lazy"}
                    src={image.src}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows - Custom styled */}
          {images.length > 1 && (
            <>
              <CarouselPrevious className="-translate-y-1/2 absolute top-1/2 left-4 z-30 h-12 w-12 border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 hover:text-white" />
              <CarouselNext className="-translate-y-1/2 absolute top-1/2 right-4 z-30 h-12 w-12 border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 hover:text-white" />
            </>
          )}
        </Carousel>
      </div>

      {/* Content Overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 flex h-full items-center justify-center">
        <div className="container pointer-events-auto mx-auto max-w-6xl px-4 text-center text-white">
          <div className="animate-fade-in-up">
            <p className="mb-2 font-bold text-2xl uppercase tracking-wide drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
              {currentImage.title}
            </p>
            <p className="mb-3 font-semibold text-blue-300 text-lg uppercase tracking-wide drop-shadow-lg sm:text-2xl md:text-3xl lg:text-4xl">
              {currentImage.subtitle}
            </p>
            <p className="mb-4 font-medium text-sm uppercase tracking-wide drop-shadow-lg sm:text-lg md:text-xl lg:text-2xl">
              {currentImage.description}
            </p>
            {cta && ctaHref && (
              <Link
                className="inline-block transform rounded-lg bg-blue-600 px-4 py-2 font-semibold text-sm text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-xl sm:px-6 sm:py-3 sm:text-base md:px-8 md:text-lg"
                to={ctaHref}
              >
                {cta}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      {images.length > 1 && (
        <div className="-translate-x-1/2 absolute bottom-8 left-1/2 z-20 flex space-x-2">
          {images.map((_, index) => (
            <button
              aria-label={`Go to slide ${index + 1}`}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === current - 1
                  ? "bg-white"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              key={index}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      )}

      {/* Simple CSS animation instead of complex animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out;
          }
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
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
