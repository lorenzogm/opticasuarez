interface BlogHeroProps {
  title: string;
  subtitle: string;
}

export default function BlogHero({ title, subtitle }: BlogHeroProps) {
  return (
    <section className="bg-white pt-24 pb-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 uppercase tracking-wide">
          {title}
        </h1>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-blue-800 uppercase tracking-wide">
          {subtitle}
        </h3>
      </div>
    </section>
  );
}
