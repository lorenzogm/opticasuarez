import { Text } from '../../components/text';
import MyopiaHero from '../../sections/myopia-hero';
import MyopiaInfo from '../../sections/myopia-info';
import MyopiaTreatments from '../../sections/myopia-treatments';
import MyopiaScience from '../../sections/myopia-science';
import BookAppointment from '../../sections/book-appointment';
import content from '../../../content/control-de-miopia.json';

export default function ControlDeMiopia() {
  return (
    <main>
      {/* Main heading */}
      <section className="bg-white py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <Text
            as="h1"
            size="4xl"
            weight="bold"
            className="mb-8 text-gray-900 uppercase tracking-wide"
          >
            {content.mainTitle}
          </Text>
        </div>
      </section>

      {/* Hero Section */}
      <MyopiaHero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        description={content.hero.description}
        image={content.hero.image}
      />

      {/* Myopia Information */}
      <MyopiaInfo
        title={content.info.title}
        description={content.info.description}
        features={content.info.features}
      />

      {/* Treatment Options */}
      <MyopiaTreatments
        title={content.treatments.title}
        treatments={content.treatments.items}
      />

      {/* Science Behind */}
      <MyopiaScience
        title={content.science.title}
        description={content.science.description}
        studies={content.science.studies}
      />

      {/* Book Appointment */}
      <BookAppointment
        title={content.bookAppointment.title}
        description={content.bookAppointment.description}
        buttonText={content.bookAppointment.buttonText}
      />
    </main>
  );
}