import FAQAccordion from "../../components/faq-accordion";
import content from "../../content/vision-pediatrica.json" with {
  type: "json",
};
import CustomerTestimonials from "../../sections/customer-testimonials";
import AgeGroups from "./sections/age-groups";
import CTASection from "./sections/cta-section";
import IntroductionSection from "./sections/introduction-section";
import PediatricHero from "./sections/pediatric-hero";
import PediatricServices from "./sections/pediatric-services";
import WarningSigns from "./sections/warning-signs";

export default function VisionPediatrica() {
  return (
    <main>
      {/* Hero Section */}
      <PediatricHero
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

      {/* Services */}
      <PediatricServices
        items={content.services.items}
        subtitle={content.services.subtitle}
        title={content.services.title}
      />

      {/* Age Groups */}
      <AgeGroups
        groups={content.ageGroups.groups}
        subtitle={content.ageGroups.subtitle}
        title={content.ageGroups.title}
      />

      {/* Warning Signs */}
      <WarningSigns
        description={content.warningSign.description}
        signs={content.warningSign.signs}
        subtitle={content.warningSign.subtitle}
        title={content.warningSign.title}
      />

      {/* Testimonials */}
      <CustomerTestimonials
        moreReviewsLink=""
        testimonials={content.testimonials.items}
        title={content.testimonials.title}
      />

      {/* CTA */}
      <CTASection
        buttonLink={content.cta.buttonLink}
        buttonText={content.cta.buttonText}
        description={content.cta.description}
        subtitle={content.cta.subtitle}
        title={content.cta.title}
      />

      {/* FAQ */}
      <FAQAccordion items={content.faq.items} title={content.faq.title} />
    </main>
  );
}
