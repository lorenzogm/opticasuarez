import { Text } from "~/components/text";

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data
export default function SectionProcessSteps({ section }: { section: any }) {
  const items = section.processStepItems || section.items || [];

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {(section.title || section.subtitle) && (
          <div className="mb-12 text-center">
            {section.title && (
              <Text as="h2" className="mb-4 text-gray-900" variant="heading-2">
                {section.title}
              </Text>
            )}
            {section.subtitle && (
              <Text className="text-gray-600" variant="body-lg">
                {section.subtitle}
              </Text>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* biome-ignore lint/suspicious/noExplicitAny: dynamic items */}
          {items.map((step: any, index: number) => (
            <div className="relative" key={step._key || index}>
              <div className="h-full rounded-lg bg-white p-6 shadow-md">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 font-bold text-2xl text-white">
                    {step.stepNumber || index + 1}
                  </div>
                  {step.title && (
                    <Text
                      as="h3"
                      className="mb-3 text-gray-900"
                      variant="heading-5"
                    >
                      {step.title}
                    </Text>
                  )}
                  {step.description && (
                    <Text className="text-gray-600" variant="body-sm">
                      {step.description}
                    </Text>
                  )}
                </div>
              </div>
              {index < items.length - 1 && (
                <div className="-right-4 -translate-y-1/2 absolute top-1/2 z-10 hidden transform lg:block">
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
