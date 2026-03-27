/**
 * Migration script: populates Sanity SEO fields for all pages and blog posts.
 *
 * Sources SEO content from the legacy React Router app's hardcoded metadata
 * and the seo-keywords.ts keyword library. Populates the `seo` object on
 * every Sanity document that supports it.
 *
 * Usage: cd apps/web && npx tsx scripts/migrate-seo.ts
 *
 * Requires SANITY_API_TOKEN env var with write access.
 */

import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || "2a24wmex";
const dataset = process.env.SANITY_DATASET || "production";

function resolveToken(): string {
  if (process.env.SANITY_API_TOKEN) return process.env.SANITY_API_TOKEN;
  // Fall back to Sanity CLI stored auth token
  const configPath = path.join(
    os.homedir(),
    ".config",
    "sanity",
    "config.json"
  );
  try {
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    if (config.authToken) return config.authToken;
  } catch {
    // ignore
  }
  console.error(
    "Error: SANITY_API_TOKEN is required. Set it or run `npx sanity login`."
  );
  process.exit(1);
}

const token = resolveToken();

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-23",
  useCdn: false,
  token,
});

const BASE_URL = "https://opticasuarezjaen.es";

// ─── SEO data for singleton pages ──────────────────────────────

interface SeoData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  robots: string;
}

const singletonPages: Record<string, { type: string; seo: SeoData }> = {
  homepage: {
    type: "homepage",
    seo: {
      title: "Óptica Suárez, tu óptica en Jaén. Desde 1940 mirando por ti",
      description:
        "Optometria en Jaén. Más de 80 años haciendo revisión de la vista, terapia visual, control de miopía, lentes de contacto, visión infantil, ojo vago y estrabismo.",
      keywords: [
        "Óptica",
        "Optometría",
        "Óptica en Jaén",
        "Mejor óptica de Jaén",
        "Terapia Visual",
        "Control de Miopía",
        "Ojo vago",
        "Estrabismo",
        "Ambliopía",
        "Problemas de aprendizaje",
        "Gafas de sol",
        "Gafas de marca",
        "Gafas progresivas",
        "Visión Deportiva",
        "Queratocono",
        "Centro óptico Jaén",
        "Óptica Suárez",
        "Desde 1940",
        "Tradición óptica",
        "Salud visual",
      ].join(", "),
      canonicalUrl: `${BASE_URL}/`,
      robots: "index, follow",
    },
  },
  aboutPage: {
    type: "aboutPage",
    seo: {
      title: "Quiénes somos | Óptica Suárez - Expertos en salud visual",
      description:
        "Desde 1940 cuidando de tu visión. Conoce nuestro equipo y trayectoria profesional de Óptica Suárez en Jaén.",
      keywords: [
        "Historia óptica",
        "Equipo profesional",
        "Experiencia óptica",
        "Desde 1940",
        "Tradición familiar",
        "Optometristas Jaén",
        "Óptica",
        "Optometría",
        "Óptica en Jaén",
        "Mejor óptica de Jaén",
        "Terapia Visual",
        "Control de Miopía",
        "Ojo vago",
        "Estrabismo",
        "Ambliopía",
        "Óptica Jaén",
        "Optometrista Jaén",
        "Centro óptico Jaén",
        "Óptica Suárez Jaén",
        "Óptica en el centro de Jaén",
      ].join(", "),
      canonicalUrl: `${BASE_URL}/quienes-somos`,
      robots: "index, follow",
    },
  },
  contactPage: {
    type: "contactPage",
    seo: {
      title: "Contacto - Óptica Suárez Jaén",
      description:
        "¿Tienes alguna duda o pregunta? Ponte en contacto con nosotros. Encuentra nuestra información de contacto y ubicación.",
      keywords: [
        "contacto óptica Jaén",
        "cita optometría Jaén",
        "teléfono óptica Jaén",
        "dirección Óptica Suárez",
        "ubicación óptica Jaén",
        "reservar cita óptica Jaén",
        "Óptica en Jaén",
        "Centro óptico Jaén",
        "Óptica Suárez Jaén",
      ].join(", "),
      canonicalUrl: `${BASE_URL}/contacto`,
      robots: "index, follow",
    },
  },
  planVeoPage: {
    type: "planVeoPage",
    seo: {
      title: "Plan VEO en Jaén | Óptica Suárez",
      description:
        "En Óptica Suárez Jaén tramitamos el Plan VEO para que tu hijo obtenga gafas o lentillas con hasta 100€ de ayuda del Ministerio de Sanidad.",
      keywords: [
        "Plan VEO Jaén",
        "Plan VEO óptica Jaén",
        "ayuda gafas niños Jaén",
        "ayuda lentillas infantiles Jaén",
        "gafas Plan VEO Jaén",
        "lentillas Plan VEO Jaén",
        "tramitar Plan VEO Jaén",
        "solicitar Plan VEO Jaén",
        "Plan VEO Ministerio Sanidad",
        "ayuda 100 euros gafas Jaén",
        "gafas infantiles subvencionadas Jaén",
        "óptica adherida Plan VEO Jaén",
        "Plan VEO 2025 Jaén",
        "Plan VEO 2026 Jaén",
        "gafas graduadas niños ayuda Jaén",
        "lentillas menores 16 años Jaén",
        "subvención gafas infantiles Jaén",
        "ayuda salud visual infantil Jaén",
      ].join(", "),
      canonicalUrl: `${BASE_URL}/planveo`,
      robots: "index, follow",
    },
  },
  serviciosOverview: {
    type: "serviciosOverview",
    seo: {
      title: "Servicios - Óptica Suárez",
      description:
        "¿Conoces nuestros servicios? Entra y fíjate en todo lo que Óptica Suárez puede ofrecerte: exámenes visuales, terapia visual, contactología y más.",
      keywords: [
        "Servicios ópticos",
        "Servicios optométricos",
        "Especialidades ópticas",
        "Óptica",
        "Optometría",
        "Óptica en Jaén",
        "Mejor óptica de Jaén",
        "Terapia Visual",
        "Control de Miopía",
        "Ojo vago",
        "Estrabismo",
        "Ambliopía",
        "Óptica Jaén",
        "Optometrista Jaén",
        "Centro óptico Jaén",
        "Óptica Suárez Jaén",
        "Óptica en el centro de Jaén",
        "Optometrista comportamental",
        "Especialista en visión",
        "Examen optométrico",
      ].join(", "),
      canonicalUrl: `${BASE_URL}/servicios`,
      robots: "index, follow",
    },
  },
};

