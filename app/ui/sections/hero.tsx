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
  cta: _cta,
}: HeroProps) {
  return (
    <section className="bg-white py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 uppercase tracking-wide">
          {title}
        </h2>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-blue-800 uppercase tracking-wide">
          {subtitle}
        </h3>
        <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 uppercase tracking-wide">
          {description}
        </h3>
      </div>
    </section>
  );
}
