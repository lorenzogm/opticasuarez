// Document schemas
import { aboutPage } from "./documents/about-page";
import { blogPost } from "./documents/blog-post";
import { contactPage } from "./documents/contact-page";
import { homepage } from "./documents/homepage";
import { location } from "./documents/location";
import { page } from "./documents/page";
import { planVeoPage } from "./documents/plan-veo-page";
import { service } from "./documents/service";
import { servicePage } from "./documents/service-page";
import { serviciosOverview } from "./documents/servicios-overview";
import { siteSettings } from "./documents/site-settings";
import { teamMember } from "./documents/team-member";

// Object schemas
import { accordionItem } from "./objects/accordion-item";
import { bookAppointmentBlock } from "./objects/book-appointment-block";
import { cardItem } from "./objects/card-item";
import { faqItem } from "./objects/faq-item";
import { featureItem } from "./objects/feature-item";
import { frequencyRecommendation } from "./objects/frequency-recommendation";
import { heroBlock } from "./objects/hero-block";
import { partnerItem } from "./objects/partner-item";
import { processStep } from "./objects/process-step";
import { schedule } from "./objects/schedule";
import { seo } from "./objects/seo";
import { serviceGridItem } from "./objects/service-grid-item";
import { serviceItem } from "./objects/service-item";
import { socialMediaLink } from "./objects/social-media-link";
import { testimonialItem } from "./objects/testimonial-item";
import { timelineEntry } from "./objects/timeline-entry";

// Section schemas (page builder)
import { sectionAccordion } from "./sections/section-accordion";
import { sectionCards } from "./sections/section-cards";
import { sectionFeatures } from "./sections/section-features";
import { sectionHero } from "./sections/section-hero";
import { sectionTeaser } from "./sections/section-teaser";
import { sectionTestimonials } from "./sections/section-testimonials";
import { sectionText } from "./sections/section-text";
import { sectionTimeline } from "./sections/section-timeline";

export const schemaTypes = [
  // Objects
  accordionItem,
  bookAppointmentBlock,
  cardItem,
  faqItem,
  featureItem,
  frequencyRecommendation,
  heroBlock,
  partnerItem,
  processStep,
  schedule,
  seo,
  serviceGridItem,
  serviceItem,
  socialMediaLink,
  testimonialItem,
  timelineEntry,

  // Sections (page builder)
  sectionAccordion,
  sectionCards,
  sectionFeatures,
  sectionHero,
  sectionTeaser,
  sectionTestimonials,
  sectionText,
  sectionTimeline,

  // Documents
  aboutPage,
  blogPost,
  contactPage,
  homepage,
  location,
  page,
  planVeoPage,
  service,
  servicePage,
  serviciosOverview,
  siteSettings,
  teamMember,
];

// Singleton document types (only one instance allowed)
export const singletonTypes = new Set([
  "homepage",
  "aboutPage",
  "contactPage",
  "serviciosOverview",
  "planVeoPage",
  "siteSettings",
]);
