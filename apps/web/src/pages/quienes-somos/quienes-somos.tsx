import { Text } from "../../components/text";
import content from "../../content/quienes-somos.json" with { type: "json" };
import CustomerTestimonials from "../../sections/customer-testimonials";
import LocationsInfo from "../../sections/locations-info";
import HistoryTimeline from "./sections/history-timeline";
import SocialMediaLinks from "./sections/social-media-links";
import TeamMembers from "./sections/team-members";

export default function Quienessomos() {
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

      {/* History Timeline */}
      <HistoryTimeline
        timeline={content.history.timeline}
        title={content.history.title}
      />

      {/* Team Members */}
      <TeamMembers members={content.team.members} title={content.team.title} />

      {/* Customer Testimonials */}
      <CustomerTestimonials
        moreReviewsLink={content.testimonials.moreReviewsLink}
        testimonials={content.testimonials.items}
        title={content.testimonials.title}
      />

      {/* Locations */}
      <LocationsInfo locations={content.locations} />

      {/* Social Media */}
      <SocialMediaLinks socialMedia={content.socialMedia} />
    </main>
  );
}
