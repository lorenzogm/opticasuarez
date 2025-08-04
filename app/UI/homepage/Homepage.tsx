import Hero from "../sections/Hero";
import Services from "../sections/Services";
import About from "../sections/About";
import Contact from "../sections/Contact";
import content from "../../content/homepage.json";

export default function Homepage() {
  return (
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
      <Contact
        title={content.contact.title}
        phone={content.contact.phone}
        email={content.contact.email}
        address={content.contact.address}
        hours={content.contact.hours}
      />
    </main>
  );
}