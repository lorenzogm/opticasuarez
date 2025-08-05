import BookAppointment from '../../sections/BookAppointment';
import Navigation from '../../components/Navigation';
import content from '../../../content/homepage.json';

export default function Homepage() {
  return (
    <>
      <Navigation />
      <main>
        <BookAppointment
          title={content.bookAppointment.title}
          description={content.bookAppointment.description}
          buttonText={content.bookAppointment.buttonText}
        />
      </main>
    </>
  );
}
