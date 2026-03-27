import { Text } from "~/components/text";

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data
export default function SectionStats({ section }: { section: any }) {
  const items = section.statItems || section.items || [];

  return (
    <section className="bg-white px-4 py-16 sm:px-6">
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
            className="mb-4 text-center text-gray-600"
            variant="body-md"
          >
            {section.subtitle}
          </Text>
        )}
        {section.description && (
          <Text
            as="p"
            className="mx-auto mb-12 max-w-3xl text-center text-gray-600"
            variant="body-md"
          >
            {section.description}
          </Text>
        )}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* biome-ignore lint/suspicious/noExplicitAny: dynamic stat items */}
          {items.map((item: any, index: number) => (
            <div
              className="rounded-xl bg-blue-50 p-8 text-center"
              key={item._key || index}
            >
              {item.value && (
                <Text
                  as="p"
                  className="mb-3 font-bold text-4xl text-blue-600"
                  variant="heading-1"
                >
                  {item.value}
                </Text>
              )}
              {item.title && (
                <Text
                  as="h3"
                  className="mb-2 text-gray-900"
                  variant="heading-4"
                >
                  {item.title}
                </Text>
              )}
              {item.description && (
                <Text as="p" className="text-gray-600" variant="body-sm">
                  {item.description}
                </Text>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
