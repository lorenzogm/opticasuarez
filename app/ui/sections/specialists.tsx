interface SpecialistsProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function Specialists({ title, subtitle, description }: SpecialistsProps) {
  return (
    <section className="py-16 px-4 sm:px-6 bg-blue-50">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 uppercase tracking-wide">
          {title}
        </h2>
        <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-blue-800">
          {subtitle}
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
}