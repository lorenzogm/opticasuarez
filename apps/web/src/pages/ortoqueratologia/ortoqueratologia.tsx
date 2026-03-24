import { Button } from "../../components/button";
import FAQAccordion from "../../components/faq-accordion";
import Image from "../../components/image";
import { Text } from "../../components/text";
import content from "../../content/ortoqueratologia.json" with { type: "json" };

// biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
export default function Ortoqueratologia({ data: _data }: { data: any }) {
  // TODO: Sanity schema needs page-specific fields for this page's unique sections
  // Using local JSON content until schema is enhanced
  return (
    <main>
      {/* Hero Section with Image and Title */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left side - Text Content */}
            <div className="order-2 lg:order-1">
              <Text
                as="h1"
                className="mb-6 text-gray-900 uppercase tracking-wide"
                variant="heading-1"
              >
                {content.hero.title}
              </Text>
              <Text as="h2" className="mb-4 text-blue-600" variant="heading-3">
                {content.hero.subtitle}
              </Text>
              <Text as="p" className="text-gray-600" variant="body-lg">
                {content.hero.description}
              </Text>
            </div>

            {/* Right side - Image */}
            <div className="order-1 lg:order-2">
              <Image
                alt="Ortoqueratología - Moldeo corneal en Óptica Suárez Jaén"
                className="h-auto w-full rounded-xl shadow-lg"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                src={content.hero.image}
                title="Moldeo corneal en Óptica Suárez"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Text as="h2" className="mb-6 text-gray-900" variant="heading-2">
            {content.intro.title}
          </Text>
          <Text
            as="p"
            className="text-gray-600 leading-relaxed"
            variant="body-lg"
          >
            {content.intro.description}
          </Text>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <Text
            as="h2"
            className="mb-12 text-center text-gray-900"
            variant="heading-2"
          >
            {content.benefits.title}
          </Text>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {content.benefits.items.map((benefit, index) => {
              // Define internal links for specific titles
              const linkMap: Record<string, string> = {
                "Control de la Miopía": "/control-de-miopia",
                "Ideal para el Deporte": "/vision-deportiva",
              };
              const linkUrl = linkMap[benefit.title];

              return (
                <div
                  className="rounded-xl bg-gray-50 p-6 transition-all duration-300 hover:shadow-lg"
                  key={index}
                >
                  {linkUrl ? (
                    <a className="block" href={linkUrl}>
                      <Text
                        as="p"
                        className="mb-4 text-gray-900 transition-colors hover:text-blue-600"
                        variant="heading-4"
                      >
                        {benefit.title}
                      </Text>
                    </a>
                  ) : (
                    <Text
                      as="p"
                      className="mb-4 text-gray-900"
                      variant="heading-4"
                    >
                      {benefit.title}
                    </Text>
                  )}
                  <Text as="p" className="text-gray-600" variant="body-md">
                    {benefit.description}
                  </Text>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process with Images */}
      <section className="bg-blue-50 px-4 py-16 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <Text
            as="h2"
            className="mb-12 text-center text-gray-900"
            variant="heading-2"
          >
            {content.process.title}
          </Text>
          <div className="space-y-12">
            {content.process.steps.map((step, index) => {
              // Define internal links and image titles for specific steps
              const linkMap: Record<string, string> = {
                "Examen Visual Completo": "/examen-visual",
                "Adaptación Personalizada": "/contactologia",
              };
              const imageTitleMap: Record<string, string> = {
                "/images/ortoqueratologia/topografia-corneal.webp":
                  "Topografía corneal en Óptica Suárez",
                "/images/ortoqueratologia/refraccion.webp":
                  "Examen visual completo",
                "/images/ortoqueratologia/colocacion-lentillas.webp":
                  "Adaptación de lentillas",
                "/images/ortoqueratologia/lampara-hendidura.webp":
                  "Salud Ocular en Jaén",
              };
              const linkUrl = linkMap[step.title];
              const imageTitle = imageTitleMap[step.image];

              return (
                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-8 rounded-xl bg-white p-6 shadow-md`}
                  key={index}
                >
                  <div className="lg:w-1/2">
                    <Image
                      alt={`${step.title} - Ortoqueratología en Jaén`}
                      className="h-auto w-full rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      src={step.image}
                      title={imageTitle}
                    />
                  </div>
                  <div className="lg:w-1/2">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white text-xl">
                        {step.step}
                      </div>
                      <div>
                        {linkUrl ? (
                          <a href={linkUrl}>
                            <Text
                              as="p"
                              className="mb-3 text-gray-900 transition-colors hover:text-blue-600"
                              variant="heading-4"
                            >
                              {step.title}
                            </Text>
                          </a>
                        ) : (
                          <Text
                            as="p"
                            className="mb-3 text-gray-900"
                            variant="heading-4"
                          >
                            {step.title}
                          </Text>
                        )}
                        <Text
                          as="p"
                          className="text-gray-600"
                          variant="body-md"
                        >
                          {step.description}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ideal Candidates */}
      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <Text
            as="h2"
            className="mb-6 text-center text-gray-900"
            variant="heading-2"
          >
            {content.candidates.title}
          </Text>
          <Text
            as="p"
            className="mb-8 text-center text-gray-600"
            variant="body-lg"
          >
            {content.candidates.description}
          </Text>
          <div className="rounded-xl bg-blue-50 p-8">
            <ul className="space-y-4">
              {content.candidates.items.map((item, index) => (
                <li className="flex items-start space-x-3" key={index}>
                  <svg
                    className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600"
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
                  <Text as="p" className="text-gray-700" variant="body-md">
                    {item}
                  </Text>
                </li>
              ))}
            </ul>
            {content.candidates.disclaimer && (
              <Text
                as="p"
                className="mt-6 text-center text-gray-500 italic"
                variant="body-sm"
              >
                * {content.candidates.disclaimer}
              </Text>
            )}
          </div>
        </div>
      </section>

      {/* Why Óptica Suárez */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <Text
            as="h2"
            className="mb-12 text-center text-gray-900"
            variant="heading-2"
          >
            {content["why-optica-suarez"].title}
          </Text>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {content["why-optica-suarez"].items.map((item, index) => (
              <div
                className="rounded-xl bg-white p-6 transition-all duration-300 hover:shadow-lg"
                key={index}
              >
                <Text as="p" className="mb-3 text-gray-900" variant="heading-5">
                  {item.title}
                </Text>
                <Text as="p" className="text-gray-600" variant="body-sm">
                  {item.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordion items={content.faq.items} title={content.faq.title} />

      {/* Call to Action */}
      <section className="bg-blue-600 px-4 py-16 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Text as="h2" className="mb-6 text-white" variant="heading-2">
            {content.cta.title}
          </Text>
          <Text as="p" className="mb-8 text-blue-100" variant="body-lg">
            {content.cta.description}
          </Text>
          <Button
            href={content.cta.buttonLink}
            rel="noopener noreferrer"
            target="_blank"
            variant="primary"
          >
            {content.cta.buttonText}
          </Button>
        </div>
      </section>
    </main>
  );
}
