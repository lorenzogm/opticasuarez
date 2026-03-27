import FAQAccordion from "../../components/faq-accordion";
import { resolveImage } from "../../lib/sanity";
import TerapiaVisualConditions from "./sections/terapia-visual-conditions";
import TerapiaVisualCta from "./sections/terapia-visual-cta";
import TerapiaVisualHero from "./sections/terapia-visual-hero";
import TerapiaVisualInfo from "./sections/terapia-visual-info";
import TerapiaVisualProcess from "./sections/terapia-visual-process";
import Testimonials from "./sections/testimonials";

// biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
export default function TerapiaVisual({ data }: { data: any }) {
  if (!data) return null;

  const steps = (data.process?.steps || []).map(
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    (s: any) => ({
      step: String(s.stepNumber || s.step),
      title: s.title,
      description: s.description,
    })
  );

  return (
    <main>
      {/* Hero Section */}
      <TerapiaVisualHero
        backgroundImage={resolveImage(data.heroImage)}
        description={data.heroDescription || data.intro?.description}
        subtitle={data.subtitle}
        title={data.mainTitle}
      />

      {/* What is Visual Therapy */}
      {data.intro && (
        <TerapiaVisualInfo
          benefits={data.benefits?.items || []}
          description={data.intro.description}
          title={data.intro.title}
        />
      )}

      {/* Conditions We Treat */}
      {data.items?.length > 0 && (
        <TerapiaVisualConditions
          items={data.items}
          subtitle={data.itemsSectionSubtitle}
          title={data.itemsSectionTitle}
        />
      )}

      {/* Our Process */}
      {steps.length > 0 && (
        <TerapiaVisualProcess
          steps={steps}
          subtitle={data.process?.description}
          title={data.process?.title}
        />
      )}

      {/* Testimonials */}
      {data.testimonials?.items?.length > 0 && (
        <Testimonials
          testimonials={data.testimonials.items}
          title={data.testimonials.title}
        />
      )}

      {/* FAQ Section */}
      {data.faq?.items?.length > 0 && (
        <FAQAccordion items={data.faq.items} title={data.faq.title} />
      )}

      {/* CTA */}
      {data.cta && (
        <TerapiaVisualCta
          buttonLink={data.cta.buttonLink}
          buttonText={data.cta.buttonText}
          description={data.cta.description}
          title={data.cta.title}
        />
      )}
    </main>
  );
}
