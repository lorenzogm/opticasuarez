import ContactHero from '../../sections/contact-hero';
import ContactInfo from '../../sections/contact-info';
import ContactLocations from '../../sections/contact-locations';
import ContactForm from '../../sections/contact-form';
import ContactSocialMedia from '../../sections/contact-social-media';
import content from '../../../content/contacto.json';

export default function ContactoPage() {
  return (
    <main>
      <ContactHero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        description={content.hero.description}
      />
      <ContactInfo
        title={content.contactInfo.title}
        subtitle={content.contactInfo.subtitle}
        phone={content.contactInfo.phone}
        email={content.contactInfo.email}
        generalInfo={content.contactInfo.generalInfo}
        whatsapp={content.contactInfo.whatsapp}
      />
      <ContactLocations
        title={content.locations.title}
        subtitle={content.locations.subtitle}
        locations={content.locations.locations}
      />
      <ContactForm
        title={content.contactForm.title}
        subtitle={content.contactForm.subtitle}
        description={content.contactForm.description}
        form={content.contactForm.form}
      />
      <ContactSocialMedia
        title={content.socialMedia.title}
        subtitle={content.socialMedia.subtitle}
        instagram={content.socialMedia.instagram}
        facebook={content.socialMedia.facebook}
        youtube={content.socialMedia.youtube}
      />
    </main>
  );
}