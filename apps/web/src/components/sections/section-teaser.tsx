import { Text } from "~/components/text";
import { resolveImage } from "~/lib/sanity";

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data
export default function SectionTeaser({ section }: { section: any }) {
  const image = resolveImage(section.image);
  const variant = section.variant || "default";

  const bgClass =
    variant === "highlight"
      ? "bg-blue-900 text-white"
      : variant === "banner"
        ? "bg-gradient-to-r from-blue-800 to-blue-600 text-white"
        : "bg-gray-50 text-gray-900";

  return (
    <section className={`px-4 py-16 sm:px-6 ${bgClass}`}>
      <div className="container mx-auto max-w-6xl">
        <div
          className={`flex items-center gap-12 ${image ? "flex-col lg:flex-row" : "flex-col text-center"}`}
        >
          <div className={image ? "flex-1" : "mx-auto max-w-3xl"}>
            {section.title && (
              <Text
                as="h2"
                className={`mb-4 ${variant !== "default" ? "text-white" : "text-gray-900"}`}
                variant="heading-2"
              >
                {section.title}
              </Text>
            )}
            {section.description && (
              <Text
                as="p"
                className={`mb-8 ${variant !== "default" ? "text-blue-100" : "text-gray-600"}`}
                variant="body-lg"
              >
                {section.description}
              </Text>
            )}
            {section.buttonText && section.buttonUrl && (
              <a
                className={`inline-block rounded-lg px-8 py-3 font-semibold transition ${
                  variant !== "default"
                    ? "bg-white text-blue-900 hover:bg-gray-100"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                href={section.buttonUrl}
              >
                {section.buttonText}
              </a>
            )}
          </div>
          {image && (
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
