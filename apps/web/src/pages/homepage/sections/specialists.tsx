interface SpecialistsProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function Specialists({
  title,
  subtitle,
  description,
}: SpecialistsProps) {
  return (
    <section className="bg-blue-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="mb-4 font-bold text-2xl text-gray-900 uppercase tracking-wide sm:text-3xl md:text-4xl">
          {title}
        </h2>
        <h3 className="mb-6 font-semibold text-blue-800 text-xl sm:text-2xl">
          {subtitle}
        </h3>
        <p className="mx-auto max-w-3xl text-gray-700 text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
