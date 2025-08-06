import { Text } from '../../../components/text';

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

export default function ExamProcess({ title, description, steps }: ExamProcessProps) {
  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Text
            as="h2"
            variant="heading-2"
            className="mb-6 text-gray-900 uppercase tracking-wide"
          >
            {title}
          </Text>
          <Text
            as="p"
            variant="body-lg"
            className="text-gray-600 max-w-3xl mx-auto"
          >
            {description}
          </Text>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block"></div>
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex items-start md:items-center">
                {/* Step number */}
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold z-10">
                  {step.step}
                </div>
                
                {/* Content */}
                <div className="ml-8 md:ml-12 flex-1">
                  <Text
                    as="h3"
                    variant="heading-4"
                    className="mb-3 text-gray-900 uppercase"
                  >
                    {step.title}
                  </Text>
                  <Text
                    as="p"
                    variant="body-md"
                    className="text-gray-600 leading-relaxed"
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