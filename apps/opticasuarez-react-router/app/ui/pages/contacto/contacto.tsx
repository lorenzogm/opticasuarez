import content from "../../../content/contacto.json" with { type: "json" };
import ContactForm from "./sections/contact-form";
import ContactHero from "./sections/contact-hero";
import ContactInfo from "./sections/contact-info";
import ContactLocations from "./sections/contact-locations";
import ContactSocialMedia from "./sections/contact-social-media";

export default function ContactoPage() {
  return (
    <main>
      <ContactHero
        description={content.hero.description}
        subtitle={content.hero.subtitle}
        title={content.hero.title}
      />
      <ContactInfo
        email={content.contactInfo.email}
        generalInfo={content.contactInfo.generalInfo}
        phone={content.contactInfo.phone}
        subtitle={content.contactInfo.subtitle}
        title={content.contactInfo.title}
        whatsapp={content.contactInfo.whatsapp}
      />
      <ContactLocations
        locations={content.locations.locations}
        subtitle={content.locations.subtitle}
        title={content.locations.title}
      />
      <ContactForm
        description={content.contactForm.description}
        form={content.contactForm.form}
        subtitle={content.contactForm.subtitle}
        title={content.contactForm.title}
      />
      <ContactSocialMedia
        facebook={content.socialMedia.facebook}
        instagram={content.socialMedia.instagram}
        subtitle={content.socialMedia.subtitle}
        title={content.socialMedia.title}
        youtube={content.socialMedia.youtube}
      />
    </main>
  );
}
