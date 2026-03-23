import { Text } from "../../../components/text";

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
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <Text
          align="center"
          as="p"
          className="mb-8 text-gray-900 uppercase tracking-wide sm:mb-12"
          variant="heading-2"
        >
          {title}
        </Text>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <Text
              className="mb-6 text-gray-600 leading-relaxed"
              variant="body-lg"
            >
              {description}
            </Text>
          </div>

          <div>
            <Text
              as="p"
              className="mb-6 font-semibold text-2xl text-blue-900 tracking-tight"
            >
              Beneficios de la Terapia Visual:
            </Text>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li className="flex items-start" key={index}>
                  <svg
                    className="mt-1 mr-3 h-5 w-5 flex-shrink-0 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
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
