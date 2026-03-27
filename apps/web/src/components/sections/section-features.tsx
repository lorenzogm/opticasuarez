import { Link } from "@tanstack/react-router";
import { Text } from "~/components/text";
import { resolveImage } from "~/lib/sanity";

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data
export default function SectionFeatures({ section }: { section: any }) {
  const items = section.featureItems || section.items || [];

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {section.title && (
          <Text
            as="h2"
            className="mb-4 text-center text-gray-900"
            variant="heading-2"
          >
            {section.title}
          </Text>
        )}
        {section.subtitle && (
          <Text
            as="p"
            className="mb-12 text-center text-gray-600"
            variant="body-md"
          >
            {section.subtitle}
          </Text>
        )}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* biome-ignore lint/suspicious/noExplicitAny: dynamic feature items */}
          {items.map((item: any) => {
            const image = resolveImage(item.image);
            return (
              <div
                className="rounded-xl bg-white p-6 shadow-sm"
                key={item._key}
              >
                {image && (
                  <img
                    alt={item.title || ""}
                    className="mb-4 aspect-video w-full rounded-lg object-cover"
                    loading="lazy"
                    src={image}
                  />
                )}
                {item.icon && (
                  <span className="mb-3 block text-3xl">{item.icon}</span>
                )}
                {item.title && (
                  <Text
                    as="h3"
                    className="mb-2 text-gray-900"
                    variant="heading-3"
                  >
                    {item.link
                      ? (() => {
                          const isExternal =
                            item.link.startsWith("http") ||
                            item.link.startsWith("//");
                          return isExternal ? (
                            <a className="hover:text-blue-600" href={item.link}>
                              {item.title}
                            </a>
                          ) : (
                            <Link
                              className="hover:text-blue-600"
                              to={item.link}
                            >
                              {item.title}
                            </Link>
                          );
                        })()
                      : item.title}
                  </Text>
                )}
                {item.description && (
                  <Text as="p" className="text-gray-600" variant="body-md">
                    {item.description}
                  </Text>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
