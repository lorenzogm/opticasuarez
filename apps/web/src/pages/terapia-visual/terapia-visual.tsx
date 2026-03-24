import FAQAccordion from "../../components/faq-accordion";
import content from "../../content/terapia-visual.json" with { type: "json" };
import TerapiaVisualConditions from "./sections/terapia-visual-conditions";
import TerapiaVisualCta from "./sections/terapia-visual-cta";
import TerapiaVisualHero from "./sections/terapia-visual-hero";
import TerapiaVisualInfo from "./sections/terapia-visual-info";
import TerapiaVisualProcess from "./sections/terapia-visual-process";
import Testimonials from "./sections/testimonials";

// biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
export default function TerapiaVisual({ data: _data }: { data: any }) {
  // TODO: Sanity schema needs page-specific fields for hero, whatIs, conditions, testimonials
  // Using local JSON content until schema is enhanced
  return (
    <main>
      {/* Hero Section */}
      <TerapiaVisualHero
        backgroundImage={content.hero.backgroundImage}
        description={content.hero.description}
        subtitle={content.hero.subtitle}
        title={content.hero.title}
      />

      {/* What is Visual Therapy */}
      <TerapiaVisualInfo
        benefits={content.whatIs.benefits}
        description={content.whatIs.description}
        title={content.whatIs.title}
      />

      {/* Conditions We Treat */}
      <TerapiaVisualConditions
        items={content.conditions.items}
        subtitle={content.conditions.subtitle}
        title={content.conditions.title}
      />

      {/* Our Process */}
      <TerapiaVisualProcess
        steps={content.process.steps}
        subtitle={content.process.subtitle}
        title={content.process.title}
      />

      {/* Testimonials */}
      <Testimonials
        testimonials={content.testimonials.items}
        title={content.testimonials.title}
      />

      {/* FAQ Section */}
      <FAQAccordion items={content.faq.items} title={content.faq.title} />

      {/* CTA */}
      <TerapiaVisualCta
        buttonLink={content.cta.buttonLink}
        buttonText={content.cta.buttonText}
        description={content.cta.description}
        title={content.cta.title}
      />
    </main>
  );
}
