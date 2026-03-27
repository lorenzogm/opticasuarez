import { Text } from "~/components/text";
import { resolveImage } from "~/lib/sanity";

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data
export default function SectionHero({ section }: { section: any }) {
  const bgImage = resolveImage(section.image);

  return (
    <section
      className="relative flex min-h-[60vh] items-center justify-center bg-center bg-cover px-4 text-white sm:px-6"
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {section.subtitle && (
          <Text
            as="p"
            className="mb-2 text-blue-200 uppercase tracking-wider"
            variant="body-md"
          >
            {section.subtitle}
          </Text>
        )}
        {section.title && (
          <Text as="h1" className="mb-6 text-white" variant="heading-1">
            {section.title}
          </Text>
        )}
        {section.description && (
          <Text as="p" className="mb-8 text-gray-200 text-lg" variant="body-lg">
            {section.description}
          </Text>
        )}
        {section.ctaText && section.ctaUrl && (
          <a
            className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            href={section.ctaUrl}
          >
            {section.ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
