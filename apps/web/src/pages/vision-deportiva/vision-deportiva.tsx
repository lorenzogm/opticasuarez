import { Button } from "../../components/button";
import FAQAccordion from "../../components/faq-accordion";
import Image from "../../components/image";
import { Text } from "../../components/text";
import { resolveImage } from "../../lib/sanity";
import CustomerTestimonials from "../../sections/customer-testimonials";
import Services from "./sections/services";

// biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
export default function VisionDeportiva({ data }: { data: any }) {
  if (!data) return null;

  const intro = data.introduction || data.intro;
  const vt = data.visualTherapy;
  const ctaUrl = data.cta?.buttonLink || data.cta?.buttonUrl || "#";

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-20 sm:px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <Text
            as="h1"
            className="mb-4 text-white uppercase tracking-wide"
            variant="heading-1"
          >
            {data.mainTitle}
          </Text>
          {data.subtitle && (
            <Text as="h2" className="mb-6 text-blue-100">
              {data.subtitle}
            </Text>
          )}
          {data.heroDescription && (
            <Text
              as="p"
              className="mx-auto mb-8 max-w-3xl text-blue-100"
              variant="body-lg"
            >
              {data.heroDescription}
            </Text>
          )}
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

      {/* Introduction */}
      {intro && (
        <section className="bg-white px-4 py-16 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <Text
                  as="h2"
                  className="mb-6 text-gray-900 uppercase tracking-wide"
                  variant="heading-2"
                >
                  {intro.title}
                </Text>
                <Text
                  as="p"
                  className="mb-8 text-gray-600 leading-relaxed"
                  variant="body-lg"
                >
                  {intro.description}
                </Text>
                {(intro.benefits || []).length > 0 && (
                  <div className="space-y-4">
                    {intro.benefits.map((benefit: string, index: number) => (
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
                )}
              </div>
              <div className="relative">
                <Image
                  alt="Evaluación visual deportiva"
                  className="h-96 w-full rounded-lg object-cover shadow-lg"
                  src={
                    resolveImage(data.heroImage) ||
                    "/images/vision-deportiva/vision-deportiva-intro.webp"
                  }
                  title="Evaluación visual deportiva"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      {data.items?.length > 0 && (
        <Services items={data.items} title={data.itemsSectionTitle} />
      )}

      {/* Visual Therapy Section */}
      {vt && (
        <section className="bg-gray-50 px-4 py-16 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <Text
              as="h2"
              className="mb-8 text-center text-gray-900 uppercase tracking-wide"
              variant="heading-2"
            >
              {vt.title}
            </Text>
            <Text
              as="p"
              className="mx-auto mb-12 max-w-4xl text-center text-gray-600"
              variant="body-lg"
            >
              {vt.description}
            </Text>

            {(vt.skills || []).length > 0 && (
              <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {vt.skills.map(
                  (
                    skill: { title: string; description: string },
                    index: number
                  ) => (
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
                      <Text
                        as="h3"
                        className="mb-3 text-gray-900"
                        variant="heading-4"
                      >
                        {skill.title}
                      </Text>
                      <Text as="p" className="text-gray-600">
                        {skill.description}
                      </Text>
                    </div>
                  )
                )}
              </div>
            )}

            {vt.improvements && (
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div>
                  <Text
                    as="h3"
                    className="mb-6 text-gray-900 uppercase tracking-wide"
                    variant="heading-3"
                  >
                    {vt.improvements.title}
                  </Text>
                  <div className="mb-8 space-y-4">
                    {(vt.improvements.items || []).map(
                      (improvement: string, index: number) => (
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
                  {vt.ctaButton && (
                    <Button
                      className="bg-green-600 text-white hover:bg-green-700"
                      href={`${vt.ctaButton.url}?text=${encodeURIComponent(vt.ctaButton.message || "")}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      variant="primary"
                    >
                      {vt.ctaButton.text}
                    </Button>
                  )}
                </div>
                {(vt.images || []).length > 0 && (
                  <div className="grid grid-cols-1 gap-4">
                    {vt.images.map(
                      (
                        image: {
                          src: string | { asset?: { url?: string } };
                          alt: string;
                          title: string;
                        },
                        index: number
                      ) => (
                        <div className="relative" key={index}>
                          <Image
                            alt={image.alt}
                            className="h-64 w-full rounded-lg object-cover shadow-lg"
                            src={
                              typeof image.src === "string"
                                ? image.src
                                : resolveImage(image.src)
                            }
                            title={image.title}
                          />
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {data.testimonials?.items?.length > 0 && (
        <CustomerTestimonials
          moreReviewsLink=""
          testimonials={data.testimonials.items}
          title={data.testimonials.title}
        />
      )}

      {/* FAQ */}
      {data.faq?.items?.length > 0 && (
        <FAQAccordion items={data.faq.items} title={data.faq.title} />
      )}

      {/* CTA */}
      {data.cta && (
        <section className="bg-blue-600 px-4 py-16 sm:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <Text
              as="h2"
              className="mb-6 text-white uppercase tracking-wide"
              variant="heading-2"
            >
              {data.cta.title}
            </Text>
            <Text as="p" className="mb-8 text-blue-100" variant="body-lg">
              {data.cta.description}
            </Text>
            <Button
              className="bg-white text-blue-600 hover:bg-blue-50"
              href={ctaUrl}
              rel={
                ctaUrl.startsWith("http") ? "noopener noreferrer" : undefined
              }
              target={ctaUrl.startsWith("http") ? "_blank" : undefined}
              variant="primary"
            >
              {data.cta.buttonText}
            </Button>
          </div>
        </section>
      )}
    </main>
  );
}
