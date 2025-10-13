import TerapiaVisualHero from './sections/terapia-visual-hero';
import TerapiaVisualInfo from './sections/terapia-visual-info';
import TerapiaVisualConditions from './sections/terapia-visual-conditions';
import TerapiaVisualProcess from './sections/terapia-visual-process';
import Testimonials from './sections/testimonials';
import TerapiaVisualCta from './sections/terapia-visual-cta';
import content from '../../../content/terapia-visual.json';

export default function TerapiaVisual() {
  return (
    <main>
      {/* Hero Section */}
      <TerapiaVisualHero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        description={content.hero.description}
        backgroundImage={content.hero.backgroundImage}
      />

      {/* What is Visual Therapy */}
      <TerapiaVisualInfo
        title={content.whatIs.title}
        description={content.whatIs.description}
        benefits={content.whatIs.benefits}
      />

      {/* Conditions We Treat */}
      <TerapiaVisualConditions
        title={content.conditions.title}
        subtitle={content.conditions.subtitle}
        items={content.conditions.items}
      />

      {/* Our Process */}
      <TerapiaVisualProcess
        title={content.process.title}
        subtitle={content.process.subtitle}
        steps={content.process.steps}
      />

      {/* Testimonials */}
      <Testimonials
        title={content.testimonials.title}
        testimonials={content.testimonials.items}
      />

      {/* CTA */}
      <TerapiaVisualCta
        title={content.cta.title}
        description={content.cta.description}
        buttonText={content.cta.buttonText}
        buttonLink={content.cta.buttonLink}
      />
    </main>
  );
}
