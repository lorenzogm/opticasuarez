interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
}

export default function Hero({ title, subtitle, description, cta }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white min-h-screen flex items-center">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
          {title}
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-6 sm:mb-8 text-blue-100">
          {subtitle}
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed text-blue-50">
          {description}
        </p>
        <button className="bg-white text-blue-900 px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg min-h-[44px] min-w-[44px]">
          {cta}
        </button>
      </div>
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}