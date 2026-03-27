/**
 * Migration script: Populates Sanity Studio with content from the React Router app's JSON files.
 *
 * Usage:
 *   SANITY_TOKEN=<token> node scripts/migrate-content.mjs
 *
 * Requires a Sanity write token (create at https://www.sanity.io/manage/project/2a24wmex/api#tokens).
 */

import { createReadStream, existsSync, readFileSync } from "node:fs";
import { basename, extname, resolve } from "node:path";
import { createClient } from "@sanity/client";

const PROJECT_ID = "2a24wmex";
const DATASET = "production";

// Try env var first, then fall back to CLI auth token
let TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) {
  try {
    const configPath = resolve(
      process.env.HOME || process.env.USERPROFILE,
      ".config/sanity/config.json"
    );
    const config = JSON.parse(readFileSync(configPath, "utf-8"));
    TOKEN = config.authToken;
    if (TOKEN) {
      console.log(
        "Using Sanity CLI auth token from ~/.config/sanity/config.json"
      );
    }
  } catch {
    // ignore
  }
}

if (!TOKEN) {
  console.error(
    "Missing SANITY_TOKEN. Create a write token at:\nhttps://www.sanity.io/manage/project/2a24wmex/api#tokens"
  );
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2026-03-27",
  token: TOKEN,
  useCdn: false,
});

const CONTENT_DIR = resolve(
  import.meta.dirname,
  "../../opticasuarez-react-router/app/content"
);
const PUBLIC_DIR = resolve(
  import.meta.dirname,
  "../../opticasuarez-react-router/public"
);

function loadJson(name) {
  const path = resolve(CONTENT_DIR, name);
  return JSON.parse(readFileSync(path, "utf-8"));
}

// ─── Image upload helper ────────────────────────────────────
const imageCache = new Map();

