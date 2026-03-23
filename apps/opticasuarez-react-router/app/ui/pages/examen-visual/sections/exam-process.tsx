import { Text } from "../../../components/text";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface ExamProcessProps {
  title: string;
  description: string;
  steps: ProcessStep[];
}

export default function ExamProcess({
  title,
  description,
  steps,
}: ExamProcessProps) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <Text
            as="h2"
            className="mb-6 text-gray-900 uppercase tracking-wide"
            variant="heading-2"
          >
            {title}
          </Text>
          <Text
            as="p"
            className="mx-auto max-w-3xl text-gray-600"
            variant="body-lg"
          >
            {description}
          </Text>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-8 hidden w-0.5 bg-blue-200 md:block" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                className="relative flex items-start md:items-center"
                key={index}
              >
                {/* Step number */}
                <div className="z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white text-xl">
                  {step.step}
                </div>

                {/* Content */}
                <div className="ml-8 flex-1 md:ml-12">
                  <Text
                    as="h3"
                    className="mb-3 text-gray-900 uppercase"
                    variant="heading-4"
                  >
                    {step.title}
                  </Text>
                  <Text
                    as="p"
                    className="text-gray-600 leading-relaxed"
                    variant="body-md"
                  >
                    {step.description}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
