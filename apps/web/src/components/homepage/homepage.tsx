import BookAppointment from "~/components/sections/book-appointment";
import ServicesGrid from "~/components/sections/services-grid";
import { resolveImage } from "~/lib/sanity";
import EditorialContent from "./sections/editorial-content";
import Hero from "./sections/hero";
import Locations from "./sections/locations";
import News from "./sections/news";
import SocialMedia from "./sections/social-media";
import Specialists from "./sections/specialists";
import VideoAbout from "./sections/video-about";

function normalizeVisionAccent(text?: string) {
  return text?.replace(/\bvision\b/gi, (word) =>
    word === word.toUpperCase()
      ? "VISIÓN"
      : word[0] === word[0].toUpperCase()
        ? "Visión"
        : "visión"
  );
}

export default function Homepage({
  data,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  data: any;
}) {
  if (!data) return null;

  const servicesGridItems = (data.servicesGrid?.items || []).map(
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    (item: any) => ({
      ...item,
      image: resolveImage(item.image),
      alt: normalizeVisionAccent(item.alt),
      imageTitle: normalizeVisionAccent(item.imageTitle),
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
      <EditorialContent />
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
