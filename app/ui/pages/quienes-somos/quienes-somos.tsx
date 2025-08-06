import HistoryTimeline from './sections/history-timeline';
import TeamMembers from './sections/team-members';
import CustomerTestimonials from '../../sections/customer-testimonials';
import LocationsInfo from '../../sections/locations-info';
import SocialMediaLinks from './sections/social-media-links';
import { Text } from '../../components/text';
import content from '../../../content/quienes-somos.json';

export default function Quienessomos() {
  return (
    <main>
      {/* Main heading */}
      <section className="bg-white py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <Text
            as="h1"
            variant="heading-1"
            className="mb-8 text-gray-900 uppercase tracking-wide"
          >
            {content.mainTitle}
          </Text>
        </div>
      </section>

      {/* History Timeline */}
      <HistoryTimeline
        title={content.history.title}
        timeline={content.history.timeline}
      />

      {/* Team Members */}
      <TeamMembers title={content.team.title} members={content.team.members} />

      {/* Customer Testimonials */}
      <CustomerTestimonials
        title={content.testimonials.title}
        testimonials={content.testimonials.items}
        moreReviewsLink={content.testimonials.moreReviewsLink}
      />

      {/* Locations */}
      <LocationsInfo locations={content.locations} />

      {/* Social Media */}
      <SocialMediaLinks socialMedia={content.socialMedia} />
    </main>
  );
}
