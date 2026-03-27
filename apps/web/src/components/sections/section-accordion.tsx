import { useState } from "react";
import { Text } from "~/components/text";

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data
export default function SectionAccordion({ section }: { section: any }) {
  const items = section.accordionItems || section.items || [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-4xl">
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
        <div className="space-y-4">
          {/* biome-ignore lint/suspicious/noExplicitAny: dynamic accordion items */}
          {items.map((item: any, index: number) => (
            <div
              className="overflow-hidden rounded-lg bg-white shadow-sm"
              key={item._key || index}
            >
              <button
                aria-controls={`accordion-panel-${index}`}
                aria-expanded={openIndex === index}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors duration-200 hover:bg-gray-50"
                onClick={() => toggleItem(index)}
                type="button"
              >
                <Text
                  as="span"
                  className="pr-8 text-gray-900"
                  variant="heading-5"
                >
                  {item.title}
                </Text>
                <svg
                  className={`h-6 w-6 flex-shrink-0 text-blue-600 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </button>
              <div
                aria-hidden={openIndex !== index}
                aria-labelledby={`accordion-button-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
                id={`accordion-panel-${index}`}
                role="region"
              >
                <div className="px-6 pt-2 pb-4">
                  <Text as="p" className="text-gray-600" variant="body-md">
                    {item.content}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
