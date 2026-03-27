import FAQAccordion from "../../components/faq-accordion";
import { resolveImage } from "../../lib/sanity";
import BenefitsSection from "./sections/benefits-section";
import CTASection from "./sections/cta-section";
import IntroductionSection from "./sections/introduction-section";
import PlanVeoHero from "./sections/plan-veo-hero";
import ProcessSection from "./sections/process-section";
import RequirementsSection from "./sections/requirements-section";

// biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
export default function PlanVeo({ data }: { data: any }) {
  if (!data) return null;

  const benefitItems = (data.benefits?.items || []).map(
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    (item: any) => ({
      ...item,
      image: resolveImage(item.image),
    })
  );

  const steps = (data.howItWorks?.steps || []).map(
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    (s: any) => ({
      number: String(s.stepNumber || s.number || s.step),
      title: s.title,
      description: s.description,
    })
  );

  return (
    <main>
      {data.hero && (
        <PlanVeoHero
          description={data.hero.description}
          image={resolveImage(data.hero.image)}
          imageAlt={data.hero.imageAlt}
          imageTitle={data.hero.imageTitle}
          subtitle={data.hero.subtitle}
          title={data.hero.title}
        />
      )}

      {data.introduction && (
        <IntroductionSection
          content={data.introduction.content}
          title={data.introduction.title}
        />
      )}

      {benefitItems.length > 0 && (
        <BenefitsSection
          items={benefitItems}
          subtitle={data.benefits?.subtitle}
          title={data.benefits?.title}
        />
      )}

      {data.requirements && (
        <RequirementsSection
          description={data.requirements.description}
          items={data.requirements.items || []}
          subtitle={data.requirements.subtitle}
          title={data.requirements.title}
        />
      )}

      {steps.length > 0 && (
        <ProcessSection
          steps={steps}
          subtitle={data.howItWorks?.subtitle}
          title={data.howItWorks?.title}
        />
      )}

      {data.faq?.items?.length > 0 && (
        <FAQAccordion items={data.faq.items} title={data.faq.title} />
      )}

      {data.cta && (
        <CTASection
          buttonLink={data.cta.buttonLink}
          buttonText={data.cta.buttonText}
          description={data.cta.description}
          subtitle={data.cta.subtitle}
          title={data.cta.title}
        />
      )}
    </main>
  );
}
