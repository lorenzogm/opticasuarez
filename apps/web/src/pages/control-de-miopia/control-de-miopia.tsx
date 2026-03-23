import FAQAccordion from "../../components/faq-accordion";
import { Text } from "../../components/text";
import content from "../../content/control-de-miopia.json" with {
  type: "json",
};
import BookAppointment from "../../sections/book-appointment";
import MyopiaHero from "./sections/myopia-hero";
import MyopiaInfo from "./sections/myopia-info";
import MyopiaScience from "./sections/myopia-science";
import MyopiaTreatments from "./sections/myopia-treatments";

export default function ControlDeMiopia() {
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
            {content.mainTitle}
          </Text>
        </div>
      </section>

      {/* Hero Section */}
      <MyopiaHero
        description={content.hero.description}
        image={content.hero.image}
        imageAlt={content.hero.imageAlt}
        imageTitle={content.hero.imageTitle}
        subtitle={content.hero.subtitle}
        title={content.hero.title}
      />

      {/* Myopia Information */}
      <MyopiaInfo
        description={content.info.description}
        features={content.info.features}
        title={content.info.title}
      />

      {/* Treatment Options */}
      <MyopiaTreatments
        title={content.treatments.title}
        treatments={content.treatments.items}
      />

      {/* Science Behind */}
      <MyopiaScience
        description={content.science.description}
        studies={content.science.studies}
        title={content.science.title}
      />

      {/* FAQ Section */}
      <FAQAccordion items={content.faq.items} title={content.faq.title} />

      {/* Book Appointment */}
      <BookAppointment
        buttonText={content.bookAppointment.buttonText}
        description={content.bookAppointment.description}
        title={content.bookAppointment.title}
        whatsappMessage={content.bookAppointment.whatsappMessage}
      />
    </main>
  );
}
