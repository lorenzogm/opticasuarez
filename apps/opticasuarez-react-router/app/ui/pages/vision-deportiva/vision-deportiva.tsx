import content from "../../../content/vision-deportiva.json" with {
  type: "json",
};
import { Button } from "../../components/button";
import FAQAccordion from "../../components/faq-accordion";
import Image from "../../components/image";
import { Text } from "../../components/text";
import CustomerTestimonials from "../../sections/customer-testimonials";
import Services from "./sections/services";

function VisionDeportivaHero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-20 sm:px-6">
      <div className="container mx-auto max-w-6xl text-center">
        <Text
          as="h1"
          className="mb-4 text-white uppercase tracking-wide"
          variant="heading-1"
        >
          {content.hero.title}
        </Text>
        <Text as="h2" className="mb-6 text-blue-100">
          {content.hero.subtitle}
        </Text>
        <Text
          as="p"
          className="mx-auto mb-8 max-w-3xl text-blue-100"
          variant="body-lg"
        >
          {content.hero.description}
        </Text>
        <Button
          className="bg-white text-blue-600 hover:bg-blue-50"
          href="https://api.whatsapp.com/send?phone=34953093062&text=Hola,%20me%20gustaría%20reservar%20una%20evaluación%20de%20visión%20deportiva"
          rel="noopener noreferrer"
          target="_blank"
          variant="primary"
        >
          RESERVAR EVALUACIÓN
        </Button>
      </div>
    </section>
  );
}

function VisionDeportivaIntroduction() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <Text
              as="h2"
              className="mb-6 text-gray-900 uppercase tracking-wide"
              variant="heading-2"
            >
              {content.introduction.title}
            </Text>
            <Text
              as="p"
              className="mb-8 text-gray-600 leading-relaxed"
              variant="body-lg"
            >
              {content.introduction.description}
            </Text>
            <div className="space-y-4">
              {content.introduction.benefits.map((benefit, index) => (
                <div className="flex items-center" key={index}>
                  <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
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
              alt="Evaluación visual deportiva"
              className="h-96 w-full rounded-lg object-cover shadow-lg"
              src="/images/vision-deportiva/vision-deportiva-intro.webp"
              title="Evaluación visual deportiva"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TerapiaVisualDeportiva() {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <Text
          as="h2"
          className="mb-8 text-center text-gray-900 uppercase tracking-wide"
          variant="heading-2"
        >
          {content.visualTherapy.title}
        </Text>
        <Text
          as="p"
          className="mx-auto mb-12 max-w-4xl text-center text-gray-600"
          variant="body-lg"
        >
          {content.visualTherapy.description}
        </Text>

        {/* Skills Section */}
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.visualTherapy.skills.map((skill, index) => (
            <div
              className="rounded-lg bg-white p-6 text-center shadow-md transition-shadow duration-300 hover:shadow-lg"
              key={index}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                  <path
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <Text as="h3" className="mb-3 text-gray-900" variant="heading-4">
                {skill.title}
              </Text>
              <Text as="p" className="text-gray-600">
                {skill.description}
              </Text>
            </div>
          ))}
        </div>

        {/* Improvements and Images Section */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <Text
              as="h3"
              className="mb-6 text-gray-900 uppercase tracking-wide"
              variant="heading-3"
            >
              {content.visualTherapy.improvements.title}
            </Text>
            <div className="mb-8 space-y-4">
              {content.visualTherapy.improvements.items.map(
                (improvement, index) => (
                  <div className="flex items-center" key={index}>
                    <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
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
              className="bg-green-600 text-white hover:bg-green-700"
              href={`${content.visualTherapy.ctaButton.url}?text=${encodeURIComponent(content.visualTherapy.ctaButton.message)}`}
              rel="noopener noreferrer"
              target="_blank"
              variant="primary"
            >
              {content.visualTherapy.ctaButton.text}
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {content.visualTherapy.images.map((image, index) => (
              <div className="relative" key={index}>
                <Image
                  alt={image.alt}
                  className="h-64 w-full rounded-lg object-cover shadow-lg"
                  src={image.src}
                  title={image.title}
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
    <section className="bg-blue-600 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <Text
          as="h2"
          className="mb-6 text-white uppercase tracking-wide"
          variant="heading-2"
        >
          {content.cta.title}
        </Text>
        <Text as="p" className="mb-8 text-blue-100" variant="body-lg">
          {content.cta.description}
        </Text>
        <Button
          className="bg-white text-blue-600 hover:bg-blue-50"
          href={content.cta.buttonUrl}
          rel={
            content.cta.buttonUrl.startsWith("http")
              ? "noopener noreferrer"
              : undefined
          }
          target={
            content.cta.buttonUrl.startsWith("http") ? "_blank" : undefined
          }
          variant="primary"
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
      <Services items={content.services.items} title={content.services.title} />
      <TerapiaVisualDeportiva />
      <CustomerTestimonials
        moreReviewsLink=""
        testimonials={content.testimonials.items}
        title={content.testimonials.title}
      />
      <FAQAccordion items={content.faq.items} title={content.faq.title} />
      <CallToAction />
    </main>
  );
}
