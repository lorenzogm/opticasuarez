import FAQAccordion from "../../components/faq-accordion";
import content from "../../content/plan-veo.json" with { type: "json" };
import BenefitsSection from "./sections/benefits-section";
import CTASection from "./sections/cta-section";
import IntroductionSection from "./sections/introduction-section";
import PlanVeoHero from "./sections/plan-veo-hero";
import ProcessSection from "./sections/process-section";
import RequirementsSection from "./sections/requirements-section";

export default function PlanVeo() {
  return (
    <main>
      {/* Hero Section */}
      <PlanVeoHero
        description={content.hero.description}
        image={content.hero.image}
        imageAlt={content.hero.imageAlt}
        imageTitle={content.hero.imageTitle}
        subtitle={content.hero.subtitle}
        title={content.hero.title}
      />

      {/* Introduction */}
      <IntroductionSection
        content={content.introduction.content}
        title={content.introduction.title}
      />

      {/* Benefits - What does Plan VEO cover */}
      <BenefitsSection
        items={content.benefits.items}
        subtitle={content.benefits.subtitle}
        title={content.benefits.title}
      />

      {/* Requirements - Who can benefit */}
      <RequirementsSection
        description={content.requirements.description}
        items={content.requirements.items}
        subtitle={content.requirements.subtitle}
        title={content.requirements.title}
      />

      {/* Process - How to apply */}
      <ProcessSection
        steps={content.howItWorks.steps}
        subtitle={content.howItWorks.subtitle}
        title={content.howItWorks.title}
      />

      {/* FAQ */}
      <FAQAccordion items={content.faq.items} title={content.faq.title} />

      {/* CTA */}
      <CTASection
        buttonLink={content.cta.buttonLink}
        buttonText={content.cta.buttonText}
        description={content.cta.description}
        subtitle={content.cta.subtitle}
        title={content.cta.title}
      />
    </main>
  );
}
