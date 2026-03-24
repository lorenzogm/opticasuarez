import { resolveImage } from "../../lib/sanity";
import BookAppointment from "../../sections/book-appointment";
import ServicesGrid from "../../sections/services-grid";
import Hero from "./sections/hero";
import Locations from "./sections/locations";
import News from "./sections/news";
import SocialMedia from "./sections/social-media";
import Specialists from "./sections/specialists";
import VideoAbout from "./sections/video-about";

// biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
export default function Homepage({ data }: { data: any }) {
  if (!data) return null;

  const servicesGridItems = (data.servicesGrid?.items || []).map(
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    (item: any) => ({
      ...item,
      image: resolveImage(item.image),
    })
  );

  const locations = (data.locations?.items || []).map(
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    (loc: any) => ({
      ...loc,
      image: resolveImage(loc.image),
    })
  );

  return (
    <main>
      <Hero
        cta={data.hero?.cta}
        description={data.hero?.description}
        subtitle={data.hero?.subtitle}
        title={data.hero?.title}
      />
      <ServicesGrid items={servicesGridItems} />
      <VideoAbout
        description={data.videoAbout?.description}
        title={data.videoAbout?.title}
        videoId={data.videoAbout?.videoId}
      />
      <SocialMedia
        facebook={data.socialMedia?.facebook}
        instagram={data.socialMedia?.instagram}
      />
      <Specialists
        description={data.specialists?.description}
        subtitle={data.specialists?.subtitle}
        title={data.specialists?.title}
      />
      <News
        buttonText={data.news?.buttonText}
        title={data.news?.title}
        url={data.news?.url}
      />
      <Locations locations={locations} title={data.locations?.title} />
      <BookAppointment
        buttonText={data.bookAppointment?.buttonText}
        description={data.bookAppointment?.description}
        title={data.bookAppointment?.title}
        whatsappMessage={data.bookAppointment?.whatsappMessage}
      />
    </main>
  );
}
