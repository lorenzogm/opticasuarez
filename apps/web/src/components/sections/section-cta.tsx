import { Button } from "~/components/button";
import { Text } from "~/components/text";

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data
export default function SectionCTA({ section }: { section: any }) {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        {section.title && (
          <Text align="center" as="h2" className="mb-6" variant="heading-2">
            {section.title}
          </Text>
        )}
        {section.description && (
          <Text
            align="center"
            className="mx-auto mb-8 max-w-2xl leading-relaxed"
            variant="body-lg"
          >
            {section.description}
          </Text>
        )}
        {section.buttonText && section.buttonUrl && (
          <Button
            className="min-h-[44px] min-w-[44px] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            href={section.buttonUrl}
            variant="primary"
          >
            {section.buttonText}
          </Button>
        )}
      </div>
    </section>
  );
}
