import { Text } from '../../components/text';
import ExamTypes from './sections/exam-types';
import ExamProcess from './sections/exam-process';
import ExamBenefits from './sections/exam-benefits';
import BookAppointment from '../../sections/book-appointment';
import LocationsInfo from '../../sections/locations-info';
import VisualExamHero from './sections/visual-exam-hero';
import content from '../../../content/examen-visual.json';

export default function ExamenVisual() {
  return (
    <main>
      {/* Hero Section with Parallax */}
      <VisualExamHero
        title={content.mainTitle}
        subtitle={content.subtitle}
        backgroundImage={content.heroImage}
      />

      {/* Introduction */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <Text
            as="h2"
            variant="heading-2"
            className="mb-8 text-gray-900 uppercase tracking-wide"
          >
            {content.intro.title}
          </Text>
          <Text
            as="p"
            variant="body-lg"
            className="text-gray-700 leading-relaxed"
          >
            {content.intro.description}
          </Text>
        </div>
      </section>

      {/* Exam Types */}
      <ExamTypes
        title={content.examTypes.title}
        items={content.examTypes.items}
      />

      {/* Process */}
      <ExamProcess
        title={content.process.title}
        description={content.process.description}
        steps={content.process.steps}
      />

      {/* Benefits and Frequency */}
      <ExamBenefits
        benefitsTitle={content.benefits.title}
        benefits={content.benefits.items}
        frequencyTitle={content.frequency.title}
        recommendations={content.frequency.recommendations}
      />

      {/* Call to Action */}
      <BookAppointment
        title={content.cta.title}
        description={content.cta.description}
        buttonText={content.cta.buttonText}
        whatsappMessage={content.cta.whatsappMessage}
      />

      {/* Locations */}
      <LocationsInfo locations={content.locations} />
    </main>
  );
}
