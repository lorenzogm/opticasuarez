import { Text } from '../components/text';

interface Recommendation {
  age: string;
  frequency: string;
  reason: string;
}

interface ExamBenefitsProps {
  benefitsTitle: string;
  benefits: string[];
  frequencyTitle: string;
  recommendations: Recommendation[];
}

export default function ExamBenefits({ 
  benefitsTitle, 
  benefits, 
  frequencyTitle, 
  recommendations 
}: ExamBenefitsProps) {
  return (
    <section className="py-16 px-4 sm:px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Benefits */}
          <div>
            <Text
              as="h2"
              variant="heading-3"
              className="mb-8 text-gray-900 uppercase tracking-wide"
            >
              {benefitsTitle}
            </Text>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg 
                      className="w-4 h-4 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <Text
                    as="p"
                    variant="body-md"
                    className="text-gray-700 leading-relaxed"
                  >
                    {benefit}
                  </Text>
                </div>
              ))}
            </div>
          </div>

          {/* Frequency Recommendations */}
          <div>
            <Text
              as="h2"
              variant="heading-3"
              className="mb-8 text-gray-900 uppercase tracking-wide"
            >
              {frequencyTitle}
            </Text>
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <Text
                    as="h3"
                    variant="heading-5"
                    className="mb-2 text-blue-600"
                  >
                    {rec.age}
                  </Text>
                  <Text
                    as="p"
                    className="mb-2 text-gray-900"
                  >
                    {rec.frequency}
                  </Text>
                  <Text
                    as="p"
                    variant="body-sm"
                    className="text-gray-600"
                  >
                    {rec.reason}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}