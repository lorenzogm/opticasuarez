import { Text } from '../../../components/text';

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
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <Text
          as="p"
          variant="heading-2"
          align="center"
          className="mb-4 text-gray-900 uppercase tracking-wide"
        >
          {title}
        </Text>
        <Text
          variant="body-lg"
          align="center"
          className="mb-12 text-gray-600 max-w-3xl mx-auto"
        >
          {subtitle}
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Text variant="heading-4">{step.step}</Text>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-blue-200 transform -translate-y-1/2"></div>
                )}
              </div>
              <Text as="p" className="mb-3 text-gray-900 text-2xl font-semibold tracking-tight">
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
