/**
 * Migration script: creates page builder documents (page + service) from legacy Sanity content.
 *
 * Usage: cd apps/web && npx tsx scripts/migrate-pages.ts
 *
 * Prerequisites:
 * - SANITY_API_TOKEN env var with write access
 * - Legacy data must exist in the Sanity dataset
 *
 * This script is idempotent: it will skip documents that already exist.
 */

import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || "2a24wmex";
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("Error: SANITY_API_TOKEN is required.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-23",
  useCdn: false,
  token,
});

// biome-ignore lint/suspicious/noExplicitAny: migration data from Sanity
type SanityDoc = Record<string, any>;

function key() {
  return Math.random().toString(36).slice(2, 12);
}

// ─── Service definitions ───────────────────────────────────────

const serviceDefinitions = [
  { title: "Examen Visual", slug: "examen-visual", order: 1 },
  { title: "Terapia Visual", slug: "terapia-visual", order: 2 },
  { title: "Contactología", slug: "contactologia", order: 3 },
  { title: "Visión Pediátrica", slug: "vision-pediatrica", order: 4 },
  { title: "Control de Miopía", slug: "control-de-miopia", order: 5 },
  { title: "Visión Deportiva", slug: "vision-deportiva", order: 6 },
  { title: "Ortoqueratología", slug: "ortoqueratologia", order: 7 },
];

// ─── Helper: create section objects ────────────────────────────

function heroSection(data: SanityDoc) {
  if (!data) return null;
  return {
    _type: "sectionHero",
    _key: key(),
    title: data.title || data.mainTitle || "",
    subtitle: data.subtitle || "",
    description: data.description || data.heroDescription || "",
    image: data.image || data.heroImage || undefined,
    imageAlt: data.imageAlt || data.imageTitle || "",
    ctaText: data.ctaText || "",
    ctaUrl: data.ctaUrl || "",
  };
}

function textSection(title: string, content: SanityDoc) {
  if (!(content || title)) return null;
  return {
    _type: "sectionText",
    _key: key(),
    title,
    content: Array.isArray(content)
      ? content
      : content
        ? [
            {
              _type: "block",
              _key: key(),
              children: [{ _type: "span", _key: key(), text: String(content) }],
            },
          ]
        : undefined,
  };
}

function cardsSection(title: string, items: SanityDoc[], variant = "grid-3") {
  if (!items || items.length === 0) return null;
  return {
    _type: "sectionCards",
    _key: key(),
    title,
    variant,
    items: items.map((item: SanityDoc) => ({
      _type: "cardItem",
      _key: key(),
      title: item.title || item.name || "",
      description: item.description || "",
      image: item.image || undefined,
      link: item.url || item.link || item.mapUrl || "",
      icon: item.icon || "",
    })),
  };
}

function featuresSection(title: string, items: SanityDoc[]) {
  if (!items || items.length === 0) return null;
  return {
    _type: "sectionFeatures",
    _key: key(),
    title,
    items: items.map((item: SanityDoc) => ({
      _type: "featureItem",
      _key: key(),
      title: item.title || "",
      description: item.description || "",
      icon: item.icon || "",
      image: item.image || undefined,
      link: item.link || "",
    })),
  };
}

function accordionSection(title: string, items: SanityDoc[]) {
  if (!items || items.length === 0) return null;
  return {
    _type: "sectionAccordion",
    _key: key(),
    title,
    items: items.map((item: SanityDoc) => ({
      _type: "accordionItem",
      _key: key(),
      title: item.question || item.title || "",
      content: item.answer || item.content || item.description || "",
    })),
  };
}

function teaserSection(data: SanityDoc) {
  if (!data) return null;
  return {
    _type: "sectionTeaser",
    _key: key(),
    title: data.title || "",
    description: data.description || data.text || "",
    buttonText: data.buttonText || data.ctaText || "",
    buttonUrl: data.buttonUrl || data.ctaUrl || "",
    image: data.image || undefined,
    variant: data.variant || "highlight",
  };
}

function testimonialsSection(data: SanityDoc) {
  if (!data) return null;
  return {
    _type: "sectionTestimonials",
    _key: key(),
    title: data.title || "Opiniones de nuestros pacientes",
    moreReviewsLink: data.moreReviewsLink || "",
    items: (data.items || []).map((item: SanityDoc) => ({
      _type: "testimonialItem",
      _key: key(),
      name: item.name || "",
      text: item.text || "",
      rating: item.rating || 5,
    })),
  };
}

