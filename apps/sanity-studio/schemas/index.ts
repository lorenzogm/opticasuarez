// Document schemas
import { blogPost } from "./documents/blog-post";
import { brand } from "./documents/brand";
import { homepage } from "./documents/homepage";
import { location } from "./documents/location";
import { page } from "./documents/page";
import { product } from "./documents/product";
import { productCategory } from "./documents/product-category";
import { service } from "./documents/service";
import { siteSettings } from "./documents/site-settings";
import { teamMember } from "./documents/team-member";

// Object schemas
import { accordionItem } from "./objects/accordion-item";
import { bookAppointmentBlock } from "./objects/book-appointment-block";
import { cardItem } from "./objects/card-item";
import { faqItem } from "./objects/faq-item";
import { featureItem } from "./objects/feature-item";
import { frameDimensions } from "./objects/frame-dimensions";
import { heroBlock } from "./objects/hero-block";
import { partnerItem } from "./objects/partner-item";
import { processStep } from "./objects/process-step";
import { productColor } from "./objects/product-color";
import { schedule } from "./objects/schedule";
import { seo } from "./objects/seo";
import { serviceGridItem } from "./objects/service-grid-item";
import { socialMediaLink } from "./objects/social-media-link";
import { testimonialItem } from "./objects/testimonial-item";
import { timelineEntry } from "./objects/timeline-entry";

// Section schemas (page builder)
import { sectionAccordion } from "./sections/section-accordion";
import { sectionCards } from "./sections/section-cards";
import { sectionCTA } from "./sections/section-cta";
import { sectionFeatures } from "./sections/section-features";
import { sectionHero } from "./sections/section-hero";
import { sectionList } from "./sections/section-list";
import { sectionLocations } from "./sections/section-locations";
import { sectionProcessSteps } from "./sections/section-process-steps";
import { sectionSocialMedia } from "./sections/section-social-media";
import { sectionStats } from "./sections/section-stats";
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
  frameDimensions,
  heroBlock,
  partnerItem,
  processStep,
  productColor,
  schedule,
  seo,
  serviceGridItem,
  socialMediaLink,
  testimonialItem,
  timelineEntry,

  // Sections (page builder)
  sectionAccordion,
  sectionCards,
  sectionCTA,
  sectionFeatures,
  sectionHero,
  sectionList,
  sectionLocations,
  sectionProcessSteps,
  sectionSocialMedia,
  sectionTeaser,
  sectionTestimonials,
  sectionStats,
  sectionText,
  sectionTimeline,

  // Documents
  blogPost,
  brand,
  homepage,
  location,
  page,
  product,
  productCategory,
  service,
  siteSettings,
  teamMember,
];

// Singleton document types (only one instance allowed)
export const singletonTypes = new Set([
  "homepage",
  "planVeoPage",
  "siteSettings",
]);
