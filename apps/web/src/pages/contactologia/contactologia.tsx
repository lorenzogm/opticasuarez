import { useEffect, useState } from "react";
import { Button } from "../../components/button";
import Image from "../../components/image";
import { Text } from "../../components/text";

// biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
export default function Contactologia({ data }: { data: any }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector(
        ".parallax-element"
      ) as HTMLElement;
      if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  if (!data) return null;
  return (
    <main>
      {/* Main heading with background image and parallax */}
      <section className="relative overflow-hidden px-4 py-32 sm:px-6">
        <div className="parallax-element absolute inset-0">
          <Image
            alt="Contactología - Lentes de contacto"
            className="h-full w-full scale-110 transform object-cover"
            priority
            sizes="100vw"
            src="/images/homepage/services/contactologia.webp"
            title="Contactología en Jaén"
          />
        </div>
        <div className="container relative z-10 mx-auto max-w-6xl text-center">
          <Text
            as="h1"
            className="mb-8 text-white uppercase tracking-wide drop-shadow-lg"
            variant="heading-1"
          >
            {data.mainTitle}
          </Text>
        </div>
      </section>

      {/* Introduction */}
      {data.intro && (
        <section className="bg-gray-50 px-4 py-16 sm:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <Text as="h2" className="mb-6 text-gray-900" variant="heading-2">
              {data.intro.title}
            </Text>
            <Text
              as="p"
              className="text-gray-600 leading-relaxed"
              variant="body-lg"
            >
              {data.intro.description}
            </Text>
          </div>
        </section>
      )}

      {/* Services */}
      {data.items?.length > 0 && (
        <section className="bg-white py-12 sm:py-16 md:py-20" id="services">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="mb-12 text-center font-bold text-3xl text-gray-900 sm:mb-16 sm:text-4xl md:text-5xl">
              {data.itemsSectionTitle}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
              {data.items.map(
                (
                  item: { title: string; description: string },
                  index: number
                ) => (
                  <div
                    className="rounded-xl bg-gray-50 p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg sm:p-8"
                    key={index}
                  >
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 sm:mb-6 sm:h-16 sm:w-16">
                      <svg
                        className="h-6 w-6 text-blue-600 sm:h-8 sm:w-8"
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
                    <div className="mb-3 font-semibold text-gray-900 text-lg sm:mb-4 sm:text-xl">
                      {item.title}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed sm:text-base">
                      {item.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Types of Contact Lenses - not yet in Sanity */}

      {/* Advantages - not yet in Sanity */}

      {/* Process */}
      {data.process?.steps?.length > 0 && (
        <section className="bg-white px-4 py-16 sm:px-6">
          <div className="container mx-auto max-w-4xl">
            <Text
              as="h2"
              className="mb-12 text-center text-gray-900"
              variant="heading-2"
            >
              {data.process.title}
            </Text>
            <div className="space-y-8">
              {data.process.steps.map(
                (
                  step: {
                    stepNumber?: number;
                    step?: string;
                    title: string;
                    description: string;
                  },
                  index: number
                ) => (
                  <div className="flex items-start space-x-4" key={index}>
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                      {step.stepNumber || step.step}
                    </div>
                    <div>
                      <div className="mb-2 font-semibold text-gray-900 text-lg">
                        {step.title}
                      </div>
                      <Text as="p" className="text-gray-600" variant="body-md">
                        {step.description}
                      </Text>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {data.faq?.items?.length > 0 && (
        <section className="bg-gray-50 px-4 py-16 sm:px-6">
          <div className="container mx-auto max-w-4xl">
            <Text
              as="h2"
              className="mb-12 text-center text-gray-900"
              variant="heading-2"
            >
              {data.faq.title}
            </Text>
            <div className="space-y-4">
              {data.faq.items.map(
                (faq: { question: string; answer: string }, index: number) => (
                  <div
                    className="overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                    key={index}
                  >
                    <button
                      aria-expanded={openFaqIndex === index}
                      className="flex w-full items-center justify-between px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                      onClick={() =>
                        setOpenFaqIndex(openFaqIndex === index ? null : index)
                      }
                    >
                      <Text
                        as="h3"
                        className="pr-4 text-gray-900"
                        variant="heading-5"
                      >
                        {faq.question}
                      </Text>
                      <svg
                        className={`h-6 w-6 flex-shrink-0 transform text-blue-600 transition-transform duration-300 ${
                          openFaqIndex === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaqIndex === index ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="px-6 pb-4">
                        <Text
                          as="p"
                          className="text-gray-600"
                          variant="body-md"
                        >
                          {faq.answer}
                        </Text>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      {data.cta && (
        <section className="bg-blue-600 px-4 py-16 sm:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <Text as="h2" className="mb-6 text-white" variant="heading-2">
              {data.cta.title}
            </Text>
            <Text as="p" className="mb-8 text-blue-100" variant="body-lg">
              {data.cta.description}
            </Text>
            <Button
              href={data.cta.buttonLink || "/contacto"}
              rel={
                (data.cta.buttonLink || "").startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              target={
                (data.cta.buttonLink || "").startsWith("http")
                  ? "_blank"
                  : undefined
              }
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
