// Object schemas

// Document schemas
import { aboutPage } from "./documents/about-page";
import { blogPost } from "./documents/blog-post";
import { contactPage } from "./documents/contact-page";
import { homepage } from "./documents/homepage";
import { location } from "./documents/location";
import { planVeoPage } from "./documents/plan-veo-page";
import { servicePage } from "./documents/service-page";
import { serviciosOverview } from "./documents/servicios-overview";
import { siteSettings } from "./documents/site-settings";
import { teamMember } from "./documents/team-member";
import { bookAppointmentBlock } from "./objects/book-appointment-block";
import { faqItem } from "./objects/faq-item";
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

export const schemaTypes = [
  // Objects
  bookAppointmentBlock,
  faqItem,
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

  // Documents
  aboutPage,
  blogPost,
  contactPage,
  homepage,
  location,
  planVeoPage,
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