// ─── SEO data for service pages (by slug) ──────────────────────

const servicePages: Record<string, SeoData> = {
  "terapia-visual": {
    title: "Terapia Visual en Jaén para Ojo Vago y Estrabismo | Óptica Suárez",
    description:
      "Mejora tu sistema visual con terapia visual en Jaén. En Óptica Suárez ayudamos a niños y adultos a mejorar ojo vago, estrabismo y habilidades visuales para un mayor confort y rendimiento.",
    keywords: [
      "terapia visual Jaén",
      "óptica especializada en terapia visual Jaén",
      "terapia visual para ojo vago Jaén",
      "terapia visual para estrabismo Jaén",
      "especialistas en terapia visual Jaén",
      "tratamiento ojo vago Jaén",
      "tratamiento estrabismo Jaén",
      "Terapia Visual",
      "Terapia visual comportamental",
      "Ojo vago",
      "Estrabismo",
      "Ambliopía",
      "Problemas de aprendizaje",
      "Rehabilitación visual",
      "Entrenamiento visual",
      "Ejercicios visuales",
      "Procesamiento visual",
      "Neuro desarrollo visual",
      "Optometrista comportamental",
    ].join(", "),
    canonicalUrl: `${BASE_URL}/terapia-visual`,
    robots: "index, follow",
  },
  "control-de-miopia": {
    title: "Control de Miopía en Jaén | Especialistas - Óptica Suárez",
    description:
      "Especialistas en control de miopía en Jaén. Ofrecemos tratamientos avanzados para frenar la progresión de la miopía en niños y adolescentes.",
    keywords: [
      "Control de Miopía",
      "Control miopía infantil",
      "Frenar miopía",
      "Lentes de control de miopía",
      "Ortoqueratología",
      "Lentillas nocturnas",
      "MiSight",
      "Miopía en niños",
      "Tratamiento miopía",
    ].join(", "),
    canonicalUrl: `${BASE_URL}/control-de-miopia`,
    robots: "index, follow",
  },
  contactologia: {
    title: "Lentes de contacto en Jaén | Óptica Suárez",
    description:
      "Óptica Suárez, tu centro de contactología en Jaén. Adaptamos tus lentillas con precisión, confort y la última tecnología óptica.",
    keywords: [
      "lentes de contacto Jaén",
      "lentillas Jaén",
      "contactología Jaén",
      "centro de contactología Jaén",
      "adaptación lentillas Jaén",
      "Contactología",
      "Lentes de contacto",
      "Lentillas",
      "Adaptación lentillas",
      "Lentillas para oposiciones",
      "Lentillas de Halloween",
      "Lentillas diarias",
      "Lentillas mensuales",
      "Lentillas tóricas",
      "Lentillas multifocales",
      "especialistas lentillas Jaén",
      "óptica lentillas Jaén",
    ].join(", "),
    canonicalUrl: `${BASE_URL}/contactologia`,
    robots: "index, follow",
  },
  "examen-visual": {
    title: "Examen Visual en Jaén | Óptica Suárez - Graduación de la vista",
    description:
      "Realiza un examen visual completo en Óptica Suárez, Jaén. Detectamos problemas como ambliopía, ojo vago o estrabismo. ¡Reserva tu cita hoy!",
    keywords: [
      "Examen visual",
      "Revisión visual",
      "Examen optométrico",
      "Graduación de la vista",
      "Medición visual",
      "Chequeo visual",
      "Detección problemas visuales",
    ].join(", "),
    canonicalUrl: `${BASE_URL}/examen-visual`,
    robots: "index, follow",
  },
  "vision-deportiva": {
    title: "Visión Deportiva en Jaén | Óptica Suárez",
    description:
      "Optimiza tu rendimiento deportivo con nuestros servicios de visión deportiva. Evaluaciones especializadas, entrenamiento visual y equipamiento para deportistas en Jaén.",
    keywords: [
      "Visión Deportiva",
      "Optometría deportiva",
      "Gafas deportivas",
      "Lentillas deportivas",
      "Rendimiento visual deportivo",
      "Protección ocular deportiva",
    ].join(", "),
    canonicalUrl: `${BASE_URL}/vision-deportiva`,
    robots: "index, follow",
  },
  "vision-pediatrica": {
    title: "Visión Pediátrica y Examen Visual Infantil en Jaén – Óptica Suárez",
    description:
      "Realizamos exámenes visuales infantiles en Jaén para detectar de forma temprana ojo vago, miopía o estrabismo. Prevención y cuidado visual desde la infancia.",
    keywords: [
      "visión pediátrica Jaén",
      "optometría infantil Jaén",
      "revisión visual infantil en Jaén",
      "examen visual niños Jaén",
      "cuidado de la vista infantil Jaén",
      "detección precoz ambliopía Jaén",
      "ojo vago Jaén",
      "Visión infantil",
      "Optometría pediátrica",
      "Desarrollo visual infantil",
    ].join(", "),
    canonicalUrl: `${BASE_URL}/vision-pediatrica`,
    robots: "index, follow",
  },
  ortoqueratologia: {
    title: "Ortoqueratología en Jaén | Óptica Suárez",
    description:
      "En Óptica Suárez somos especialistas en ortoqueratología, para frenar la miopía y mejorar la visión sin necesidad de gafas. Más de 80 años de experiencia nos avalan ofreciendo Orto-K en Jaén.",
    keywords: [
      "ortoqueratología Jaén",
      "Orto-K Jaén",
      "lentillas nocturnas Jaén",
      "frenar miopía Jaén",
      "control miopía nocturno Jaén",
      "lentes de contacto nocturnas Jaén",
      "corrección visual sin gafas Jaén",
      "Ortoqueratología",
      "Orto-K",
      "Lentillas nocturnas",
      "Control de miopía",
      "Moldeo corneal",
      "Visión sin gafas",
      "Lentes de contacto especiales",
      "Corrección visual temporal",
      "Topografía corneal",
      "Adaptación personalizada",
      "Frenar progresión miopía",
      "Tratamiento reversible",
    ].join(", "),
    canonicalUrl: `${BASE_URL}/ortoqueratologia`,
    robots: "index, follow",
  },
};

