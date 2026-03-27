import FAQAccordion from "~/components/faq-accordion";
import Image from "~/components/image";
import BookAppointment from "~/components/sections/book-appointment";
import CustomerTestimonials from "~/components/sections/customer-testimonials";
import LocationsInfo from "~/components/sections/locations-info";
import { Text } from "~/components/text";
import { resolveImage } from "~/lib/sanity";

// biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
export default function ServiceDetail({ data }: { data: any }) {
  if (!data) return null;

  return (
    <main>
      <ServiceHero data={data} />
      <ServiceIntro data={data} />
      <ServiceItems data={data} />
      <ServiceProcess data={data} />
      <ServiceBenefits data={data} />
      <ServiceAgeGroups data={data} />
      <ServiceWarningSigns data={data} />
      <ServiceScience data={data} />
      <ServiceVisualTherapy data={data} />
      <ServiceTestimonials data={data} />
      <ServiceFAQ data={data} />
      <ServiceCTA data={data} />
      <ServiceLocations data={data} />
    </main>
  );
}

// ─── Hero ────────────────────────────────────────────────────

// biome-ignore lint/suspicious/noExplicitAny: Sanity data
function ServiceHero({ data }: { data: any }) {
  const image = resolveImage(data.heroImage);
  if (!data.mainTitle) return null;

  return (
    <section className="relative overflow-hidden px-4 py-32 sm:px-6">
      {image && (
        <div className="absolute inset-0">
          <Image
            alt={data.mainTitle}
            className="h-full w-full scale-110 transform object-cover"
            sizes="100vw"
            src={image}
          />
        </div>
      )}
      <div className="container relative z-10 mx-auto max-w-6xl text-center">
        <Text
          as="h1"
          className={`mb-8 uppercase tracking-wide drop-shadow-lg ${image ? "text-white" : "text-gray-900"}`}
          variant="heading-1"
        >
          {data.mainTitle}
        </Text>
        {data.subtitle && (
          <Text
            as="p"
            className={`mx-auto max-w-3xl drop-shadow-lg ${image ? "text-white" : "text-gray-600"}`}
            variant="body-lg"
          >
            {data.subtitle}
          </Text>
        )}
        {data.heroDescription && (
          <Text
            as="p"
            className={`mx-auto mt-4 max-w-3xl drop-shadow-lg ${image ? "text-white" : "text-gray-600"}`}
            variant="body-lg"
          >
            {data.heroDescription}
          </Text>
        )}
      </div>
    </section>
  );
}

// ─── Introduction ────────────────────────────────────────────

// biome-ignore lint/suspicious/noExplicitAny: Sanity data
function ServiceIntro({ data }: { data: any }) {
  const intro = data.introduction || data.intro;
  if (!intro) return null;

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        {intro.title && (
          <Text
            as="h2"
            className="mb-8 text-gray-900 uppercase tracking-wide"
            variant="heading-2"
          >
            {intro.title}
          </Text>
        )}
        {(intro.description || intro.content) && (
          <Text
            as="p"
            className="text-gray-700 leading-relaxed"
            variant="body-lg"
          >
            {intro.description || intro.content}
          </Text>
        )}
      </div>
    </section>
  );
}

// ─── Items Grid (exam types, conditions, treatments) ─────────

