import FAQAccordion from "../../components/faq-accordion";
import { resolveImage } from "../../lib/sanity";
import CustomerTestimonials from "../../sections/customer-testimonials";
import AgeGroups from "./sections/age-groups";
import CTASection from "./sections/cta-section";
import IntroductionSection from "./sections/introduction-section";
import PediatricHero from "./sections/pediatric-hero";
import PediatricServices from "./sections/pediatric-services";
import WarningSigns from "./sections/warning-signs";

// biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
export default function VisionPediatrica({ data }: { data: any }) {
  if (!data) return null;

  const serviceItems = (data.items || []).map(
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    (item: any) => ({
      ...item,
      image: resolveImage(item.image),
    })
  );

  return (
    <main>
      {/* Hero Section */}
      <PediatricHero
        description={data.heroDescription}
        image={resolveImage(data.heroImage)}
        imageAlt={data.heroImage?.asset?.url ? data.mainTitle : undefined}
        imageTitle={data.mainTitle}
        subtitle={data.subtitle}
        title={data.mainTitle}
      />

      {/* Introduction */}
      {(data.introduction || data.intro) && (
        <IntroductionSection
          content={data.introduction?.content || data.intro?.description}
          title={data.introduction?.title || data.intro?.title}
        />
      )}

      {/* Services */}
      {serviceItems.length > 0 && (
        <PediatricServices
          items={serviceItems}
          subtitle={data.itemsSectionSubtitle}
          title={data.itemsSectionTitle}
        />
      )}

      {/* Age Groups */}
      {data.ageGroups?.groups?.length > 0 && (
        <AgeGroups
          groups={data.ageGroups.groups}
          subtitle={data.ageGroups.subtitle}
          title={data.ageGroups.title}
        />
      )}

      {/* Warning Signs */}
      {data.warningSign && (
        <WarningSigns
          description={data.warningSign.description}
          signs={data.warningSign.signs || []}
          subtitle={data.warningSign.subtitle}
          title={data.warningSign.title}
        />
      )}

      {/* Testimonials */}
      {data.testimonials?.items?.length > 0 && (
        <CustomerTestimonials
          moreReviewsLink=""
          testimonials={data.testimonials.items}
          title={data.testimonials.title}
        />
      )}

      {/* CTA */}
      {data.cta && (
        <CTASection
          buttonLink={data.cta.buttonLink}
          buttonText={data.cta.buttonText}
          description={data.cta.description}
          subtitle={data.cta.subtitle}
          title={data.cta.title}
        />
      )}

      {/* FAQ */}
      {data.faq?.items?.length > 0 && (
        <FAQAccordion items={data.faq.items} title={data.faq.title} />
      )}
    </main>
  );
}
