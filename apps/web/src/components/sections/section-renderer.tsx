import SectionAccordion from "./section-accordion";
import SectionCards from "./section-cards";
import SectionContactForm from "./section-contact-form";
import SectionCTA from "./section-cta";
import SectionFeatures from "./section-features";
import SectionHero from "./section-hero";
import SectionList from "./section-list";
import SectionLocations from "./section-locations";
import SectionProcessSteps from "./section-process-steps";
import SectionSocialMedia from "./section-social-media";
import SectionStats from "./section-stats";
import SectionTeaser from "./section-teaser";
import SectionTestimonials from "./section-testimonials";
import SectionText from "./section-text";
import SectionTimeline from "./section-timeline";

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data is dynamically typed
type SectionComponent = React.ComponentType<{ section: any }>;

const sectionComponents: Record<string, SectionComponent> = {
  sectionHero: SectionHero,
  sectionCards: SectionCards,
  sectionContactForm: SectionContactForm,
  sectionFeatures: SectionFeatures,
  sectionText: SectionText,
  sectionAccordion: SectionAccordion,
  sectionTeaser: SectionTeaser,
  sectionTestimonials: SectionTestimonials,
  sectionTimeline: SectionTimeline,
  sectionSocialMedia: SectionSocialMedia,
  sectionList: SectionList,
  sectionLocations: SectionLocations,
  sectionProcessSteps: SectionProcessSteps,
  sectionStats: SectionStats,
  sectionCTA: SectionCTA,
};

// biome-ignore lint/suspicious/noExplicitAny: Sanity page data with dynamic sections
export default function SectionRenderer({ sections }: { sections: any[] }) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {/* biome-ignore lint/suspicious/noExplicitAny: dynamic section types */}
      {sections.map((section: any) => {
        const Component = sectionComponents[section._type];
        if (!Component) return null;
        return <Component key={section._key} section={section} />;
      })}
    </>
  );
}
