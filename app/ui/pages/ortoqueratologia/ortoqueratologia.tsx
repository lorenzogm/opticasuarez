import { Text } from '../../components/text';
import { Button } from '../../components/button';
import Image from '../../components/image';
import FAQAccordion from '../../components/faq-accordion';
import content from '../../../content/ortoqueratologia.json';

export default function Ortoqueratologia() {
  return (
    <main>
      {/* Hero Section with Image and Title */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Text Content */}
            <div className="order-2 lg:order-1">
              <Text
                as="h1"
                variant="heading-1"
                className="mb-6 text-gray-900 uppercase tracking-wide"
              >
                {content.hero.title}
              </Text>
              <Text
                as="h2"
                variant="heading-3"
                className="mb-4 text-blue-600"
              >
                {content.hero.subtitle}
              </Text>
              <Text as="p" variant="body-lg" className="text-gray-600">
                {content.hero.description}
              </Text>
            </div>

            {/* Right side - Image */}
            <div className="order-1 lg:order-2">
              <Image
                src={content.hero.image}
                alt="Ortoqueratología - Moldeo corneal en Óptica Suárez Jaén"
                className="w-full h-auto rounded-xl shadow-lg"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Text as="h2" variant="heading-2" className="mb-6 text-gray-900">
            {content.intro.title}
          </Text>
          <Text
            as="p"
            variant="body-lg"
            className="text-gray-600 leading-relaxed"
          >
            {content.intro.description}
          </Text>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <Text
            as="h2"
            variant="heading-2"
            className="mb-12 text-gray-900 text-center"
          >
            {content.benefits.title}
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.benefits.items.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <Text
                  as="h3"
                  variant="heading-4"
                  className="mb-4 text-gray-900"
                >
                  {benefit.title}
                </Text>
                <Text as="p" variant="body-md" className="text-gray-600">
                  {benefit.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process with Images */}
      <section className="bg-blue-50 py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <Text
            as="h2"
            variant="heading-2"
            className="mb-12 text-gray-900 text-center"
          >
            {content.process.title}
          </Text>
          <div className="space-y-12">
            {content.process.steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 items-center bg-white rounded-xl p-6 shadow-md`}
              >
                <div className="lg:w-1/2">
                  <Image
                    src={step.image}
                    alt={`${step.title} - Ortoqueratología en Jaén`}
                    className="w-full h-auto rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="lg:w-1/2">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                      {step.step}
                    </div>
                    <div>
                      <Text
                        as="h3"
                        variant="heading-4"
                        className="mb-3 text-gray-900"
                      >
                        {step.title}
                      </Text>
                      <Text as="p" variant="body-md" className="text-gray-600">
                        {step.description}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal Candidates */}
      <section className="bg-white py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <Text
            as="h2"
            variant="heading-2"
            className="mb-6 text-gray-900 text-center"
          >
            {content.candidates.title}
          </Text>
          <Text
            as="p"
            variant="body-lg"
            className="mb-8 text-gray-600 text-center"
          >
            {content.candidates.description}
          </Text>
          <div className="bg-blue-50 rounded-xl p-8">
            <ul className="space-y-4">
              {content.candidates.items.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <svg
                    className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1"
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
                  <Text as="p" variant="body-md" className="text-gray-700">
                    {item}
                  </Text>
                </li>
              ))}
            </ul>
            {content.candidates.disclaimer && (
              <Text
                as="p"
                variant="body-sm"
                className="mt-6 text-gray-500 italic text-center"
              >
                * {content.candidates.disclaimer}
              </Text>
            )}
          </div>
        </div>
      </section>

      {/* Why Óptica Suárez */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <Text
            as="h2"
            variant="heading-2"
            className="mb-12 text-gray-900 text-center"
          >
            {content['why-optica-suarez'].title}
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content['why-optica-suarez'].items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <Text
                  as="h3"
                  variant="heading-5"
                  className="mb-3 text-gray-900"
                >
                  {item.title}
                </Text>
                <Text as="p" variant="body-sm" className="text-gray-600">
                  {item.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordion
        title={content.faq.title}
        items={content.faq.items}
      />

      {/* Call to Action */}
      <section className="bg-blue-600 py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Text as="h2" variant="heading-2" className="mb-6 text-white">
            {content.cta.title}
          </Text>
          <Text as="p" variant="body-lg" className="mb-8 text-blue-100">
            {content.cta.description}
          </Text>
          <Button
            variant="primary"
            href={content.cta.buttonLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.cta.buttonText}
          </Button>
        </div>
      </section>
    </main>
  );
}
