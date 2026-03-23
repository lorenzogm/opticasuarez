import FAQAccordion from "../../components/faq-accordion";
import { Text } from "../../components/text";
import content from "../../content/examen-visual.json" with { type: "json" };
import BookAppointment from "../../sections/book-appointment";
import LocationsInfo from "../../sections/locations-info";
import ExamBenefits from "./sections/exam-benefits";
import ExamProcess from "./sections/exam-process";
import ExamTypes from "./sections/exam-types";
import VisualExamHero from "./sections/visual-exam-hero";

export default function ExamenVisual() {
  return (
    <main>
      {/* Hero Section with Parallax */}
      <VisualExamHero
        backgroundImage={content.heroImage}
        subtitle={content.subtitle}
        title={content.mainTitle}
      />

      {/* Introduction */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Text
            as="h2"
            className="mb-8 text-gray-900 uppercase tracking-wide"
            variant="heading-2"
          >
            {content.intro.title}
          </Text>
          <Text
            as="p"
            className="text-gray-700 leading-relaxed"
            variant="body-lg"
          >
            {content.intro.description}
          </Text>
        </div>
      </section>

      {/* Exam Types */}
      <ExamTypes
        items={content.examTypes.items}
        title={content.examTypes.title}
      />

      {/* Process */}
      <ExamProcess
        description={content.process.description}
        steps={content.process.steps}
        title={content.process.title}
      />

      {/* Benefits and Frequency */}
      <ExamBenefits
        benefits={content.benefits.items}
        benefitsTitle={content.benefits.title}
        frequencyTitle={content.frequency.title}
        recommendations={content.frequency.recommendations}
      />

      {/* FAQ Section */}
      <FAQAccordion items={content.faq.items} title={content.faq.title} />

      {/* Call to Action */}
      <BookAppointment
        buttonText={content.cta.buttonText}
        description={content.cta.description}
        title={content.cta.title}
        whatsappMessage={content.cta.whatsappMessage}
      />

      {/* Locations */}
      <LocationsInfo locations={content.locations} />
    </main>
  );
}
