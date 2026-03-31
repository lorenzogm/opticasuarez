/**
 * Migration script: Creates `page` documents in Sanity for all 8 service pages
 * using the page builder architecture (sections[]).
 *
 * Usage:
 *   SANITY_TOKEN=<token> node scripts/migrate-service-pages.mjs
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

const CONTENT_DIR = resolve(import.meta.dirname, "../../../content/json");
const IMAGES_DIR = resolve(import.meta.dirname, "../../../content/images");

function loadJson(name) {
  const path = resolve(CONTENT_DIR, name);
  return JSON.parse(readFileSync(path, "utf-8"));
}

// ─── Image upload helper ────────────────────────────────────
const imageCache = new Map();

async function uploadImage(localPath) {
  if (!localPath || typeof localPath !== "string") return;
  if (imageCache.has(localPath)) return imageCache.get(localPath);

  // Images may be referenced with /images/ prefix (from JSON) or content/images/ path
  const cleanPath = localPath.replace(/^\/images\//, "");
  const absPath = resolve(IMAGES_DIR, cleanPath);
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

let keyCounter = 0;
function generateKey() {
  keyCounter++;
  return `s${keyCounter.toString(36).padStart(4, "0")}`;
}

// ─── Section builders ───────────────────────────────────────

function sectionHero({ title, subtitle, description, image, imageAlt }) {
  return {
    _type: "sectionHero",
    _key: generateKey(),
    title,
    subtitle,
    description,
    ...(image ? { image } : {}),
    ...(imageAlt ? { imageAlt } : {}),
  };
}

function sectionText({ title, subtitle, description, content }) {
  const text = content || description;
  return {
    _type: "sectionText",
    _key: generateKey(),
    title,
    subtitle,
    description,
    content: text
      ? [
          {
            _type: "block",
            _key: generateKey(),
            children: [
              { _type: "span", _key: generateKey(), text, marks: [] },
            ],
            markDefs: [],
            style: "normal",
          },
        ]
      : undefined,
  };
}

function sectionCards({ title, subtitle, description, variant, items }) {
  return {
    _type: "sectionCards",
    _key: generateKey(),
    title,
    subtitle,
    description,
    ...(variant ? { variant } : {}),
    items: (items || []).map((item) => ({
      _key: generateKey(),
      _type: "cardItem",
      title: item.title || item.name,
      description: item.description,
      ...(item.icon ? { icon: item.icon } : {}),
      ...(item.image ? { image: item.image } : {}),
      ...(item.link ? { link: item.link } : {}),
    })),
  };
}

function sectionProcessSteps({ title, subtitle, description, steps }) {
  return {
    _type: "sectionProcessSteps",
    _key: generateKey(),
    title,
    subtitle: subtitle || description,
    items: (steps || []).map((step, i) => ({
      _key: generateKey(),
      _type: "processStep",
      stepNumber: Number(step.step || step.stepNumber || i + 1),
      title: step.title,
      description: step.description,
      ...(step.image ? { image: step.image } : {}),
    })),
  };
}

function sectionList({ title, subtitle, description, variant, items }) {
  return {
    _type: "sectionList",
    _key: generateKey(),
    title,
    subtitle,
    description,
    variant: variant || "bullet",
    items: items || [],
  };
}

function sectionStats({ title, subtitle, description, items }) {
  return {
    _type: "sectionStats",
    _key: generateKey(),
    title,
    subtitle,
    description,
    items: (items || []).map((item) => ({
      _key: generateKey(),
      title: item.title,
      description: item.description,
      value: item.value || item.percentage,
    })),
  };
}

function sectionAccordion({ title, subtitle, items }) {
  return {
    _type: "sectionAccordion",
    _key: generateKey(),
    title,
    subtitle,
    items: (items || []).map((item) => ({
      _key: generateKey(),
      _type: "accordionItem",
      title: item.question || item.title,
      content: item.answer || item.content,
    })),
  };
}

function sectionTestimonials({ title, items }) {
  return {
    _type: "sectionTestimonials",
    _key: generateKey(),
    title,
    items: (items || []).map((item) => ({
      _key: generateKey(),
      _type: "testimonialItem",
      name: item.name,
      text: item.text || item.review,
      rating: item.rating,
    })),
  };
}

function sectionCTA({ title, subtitle, description, buttonText, buttonUrl }) {
  return {
    _type: "sectionCTA",
    _key: generateKey(),
    title,
    subtitle,
    description,
    buttonText,
    buttonUrl,
  };
}

// ─── Page builders (one per service) ────────────────────────

async function buildExamenVisual() {
  const data = loadJson("examen-visual.json");
  const heroImage = await uploadImage(data.heroImage);

  const sections = [
    sectionHero({
      title: data.mainTitle,
      subtitle: data.subtitle,
      image: heroImage,
      imageAlt: "Examen visual en Jaén",
    }),
    sectionText({
      title: data.intro.title,
      content: data.intro.description,
    }),
    sectionCards({
      title: data.examTypes.title,
      items: data.examTypes.items,
    }),
    sectionProcessSteps({
      title: data.process.title,
      description: data.process.description,
      steps: data.process.steps,
    }),
    sectionList({
      title: data.benefits.title,
      variant: "checkmark",
      items: data.benefits.items,
    }),
    sectionCards({
      title: data.frequency.title,
      items: data.frequency.recommendations.map((r) => ({
        title: r.age,
        description: `${r.frequency} — ${r.reason}`,
      })),
    }),
    sectionAccordion({
      title: data.faq.title,
      items: data.faq.items,
    }),
    sectionCTA({
      title: data.cta.title,
      description: data.cta.description,
      buttonText: data.cta.buttonText,
      buttonUrl: `https://api.whatsapp.com/send?phone=34953093062&text=${encodeURIComponent(data.cta.whatsappMessage)}`,
    }),
  ];

  return {
    _id: "page-servicios-examen-visual",
    _type: "page",
    title: "Examen Visual",
    path: { _type: "slug", current: "/servicios/examen-visual" },
    sections,
    seo: {
      _type: "seo",
      title: "Examen Visual en Jaén | Óptica Suárez",
      description:
        "Examen visual completo en Jaén. Evaluación integral del sistema visual con tecnología avanzada. Más de 80 años de experiencia.",
      keywords:
        "examen visual jaén, revisión vista jaén, optometrista jaén, óptica suárez",
    },
  };
}

async function buildTerapiaVisual() {
  const data = loadJson("terapia-visual.json");
  const heroImage = await uploadImage(data.hero.backgroundImage);

  const sections = [
    sectionHero({
      title: data.hero.title,
      subtitle: data.hero.subtitle,
      description: data.hero.description,
      image: heroImage,
      imageAlt: "Terapia visual en Jaén",
    }),
    sectionText({
      title: data.whatIs.title,
      content: data.whatIs.description,
    }),
    sectionList({
      title: "Beneficios de la terapia visual",
      variant: "checkmark",
      items: data.whatIs.benefits,
    }),
    sectionCards({
      title: data.conditions.title,
      subtitle: data.conditions.subtitle,
      items: data.conditions.items,
    }),
    sectionProcessSteps({
      title: data.process.title,
      subtitle: data.process.subtitle,
      steps: data.process.steps,
    }),
    sectionText({
      title: data.specialists.title,
      subtitle: data.specialists.subtitle,
      content: data.specialists.description,
    }),
    sectionTestimonials({
      title: data.testimonials.title,
      items: data.testimonials.items,
    }),
    sectionAccordion({
      title: data.faq.title,
      items: data.faq.items,
    }),
    sectionCTA({
      title: data.cta.title,
      description: data.cta.description,
      buttonText: data.cta.buttonText,
      buttonUrl: data.cta.buttonLink,
    }),
  ];

  return {
    _id: "page-servicios-terapia-visual",
    _type: "page",
    title: "Terapia Visual",
    path: { _type: "slug", current: "/servicios/terapia-visual" },
    sections,
    seo: {
      _type: "seo",
      title: "Terapia Visual en Jaén | Óptica Suárez",
      description:
        "Terapia visual personalizada en Jaén. Tratamos ojo vago, estrabismo, fatiga visual y problemas de aprendizaje. Especialistas en visión.",
      keywords: "terapia visual jaén, ojo vago, estrabismo, optometrista jaén",
    },
  };
}

async function buildContactologia() {
  const data = loadJson("contactologia.json");

  const sections = [
    sectionHero({
      title: data.mainTitle,
      subtitle: data.intro.title,
      description: data.intro.description,
    }),
    sectionCards({
      title: data.services.title,
      items: data.services.items,
    }),
    sectionCards({
      title: data.types.title,
      items: data.types.items.map((t) => ({
        title: t.name,
        description: t.description,
      })),
    }),
    sectionCards({
      title: data.advantages.title,
      items: data.advantages.items,
    }),
    sectionProcessSteps({
      title: data.process.title,
      steps: data.process.steps,
    }),
    sectionAccordion({
      title: data.faq.title,
      items: data.faq.questions,
    }),
    sectionCTA({
      title: data.cta.title,
      description: data.cta.description,
      buttonText: data.cta.buttonText,
      buttonUrl: data.cta.buttonLink,
    }),
  ];

  return {
    _id: "page-servicios-contactologia",
    _type: "page",
    title: "Contactología",
    path: { _type: "slug", current: "/servicios/contactologia" },
    sections,
    seo: {
      _type: "seo",
      title: "Contactología en Jaén | Lentes de Contacto | Óptica Suárez",
      description:
        "Especialistas en lentes de contacto en Jaén. Adaptación personalizada de lentillas diarias, mensuales, multifocales y tóricas.",
      keywords:
        "contactología jaén, lentes de contacto jaén, lentillas jaén, óptica suárez",
    },
  };
}

async function buildControlDeMiopia() {
  const data = loadJson("control-de-miopia.json");
  const heroImage = await uploadImage(data.hero.image);

  // Upload treatment images
  const treatmentItems = [];
  for (const t of data.treatments.items) {
    const img = await uploadImage(t.image);
    treatmentItems.push({
      title: t.title,
      description: t.description,
      image: img,
    });
  }

  const sections = [
    sectionHero({
      title: data.hero.title,
      subtitle: data.hero.subtitle,
      description: data.hero.description,
      image: heroImage,
      imageAlt: data.hero.imageAlt,
    }),
    sectionText({
      title: data.info.title,
      content: data.info.description,
    }),
    sectionCards({
      title: "Características del control de miopía",
      items: data.info.features,
    }),
    sectionCards({
      title: data.treatments.title,
      items: treatmentItems,
    }),
    sectionStats({
      title: data.science.title,
      description: data.science.description,
      items: data.science.studies,
    }),
    sectionAccordion({
      title: data.faq.title,
      items: data.faq.items,
    }),
    sectionCTA({
      title: data.bookAppointment.title,
      description: data.bookAppointment.description,
      buttonText: data.bookAppointment.buttonText,
      buttonUrl: `https://api.whatsapp.com/send?phone=34953093062&text=${encodeURIComponent(data.bookAppointment.whatsappMessage)}`,
    }),
  ];

  return {
    _id: "page-servicios-control-de-miopia",
    _type: "page",
    title: "Control de Miopía",
    path: { _type: "slug", current: "/servicios/control-de-miopia" },
    sections,
    seo: {
      _type: "seo",
      title: "Control de Miopía en Jaén | Óptica Suárez",
      description:
        "Control especializado de la miopía infantil en Jaén. Lentes de contacto, ortoqueratología y terapia visual para frenar la progresión.",
      keywords:
        "control miopía jaén, miopía infantil, optometrista jaén, ortoqueratología",
    },
  };
}

async function buildOrtoqueratologia() {
  const data = loadJson("ortoqueratologia.json");
  const heroImage = await uploadImage(data.hero.image);

  // Upload process step images
  const processSteps = [];
  for (const step of data.process.steps) {
    const img = step.image ? await uploadImage(step.image) : undefined;
    processSteps.push({ ...step, image: img });
  }

  const sections = [
    sectionHero({
      title: data.hero.title,
      subtitle: data.hero.subtitle,
      description: data.hero.description,
      image: heroImage,
      imageAlt: "Ortoqueratología en Jaén",
    }),
    sectionText({
      title: data.intro.title,
      content: data.intro.description,
    }),
    sectionCards({
      title: data.benefits.title,
      items: data.benefits.items,
    }),
    sectionProcessSteps({
      title: data.process.title,
      steps: processSteps,
    }),
    sectionList({
      title: data.candidates.title,
      description: data.candidates.description,
      variant: "checkmark",
      items: data.candidates.items,
    }),
    sectionCards({
      title: data["why-optica-suarez"].title,
      items: data["why-optica-suarez"].items,
    }),
    sectionAccordion({
      title: data.faq.title,
      items: data.faq.items,
    }),
    sectionCTA({
      title: data.cta.title,
      description: data.cta.description,
      buttonText: data.cta.buttonText,
      buttonUrl: data.cta.buttonLink,
    }),
  ];

  return {
    _id: "page-servicios-ortoqueratologia",
    _type: "page",
    title: "Ortoqueratología",
    path: { _type: "slug", current: "/servicios/ortoqueratologia" },
    sections,
    seo: {
      _type: "seo",
      title: "Ortoqueratología en Jaén | Orto-K | Óptica Suárez",
      description:
        "Ortoqueratología en Jaén. Corrección visual sin cirugía mientras duermes. Especialistas en Orto-K con más de 80 años de experiencia.",
      keywords:
        "ortoqueratología jaén, orto-k jaén, lentes nocturnas, óptica suárez",
    },
  };
}

async function buildVisionDeportiva() {
  const data = loadJson("vision-deportiva.json");
  const heroImage = await uploadImage(data.hero.image);

  const sections = [
    sectionHero({
      title: data.hero.title,
      subtitle: data.hero.subtitle,
      description: data.hero.description,
      image: heroImage,
      imageAlt: "Visión deportiva en Jaén",
    }),
    sectionText({
      title: data.introduction.title,
      content: data.introduction.description,
    }),
    sectionList({
      title: "Beneficios de la visión deportiva",
      variant: "checkmark",
      items: data.introduction.benefits,
    }),
    sectionCards({
      title: data.services.title,
      items: data.services.items,
    }),
    sectionCards({
      title: data.visualTherapy.title,
      subtitle: data.visualTherapy.description,
      items: data.visualTherapy.skills,
    }),
    sectionList({
      title: data.visualTherapy.improvements.title,
      variant: "checkmark",
      items: data.visualTherapy.improvements.items,
    }),
    sectionTestimonials({
      title: data.testimonials.title,
      items: data.testimonials.items,
    }),
    sectionAccordion({
      title: data.faq.title,
      items: data.faq.items,
    }),
    sectionCTA({
      title: data.cta.title,
      description: data.cta.description,
      buttonText: data.cta.buttonText,
      buttonUrl: data.cta.buttonUrl,
    }),
  ];

  return {
    _id: "page-servicios-vision-deportiva",
    _type: "page",
    title: "Visión Deportiva",
    path: { _type: "slug", current: "/servicios/vision-deportiva" },
    sections,
    seo: {
      _type: "seo",
      title: "Visión Deportiva en Jaén | Óptica Suárez",
      description:
        "Visión deportiva en Jaén. Evaluación y entrenamiento visual para deportistas. Mejora tu rendimiento con nuestros especialistas.",
      keywords:
        "visión deportiva jaén, entrenamiento visual, optometrista deportivo, óptica suárez",
    },
  };
}

async function buildVisionPediatrica() {
  const data = loadJson("vision-pediatrica.json");
  const heroImage = await uploadImage(data.hero.image);

  // Upload service card images
  const serviceItems = [];
  for (const s of data.services.items) {
    const img = s.image ? await uploadImage(s.image) : undefined;
    serviceItems.push({
      title: s.title,
      description: s.description,
      icon: s.icon,
      image: img,
      link: s.link,
    });
  }

  const sections = [
    sectionHero({
      title: data.hero.title,
      subtitle: data.hero.subtitle,
      description: data.hero.description,
      image: heroImage,
      imageAlt: data.hero.imageAlt,
    }),
    sectionText({
      title: data.introduction.title,
      content: data.introduction.content,
    }),
    sectionCards({
      title: data.services.title,
      subtitle: data.services.subtitle,
      items: serviceItems,
    }),
    sectionCards({
      title: data.ageGroups.title,
      subtitle: data.ageGroups.subtitle,
      items: data.ageGroups.groups.map((g) => ({
        title: g.title,
        description: `${g.description}\n${g.recommendations.map((r) => `• ${r}`).join("\n")}`,
      })),
    }),
    sectionList({
      title: data.warningSign.title,
      subtitle: data.warningSign.subtitle,
      description: data.warningSign.description,
      variant: "warning",
      items: data.warningSign.signs,
    }),
    sectionTestimonials({
      title: data.testimonials.title,
      items: data.testimonials.items,
    }),
    sectionAccordion({
      title: data.faq.title,
      items: data.faq.items,
    }),
    sectionCTA({
      title: data.cta.title,
      description: data.cta.description,
      buttonText: data.cta.buttonText,
      buttonUrl: data.cta.buttonLink,
    }),
  ];

  return {
    _id: "page-servicios-vision-pediatrica",
    _type: "page",
    title: "Visión Pediátrica",
    path: { _type: "slug", current: "/servicios/vision-pediatrica" },
    sections,
    seo: {
      _type: "seo",
      title: "Visión Pediátrica en Jaén | Óptica Suárez",
      description:
        "Especialistas en visión pediátrica en Jaén. Exámenes visuales infantiles, detección temprana, terapia visual y control de miopía.",
      keywords:
        "visión pediátrica jaén, optometrista infantil, examen visual niños, óptica suárez",
    },
  };
}

async function buildServiciosOverviewPage() {
  const data = loadJson("servicios.json");

  // Upload service grid images
  const serviceItems = [];
  for (const s of data.services) {
    const img = s.image ? await uploadImage(s.image) : undefined;
    serviceItems.push({
      title: s.title,
      description: s.description,
      image: img,
      link: `/servicios${s.url}`,
    });
  }

  const sections = [
    sectionHero({
      title: data.title,
      description: data.description,
    }),
    sectionCards({
      title: "Nuestros Servicios",
      items: serviceItems,
    }),
  ];

  return {
    _id: "page-servicios",
    _type: "page",
    title: "Servicios",
    path: { _type: "slug", current: "/servicios" },
    sections,
    seo: {
      _type: "seo",
      title: "Servicios - Óptica Suárez Jaén",
      description:
        "Descubre los servicios especializados de salud visual en Óptica Suárez Jaén. Exámenes visuales, terapia visual, contactología y más.",
      keywords:
        "óptica jaén servicios, optometrista jaén, examen visual, terapia visual, contactología",
    },
  };
}

// ─── Main ───────────────────────────────────────────────────

async function main() {
  console.log("🔄 Migrating service pages to page builder...\n");

  const builders = [
    { name: "/servicios", fn: buildServiciosOverviewPage },
    { name: "/servicios/examen-visual", fn: buildExamenVisual },
    { name: "/servicios/terapia-visual", fn: buildTerapiaVisual },
    { name: "/servicios/contactologia", fn: buildContactologia },
    { name: "/servicios/control-de-miopia", fn: buildControlDeMiopia },
    { name: "/servicios/ortoqueratologia", fn: buildOrtoqueratologia },
    { name: "/servicios/vision-deportiva", fn: buildVisionDeportiva },
    { name: "/servicios/vision-pediatrica", fn: buildVisionPediatrica },
  ];

  for (const { name, fn } of builders) {
    console.log(`\n📄 Building ${name}...`);
    try {
      const doc = await fn();
      await client.createOrReplace(doc);
      console.log(
        `  ✅ Created page "${doc.title}" at ${doc.path.current} (${doc.sections.length} sections)`
      );
    } catch (err) {
      console.error(`  ❌ Failed to create ${name}: ${err.message}`);
    }
  }

  console.log(`\n✅ Migration complete. ${imageCache.size} images uploaded.\n`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
