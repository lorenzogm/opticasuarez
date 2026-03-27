interface BlogHeroProps {
  title: string;
  subtitle: string;
}

export default function BlogHero({ title, subtitle }: BlogHeroProps) {
  return (
    <section className="bg-white px-4 pt-24 pb-16 sm:px-6">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="mb-4 font-bold text-3xl text-gray-900 uppercase tracking-wide sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <h3 className="font-medium text-blue-800 text-xl uppercase tracking-wide sm:text-2xl md:text-3xl">
          {subtitle}
        </h3>
      </div>
    </section>
  );
}