function timelineSection(title: string, items: SanityDoc[]) {
  if (!items || items.length === 0) return null;
  return {
    _type: "sectionTimeline",
    _key: key(),
    title,
    items: items.map((item: SanityDoc) => ({
      _type: "timelineEntry",
      _key: key(),
      year: item.year || "",
      title: item.title || "",
      description: item.description || "",
      image: item.image || undefined,
    })),
  };
}

// ─── Create services ───────────────────────────────────────────

async function createServices() {
  console.log("\n── Creating service documents ──");

  for (const svc of serviceDefinitions) {
    const existing = await client.fetch(
      `*[_type == "service" && slug.current == $slug][0]._id`,
      { slug: svc.slug }
    );
    if (existing) {
      console.log(`  ⏭ Service "${svc.title}" already exists`);
      continue;
    }

    // Try to pull description/image from legacy servicePage
    const legacy: SanityDoc = await client.fetch(
      `*[_type == "servicePage" && slug.current == $slug][0]{
				heroDescription, "heroImage": heroImage{asset->{_ref, url}}, intro
			}`,
      { slug: svc.slug }
    );

    await client.create({
      _type: "service",
      title: svc.title,
      slug: { _type: "slug", current: svc.slug },
      description: legacy?.heroDescription || legacy?.intro || "",
      image: legacy?.heroImage || undefined,
      order: svc.order,
    });
    console.log(`  ✓ Created service: ${svc.title}`);
  }
}

// ─── Create pages from legacy documents ────────────────────────

async function createPageIfNotExists(opts: {
  id: string;
  title: string;
  path: string;
  sections: (SanityDoc | null)[];
  seo?: SanityDoc;
}) {
  const { id, title, path, sections, seo } = opts;
  const existing = await client.fetch(
    `*[_type == "page" && path.current == $path][0]._id`,
    { path }
  );
  if (existing) {
    console.log(`  ⏭ Page "${title}" (${path}) already exists`);
    return;
  }

  const validSections = sections.filter(Boolean);

  await client.create({
    _id: id,
    _type: "page",
    title,
    path: { _type: "slug", current: path },
    sections: validSections,
    seo: seo || undefined,
  });
  console.log(`  ✓ Created page: ${title} → ${path}`);
}

async function migrateHomepage() {
  console.log("\n── Migrating homepage ──");
  const doc: SanityDoc = await client.fetch(
    `*[_type == "homepage"][0]{
			hero, servicesGrid, videoAbout, about, testimonials,
			bookAppointment, brands, seo
		}`
  );
  if (!doc) {
    console.log("  ⚠ No legacy homepage found");
    return;
  }

  const sections = [
    doc.hero ? heroSection(doc.hero) : null,
    doc.servicesGrid?.items
      ? cardsSection("Nuestros servicios", doc.servicesGrid.items, "grid-3")
      : null,
    doc.about
      ? textSection("Sobre nosotros", doc.about.description || doc.about.text)
      : null,
    doc.testimonials ? testimonialsSection(doc.testimonials) : null,
    doc.bookAppointment ? teaserSection(doc.bookAppointment) : null,
  ];

  await createPageIfNotExists({
    id: "page-homepage",
    title: "Inicio",
    path: "/",
    sections,
    seo: doc.seo,
  });
}

async function migrateAboutPage() {
  console.log("\n── Migrating about page ──");
  const doc: SanityDoc = await client.fetch(
    `*[_type == "aboutPage"][0]{
			mainTitle, history, team, testimonials, seo
		}`
  );
  if (!doc) {
    console.log("  ⚠ No legacy about page found");
    return;
  }

  const sections = [
    heroSection({ title: doc.mainTitle || "Quiénes Somos" }),
    doc.history?.timeline
      ? timelineSection(
          doc.history.title || "Nuestra historia",
          doc.history.timeline
        )
      : null,
    doc.team?.members
      ? cardsSection(
          doc.team.title || "Nuestro equipo",
          doc.team.members,
          "grid-3"
        )
      : null,
    doc.testimonials ? testimonialsSection(doc.testimonials) : null,
  ];

  await createPageIfNotExists({
    id: "page-about",
    title: "Quiénes Somos",
    path: "/quienes-somos",
    sections,
    seo: doc.seo,
  });
}

