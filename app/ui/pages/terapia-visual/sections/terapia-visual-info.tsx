import { Text } from '../../../components/text';

interface TerapiaVisualInfoProps {
  title: string;
  description: string;
  benefits: string[];
}

export default function TerapiaVisualInfo({
  title,
  description,
  benefits,
}: TerapiaVisualInfoProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <Text
          as="p"
          variant="heading-2"
          align="center"
          className="mb-8 sm:mb-12 text-gray-900 uppercase tracking-wide"
        >
          {title}
        </Text>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <Text
              variant="body-lg"
              className="mb-6 text-gray-600 leading-relaxed"
            >
              {description}
            </Text>
          </div>

          <div>
            <Text as="p" className="mb-6 text-blue-900 text-2xl font-semibold tracking-tight">
              Beneficios de la Terapia Visual:
            </Text>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <Text className="text-gray-700">{benefit}</Text>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
