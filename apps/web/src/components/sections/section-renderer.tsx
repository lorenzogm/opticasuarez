import SectionAccordion from "./section-accordion";
import SectionCards from "./section-cards";
import SectionFeatures from "./section-features";
import SectionHero from "./section-hero";
import SectionTeaser from "./section-teaser";
import SectionTestimonials from "./section-testimonials";
import SectionText from "./section-text";
import SectionTimeline from "./section-timeline";

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data is dynamically typed
type SectionComponent = React.ComponentType<{ section: any }>;

const sectionComponents: Record<string, SectionComponent> = {
  sectionHero: SectionHero,
  sectionCards: SectionCards,
  sectionFeatures: SectionFeatures,
  sectionText: SectionText,
  sectionAccordion: SectionAccordion,
  sectionTeaser: SectionTeaser,
  sectionTestimonials: SectionTestimonials,
  sectionTimeline: SectionTimeline,
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