// ─── Jaén geolocated terms for blog posts ──────────────────────

const blogGeoKeywords = [
  "óptica en Jaén",
  "salud visual Jaén",
  "optometría Jaén",
];

// ─── Migration functions ───────────────────────────────────────

async function patchSingletonPage(
  docType: string,
  seo: SeoData
): Promise<void> {
  const doc = await client.fetch("*[_type == $type][0]{ _id }", {
    type: docType,
  });
  if (!doc) {
    console.log(`  ⚠️  No ${docType} document found — skipping`);
    return;
  }
  await client.patch(doc._id).set({ seo }).commit();
  console.log(`  ✅ ${docType} (${doc._id})`);
}

async function patchServicePages(): Promise<void> {
  for (const [slug, seo] of Object.entries(servicePages)) {
    const doc = await client.fetch(
      `*[_type == "servicePage" && slug.current == $slug][0]{ _id }`,
      { slug }
    );
    if (!doc) {
      console.log(`  ⚠️  No servicePage with slug "${slug}" — skipping`);
      continue;
    }
    await client.patch(doc._id).set({ seo }).commit();
    console.log(`  ✅ servicePage "${slug}" (${doc._id})`);
  }
}

async function patchBlogPosts(): Promise<void> {
  const posts = await client.fetch(
    `*[_type == "blogPost"]{ _id, title, excerpt, categories, "slug": slug.current }`
  );
  if (!posts || posts.length === 0) {
    console.log("  ⚠️  No blog posts found — skipping");
    return;
  }

  for (const post of posts) {
    const categories: string[] = post.categories || [];
    const keywords = [...categories, ...blogGeoKeywords].join(", ");

    const seo: SeoData = {
      title: `${post.title} - Óptica Suárez`,
      description:
        post.excerpt || `Artículo del blog de Óptica Suárez: ${post.title}`,
      keywords,
      canonicalUrl: `${BASE_URL}/blog/${post.slug}`,
      robots: "index, follow",
    };

    await client.patch(post._id).set({ seo }).commit();
    console.log(`  ✅ blogPost "${post.slug}" (${post._id})`);
  }
}

// ─── Main ──────────────────────────────────────────────────────

async function main() {
  console.log("🔄 Populating Sanity SEO fields...\n");

  console.log("── Singleton pages ──");
  for (const [_name, { type, seo }] of Object.entries(singletonPages)) {
    await patchSingletonPage(type, seo);
  }

  console.log("\n── Service pages ──");
  await patchServicePages();

  console.log("\n── Blog posts ──");
  await patchBlogPosts();

  console.log("\n✅ SEO migration complete.");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
