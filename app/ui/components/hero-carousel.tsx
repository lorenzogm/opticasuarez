import * as React from "react"
import { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel'
import Image from './image'

interface HeroCarouselProps {
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

export default function HeroCarousel({
  images,
  cta,
  autoSlide = true,
  slideInterval = 5000,
}: HeroCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  // Auto-slide functionality
  React.useEffect(() => {
    if (!api || !autoSlide) {
      return
    }

    const interval = setInterval(() => {
      api.scrollNext()
    }, slideInterval)

    return () => clearInterval(interval)
  }, [api, autoSlide, slideInterval])

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[current - 1] || images[0];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Carousel 
        setApi={setApi} 
        className="w-full h-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="h-full -ml-0">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-0 h-full">
              <div className="relative h-full w-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows - Custom styled */}
        {images.length > 1 && (
          <>
            <CarouselPrevious 
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white z-30"
            />
            <CarouselNext 
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white z-30"
            />
          </>
        )}
      </Carousel>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex h-full items-center justify-center pointer-events-none">
        <div className="container mx-auto max-w-6xl px-4 text-center text-white pointer-events-auto">
          <div className="animate-fade-in-up">
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

      {/* Slide Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === current - 1
                  ? 'bg-white'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Simple CSS animation instead of complex animations */}
      <style dangerouslySetInnerHTML={{
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
        `
      }} />
    </section>
  )
}