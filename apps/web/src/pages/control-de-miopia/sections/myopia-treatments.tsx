import { Text } from '../../../components/text';
import Image from '../../../components/image';

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
    <section className="bg-gray-50 py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Text
            as="h2"
            variant="heading-2"
            className="mb-6 text-gray-900 uppercase tracking-wide"
          >
            {title}
          </Text>
        </div>

        <div className="space-y-12">
          {treatments.map((treatment, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <Text
                  as="h3"
                  className="mb-4 text-blue-900 uppercase tracking-wide"
                >
                  {treatment.title}
                </Text>
                <Text
                  variant="body-lg"
                  className="mb-6 text-gray-600 leading-relaxed"
                >
                  {treatment.description}
                </Text>
                <div className="space-y-2">
                  {treatment.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <Text variant="body-sm" className="text-gray-600">
                        {benefit}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <Image
                  src={treatment.image}
                  alt={treatment.imageAlt || treatment.title}
                  title={treatment.imageTitle}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
