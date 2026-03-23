/**
 * Migration script: uploads all content from JSON/Markdown files to Sanity CMS.
 *
 * Usage: cd apps/web && npx tsx scripts/migrate-to-sanity.ts
 *
 * Requires SANITY_API_TOKEN env var with write access.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { createClient } from "@sanity/client";
import matter from "gray-matter";

const projectId = process.env.SANITY_PROJECT_ID || "2a24wmex";
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error(
    "Error: SANITY_API_TOKEN is required. Create one at https://www.sanity.io/manage"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-23",
  useCdn: false,
  token,
});

const contentDir = path.join(process.cwd(), "../../content");
const imagesBaseDir = path.join(process.cwd(), "public/images");

// Track uploaded image paths → Sanity asset references
const imageCache = new Map<
  string,
  { _type: "image"; asset: { _type: "reference"; _ref: string } }
>();

// --- Image Upload ---

async function uploadImage(imagePath: string) {
  // Normalize the path (remove leading slash, resolve to filesystem)
  const normalizedPath = imagePath.replace(/^\/images\//, "");
  const fullPath = path.join(imagesBaseDir, normalizedPath);

  const cached = imageCache.get(imagePath);
  if (cached) {
    return cached;
  }

  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠ Image not found: ${fullPath}`);
    return;
  }

  try {
    const imageBuffer = fs.readFileSync(fullPath);
    const filename = path.basename(fullPath);
    const asset = await client.assets.upload("image", imageBuffer, {
      filename,
    });
    const ref = {
      _type: "image" as const,
      asset: { _type: "reference" as const, _ref: asset._id },
    };
    imageCache.set(imagePath, ref);
    console.log(`  ✓ Uploaded: ${imagePath}`);
    return ref;
  } catch (err) {
    console.error(`  ✗ Failed to upload ${imagePath}:`, err);
    return;
  }
}

async function uploadImageFromPath(imagePath: string | undefined) {
  if (!imagePath) return;
  return uploadImage(imagePath);
}

// --- JSON File Loaders ---

function loadJson(name: string) {
  const filePath = path.join(contentDir, "json", name);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// --- Markdown to Portable Text ---

function markdownToPortableText(markdown: string) {
  const blocks: Record<string, unknown>[] = [];
  const lines = markdown.split("\n");
  let currentParagraph: string[] = [];

  function flushParagraph() {
    if (currentParagraph.length === 0) return;
    const text = currentParagraph.join("\n").trim();
    if (text) {
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", _key: generateKey(), text, marks: [] }],
      });
    }
    currentParagraph = [];
  }

  for (const line of lines) {
    // Headings
    const h2Match = line.match(/^## (.+)/);
    const h3Match = line.match(/^### (.+)/);
    const h4Match = line.match(/^#### (.+)/);

    if (h2Match) {
      flushParagraph();
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "h2",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: h2Match[1].trim(),
            marks: [],
          },
        ],
      });
    } else if (h3Match) {
      flushParagraph();
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "h3",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: h3Match[1].trim(),
            marks: [],
          },
        ],
      });
    } else if (h4Match) {
      flushParagraph();
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "h4",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: h4Match[1].trim(),
            marks: [],
          },
        ],
      });
    } else if (line.match(/^- /)) {
      flushParagraph();
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "normal",
        listItem: "bullet",
        level: 1,
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: line.replace(/^- /, "").trim(),
            marks: [],
          },
        ],
      });
    } else if (line.match(/^\d+\. /)) {
      flushParagraph();
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "normal",
        listItem: "number",
        level: 1,
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: line.replace(/^\d+\. /, "").trim(),
            marks: [],
          },
        ],
      });
    } else if (line.trim() === "") {
      flushParagraph();
    } else {
      currentParagraph.push(line);
    }
  }
  flushParagraph();

  return blocks;
}

let keyCounter = 0;
function generateKey() {
  keyCounter++;
  return `key${keyCounter.toString(36)}`;
}

// --- Location Migration ---

async function migrateLocations() {
  console.log("\n📍 Migrating locations...");
  const homepage = loadJson("homepage.json");
  const contacto = loadJson("contacto.json");

  // Use homepage locations as the primary source (more complete data)
  const locationDocs = [];
  for (const loc of homepage.locations.locations) {
    const image = await uploadImageFromPath(loc.image);
    const doc = {
      _type: "location",
      _id: `location-${loc.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")}`,
      name: loc.name,
      image,
      imageTitle: loc.imageTitle,
      address: loc.address,
      schedule: loc.schedule,
      phone: loc.phone,
      phoneUrl: loc.phoneUrl,
      email: loc.email,
      mapUrl: loc.mapUrl,
      contactUrl: loc.contactUrl || "/contacto",
    };

    // Merge whatsapp URL from contacto.json if available
    const contactLoc = contacto.locations?.locations?.find(
      (cl: Record<string, string>) => cl.name === loc.name
    );
    if (contactLoc?.whatsappUrl) {
      (doc as Record<string, unknown>).whatsappUrl = contactLoc.whatsappUrl;
    }

    locationDocs.push(doc);
  }

  for (const doc of locationDocs) {
    await client.createOrReplace(doc);
    console.log(`  ✓ Location: ${doc.name}`);
  }

  return locationDocs.map((d) => ({
    _type: "reference" as const,
    _ref: d._id,
  }));
}

// --- Team Member Migration ---

async function migrateTeamMembers() {
  console.log("\n👥 Migrating team members...");
  const aboutData = loadJson("quienes-somos.json");

  const memberRefs = [];
  for (const member of aboutData.team.members) {
    const image = await uploadImageFromPath(member.image);
    const id = `team-${member.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")}`;
    const doc = {
      _type: "teamMember",
      _id: id,
      name: member.name,
      role: member.role,
      image,
      details: member.details || [],
    };
    await client.createOrReplace(doc);
    console.log(`  ✓ Team member: ${member.name}`);
    memberRefs.push({ _type: "reference" as const, _ref: id });
  }
  return memberRefs;
}

// --- Homepage Migration ---

async function migrateHomepage(
  locationRefs: Array<{ _type: "reference"; _ref: string }>
) {
  console.log("\n🏠 Migrating homepage...");
  const data = loadJson("homepage.json");

  // Upload service grid images
  const servicesGridItems = [];
  for (const item of data.servicesGrid.items) {
    const image = await uploadImageFromPath(item.image);
    servicesGridItems.push({
      _type: "serviceGridItem",
      _key: generateKey(),
      title: item.title,
      description: item.description,
      url: item.url,
      image,
      alt: item.alt,
      imageTitle: item.imageTitle,
    });
  }

  // Upload partner images
  const partnerItems = [];
  for (const p of data.partners?.partners || []) {
    const image = await uploadImageFromPath(p.image);
    partnerItems.push({
      _type: "partnerItem",
      _key: generateKey(),
      name: p.name,
      image,
    });
  }

  // Upload brand images
  const brandItems = [];
  for (const b of data.brands?.brands || []) {
    const image = await uploadImageFromPath(b.image);
    brandItems.push({
      _type: "partnerItem",
      _key: generateKey(),
      name: b.name,
      image,
    });
  }

  const doc = {
    _type: "homepage",
    _id: "homepage",
    hero: data.hero,
    servicesGrid: { items: servicesGridItems },
    videoAbout: data.videoAbout,
    socialMedia: data.socialMedia,
    specialists: data.specialists,
    news: data.news,
    locations: {
      title: data.locations.title,
      items: locationRefs,
    },
    partners: { title: data.partners?.title, items: partnerItems },
    services: data.services,
    about: data.about,
    brands: {
      title: data.brands?.title,
      description: data.brands?.description,
      items: brandItems,
    },
    testimonials: {
      title: data.testimonials?.title,
      items: (data.testimonials?.testimonials || []).map(
        (t: Record<string, unknown>) => ({
          _type: "testimonialItem",
          _key: generateKey(),
          name: t.name,
          text: t.text,
          rating: t.rating,
        })
      ),
    },
    bookAppointment: {
      _type: "bookAppointmentBlock",
      title: data.bookAppointment?.title,
      description: data.bookAppointment?.description,
      buttonText: data.bookAppointment?.buttonText,
      whatsappMessage: data.bookAppointment?.whatsappMessage,
    },
    contact: data.contact,
  };

  await client.createOrReplace(doc);
  console.log("  ✓ Homepage created");
}

// --- Service Pages Migration ---

async function migrateServicePages(
  locationRefs: Array<{ _type: "reference"; _ref: string }>
) {
  console.log("\n🔧 Migrating service pages...");

  const serviceFiles: Record<string, string> = {
    "examen-visual": "examen-visual.json",
    contactologia: "contactologia.json",
    "control-de-miopia": "control-de-miopia.json",
    "vision-pediatrica": "vision-pediatrica.json",
    "terapia-visual": "terapia-visual.json",
    "vision-deportiva": "vision-deportiva.json",
    ortoqueratologia: "ortoqueratologia.json",
  };

  for (const [slug, filename] of Object.entries(serviceFiles)) {
    const data = loadJson(filename);

    // Upload hero image
    const heroImage = await uploadImageFromPath(data.heroImage);

    // Upload item images
    const itemsField =
      data.examTypes?.items ||
      data.services?.items ||
      data.conditions?.items ||
      data.types?.items ||
      data.items?.items ||
      data.lensTypes?.items ||
      data.benefits?.items ||
      [];

    const items = [];
    for (const item of itemsField) {
      const image = await uploadImageFromPath(item.image);
      items.push({
        _type: "serviceItem",
        _key: generateKey(),
        title: item.title,
        description: item.description,
        icon: item.icon,
        image,
        imageTitle: item.imageTitle,
        imageAlt: item.imageAlt,
        link: item.link,
        benefits: item.benefits,
      });
    }

    // Upload process step images
    const processSteps = [];
    if (data.process?.steps) {
      for (const step of data.process.steps) {
        const image = await uploadImageFromPath(step.image);
        processSteps.push({
          _type: "processStep",
          _key: generateKey(),
          stepNumber:
            typeof step.step === "string"
              ? Number.parseInt(step.step)
              : step.step,
          title: step.title,
          description: step.description,
          image,
        });
      }
    }

    // Get section title/subtitle for items
    const itemsSection =
      data.examTypes ||
      data.services ||
      data.conditions ||
      data.types ||
      data.items ||
      data.lensTypes ||
      data.benefits ||
      {};

    const doc = {
      _type: "servicePage",
      _id: `service-${slug}`,
      slug: { _type: "slug", current: slug },
      mainTitle: data.mainTitle,
      subtitle: data.subtitle,
      heroImage,
      intro: data.intro,
      itemsSectionTitle: itemsSection.title,
      itemsSectionSubtitle: itemsSection.subtitle,
      items,
      process: data.process
        ? {
            title: data.process.title,
            description: data.process.description,
            steps: processSteps,
          }
        : undefined,
      benefits: data.benefits?.title
        ? { title: data.benefits.title, items: data.benefits.items }
        : undefined,
      frequency: data.frequency,
      faq: data.faq
        ? {
            title: data.faq.title || "Preguntas Frecuentes",
            items: (data.faq.items || []).map((f: Record<string, string>) => ({
              _type: "faqItem",
              _key: generateKey(),
              question: f.question,
              answer: f.answer,
            })),
          }
        : undefined,
      cta: data.cta
        ? {
            _type: "bookAppointmentBlock",
            title: data.cta.title,
            description: data.cta.description,
            buttonText: data.cta.buttonText,
            whatsappMessage: data.cta.whatsappMessage,
            buttonLink: data.cta.buttonLink,
          }
        : undefined,
      locations: locationRefs,
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ Service: ${slug}`);
  }
}

// --- About Page Migration ---

async function migrateAboutPage(
  locationRefs: Array<{ _type: "reference"; _ref: string }>,
  teamRefs: Array<{ _type: "reference"; _ref: string }>
) {
  console.log("\n📖 Migrating about page...");
  const data = loadJson("quienes-somos.json");

  // Upload timeline images
  const timeline = [];
  for (const entry of data.history.timeline) {
    const image = await uploadImageFromPath(entry.image);
    timeline.push({
      _type: "timelineEntry",
      _key: generateKey(),
      year: entry.year,
      title: entry.title,
      description: entry.description,
      image,
    });
  }

  const doc = {
    _type: "aboutPage",
    _id: "aboutPage",
    mainTitle: data.mainTitle,
    history: { title: data.history.title, timeline },
    team: { title: data.team.title, members: teamRefs },
    testimonials: {
      title: data.testimonials?.title,
      moreReviewsLink: data.testimonials?.moreReviewsLink,
      items: (data.testimonials?.items || []).map(
        (t: Record<string, unknown>) => ({
          _type: "testimonialItem",
          _key: generateKey(),
          name: t.name,
          text: t.review || t.text,
          rating: t.rating,
        })
      ),
    },
    locations: locationRefs,
    socialMedia: (data.socialMedia || []).map((s: Record<string, string>) => ({
      _type: "socialMediaLink",
      _key: generateKey(),
      platform: s.icon || s.platform?.toLowerCase(),
      title: s.title,
      handle: s.handle,
      url: s.url,
    })),
  };

  await client.createOrReplace(doc);
  console.log("  ✓ About page created");
}

// --- Contact Page Migration ---

async function migrateContactPage(
  locationRefs: Array<{ _type: "reference"; _ref: string }>
) {
  console.log("\n📞 Migrating contact page...");
  const data = loadJson("contacto.json");

  const doc = {
    _type: "contactPage",
    _id: "contactPage",
    hero: {
      _type: "heroBlock",
      title: data.hero?.title,
      subtitle: data.hero?.subtitle,
      description: data.hero?.description,
    },
    contactInfo: data.contactInfo,
    locations: {
      title: data.locations?.title,
      subtitle: data.locations?.subtitle,
      items: locationRefs,
    },
    contactForm: data.contactForm,
    socialMedia: {
      title: data.socialMedia?.title,
      subtitle: data.socialMedia?.subtitle,
      links: [
        data.socialMedia?.instagram && {
          _type: "socialMediaLink",
          _key: generateKey(),
          platform: "instagram",
          title: data.socialMedia.instagram.title,
          handle: data.socialMedia.instagram.handle,
          url: data.socialMedia.instagram.url,
        },
        data.socialMedia?.facebook && {
          _type: "socialMediaLink",
          _key: generateKey(),
          platform: "facebook",
          title: data.socialMedia.facebook.title,
          handle: data.socialMedia.facebook.handle,
          url: data.socialMedia.facebook.url,
        },
        data.socialMedia?.youtube && {
          _type: "socialMediaLink",
          _key: generateKey(),
          platform: "youtube",
          title: data.socialMedia.youtube.title,
          handle: data.socialMedia.youtube.handle,
          url: data.socialMedia.youtube.url,
        },
      ].filter(Boolean),
    },
  };

  await client.createOrReplace(doc);
  console.log("  ✓ Contact page created");
}

// --- Servicios Overview Migration ---

async function migrateServiciosOverview() {
  console.log("\n📋 Migrating servicios overview...");
  const data = loadJson("servicios.json");

  const services = [];
  for (const s of data.services) {
    const image = await uploadImageFromPath(s.image);
    services.push({
      _type: "serviceGridItem",
      _key: generateKey(),
      title: s.title,
      description: s.description,
      url: s.url,
      image,
    });
  }

  const doc = {
    _type: "serviciosOverview",
    _id: "serviciosOverview",
    title: data.title,
    description: data.description,
    services,
  };

  await client.createOrReplace(doc);
  console.log("  ✓ Servicios overview created");
}

// --- Plan VEO Migration ---

async function migratePlanVeo() {
  console.log("\n📋 Migrating Plan VEO...");
  const data = loadJson("plan-veo.json");

  const heroImage = await uploadImageFromPath(data.hero?.image);

  // Upload benefit images
  const benefitItems = [];
  for (const b of data.benefits?.items || []) {
    const image = await uploadImageFromPath(b.image);
    benefitItems.push({
      _type: "serviceItem",
      _key: generateKey(),
      title: b.title,
      description: b.description,
      icon: b.icon,
      image,
      imageTitle: b.imageTitle,
      imageAlt: b.imageAlt,
    });
  }

  // Process steps
  const steps = [];
  for (const s of data.howItWorks?.steps || []) {
    steps.push({
      _type: "processStep",
      _key: generateKey(),
      stepNumber: s.number || s.step,
      title: s.title,
      description: s.description,
    });
  }

  const doc = {
    _type: "planVeoPage",
    _id: "planVeoPage",
    mainTitle: data.mainTitle,
    hero: {
      _type: "heroBlock",
      title: data.hero?.title,
      subtitle: data.hero?.subtitle,
      description: data.hero?.description,
      image: heroImage,
      imageTitle: data.hero?.imageTitle,
      imageAlt: data.hero?.imageAlt,
    },
    introduction: data.introduction,
    benefits: {
      title: data.benefits?.title,
      subtitle: data.benefits?.subtitle,
      items: benefitItems,
    },
    requirements: data.requirements,
    howItWorks: {
      title: data.howItWorks?.title,
      subtitle: data.howItWorks?.subtitle,
      steps,
    },
    faq: data.faq
      ? {
          title: data.faq.title || "Preguntas Frecuentes",
          items: (data.faq.items || []).map((f: Record<string, string>) => ({
            _type: "faqItem",
            _key: generateKey(),
            question: f.question,
            answer: f.answer,
          })),
        }
      : undefined,
    cta: data.cta
      ? {
          _type: "bookAppointmentBlock",
          title: data.cta.title,
          description: data.cta.description || data.cta.subtitle,
          buttonText: data.cta.buttonText,
          buttonLink: data.cta.buttonLink,
        }
      : undefined,
  };

  await client.createOrReplace(doc);
  console.log("  ✓ Plan VEO page created");
}

// --- Blog Migration ---

async function migrateBlogPosts() {
  console.log("\n📝 Migrating blog posts...");
  const blogDir = path.join(contentDir, "blog");
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
    const { data: frontmatter, content } = matter(raw);

    const featuredImage = await uploadImageFromPath(frontmatter.featured_image);
    const body = markdownToPortableText(content);
    const slug = frontmatter.slug || file.replace(".md", "");

    const doc = {
      _type: "blogPost",
      _id: `blog-${slug}`,
      title: frontmatter.title,
      slug: { _type: "slug", current: slug },
      date: frontmatter.date,
      excerpt: frontmatter.excerpt,
      author: frontmatter.author,
      categories: frontmatter.categories || [],
      featuredImage,
      body,
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ Blog: ${frontmatter.title}`);
  }
}

// --- Main ---

async function main() {
  console.log("🚀 Starting Sanity content migration...");
  console.log(`   Project: ${projectId}`);
  console.log(`   Dataset: ${dataset}\n`);

  // Step 1: Locations (referenced by many pages)
  const locationRefs = await migrateLocations();

  // Step 2: Team members (referenced by about page)
  const teamRefs = await migrateTeamMembers();

  // Step 3: Homepage
  await migrateHomepage(locationRefs);

  // Step 4: Service pages
  await migrateServicePages(locationRefs);

  // Step 5: About page
  await migrateAboutPage(locationRefs, teamRefs);

  // Step 6: Contact page
  await migrateContactPage(locationRefs);

  // Step 7: Servicios overview
  await migrateServiciosOverview();

  // Step 8: Plan VEO
  await migratePlanVeo();

  // Step 9: Blog posts
  await migrateBlogPosts();

  console.log("\n✅ Migration complete!");
  console.log(`   Uploaded ${imageCache.size} images`);
}

main().catch((err) => {
  console.error("\n❌ Migration failed:", err);
  process.exit(1);
});
