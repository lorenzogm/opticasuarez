/**
 * Create blog post: ¿Qué es el Glaucoma?
 *
 * Usage: cd apps/web && npx tsx scripts/create-blog-glaucoma.ts
 *
 * Downloads images from provided URLs, uploads to Sanity, creates blog post.
 * Requires Sanity write access (SANITY_API_TOKEN env var or Sanity CLI login).
 */

import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || "2a24wmex";
const dataset = process.env.SANITY_DATASET || "production";

function resolveToken(): string {
  if (process.env.SANITY_API_TOKEN) return process.env.SANITY_API_TOKEN;
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

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-23",
  useCdn: false,
  token: resolveToken(),
});

// ─── Image sources ────────────────────────────────────────────

const imageUrls = [
  {
    url: "https://www.westtexaseye.com/wp-content/uploads/sites/9/2024/12/iStock-2158149461.jpg",
    filename: "glaucoma-ojo.jpg",
    alt: "Examen ocular para detección de glaucoma en Jaén",
  },
  {
    url: "https://excimerlaserpalma.com/wp-content/uploads/2018/04/mervio-o%CC%81ptico.jpg",
    filename: "nervio-optico.jpg",
    alt: "Imagen del nervio óptico afectado por glaucoma",
  },
  {
    url: "https://grupormultimedio.com/wp-content/uploads/2024/04/glaucoma.jpg",
    filename: "glaucoma-presion.jpg",
    alt: "Medición de presión intraocular para prevenir glaucoma",
  },
  {
    url: "https://www.tucanaldesalud.com/es/canalciencia/articulos/tipos-glaucoma-evitar-perdida-vista.ficheros/2499705-tipos-glaucoma.jpg",
    filename: "tipos-glaucoma.jpg",
    alt: "Tipos de glaucoma y cómo evitar la pérdida de visión",
  },
];

// ─── Helper to generate unique keys ──────────────────────────

let keyCounter = 0;
function key(): string {
  keyCounter++;
  return `k${keyCounter.toString().padStart(4, "0")}`;
}

// ─── Portable Text helpers ───────────────────────────────────

function heading(
  text: string,
  level: "h2" | "h3" = "h2"
): Record<string, unknown> {
  return {
    _type: "block",
    _key: key(),
    style: level,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

function paragraph(
  ...parts: Array<
    | string
    | { text: string; marks: string[]; markDefs?: Record<string, unknown>[] }
  >
): Record<string, unknown> {
  const markDefs: Record<string, unknown>[] = [];
  const children = parts.map((part) => {
    if (typeof part === "string") {
      return { _type: "span", _key: key(), text: part, marks: [] };
    }
    if (part.markDefs) {
      markDefs.push(...part.markDefs);
    }
    return { _type: "span", _key: key(), text: part.text, marks: part.marks };
  });
  return { _type: "block", _key: key(), style: "normal", markDefs, children };
}

function bold(text: string): { text: string; marks: string[] } {
  return { text, marks: ["strong"] };
}

function link(
  text: string,
  href: string
): { text: string; marks: string[]; markDefs: Record<string, unknown>[] } {
  const linkKey = key();
  return {
    text,
    marks: [linkKey],
    markDefs: [{ _type: "link", _key: linkKey, href }],
  };
}

function inlineImage(assetRef: string, alt: string): Record<string, unknown> {
  return {
    _type: "image",
    _key: key(),
    asset: { _type: "reference", _ref: assetRef },
    alt,
  };
}

function bulletList(items: string[]): Record<string, unknown>[] {
  return items.map((text) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  }));
}

// ─── Main ────────────────────────────────────────────────────

