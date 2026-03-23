import { Text } from "../../../components/text";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessSectionProps {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

export default function ProcessSection({
  title,
  subtitle,
  steps,
}: ProcessSectionProps) {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <Text as="h2" className="mb-4 text-gray-900" variant="heading-2">
            {title}
          </Text>
          <Text className="text-gray-600" variant="body-lg">
            {subtitle}
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div className="relative" key={index}>
              <div className="h-full rounded-lg bg-white p-6 shadow-md">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 font-bold text-2xl text-white">
                    {step.number}
                  </div>
                  <Text
                    as="h3"
                    className="mb-3 text-gray-900"
                    variant="heading-5"
                  >
                    {step.title}
                  </Text>
                  <Text className="text-gray-600" variant="body-sm">
                    {step.description}
                  </Text>
                </div>
              </div>
              {index < steps.length - 1 && (
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
