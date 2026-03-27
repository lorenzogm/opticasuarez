import FAQAccordion from "../../components/faq-accordion";
import { Text } from "../../components/text";
import { resolveImage } from "../../lib/sanity";
import BookAppointment from "../../sections/book-appointment";
import MyopiaHero from "./sections/myopia-hero";
import MyopiaInfo from "./sections/myopia-info";
import MyopiaScience from "./sections/myopia-science";
import MyopiaTreatments from "./sections/myopia-treatments";

// biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
export default function ControlDeMiopia({ data }: { data: any }) {
  if (!data) return null;

  const treatmentItems = (data.items || []).map(
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    (item: any) => ({
      ...item,
      image: resolveImage(item.image),
    })
  );

  return (
    <main>
      {/* Main heading */}
      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <Text
            as="h1"
            className="mb-8 text-gray-900 uppercase tracking-wide"
            variant="heading-1"
          >
            {data.mainTitle}
          </Text>
        </div>
      </section>

      {/* Hero Section */}
      <MyopiaHero
        description={data.heroDescription}
        image={resolveImage(data.heroImage)}
        imageAlt={data.mainTitle}
        imageTitle={data.mainTitle}
        subtitle={data.subtitle}
        title={data.mainTitle}
      />

      {/* Myopia Information */}
      {data.intro && (
        <MyopiaInfo
          description={data.intro.description}
          features={data.intro.features || []}
          title={data.intro.title}
        />
      )}

      {/* Treatment Options */}
      {treatmentItems.length > 0 && (
        <MyopiaTreatments
          title={data.itemsSectionTitle || "Tratamientos"}
          treatments={treatmentItems}
        />
      )}

      {/* Science Behind */}
      {data.science && (
        <MyopiaScience
          description={data.science.description}
          studies={data.science.studies || []}
          title={data.science.title}
        />
      )}

      {/* FAQ Section */}
      {data.faq?.items?.length > 0 && (
        <FAQAccordion items={data.faq.items} title={data.faq.title} />
      )}

      {/* Book Appointment */}
      {data.cta && (
        <BookAppointment
          buttonText={data.cta.buttonText}
          description={data.cta.description}
          title={data.cta.title}
          whatsappMessage={data.cta.whatsappMessage}
        />
      )}
    </main>
  );
}
