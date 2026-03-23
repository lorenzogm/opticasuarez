import { Text } from "../../../components/text";

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
  recommendations,
}: ExamBenefitsProps) {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Benefits */}
          <div>
            <Text
              as="h2"
              className="mb-8 text-gray-900 uppercase tracking-wide"
              variant="heading-3"
            >
              {benefitsTitle}
            </Text>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div className="flex items-start" key={index}>
                  <div className="mt-1 mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
                    <svg
                      className="h-4 w-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <Text
                    as="p"
                    className="text-gray-700 leading-relaxed"
                    variant="body-md"
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
              className="mb-8 text-gray-900 uppercase tracking-wide"
              variant="heading-3"
            >
              {frequencyTitle}
            </Text>
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <div className="rounded-lg bg-white p-6 shadow-md" key={index}>
                  <Text
                    as="h3"
                    className="mb-2 text-blue-600"
                    variant="heading-5"
                  >
                    {rec.age}
                  </Text>
                  <Text as="p" className="mb-2 text-gray-900">
                    {rec.frequency}
                  </Text>
                  <Text as="p" className="text-gray-600" variant="body-sm">
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
