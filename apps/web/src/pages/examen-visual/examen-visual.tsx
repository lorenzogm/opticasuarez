import FAQAccordion from "../../components/faq-accordion";
import { Text } from "../../components/text";
import { resolveImage } from "../../lib/sanity";
import BookAppointment from "../../sections/book-appointment";
import LocationsInfo from "../../sections/locations-info";
import ExamBenefits from "./sections/exam-benefits";
import ExamProcess from "./sections/exam-process";
import ExamTypes from "./sections/exam-types";
import VisualExamHero from "./sections/visual-exam-hero";

// biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
export default function ExamenVisual({ data }: { data: any }) {
  if (!data) return null;

  const locations = (data.locations || []).map(
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    (loc: any) => ({
      name: loc.name,
      image: resolveImage(loc.image),
      mapLink: loc.mapUrl,
    })
  );

  const steps = (data.process?.steps || []).map(
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    (s: any) => ({
      step: String(s.stepNumber || s.step),
      title: s.title,
      description: s.description,
    })
  );

  return (
    <main>
      {/* Hero Section with Parallax */}
      <VisualExamHero
        backgroundImage={resolveImage(data.heroImage)}
        subtitle={data.subtitle}
        title={data.mainTitle}
      />

      {/* Introduction */}
      {data.intro && (
        <section className="bg-gray-50 px-4 py-16 sm:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <Text
              as="h2"
              className="mb-8 text-gray-900 uppercase tracking-wide"
              variant="heading-2"
            >
              {data.intro.title}
            </Text>
            <Text
              as="p"
              className="text-gray-700 leading-relaxed"
              variant="body-lg"
            >
              {data.intro.description}
            </Text>
          </div>
        </section>
      )}

      {/* Exam Types */}
      {data.items?.length > 0 && (
        <ExamTypes items={data.items} title={data.itemsSectionTitle} />
      )}

      {/* Process */}
      {data.process && (
        <ExamProcess
          description={data.process.description}
          steps={steps}
          title={data.process.title}
        />
      )}

      {/* Benefits and Frequency */}
      {data.benefits && (
        <ExamBenefits
          benefits={data.benefits.items || []}
          benefitsTitle={data.benefits.title}
          frequencyTitle={data.frequency?.title}
          recommendations={data.frequency?.recommendations || []}
        />
      )}

      {/* FAQ Section */}
      {data.faq?.items?.length > 0 && (
        <FAQAccordion items={data.faq.items} title={data.faq.title} />
      )}

      {/* Call to Action */}
      {data.cta && (
        <BookAppointment
          buttonText={data.cta.buttonText}
          description={data.cta.description}
          title={data.cta.title}
          whatsappMessage={data.cta.whatsappMessage}
        />
      )}

      {/* Locations */}
      {locations.length > 0 && <LocationsInfo locations={locations} />}
    </main>
  );
}
