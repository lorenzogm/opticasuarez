import { Text } from "../../components/text";
import { resolveImage } from "../../lib/sanity";
import CustomerTestimonials from "../../sections/customer-testimonials";
import LocationsInfo from "../../sections/locations-info";
import HistoryTimeline from "./sections/history-timeline";
import SocialMediaLinks from "./sections/social-media-links";
import TeamMembers from "./sections/team-members";

// biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
export default function Quienessomos({ data }: { data: any }) {
  if (!data) return null;

  const timeline = (data.history?.timeline || []).map(
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    (entry: any) => ({
      ...entry,
      image: resolveImage(entry.image),
    })
  );

  const members = (data.team?.members || []).map(
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    (m: any) => ({
      ...m,
      image: resolveImage(m.image),
    })
  );

  const locations = (data.locations || []).map(
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    (loc: any) => ({
      name: loc.name,
      image: resolveImage(loc.image),
      mapLink: loc.mapUrl,
    })
  );

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
            {data.mainTitle}
          </Text>
        </div>
      </section>

      {/* History Timeline */}
      {timeline.length > 0 && (
        <HistoryTimeline timeline={timeline} title={data.history?.title} />
      )}

      {/* Team Members */}
      {members.length > 0 && (
        <TeamMembers members={members} title={data.team?.title} />
      )}

      {/* Customer Testimonials */}
      {data.testimonials?.items?.length > 0 && (
        <CustomerTestimonials
          moreReviewsLink={data.testimonials.moreReviewsLink || ""}
          testimonials={data.testimonials.items}
          title={data.testimonials.title}
        />
      )}

      {/* Locations */}
      {locations.length > 0 && <LocationsInfo locations={locations} />}

      {/* Social Media */}
      {data.socialMedia?.length > 0 && (
        <SocialMediaLinks socialMedia={data.socialMedia} />
      )}
    </main>
  );
}
