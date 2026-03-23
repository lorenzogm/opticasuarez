import PlanVeoHero from './sections/plan-veo-hero';
import IntroductionSection from './sections/introduction-section';
import BenefitsSection from './sections/benefits-section';
import RequirementsSection from './sections/requirements-section';
import ProcessSection from './sections/process-section';
import FAQAccordion from '../../components/faq-accordion';
import CTASection from './sections/cta-section';
import content from '../../../content/plan-veo.json';

export default function PlanVeo() {
  return (
    <main>
      {/* Hero Section */}
      <PlanVeoHero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        description={content.hero.description}
        image={content.hero.image}
        imageTitle={content.hero.imageTitle}
        imageAlt={content.hero.imageAlt}
      />

      {/* Introduction */}
      <IntroductionSection
        title={content.introduction.title}
        content={content.introduction.content}
      />

      {/* Benefits - What does Plan VEO cover */}
      <BenefitsSection
        title={content.benefits.title}
        subtitle={content.benefits.subtitle}
        items={content.benefits.items}
      />

      {/* Requirements - Who can benefit */}
      <RequirementsSection
        title={content.requirements.title}
        subtitle={content.requirements.subtitle}
        description={content.requirements.description}
        items={content.requirements.items}
      />

      {/* Process - How to apply */}
      <ProcessSection
        title={content.howItWorks.title}
        subtitle={content.howItWorks.subtitle}
        steps={content.howItWorks.steps}
      />

      {/* FAQ */}
      <FAQAccordion
        title={content.faq.title}
        items={content.faq.items}
      />

      {/* CTA */}
      <CTASection
        title={content.cta.title}
        subtitle={content.cta.subtitle}
        description={content.cta.description}
        buttonText={content.cta.buttonText}
        buttonLink={content.cta.buttonLink}
      />
    </main>
  );
}