async function uploadImage(localPath) {
  if (!localPath || typeof localPath !== "string") return;
  if (imageCache.has(localPath)) return imageCache.get(localPath);

  const absPath = resolve(PUBLIC_DIR, localPath.replace(/^\//, ""));
  if (!existsSync(absPath)) {
    console.warn(`  ⚠ Image not found: ${absPath}`);
    return;
  }

  const ext = extname(absPath).slice(1);
  const contentType =
    ext === "webp"
      ? "image/webp"
      : ext === "png"
        ? "image/png"
        : ext === "jpg" || ext === "jpeg"
          ? "image/jpeg"
          : "application/octet-stream";

  try {
    const asset = await client.assets.upload(
      "image",
      createReadStream(absPath),
      {
        filename: basename(absPath),
        contentType,
      }
    );
    const ref = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };
    imageCache.set(localPath, ref);
    console.log(`  ✓ Uploaded ${localPath}`);
    return ref;
  } catch (err) {
    console.warn(`  ⚠ Failed to upload ${localPath}: ${err.message}`);
    return;
  }
}

function generateKey() {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Service Page builders ──────────────────────────────────

async function buildServicePageDoc(slug, data) {
  const doc = {
    _id: `servicePage-${slug}`,
    _type: "servicePage",
    slug: { _type: "slug", current: slug },
    mainTitle: data.mainTitle,
    subtitle: data.subtitle || data.hero?.subtitle,
    heroDescription:
      data.heroDescription || data.hero?.description || undefined,
  };

  // Hero image
  const heroImg =
    data.heroImage || data.hero?.image || data.hero?.backgroundImage;
  if (heroImg) doc.heroImage = await uploadImage(heroImg);

  // Intro (short form)
  if (data.intro) {
    doc.intro = {
      title: data.intro.title,
      description: data.intro.description,
    };
  }

  // Introduction (long form with benefits)
  if (data.introduction || data.whatIs || data.info) {
    const src = data.introduction || data.whatIs || data.info;
    doc.introduction = {
      title: src.title,
      content: src.content || undefined,
      description: src.description || undefined,
      benefits: src.benefits || undefined,
    };
    // For control-de-miopia: info.features → items
    if (src.features) {
      doc.items = src.features.map((f) => ({
        _type: "serviceItem",
        _key: generateKey(),
        title: f.title,
        description: f.description,
        icon: f.icon,
      }));
      doc.itemsSectionTitle = src.title;
    }
  }

  // Items section
  const itemsSource =
    data.examTypes || data.conditions || data.services || data.types;
  if (itemsSource && !doc.items) {
    doc.itemsSectionTitle = itemsSource.title || data.itemsSectionTitle;
    doc.itemsSectionSubtitle =
      itemsSource.subtitle || data.itemsSectionSubtitle;
    const rawItems = itemsSource.items || [];
    doc.items = [];
    for (const item of rawItems) {
      const si = {
        _type: "serviceItem",
        _key: generateKey(),
        title: item.title || item.name,
        description: item.description,
        icon: item.icon,
      };
      if (item.image) si.image = await uploadImage(item.image);
      if (item.imageTitle) si.imageTitle = item.imageTitle;
      if (item.imageAlt) si.imageAlt = item.imageAlt;
      if (item.link) si.link = item.link;
      doc.items.push(si);
    }
  }

  // Process
  if (data.process) {
    const steps = (data.process.steps || []).map((s) => ({
      _type: "processStep",
      _key: generateKey(),
      stepNumber: Number(s.step || s.stepNumber || 0),
      title: s.title,
      description: s.description,
    }));
    doc.process = {
      title: data.process.title,
      description: data.process.description || data.process.subtitle,
      steps,
    };
  }

  // Benefits
  if (data.benefits) {
    doc.benefits = {
      title: data.benefits.title,
      items: data.benefits.items,
    };
  }

  // Advantages → also map to benefits if benefits not yet set
  if (data.advantages && !doc.benefits) {
    doc.benefits = {
      title: data.advantages.title,
      items: data.advantages.items?.map((a) => `${a.title}: ${a.description}`),
    };
  }

  // Frequency
  if (data.frequency) {
    doc.frequency = {
      recommendations: (data.frequency.recommendations || []).map((r) => ({
        _type: "frequencyRecommendation",
        _key: generateKey(),
        age: r.age,
        frequency: r.frequency,
        reason: r.reason,
      })),
    };
  }

  // FAQ
  const faqData = data.faq;
  if (faqData) {
    const faqItems = faqData.items || faqData.questions || [];
    doc.faq = {
      title: faqData.title,
      items: faqItems.map((q) => ({
        _type: "faqItem",
        _key: generateKey(),
        question: q.question,
        answer: q.answer,
      })),
    };
  }

  // CTA
  const ctaSource = data.cta || data.bookAppointment;
  if (ctaSource) {
    doc.cta = {
      _type: "bookAppointmentBlock",
      title: ctaSource.title,
      description: ctaSource.description,
      buttonText: ctaSource.buttonText,
      whatsappMessage: ctaSource.whatsappMessage,
      buttonLink: ctaSource.buttonLink || ctaSource.buttonUrl,
    };
  }

  // Testimonials
  if (data.testimonials) {
    doc.testimonials = {
      title: data.testimonials.title,
      items: (data.testimonials.items || []).map((t) => ({
        _type: "testimonialItem",
        _key: generateKey(),
        name: t.name,
        text: t.text || t.review,
        rating: t.rating,
      })),
    };
  }

  // Visual Therapy (vision-deportiva)
  if (data.visualTherapy) {
    const vt = data.visualTherapy;
    doc.visualTherapy = {
      title: vt.title,
      description: vt.description,
      skills: (vt.skills || []).map((s) => ({
        _key: generateKey(),
        title: s.title,
        description: s.description,
      })),
      improvements: vt.improvements
        ? { title: vt.improvements.title, items: vt.improvements.items }
        : undefined,
      ctaButton: vt.ctaButton
        ? {
            text: vt.ctaButton.text,
            url: vt.ctaButton.url,
            message: vt.ctaButton.message,
          }
        : undefined,
    };
    // Upload visual therapy images
    if (vt.images?.length) {
      doc.visualTherapy.images = [];
      for (const img of vt.images) {
        const uploaded = await uploadImage(img.src);
        doc.visualTherapy.images.push({
          _key: generateKey(),
          src: uploaded,
          alt: img.alt,
          title: img.title,
        });
      }
    }
  }

  // Age Groups (vision-pediatrica)
  if (data.ageGroups) {
    doc.ageGroups = {
      title: data.ageGroups.title,
      subtitle: data.ageGroups.subtitle,
      groups: (data.ageGroups.groups || []).map((g) => ({
        _key: generateKey(),
        title: g.title,
        description: g.description,
        recommendations: g.recommendations,
      })),
    };
  }

  // Warning Signs (vision-pediatrica)
  if (data.warningSign) {
    doc.warningSign = {
      title: data.warningSign.title,
      subtitle: data.warningSign.subtitle,
      description: data.warningSign.description,
      signs: data.warningSign.signs,
    };
  }

  // Science (control-de-miopia)
  if (data.science) {
    doc.science = {
      title: data.science.title,
      description: data.science.description,
      studies: (data.science.studies || []).map((s) => ({
        _key: generateKey(),
        title: s.title,
        description: s.description,
        percentage: s.percentage,
      })),
    };
  }

  // Candidates (ortoqueratologia)
  if (data.candidates) {
    doc.candidates = {
      title: data.candidates.title,
      description: data.candidates.description,
      disclaimer: data.candidates.disclaimer,
      items: data.candidates.items,
    };
  }

  // Why Choose Us (ortoqueratologia)
  const whyData = data["why-optica-suarez"] || data.whyChooseUs;
  if (whyData) {
    doc.whyChooseUs = {
      title: whyData.title,
      items: (whyData.items || []).map((i) => ({
        _key: generateKey(),
        title: i.title,
        description: i.description,
      })),
    };
  }

  // Treatments → map to items if not yet set (control-de-miopia)
  if (data.treatments && !doc.items?.length) {
    doc.itemsSectionTitle = data.treatments.title;
    doc.items = [];
    for (const t of data.treatments.items) {
      const si = {
        _type: "serviceItem",
        _key: generateKey(),
        title: t.title,
        description: t.description,
      };
      if (t.image) si.image = await uploadImage(t.image);
      if (t.imageAlt) si.imageAlt = t.imageAlt;
      if (t.imageTitle) si.imageTitle = t.imageTitle;
      doc.items.push(si);
    }
  }

  // Services section (vision-pediatrica, vision-deportiva)
  if (data.services && !doc.items?.length) {
    doc.itemsSectionTitle = data.services.title;
    doc.itemsSectionSubtitle = data.services.subtitle;
    doc.items = [];
    for (const s of data.services.items) {
      const si = {
        _type: "serviceItem",
        _key: generateKey(),
        title: s.title,
        description: s.description,
        icon: s.icon,
      };
      if (s.image) si.image = await uploadImage(s.image);
      if (s.imageTitle) si.imageTitle = s.imageTitle;
      if (s.imageAlt) si.imageAlt = s.imageAlt;
      if (s.link) si.link = s.link;
      doc.items.push(si);
    }
  }

  return doc;
}

// ─── Homepage builder ───────────────────────────────────────

async function buildHomepageDoc(data) {
  const doc = {
    _id: "homepage",
    _type: "homepage",
    hero: data.hero,
    videoAbout: data.videoAbout,
    socialMedia: data.socialMedia
      ? {
          instagram: {
            ...data.socialMedia.instagram,
            url: data.socialMedia.instagram?.url,
          },
          facebook: {
            ...data.socialMedia.facebook,
            url: data.socialMedia.facebook?.url,
          },
        }
      : undefined,
    specialists: data.specialists,
    news: data.news,
    bookAppointment: data.bookAppointment,
    services: data.services,
    about: data.about,
  };

  // Services grid with uploaded images
  if (data.servicesGrid?.items) {
    doc.servicesGrid = { items: [] };
    for (const item of data.servicesGrid.items) {
      const si = {
        _key: generateKey(),
        title: item.title,
        description: item.description,
        url: item.url,
        alt: item.alt,
        imageTitle: item.imageTitle,
      };
      if (item.image) si.image = await uploadImage(item.image);
      doc.servicesGrid.items.push(si);
    }
  }

  // Locations — need references, skip for now (create location docs first)
  if (data.locations) {
    doc.locations = { title: data.locations.title };
  }

  // Partners with images
  if (data.partners) {
    doc.partners = { title: data.partners.title, items: [] };
    for (const p of data.partners.partners || []) {
      const pi = { _key: generateKey(), name: p.name };
      if (p.image) pi.image = await uploadImage(p.image);
      doc.partners.items.push(pi);
    }
  }

  return doc;
}

// ─── Servicios Overview builder ─────────────────────────────

async function buildServiciosDoc(data) {
  const doc = {
    _id: "serviciosOverview",
    _type: "serviciosOverview",
    title: data.title,
    description: data.description,
    services: [],
  };

  for (const s of data.services || []) {
    const si = {
      _key: generateKey(),
      title: s.title,
      description: s.description,
      url: s.url,
    };
    if (s.image) si.image = await uploadImage(s.image);
    doc.services.push(si);
  }

  return doc;
}

// ─── Location documents ─────────────────────────────────────

async function createLocations() {
  const contacto = loadJson("contacto.json");
  const locations = contacto.locations?.locations || [];

  const docs = [];
  for (const loc of locations) {
    const doc = {
      _id: `location-${loc.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")}`,
      _type: "location",
      name: loc.name,
      address: loc.address,
      schedule: loc.schedule,
      phone: loc.phone,
      phoneUrl: loc.phoneUrl,
      whatsappUrl: loc.whatsappUrl,
      email: loc.email,
      mapUrl: loc.mapUrl,
    };
    if (loc.image) doc.image = await uploadImage(loc.image);
    docs.push(doc);
  }
  return docs;
}

// ─── Main ───────────────────────────────────────────────────

async function main() {
  console.log("🚀 Starting Sanity content migration...\n");

  // 1. Create location documents first (needed for references)
  console.log("📍 Creating location documents...");
  const locationDocs = await createLocations();
  for (const doc of locationDocs) {
    await client.createOrReplace(doc);
    console.log(`  ✓ Location: ${doc.name}`);
  }

  // 2. Create service page documents
  const servicePages = [
    { slug: "examen-visual", file: "examen-visual.json" },
    { slug: "terapia-visual", file: "terapia-visual.json" },
    { slug: "contactologia", file: "contactologia.json" },
    { slug: "control-de-miopia", file: "control-de-miopia.json" },
    { slug: "ortoqueratologia", file: "ortoqueratologia.json" },
    { slug: "vision-deportiva", file: "vision-deportiva.json" },
    { slug: "vision-pediatrica", file: "vision-pediatrica.json" },
  ];

  console.log("\n📄 Creating service page documents...");
  for (const { slug, file } of servicePages) {
    const data = loadJson(file);
    const doc = await buildServicePageDoc(slug, data);
    await client.createOrReplace(doc);
    console.log(`  ✓ Service page: ${slug}`);
  }

  // 3. Create homepage document
  console.log("\n🏠 Creating homepage document...");
  const homepageData = loadJson("homepage.json");
  const homepageDoc = await buildHomepageDoc(homepageData);
  await client.createOrReplace(homepageDoc);
  console.log("  ✓ Homepage created");

  // 4. Create servicios overview
  console.log("\n📋 Creating servicios overview...");
  const serviciosData = loadJson("servicios.json");
  const serviciosDoc = await buildServiciosDoc(serviciosData);
  await client.createOrReplace(serviciosDoc);
  console.log("  ✓ Servicios overview created");

  // 5. Create page builder pages (quienes-somos, contacto, plan-veo)
  // These are now "page" documents with sections
  console.log("\n📝 Creating page-builder pages...");

  // quienes-somos
  const quienesSomosData = loadJson("quienes-somos.json");
  const quienesSomosPage = {
    _id: "page-quienes-somos",
    _type: "page",
    title: "Quiénes Somos",
    path: { _type: "slug", current: "quienes-somos" },
    sections: [
      {
        _type: "sectionHero",
        _key: generateKey(),
        title: quienesSomosData.mainTitle,
      },
      {
        _type: "sectionTimeline",
        _key: generateKey(),
        title: quienesSomosData.history.title,
        entries: (quienesSomosData.history.timeline || []).map((e) => ({
          _key: generateKey(),
          year: e.year,
          title: e.title,
          description: e.description,
        })),
      },
      {
        _type: "sectionCards",
        _key: generateKey(),
        title: quienesSomosData.team.title,
        variant: "profile",
        items: quienesSomosData.team.members.map((m) => ({
          _type: "cardItem",
          _key: generateKey(),
          title: m.name,
          description: m.role,
        })),
      },
      {
        _type: "sectionTestimonials",
        _key: generateKey(),
        title: quienesSomosData.testimonials.title,
        moreReviewsLink: quienesSomosData.testimonials.moreReviewsLink,
        items: quienesSomosData.testimonials.items.map((t) => ({
          _key: generateKey(),
          name: t.name,
          text: t.review,
          rating: t.rating,
        })),
      },
      {
        _type: "sectionSocialMedia",
        _key: generateKey(),
        title: "Síguenos en redes sociales",
        items: quienesSomosData.socialMedia.map((sm) => ({
          _type: "socialMediaLink",
          _key: generateKey(),
          platform: sm.platform,
          title: sm.title,
          handle: sm.handle,
          url: sm.url,
        })),
      },
    ],
  };
  await client.createOrReplace(quienesSomosPage);
  console.log("  ✓ Page: quienes-somos");

  // contacto
  const contactoData = loadJson("contacto.json");
  const contactoPage = {
    _id: "page-contacto",
    _type: "page",
    title: "Contacto",
    path: { _type: "slug", current: "contacto" },
    sections: [
      {
        _type: "sectionHero",
        _key: generateKey(),
        title: contactoData.hero.title,
        subtitle: contactoData.hero.subtitle,
        description: contactoData.hero.description,
      },
      {
        _type: "sectionLocations",
        _key: generateKey(),
        title: contactoData.locations.title,
        subtitle: contactoData.locations.subtitle,
        items: locationDocs.map((loc) => ({
          _type: "cardItem",
          _key: generateKey(),
          title: loc.name,
          description: loc.address,
          link: loc.mapUrl,
          reference: { _type: "reference", _ref: loc._id },
        })),
      },
      {
        _type: "sectionSocialMedia",
        _key: generateKey(),
        title: contactoData.socialMedia.title,
        items: [
          {
            _type: "socialMediaLink",
            _key: generateKey(),
            platform: "Instagram",
            title: contactoData.socialMedia.instagram.title,
            handle: contactoData.socialMedia.instagram.handle,
            url: contactoData.socialMedia.instagram.url,
          },
          {
            _type: "socialMediaLink",
            _key: generateKey(),
            platform: "Facebook",
            title: contactoData.socialMedia.facebook.title,
            handle: contactoData.socialMedia.facebook.handle,
            url: contactoData.socialMedia.facebook.url,
          },
          {
            _type: "socialMediaLink",
            _key: generateKey(),
            platform: "YouTube",
            title: contactoData.socialMedia.youtube.title,
            handle: contactoData.socialMedia.youtube.handle,
            url: contactoData.socialMedia.youtube.url,
          },
        ],
      },
    ],
  };
  await client.createOrReplace(contactoPage);
  console.log("  ✓ Page: contacto");

  // plan-veo
  const planVeoData = loadJson("plan-veo.json");
  const planVeoPage = {
    _id: "page-planveo",
    _type: "page",
    title: "Plan VEO",
    path: { _type: "slug", current: "planveo" },
    sections: [
      {
        _type: "sectionHero",
        _key: generateKey(),
        title: planVeoData.hero.title,
        subtitle: planVeoData.hero.subtitle,
        description: planVeoData.hero.description,
      },
      {
        _type: "sectionText",
        _key: generateKey(),
        title: planVeoData.introduction.title,
        content: [
          {
            _type: "block",
            _key: generateKey(),
            children: [
              {
                _type: "span",
                _key: generateKey(),
                text: planVeoData.introduction.content,
                marks: [],
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
      },
      {
        _type: "sectionCards",
        _key: generateKey(),
        title: planVeoData.benefits.title,
        subtitle: planVeoData.benefits.subtitle,
        variant: "grid-3",
        items: planVeoData.benefits.items.map((b) => ({
          _type: "cardItem",
          _key: generateKey(),
          title: b.title,
          description: b.description,
          icon: b.icon,
        })),
      },
      {
        _type: "sectionFeatures",
        _key: generateKey(),
        title: planVeoData.requirements.title,
        subtitle: planVeoData.requirements.subtitle,
        items: planVeoData.requirements.items.map((r) => ({
          _key: generateKey(),
          title: r.title,
          description: r.description,
        })),
      },
      {
        _type: "sectionProcessSteps",
        _key: generateKey(),
        title: planVeoData.howItWorks.title,
        subtitle: planVeoData.howItWorks.subtitle,
        items: planVeoData.howItWorks.steps.map((s) => ({
          _type: "processStep",
          _key: generateKey(),
          stepNumber: Number(s.number),
          title: s.title,
          description: s.description,
        })),
      },
      {
        _type: "sectionAccordion",
        _key: generateKey(),
        title: planVeoData.faq.title,
        items: planVeoData.faq.items.map((q) => ({
          _key: generateKey(),
          question: q.question,
          answer: q.answer,
        })),
      },
      {
        _type: "sectionCTA",
        _key: generateKey(),
        title: planVeoData.cta.title,
        description: planVeoData.cta.description,
        buttonText: planVeoData.cta.buttonText,
        buttonUrl: planVeoData.cta.buttonLink,
      },
    ],
  };
  await client.createOrReplace(planVeoPage);
  console.log("  ✓ Page: planveo");

  // 6. Create team member documents
  console.log("\n👥 Creating team member documents...");
  for (const member of quienesSomosData.team.members) {
    const slug = member.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const doc = {
      _id: `teamMember-${slug}`,
      _type: "teamMember",
      name: member.name,
      role: member.role,
      details: member.details,
    };
    if (member.image) doc.image = await uploadImage(member.image);
    await client.createOrReplace(doc);
    console.log(`  ✓ Team member: ${member.name}`);
  }

  // 7. Create service documents (for the card references)
  console.log("\n🔧 Creating service documents...");
  const serviciosContent = loadJson("servicios.json");
  let order = 1;
  for (const s of serviciosContent.services) {
    const slug = s.url.replace(/^\//, "");
    const docId = `service-listing-${slug}`;
    // Check if document already exists with different type
    const existing = await client.getDocument(docId);
    if (existing && existing._type !== "service") {
      console.log(`  ⚠ Skipping ${slug} — existing doc with different _type`);
      order++;
      continue;
    }
    const doc = {
      _id: docId,
      _type: "service",
      title: s.title,
      slug: { _type: "slug", current: slug },
      description: s.description,
      order: order++,
    };
    if (s.image) doc.image = await uploadImage(s.image);
    await client.createOrReplace(doc);
    console.log(`  ✓ Service: ${s.title}`);
  }

  console.log("\n✅ Migration complete!");
  console.log(`   Images uploaded: ${imageCache.size}`);
  console.log(
    "   Note: Some page sections may need manual image assignments in the Sanity Studio."
  );
  console.log(
    "   Note: Location references in homepage need to be linked manually."
  );
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
