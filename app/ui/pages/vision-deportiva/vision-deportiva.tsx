import { Text } from '../../components/text';
import { Button } from '../../components/button';
import Services from './sections/services';
import CustomerTestimonials from '../../sections/customer-testimonials';
import Image from '../../components/image';
import content from '../../../content/vision-deportiva.json';

function VisionDeportivaHero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl text-center">
        <Text
          as="h1"
          variant="heading-1"
          className="mb-4 text-white uppercase tracking-wide"
        >
          {content.hero.title}
        </Text>
        <Text
          as="h2"
          className="mb-6 text-blue-100"
        >
          {content.hero.subtitle}
        </Text>
        <Text
          as="p"
          variant="body-lg"
          className="mb-8 text-blue-100 max-w-3xl mx-auto"
        >
          {content.hero.description}
        </Text>
        <Button
          variant="primary"
          className="bg-white text-blue-600 hover:bg-blue-50"
          href="/book"
        >
          RESERVAR EVALUACIÓN
        </Button>
      </div>
    </section>
  );
}

function VisionDeportivaIntroduction() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Text
              as="h2"
              variant="heading-2"
              className="mb-6 text-gray-900 uppercase tracking-wide"
            >
              {content.introduction.title}
            </Text>
            <Text
              as="p"
              variant="body-lg"
              className="mb-8 text-gray-600 leading-relaxed"
            >
              {content.introduction.description}
            </Text>
            <div className="space-y-4">
              {content.introduction.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <Text as="p" className="text-gray-700">
                    {benefit}
                  </Text>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <Image
              src="/images/homepage/services/vision-binocular.jpg"
              alt="Evaluación visual deportiva"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SportsGrid() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <Text
          as="h2"
          variant="heading-2"
          className="mb-12 text-center text-gray-900 uppercase tracking-wide"
        >
          {content.sports.title}
        </Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.sports.items.map((sport, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <Text
                as="h3"
                variant="heading-4"
                className="mb-3 text-gray-900 text-center"
              >
                {sport.name}
              </Text>
              <Text
                as="p"
                className="text-gray-600 text-center"
              >
                {sport.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-blue-600">
      <div className="container mx-auto max-w-4xl text-center">
        <Text
          as="h2"
          variant="heading-2"
          className="mb-6 text-white uppercase tracking-wide"
        >
          {content.cta.title}
        </Text>
        <Text
          as="p"
          variant="body-lg"
          className="mb-8 text-blue-100"
        >
          {content.cta.description}
        </Text>
        <Button
          variant="primary"
          className="bg-white text-blue-600 hover:bg-blue-50"
          href={content.cta.buttonUrl}
        >
          {content.cta.buttonText}
        </Button>
      </div>
    </section>
  );
}

export default function VisionDeportiva() {
  return (
    <main>
      <VisionDeportivaHero />
      <VisionDeportivaIntroduction />
      <Services 
        title={content.services.title}
        items={content.services.items}
      />
      <SportsGrid />
      <CustomerTestimonials
        title={content.testimonials.title}
        testimonials={content.testimonials.items}
        moreReviewsLink=""
      />
      <CallToAction />
    </main>
  );
}