async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Failed to download ${url}: ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  console.log("📷 Downloading and uploading images...");

  const uploadedImages: Record<string, string> = {};

  for (const img of imageUrls) {
    try {
      console.log(`  ⬇️  ${img.filename}...`);
      const buffer = await downloadImage(img.url);
      console.log("  ⬆️  Uploading to Sanity...");
      const asset = await client.assets.upload("image", buffer, {
        filename: img.filename,
      });
      uploadedImages[img.filename] = asset._id;
      console.log(`  ✅ ${img.filename} → ${asset._id}`);
    } catch (err) {
      console.error(`  ❌ Failed to process ${img.filename}:`, err);
    }
  }

  console.log("\n📝 Creating blog post...");

  const slug = "que-es-el-glaucoma";
  const featuredImageRef =
    uploadedImages["glaucoma-ojo.jpg"] || Object.values(uploadedImages)[0];

  const body: Record<string, unknown>[] = [
    heading("¿Qué es el glaucoma?"),
    paragraph(
      "El glaucoma es un grupo de enfermedades oculares que dañan progresivamente el ",
      bold("nervio óptico"),
      ', la estructura encargada de transmitir las imágenes desde el ojo hasta el cerebro. Se le conoce como el "ladrón silencioso de la visión" porque, en la mayoría de los casos, avanza sin síntomas hasta que la pérdida de visión ya es significativa e irreversible.'
    ),
    paragraph(
      "En Óptica Suárez en Jaén, nuestros ópticos-optometristas desempeñan un papel fundamental en la ",
      bold("detección precoz del glaucoma"),
      " a través de revisiones visuales completas. La medición de la ",
      bold("presión intraocular (PIO)"),
      ", la evaluación del fondo de ojo y el análisis del campo visual son pruebas clave que realizamos en nuestro ",
      link("examen visual completo", "/examen-visual"),
      " para identificar signos tempranos de esta enfermedad."
    ),

    // Image 1
    ...(uploadedImages["glaucoma-ojo.jpg"]
      ? [
          inlineImage(
            uploadedImages["glaucoma-ojo.jpg"],
            "Examen ocular para detección de glaucoma en Jaén"
          ),
        ]
      : []),

    heading("¿Por qué es importante la detección temprana?"),
    paragraph(
      "El glaucoma es la ",
      bold("segunda causa de ceguera en el mundo"),
      " según la Organización Mundial de la Salud. En España, se estima que más de un millón de personas lo padecen, y cerca de la mitad no lo sabe. La clave está en la prevención: cuando se detecta a tiempo, los tratamientos actuales pueden frenar o ralentizar su progresión."
    ),
    paragraph(
      "En nuestras ópticas de Jaén (Centro y Bulevar), recomendamos ",
      bold("revisiones visuales periódicas a partir de los 40 años"),
      ", que es cuando el riesgo de glaucoma aumenta significativamente. Si tienes antecedentes familiares de glaucoma, miopía elevada o diabetes, las revisiones deberían empezar incluso antes."
    ),

    heading("Tipos de glaucoma"),

    // Image 2
    ...(uploadedImages["tipos-glaucoma.jpg"]
      ? [
          inlineImage(
            uploadedImages["tipos-glaucoma.jpg"],
            "Tipos de glaucoma y cómo evitar la pérdida de visión"
          ),
        ]
      : []),

    heading("Glaucoma de ángulo abierto", "h3"),
    paragraph(
      "Es el tipo más común y representa aproximadamente el 90% de los casos. Se produce cuando el sistema de drenaje del humor acuoso se obstruye gradualmente, provocando un aumento lento de la presión intraocular. ",
      bold("No produce síntomas en las fases iniciales"),
      ", lo que hace imprescindible las revisiones preventivas."
    ),

    heading("Glaucoma de ángulo cerrado", "h3"),
    paragraph(
      "Ocurre cuando el iris se desplaza hacia delante y bloquea el ángulo de drenaje del ojo de forma repentina. Es una ",
      bold("urgencia médica"),
      " que provoca dolor intenso, enrojecimiento ocular, visión borrosa y halos alrededor de las luces. Requiere atención inmediata."
    ),

    heading("Glaucoma de tensión normal", "h3"),
    paragraph(
      "En este caso, el nervio óptico se daña incluso cuando la presión intraocular está dentro de valores normales. Se cree que está relacionado con una ",
      bold("irrigación sanguínea deficiente"),
      " en el nervio óptico. Su detección requiere pruebas específicas de campo visual y evaluación del nervio."
    ),

    heading("Glaucoma congénito", "h3"),
    paragraph(
      "Presente desde el nacimiento, se produce por un desarrollo incompleto del sistema de drenaje del ojo. Los síntomas en bebés incluyen lagrimeo excesivo, sensibilidad a la luz y un aspecto opaco o agrandado de los ojos. Nuestro servicio de ",
      link("visión pediátrica", "/vision-pediatrica"),
      " incluye pruebas adaptadas a los más pequeños."
    ),

    heading("El papel del óptico-optometrista en la prevención"),

    // Image 3
    ...(uploadedImages["glaucoma-presion.jpg"]
      ? [
          inlineImage(
            uploadedImages["glaucoma-presion.jpg"],
            "Medición de presión intraocular para prevenir glaucoma"
          ),
        ]
      : []),

    paragraph(
      "El óptico-optometrista es el profesional sanitario de atención primaria visual. En Óptica Suárez, nuestro equipo de profesionales en Jaén realiza las siguientes pruebas relacionadas con la detección del glaucoma:"
    ),
    ...bulletList([
      "Tonometría: medición de la presión intraocular (PIO)",
      "Oftalmoscopia: evaluación del nervio óptico y fondo de ojo",
      "Campimetría: análisis del campo visual para detectar pérdidas periféricas",
      "Paquimetría: medición del grosor corneal, que influye en las lecturas de PIO",
      "Gonioscopía: evaluación del ángulo de drenaje del ojo",
    ]),
    paragraph(
      "Si durante la revisión visual detectamos indicadores de riesgo, derivamos al paciente al oftalmólogo para confirmación diagnóstica y tratamiento. Esta colaboración entre ópticos-optometristas y oftalmólogos es esencial para una atención visual integral."
    ),

    heading("Factores de riesgo"),
    paragraph(
      "Existen varios factores que aumentan la probabilidad de desarrollar glaucoma:"
    ),
    ...bulletList([
      "Edad superior a 40 años (el riesgo aumenta con la edad)",
      "Antecedentes familiares de glaucoma",
      "Miopía elevada (más de 6 dioptrías)",
      "Diabetes y enfermedades cardiovasculares",
      "Presión intraocular elevada",
      "Uso prolongado de corticosteroides",
      "Origen étnico (mayor prevalencia en personas afrodescendientes e hispanas)",
    ]),

    heading("Tratamiento y control"),

    // Image 4
    ...(uploadedImages["nervio-optico.jpg"]
      ? [
          inlineImage(
            uploadedImages["nervio-optico.jpg"],
            "Nervio óptico afectado por glaucoma"
          ),
        ]
      : []),

    paragraph(
      "Aunque el daño causado por el glaucoma no se puede revertir, existen tratamientos eficaces para controlarlo:"
    ),
    ...bulletList([
      "Colirios hipotensores: reducen la presión intraocular",
      "Tratamiento con láser (trabeculoplastia): mejora el drenaje del humor acuoso",
      "Cirugía (trabeculectomía): crea una nueva vía de drenaje cuando otros tratamientos no son suficientes",
      "Dispositivos de drenaje: implantes que facilitan la salida del humor acuoso",
    ]),
    paragraph(
      "El seguimiento regular con tu óptico-optometrista y oftalmólogo es fundamental para ajustar el tratamiento y monitorizar la evolución de la enfermedad. En ",
      link("Óptica Suárez", "/"),
      " te acompañamos en todo el proceso de cuidado de tu salud visual."
    ),

    heading("Prevención y recomendaciones"),
    paragraph(
      "La mejor forma de protegerte frente al glaucoma es la prevención activa:"
    ),
    ...bulletList([
      "Realiza revisiones visuales completas al menos una vez al año a partir de los 40 años",
      "Si tienes factores de riesgo, consulta con tu óptico-optometrista para establecer un calendario de revisiones más frecuente",
      "Mantén un estilo de vida saludable: ejercicio regular, dieta equilibrada y control del estrés",
      "Protege tus ojos de traumatismos con gafas de protección en actividades de riesgo",
      "Informa a tu óptico-optometrista sobre antecedentes familiares de glaucoma",
    ]),
    paragraph(
      "En Óptica Suárez Jaén estamos comprometidos con tu salud visual. ",
      link("Pide tu cita", "/cita"),
      " para una revisión completa y descubre cómo podemos ayudarte a cuidar tus ojos. Estamos en el centro de Jaén y en el Bulevar, siempre cerca de ti."
    ),
  ];

  const blogPost = {
    _type: "blogPost",
    _id: `blog-${slug}`,
    title: "¿Qué es el Glaucoma? Detección, tipos y prevención",
    slug: { _type: "slug", current: slug },
    date: "2026-03-16",
    excerpt:
      "El glaucoma es una de las principales causas de ceguera en el mundo. Conoce qué es, sus tipos, factores de riesgo y cómo la detección temprana en tu óptica de Jaén puede proteger tu visión.",
    author: "Óptica Suárez",
    categories: ["Salud Ocular", "Prevención", "Glaucoma"],
    ...(featuredImageRef
      ? {
          featuredImage: {
            _type: "image",
            asset: { _type: "reference", _ref: featuredImageRef },
          },
        }
      : {}),
    body,
    seo: {
      _type: "seo",
      title: "¿Qué es el Glaucoma? Detección temprana en tu óptica de Jaén",
      description:
        "Descubre qué es el glaucoma, sus tipos, factores de riesgo y la importancia de la detección precoz. Tu óptico-optometrista en Jaén te ayuda a prevenir la pérdida de visión.",
      keywords:
        "glaucoma, qué es el glaucoma, glaucoma óptica Jaén, detección glaucoma, presión intraocular Jaén, prevención glaucoma, tipos de glaucoma, óptico optometrista Jaén, revisión visual Jaén, salud ocular Jaén",
      canonicalUrl: "https://opticasuarezjaen.es/blog/que-es-el-glaucoma",
      robots: "index, follow",
    },
  };

  await client.createOrReplace(blogPost);
  console.log(`✅ Blog post created: ${blogPost.title}`);
  console.log(`   URL: /blog/${slug}`);
}

main().catch(console.error);
