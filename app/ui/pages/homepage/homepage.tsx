import BookAppointment from '../../sections/book-appointment';
import Hero from './sections/hero';
import ServicesGrid from '../../sections/services-grid';
import VideoAbout from './sections/video-about';
import SocialMedia from './sections/social-media';
import Specialists from './sections/specialists';
import News from './sections/news';
import Locations from './sections/locations';
import content from '../../../content/homepage.json';

export default function Homepage() {
  return (
    <main>
      <Hero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        description={content.hero.description}
        cta={content.hero.cta}
      />
      <ServicesGrid items={content.servicesGrid.items} />
      <VideoAbout
        title={content.videoAbout.title}
        description={content.videoAbout.description}
        videoId={content.videoAbout.videoId}
      />
      <SocialMedia
        instagram={content.socialMedia.instagram}
        facebook={content.socialMedia.facebook}
      />
      <Specialists
        title={content.specialists.title}
        subtitle={content.specialists.subtitle}
        description={content.specialists.description}
      />
      <News
        title={content.news.title}
        buttonText={content.news.buttonText}
        url={content.news.url}
      />
      <Locations
        title={content.locations.title}
        locations={content.locations.locations}
      />
      <BookAppointment
        title={content.bookAppointment.title}
        description={content.bookAppointment.description}
        buttonText={content.bookAppointment.buttonText}
        whatsappMessage={content.bookAppointment.whatsappMessage}
      />
    </main>
  );
}
