import content from "../../../content/homepage.json" with { type: "json" };
import BookAppointment from "../../sections/book-appointment";
import ServicesGrid from "../../sections/services-grid";
import Hero from "./sections/hero";
import Locations from "./sections/locations";
import News from "./sections/news";
import SocialMedia from "./sections/social-media";
import Specialists from "./sections/specialists";
import VideoAbout from "./sections/video-about";

export default function Homepage() {
  return (
    <main>
      <Hero
        cta={content.hero.cta}
        description={content.hero.description}
        subtitle={content.hero.subtitle}
        title={content.hero.title}
      />
      <ServicesGrid items={content.servicesGrid.items} />
      <VideoAbout
        description={content.videoAbout.description}
        title={content.videoAbout.title}
        videoId={content.videoAbout.videoId}
      />
      <SocialMedia
        facebook={content.socialMedia.facebook}
        instagram={content.socialMedia.instagram}
      />
      <Specialists
        description={content.specialists.description}
        subtitle={content.specialists.subtitle}
        title={content.specialists.title}
      />
      <News
        buttonText={content.news.buttonText}
        title={content.news.title}
        url={content.news.url}
      />
      <Locations
        locations={content.locations.locations}
        title={content.locations.title}
      />
      <BookAppointment
        buttonText={content.bookAppointment.buttonText}
        description={content.bookAppointment.description}
        title={content.bookAppointment.title}
        whatsappMessage={content.bookAppointment.whatsappMessage}
      />
    </main>
  );
}
