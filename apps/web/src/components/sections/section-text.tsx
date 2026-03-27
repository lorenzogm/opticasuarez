import { PortableText } from "@portabletext/react";
import { Text } from "~/components/text";
import { resolveImage } from "~/lib/sanity";

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data
export default function SectionText({ section }: { section: any }) {
  const image = resolveImage(section.image);
  const hasImage = !!image;
  const position = section.imagePosition || "right";

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {section.title && (
          <Text as="h2" className="mb-8 text-gray-900" variant="heading-2">
            {section.title}
          </Text>
        )}
        <div
          className={
            hasImage
              ? `flex flex-col gap-8 lg:flex-row ${position === "left" ? "lg:flex-row-reverse" : ""}`
              : ""
          }
        >
          <div className={hasImage ? "flex-1" : ""}>
            {section.content && (
              <div className="prose prose-lg max-w-none text-gray-700">
                <PortableText value={section.content} />
              </div>
            )}
          </div>
          {hasImage && (
            <div className="flex-1">
              <img
                alt={section.title || ""}
                className="w-full rounded-xl object-cover"
                loading="lazy"
                src={image}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
