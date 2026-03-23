import Image from "../../../components/image";
import { Text } from "../../../components/text";

interface Treatment {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  imageTitle?: string;
  benefits: string[];
}

interface MyopiaTreatmentsProps {
  title: string;
  treatments: Treatment[];
}

export default function MyopiaTreatments({
  title,
  treatments,
}: MyopiaTreatmentsProps) {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <Text
            as="h2"
            className="mb-6 text-gray-900 uppercase tracking-wide"
            variant="heading-2"
          >
            {title}
          </Text>
        </div>

        <div className="space-y-12">
          {treatments.map((treatment, index) => (
            <div
              className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
              key={index}
            >
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <Text
                  as="h3"
                  className="mb-4 text-blue-900 uppercase tracking-wide"
                >
                  {treatment.title}
                </Text>
                <Text
                  className="mb-6 text-gray-600 leading-relaxed"
                  variant="body-lg"
                >
                  {treatment.description}
                </Text>
                <div className="space-y-2">
                  {treatment.benefits.map((benefit, benefitIndex) => (
                    <div className="flex items-center" key={benefitIndex}>
                      <div className="mr-3 h-2 w-2 rounded-full bg-blue-600" />
                      <Text className="text-gray-600" variant="body-sm">
                        {benefit}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <Image
                  alt={treatment.imageAlt || treatment.title}
                  className="h-auto w-full rounded-lg shadow-lg"
                  src={treatment.image}
                  title={treatment.imageTitle}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
