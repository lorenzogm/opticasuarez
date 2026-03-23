import { useState } from "react";
import { Text } from "./text";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQAccordion({ items, title }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        {title && (
          <Text
            as="h2"
            className="mb-12 text-center text-gray-900"
            variant="heading-2"
          >
            {title}
          </Text>
        )}
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              className="overflow-hidden rounded-lg bg-white shadow-sm"
              key={index}
            >
              <button
                aria-controls={`faq-panel-${index}`}
                aria-expanded={openIndex === index}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors duration-200 hover:bg-gray-50"
                onClick={() => toggleItem(index)}
              >
                <Text
                  as="h3"
                  className="pr-8 text-gray-900"
                  id={`faq-button-${index}`}
                  variant="heading-5"
                >
                  {item.question}
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
                aria-labelledby={`faq-button-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
                id={`faq-panel-${index}`}
                role="region"
              >
                <div className="px-6 pt-2 pb-4">
                  <Text as="p" className="text-gray-600" variant="body-md">
                    {item.answer}
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
