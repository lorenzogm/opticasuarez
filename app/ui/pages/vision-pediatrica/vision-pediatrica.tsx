import PediatricHero from './sections/pediatric-hero';
import IntroductionSection from './sections/introduction-section';
import PediatricServices from './sections/pediatric-services';
import AgeGroups from './sections/age-groups';
import WarningSigns from './sections/warning-signs';
import CTASection from './sections/cta-section';
import CustomerTestimonials from '../../sections/customer-testimonials';
import content from '../../../content/vision-pediatrica.json';

export default function VisionPediatrica() {
  return (
    <main>
      {/* Hero Section */}
      <PediatricHero
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

      {/* Services */}
      <PediatricServices
        title={content.services.title}
        subtitle={content.services.subtitle}
        items={content.services.items}
      />

      {/* Age Groups */}
      <AgeGroups
        title={content.ageGroups.title}
        subtitle={content.ageGroups.subtitle}
        groups={content.ageGroups.groups}
      />

      {/* Warning Signs */}
      <WarningSigns
        title={content.warningSign.title}
        subtitle={content.warningSign.subtitle}
        description={content.warningSign.description}
        signs={content.warningSign.signs}
      />

      {/* Testimonials */}
      <CustomerTestimonials
        title={content.testimonials.title}
        testimonials={content.testimonials.items}
        moreReviewsLink=""
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
