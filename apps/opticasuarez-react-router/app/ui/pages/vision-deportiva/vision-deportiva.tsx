import { Text } from '../../components/text';
import { Button } from '../../components/button';
import Services from './sections/services';
import CustomerTestimonials from '../../sections/customer-testimonials';
import Image from '../../components/image';
import FAQAccordion from '../../components/faq-accordion';
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
        <Text as="h2" className="mb-6 text-blue-100">
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
          href="https://api.whatsapp.com/send?phone=34953093062&text=Hola,%20me%20gustaría%20reservar%20una%20evaluación%20de%20visión%20deportiva"
          target="_blank"
          rel="noopener noreferrer"
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
              src="/images/vision-deportiva/vision-deportiva-intro.webp"
              alt="Evaluación visual deportiva"
              title="Evaluación visual deportiva"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TerapiaVisualDeportiva() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <Text
          as="h2"
          variant="heading-2"
          className="mb-8 text-center text-gray-900 uppercase tracking-wide"
        >
          {content.visualTherapy.title}
        </Text>
        <Text
          as="p"
          variant="body-lg"
          className="mb-12 text-center text-gray-600 max-w-4xl mx-auto"
        >
          {content.visualTherapy.description}
        </Text>

        {/* Skills Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {content.visualTherapy.skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <Text as="h3" variant="heading-4" className="mb-3 text-gray-900">
                {skill.title}
              </Text>
              <Text as="p" className="text-gray-600">
                {skill.description}
              </Text>
            </div>
          ))}
        </div>

        {/* Improvements and Images Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Text
              as="h3"
              variant="heading-3"
              className="mb-6 text-gray-900 uppercase tracking-wide"
            >
              {content.visualTherapy.improvements.title}
            </Text>
            <div className="space-y-4 mb-8">
              {content.visualTherapy.improvements.items.map(
                (improvement, index) => (
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
                      {improvement}
                    </Text>
                  </div>
                )
              )}
            </div>
            <Button
              variant="primary"
              className="bg-green-600 hover:bg-green-700 text-white"
              href={`${content.visualTherapy.ctaButton.url}?text=${encodeURIComponent(content.visualTherapy.ctaButton.message)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.visualTherapy.ctaButton.text}
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {content.visualTherapy.images.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  title={image.title}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            ))}
          </div>
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
        <Text as="p" variant="body-lg" className="mb-8 text-blue-100">
          {content.cta.description}
        </Text>
        <Button
          variant="primary"
          className="bg-white text-blue-600 hover:bg-blue-50"
          href={content.cta.buttonUrl}
          target={
            content.cta.buttonUrl.startsWith('http') ? '_blank' : undefined
          }
          rel={
            content.cta.buttonUrl.startsWith('http')
              ? 'noopener noreferrer'
              : undefined
          }
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
      <Services title={content.services.title} items={content.services.items} />
      <TerapiaVisualDeportiva />
      <CustomerTestimonials
        title={content.testimonials.title}
        testimonials={content.testimonials.items}
        moreReviewsLink=""
      />
      <FAQAccordion title={content.faq.title} items={content.faq.items} />
      <CallToAction />
    </main>
  );
}
