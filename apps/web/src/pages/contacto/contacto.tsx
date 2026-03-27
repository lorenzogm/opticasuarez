import { resolveImage } from "../../lib/sanity";
import ContactForm from "./sections/contact-form";
import ContactHero from "./sections/contact-hero";
import ContactInfo from "./sections/contact-info";
import ContactLocations from "./sections/contact-locations";
import ContactSocialMedia from "./sections/contact-social-media";

// biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
export default function ContactoPage({ data }: { data: any }) {
  if (!data) return null;

  const locations = (data.locations?.items || []).map(
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    (loc: any) => ({
      ...loc,
      image: resolveImage(loc.image),
    })
  );

  // Transform socialMedia links array to named objects
  const socialLinks = data.socialMedia?.links || [];
  const findLink = (platform: string) =>
    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
    socialLinks.find((l: any) => l.platform === platform) || {
      title: "",
      handle: "",
      url: "",
    };

  return (
    <main>
      {data.hero && (
        <ContactHero
          description={data.hero.description}
          subtitle={data.hero.subtitle}
          title={data.hero.title}
        />
      )}
      {data.contactInfo && (
        <ContactInfo
          email={data.contactInfo.email}
          generalInfo={data.contactInfo.generalInfo}
          phone={data.contactInfo.phone}
          subtitle={data.contactInfo.subtitle}
          title={data.contactInfo.title}
          whatsapp={data.contactInfo.whatsapp}
        />
      )}
      {locations.length > 0 && (
        <ContactLocations
          locations={locations}
          subtitle={data.locations?.subtitle}
          title={data.locations?.title}
        />
      )}
      {data.contactForm && (
        <ContactForm
          description={data.contactForm.description}
          form={data.contactForm.form}
          subtitle={data.contactForm.subtitle}
          title={data.contactForm.title}
        />
      )}
      {data.socialMedia && (
        <ContactSocialMedia
          facebook={findLink("facebook")}
          instagram={findLink("instagram")}
          subtitle={data.socialMedia.subtitle}
          title={data.socialMedia.title}
          youtube={findLink("youtube")}
        />
      )}
    </main>
  );
}