async function migrateContactPage() {
  console.log("\n── Migrating contact page ──");
  const doc: SanityDoc = await client.fetch(
    `*[_type == "contactPage"][0]{
			hero, contactInfo, locations, seo
		}`
  );
  if (!doc) {
    console.log("  ⚠ No legacy contact page found");
    return;
  }

  const sections = [
    doc.hero ? heroSection(doc.hero) : null,
    doc.locations?.items
      ? cardsSection(
          doc.locations.title || "Nuestras ópticas",
          doc.locations.items,
          "grid-2"
        )
      : null,
  ];

  await createPageIfNotExists({
    id: "page-contact",
    title: "Contacto",
    path: "/contacto",
    sections,
    seo: doc.seo,
  });
}

async function migrateServiciosOverview() {
  console.log("\n── Migrating servicios overview ──");
  const doc: SanityDoc = await client.fetch(
    `*[_type == "serviciosOverview"][0]{
			title, description, services, seo
		}`
  );
  if (!doc) {
    console.log("  ⚠ No legacy servicios overview found");
    return;
  }

  const sections = [
    heroSection({
      title: doc.title || "Servicios",
      description: doc.description,
    }),
    doc.services ? cardsSection("", doc.services, "grid-3") : null,
  ];

  await createPageIfNotExists({
    id: "page-servicios",
    title: "Servicios",
    path: "/servicios",
    sections,
    seo: doc.seo,
  });
}

async function migratePlanVeoPage() {
  console.log("\n── Migrating Plan VEO page ──");
  const doc: SanityDoc = await client.fetch(
    `*[_type == "planVeoPage"][0]{
			mainTitle, hero, introduction, benefits, requirements,
			howItWorks, faq, cta, seo
		}`
  );
  if (!doc) {
    console.log("  ⚠ No legacy Plan VEO page found");
    return;
  }

  const sections = [
    doc.hero ? heroSection(doc.hero) : null,
    doc.introduction ? textSection("", doc.introduction) : null,
    doc.benefits?.items
      ? featuresSection(doc.benefits.title || "Beneficios", doc.benefits.items)
      : null,
    doc.howItWorks?.steps
      ? cardsSection(
          doc.howItWorks.title || "Cómo funciona",
          doc.howItWorks.steps,
          "grid-3"
        )
      : null,
    doc.faq?.items
      ? accordionSection(doc.faq.title || "Preguntas frecuentes", doc.faq.items)
      : null,
    doc.cta ? teaserSection(doc.cta) : null,
  ];

  await createPageIfNotExists({
    id: "page-planveo",
    title: "Plan VEO",
    path: "/planveo",
    sections,
    seo: doc.seo,
  });
}

async function migrateServicePages() {
  console.log("\n── Migrating service pages ──");

  for (const svc of serviceDefinitions) {
    const doc: SanityDoc = await client.fetch(
      `*[_type == "servicePage" && slug.current == $slug][0]{
				mainTitle, subtitle, "heroImage": heroImage{asset->{_ref, url}},
				heroDescription, intro, introduction,
				itemsSectionTitle, itemsSectionSubtitle, items,
				process, benefits, faq, cta, testimonials, seo
			}`,
      { slug: svc.slug }
    );
    if (!doc) {
      console.log(`  ⚠ No legacy service page for "${svc.slug}"`);
      continue;
    }

    const sections = [
      heroSection({
        title: doc.mainTitle || svc.title,
        subtitle: doc.subtitle,
        heroDescription: doc.heroDescription,
        heroImage: doc.heroImage,
      }),
      doc.introduction || doc.intro
        ? textSection("", doc.introduction || doc.intro)
        : null,
      doc.items
        ? featuresSection(doc.itemsSectionTitle || "", doc.items)
        : null,
      doc.process?.steps
        ? cardsSection(
            doc.process.title || "Proceso",
            doc.process.steps,
            "grid-3"
          )
        : null,
      doc.faq?.items
        ? accordionSection(
            doc.faq.title || "Preguntas frecuentes",
            doc.faq.items
          )
        : null,
      doc.testimonials ? testimonialsSection(doc.testimonials) : null,
      doc.cta ? teaserSection(doc.cta) : null,
    ];

    await createPageIfNotExists({
      id: `page-${svc.slug}`,
      title: svc.title,
      path: `/${svc.slug}`,
      sections,
      seo: doc.seo,
    });
  }
}

// ─── Main ──────────────────────────────────────────────────────

async function main() {
  console.log("🔄 Starting page migration...\n");

  await createServices();
  await migrateHomepage();
  await migrateAboutPage();
  await migrateContactPage();
  await migrateServiciosOverview();
  await migratePlanVeoPage();
  await migrateServicePages();

  console.log("\n✅ Migration complete!");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
