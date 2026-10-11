import editorialContent from "~/content/homepage-editorial.json" with {
  type: "json",
};

export default function EditorialContent() {
  return (
    <section
      aria-labelledby="homepage-editorial-title"
      className="bg-white px-4 py-16 sm:px-6"
    >
      <div className="container mx-auto max-w-4xl">
        <h2
          className="mb-8 text-center font-bold text-3xl text-gray-900 sm:text-4xl"
          id="homepage-editorial-title"
        >
          {editorialContent.title}
        </h2>
        <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
          {editorialContent.sections.map((section) => (
            <section key={section.title}>
              <h3 className="mb-3 font-semibold text-gray-900 text-xl">
                {section.title}
              </h3>
              {section.paragraphs.map((paragraph) => (
                <p className="mb-4 last:mb-0" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
