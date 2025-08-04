import Hero from "../sections/Hero";
import Services from "../sections/Services";
import About from "../sections/About";
import Brands from "../sections/Brands";
import Testimonials from "../sections/Testimonials";
import Contact from "../sections/Contact";
import Navigation from "../components/Navigation";
import content from "../../content/homepage.json";

export default function Homepage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero
          title={content.hero.title}
          subtitle={content.hero.subtitle}
          description={content.hero.description}
          cta={content.hero.cta}
        />
        <Services
          title={content.services.title}
          items={content.services.items}
        />
        <About
          title={content.about.title}
          description={content.about.description}
          experience={content.about.experience}
          clients={content.about.clients}
        />
        <Brands
          title={content.brands.title}
          description={content.brands.description}
          brands={content.brands.brands}
        />
        <Testimonials
          title={content.testimonials.title}
          testimonials={content.testimonials.testimonials}
        />
        <Contact
          title={content.contact.title}
          phone={content.contact.phone}
          email={content.contact.email}
          address={content.contact.address}
          hours={content.contact.hours}
        />
      </main>
    </>
  );
}