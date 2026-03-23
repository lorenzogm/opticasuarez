import { Text } from "../../../components/text";

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface TerapiaVisualProcessProps {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

export default function TerapiaVisualProcess({
  title,
  subtitle,
  steps,
}: TerapiaVisualProcessProps) {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <Text
          align="center"
          as="p"
          className="mb-4 text-gray-900 uppercase tracking-wide"
          variant="heading-2"
        >
          {title}
        </Text>
        <Text
          align="center"
          className="mx-auto mb-12 max-w-3xl text-gray-600"
          variant="body-lg"
        >
          {subtitle}
        </Text>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div className="text-center" key={index}>
              <div className="relative mb-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-900 text-white">
                  <Text variant="heading-4">{step.step}</Text>
                </div>
                {index < steps.length - 1 && (
                  <div className="-translate-y-1/2 absolute top-8 left-full hidden h-0.5 w-full transform bg-blue-200 lg:block" />
                )}
              </div>
              <Text
                as="p"
                className="mb-3 font-semibold text-2xl text-gray-900 tracking-tight"
              >
                {step.title}
              </Text>
              <Text className="text-gray-600 leading-relaxed">
                {step.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