// biome-ignore lint/suspicious/noExplicitAny: Sanity data
function ServiceItems({ data }: { data: any }) {
  if (!data.items?.length) return null;

  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  const items = data.items.map((item: any) => ({
    ...item,
    image: resolveImage(item.image),
  }));

  return (
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {data.itemsSectionTitle && (
          <Text
            as="h2"
            className="mb-4 text-center text-gray-900 uppercase tracking-wide"
            variant="heading-2"
          >
            {data.itemsSectionTitle}
          </Text>
        )}
        {data.itemsSectionSubtitle && (
          <Text
            as="p"
            className="mb-12 text-center text-gray-600"
            variant="body-lg"
          >
            {data.itemsSectionSubtitle}
          </Text>
        )}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* biome-ignore lint/suspicious/noExplicitAny: dynamic items */}
          {items.map((item: any, index: number) => (
            <div
              className="rounded-lg bg-white p-6 shadow-md"
              key={item._key || index}
            >
              {item.image && (
                <Image
                  alt={item.title || ""}
                  className="mb-4 h-48 w-full rounded-lg object-cover"
                  src={item.image}
                />
              )}
              {item.icon && (
                <span className="mb-2 block text-3xl">{item.icon}</span>
              )}
              {item.title && (
                <Text
                  as="h3"
                  className="mb-2 text-gray-900"
                  variant="heading-4"
                >
                  {item.title}
                </Text>
              )}
              {item.description && (
                <Text as="p" className="text-gray-600" variant="body-md">
                  {item.description}
                </Text>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process Steps ───────────────────────────────────────────

// biome-ignore lint/suspicious/noExplicitAny: Sanity data
function ServiceProcess({ data }: { data: any }) {
  if (!data.process?.steps?.length) return null;
  const { process } = data;

  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  const steps = process.steps.map((s: any) => ({
    number: String(s.stepNumber || s.step || ""),
    title: s.title,
    description: s.description,
  }));

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {process.title && (
          <div className="mb-12 text-center">
            <Text
              as="h2"
              className="mb-4 text-gray-900 uppercase tracking-wide"
              variant="heading-2"
            >
              {process.title}
            </Text>
            {process.description && (
              <Text className="text-gray-600" variant="body-lg">
                {process.description}
              </Text>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(
            (
              step: { number: string; title: string; description: string },
              index: number
            ) => (
              <div className="relative" key={step.number || index}>
                <div className="h-full rounded-lg bg-white p-6 shadow-md">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 font-bold text-2xl text-white">
                      {step.number || index + 1}
                    </div>
                    {step.title && (
                      <Text
                        as="h3"
                        className="mb-3 text-gray-900"
                        variant="heading-5"
                      >
                        {step.title}
                      </Text>
                    )}
                    {step.description && (
                      <Text className="text-gray-600" variant="body-sm">
                        {step.description}
                      </Text>
                    )}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="-right-4 -translate-y-1/2 absolute top-1/2 z-10 hidden transform lg:block">
                    <svg
                      className="h-8 w-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Benefits + Frequency ────────────────────────────────────

// biome-ignore lint/suspicious/noExplicitAny: Sanity data
function ServiceBenefits({ data }: { data: any }) {
  if (!(data.benefits || data.frequency)) return null;

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {data.benefits && (
            <div>
              {data.benefits.title && (
                <Text
                  as="h2"
                  className="mb-8 text-gray-900 uppercase tracking-wide"
                  variant="heading-3"
                >
                  {data.benefits.title}
                </Text>
              )}
              <div className="space-y-4">
                {(data.benefits.items || []).map(
                  (benefit: string, index: number) => (
                    <div className="flex items-start" key={index}>
                      <div className="mt-1 mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
                        <svg
                          className="h-4 w-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                      <Text
                        as="p"
                        className="text-gray-700 leading-relaxed"
                        variant="body-md"
                      >
                        {benefit}
                      </Text>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
          {data.frequency && (
            <div>
              {data.frequency.title && (
                <Text
                  as="h2"
                  className="mb-8 text-gray-900 uppercase tracking-wide"
                  variant="heading-3"
                >
                  {data.frequency.title}
                </Text>
              )}
              <div className="space-y-6">
                {(data.frequency.recommendations || []).map(
                  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
                  (rec: any, index: number) => (
                    <div
                      className="rounded-lg bg-white p-6 shadow-md"
                      key={index}
                    >
                      <Text
                        as="h3"
                        className="mb-2 text-blue-600"
                        variant="heading-5"
                      >
                        {rec.age}
                      </Text>
                      <Text as="p" className="mb-2 text-gray-900">
                        {rec.frequency}
                      </Text>
                      {rec.reason && (
                        <Text
                          as="p"
                          className="text-gray-600"
                          variant="body-sm"
                        >
                          {rec.reason}
                        </Text>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Age Groups ──────────────────────────────────────────────

// biome-ignore lint/suspicious/noExplicitAny: Sanity data
function ServiceAgeGroups({ data }: { data: any }) {
  if (!data.ageGroups?.groups?.length) return null;

  return (
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {data.ageGroups.title && (
          <div className="mb-12 text-center">
            <Text
              as="h2"
              className="mb-4 text-gray-900 uppercase tracking-wide"
              variant="heading-2"
            >
              {data.ageGroups.title}
            </Text>
            {data.ageGroups.subtitle && (
              <Text className="text-gray-600" variant="body-lg">
                {data.ageGroups.subtitle}
              </Text>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* biome-ignore lint/suspicious/noExplicitAny: dynamic items */}
          {data.ageGroups.groups.map((group: any, index: number) => (
            <div className="rounded-lg bg-gray-50 p-6 shadow-md" key={index}>
              {group.ageRange && (
                <Text
                  as="h3"
                  className="mb-2 text-blue-600"
                  variant="heading-4"
                >
                  {group.ageRange}
                </Text>
              )}
              {group.title && (
                <Text as="h4" className="mb-3 text-gray-900" variant="body-lg">
                  {group.title}
                </Text>
              )}
              {group.description && (
                <Text as="p" className="text-gray-600" variant="body-md">
                  {group.description}
                </Text>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Warning Signs ───────────────────────────────────────────

// biome-ignore lint/suspicious/noExplicitAny: Sanity data
function ServiceWarningSigns({ data }: { data: any }) {
  if (!data.warningSign) return null;
  const { warningSign } = data;

  return (
    <section className="bg-yellow-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {warningSign.title && (
          <div className="mb-8 text-center">
            <Text
              as="h2"
              className="mb-4 text-gray-900 uppercase tracking-wide"
              variant="heading-2"
            >
              {warningSign.title}
            </Text>
            {warningSign.subtitle && (
              <Text className="text-gray-600" variant="body-lg">
                {warningSign.subtitle}
              </Text>
            )}
          </div>
        )}
        {warningSign.description && (
          <Text
            as="p"
            className="mb-8 text-center text-gray-700"
            variant="body-md"
          >
            {warningSign.description}
          </Text>
        )}
        {warningSign.signs?.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {warningSign.signs.map((sign: string, index: number) => (
              <div className="flex items-start" key={index}>
                <span className="mt-1 mr-3 text-yellow-600">⚠️</span>
                <Text as="p" className="text-gray-700" variant="body-md">
                  {sign}
                </Text>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Science ─────────────────────────────────────────────────

// biome-ignore lint/suspicious/noExplicitAny: Sanity data
function ServiceScience({ data }: { data: any }) {
  if (!data.science) return null;
  const { science } = data;

  return (
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {science.title && (
          <Text
            as="h2"
            className="mb-8 text-center text-gray-900 uppercase tracking-wide"
            variant="heading-2"
          >
            {science.title}
          </Text>
        )}
        {science.description && (
          <Text
            as="p"
            className="mb-8 text-center text-gray-700"
            variant="body-lg"
          >
            {science.description}
          </Text>
        )}
        {science.studies?.length > 0 && (
          <div className="space-y-6">
            {/* biome-ignore lint/suspicious/noExplicitAny: dynamic items */}
            {science.studies.map((study: any, index: number) => (
              <div
                className="rounded-lg border border-gray-200 p-6"
                key={index}
              >
                {study.title && (
                  <Text
                    as="h3"
                    className="mb-2 text-gray-900"
                    variant="heading-4"
                  >
                    {study.title}
                  </Text>
                )}
                {study.description && (
                  <Text as="p" className="text-gray-600" variant="body-md">
                    {study.description}
                  </Text>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Visual Therapy (specific to terapia-visual) ─────────────

// biome-ignore lint/suspicious/noExplicitAny: Sanity data
function ServiceVisualTherapy({ data }: { data: any }) {
  if (!data.visualTherapy) return null;
  const { visualTherapy } = data;

  return (
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {visualTherapy.title && (
          <Text
            as="h2"
            className="mb-4 text-center text-gray-900 uppercase tracking-wide"
            variant="heading-2"
          >
            {visualTherapy.title}
          </Text>
        )}
        {visualTherapy.description && (
          <Text
            as="p"
            className="mb-8 text-center text-gray-700"
            variant="body-lg"
          >
            {visualTherapy.description}
          </Text>
        )}
        {visualTherapy.skills?.length > 0 && (
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visualTherapy.skills.map((skill: string, index: number) => (
              <div
                className="rounded-lg bg-gray-50 p-4 text-center"
                key={index}
              >
                <Text as="p" className="text-gray-700" variant="body-md">
                  {skill}
                </Text>
              </div>
            ))}
          </div>
        )}
        {visualTherapy.images?.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* biome-ignore lint/suspicious/noExplicitAny: dynamic items */}
            {visualTherapy.images.map((img: any, index: number) => (
              <figure key={index}>
                <Image
                  alt={img.alt || ""}
                  className="h-64 w-full rounded-lg object-cover shadow-md"
                  src={resolveImage(img.src) || ""}
                />
                {img.title && (
                  <figcaption className="mt-2 text-center text-gray-600 text-sm">
                    {img.title}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────────

// biome-ignore lint/suspicious/noExplicitAny: Sanity data
function ServiceTestimonials({ data }: { data: any }) {
  if (!data.testimonials?.items?.length) return null;

  return (
    <CustomerTestimonials
      moreReviewsLink=""
      testimonials={data.testimonials.items}
      title={data.testimonials.title}
    />
  );
}

// ─── FAQ ─────────────────────────────────────────────────────

// biome-ignore lint/suspicious/noExplicitAny: Sanity data
function ServiceFAQ({ data }: { data: any }) {
  if (!data.faq?.items?.length) return null;

  return <FAQAccordion items={data.faq.items} title={data.faq.title} />;
}

// ─── CTA ─────────────────────────────────────────────────────

// biome-ignore lint/suspicious/noExplicitAny: Sanity data
function ServiceCTA({ data }: { data: any }) {
  if (!data.cta) return null;

  return (
    <BookAppointment
      buttonText={data.cta.buttonText}
      description={data.cta.description}
      title={data.cta.title}
      whatsappMessage={data.cta.whatsappMessage}
    />
  );
}

// ─── Locations ───────────────────────────────────────────────

// biome-ignore lint/suspicious/noExplicitAny: Sanity data
function ServiceLocations({ data }: { data: any }) {
  if (!data.locations?.length) return null;

  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  const locations = data.locations.map((loc: any) => ({
    name: loc.name,
    image: resolveImage(loc.image),
    mapLink: loc.mapUrl,
  }));

  return <LocationsInfo locations={locations} />;
}
