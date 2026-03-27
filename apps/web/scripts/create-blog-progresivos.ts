/**
 * Create blog post: ¿Cuál es el mejor progresivo?
 *
 * Usage: cd apps/web && npx tsx scripts/create-blog-progresivos.ts
 *
 * Downloads images (Zeiss + Google Drive), uploads to Sanity, creates blog post.
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

function googleDriveUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

const imageUrls = [
  {
    url: "https://www.zeiss.es/content/dam/vis-b2c/reference-master/images/products/progressive-lenses/zeiss-pal-light2_4x3.jpg/_jcr_content/renditions/original./zeiss-pal-light2_4x3.jpg",
    filename: "progresivo-zeiss.jpg",
    alt: "Lente progresiva Zeiss — diseño óptico avanzado para mejor adaptación",
  },
  {
    url: googleDriveUrl("1Uitrw4iH9DRMB9p-SrfqWlWiqDVB4MyE"),
    filename: "progresivo-adaptacion.jpg",
    alt: "Adaptación a lentes progresivas en Óptica Suárez Jaén",
  },
  {
    url: googleDriveUrl("1fKUO6MAoCxRyM_TKPSC-xNTphVuN0eah"),
    filename: "progresivo-tipos.jpg",
    alt: "Comparativa de tipos de lentes: monofocal, bifocal y progresivo",
  },
  {
    url: googleDriveUrl("1X_7Xu1JAEG9Wu1v5Mj-MVJOHV-fEVkF7"),
    filename: "progresivo-medicion.jpg",
    alt: "Medición personalizada de lentes progresivas en óptica de Jaén",
  },
  {
    url: googleDriveUrl("1K_Ay_7P_jRH8OMABVMWGxWD7omqeTFe7"),
    filename: "progresivo-consulta.jpg",
    alt: "Consulta sobre lentes progresivas en Óptica Suárez",
  },
];

// ─── Portable Text helpers ───────────────────────────────────

let keyCounter = 0;
function key(): string {
  keyCounter++;
  return `k${keyCounter.toString().padStart(4, "0")}`;
}

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
    | {
        text: string;
        marks: string[];
        markDefs?: Record<string, unknown>[];
      }
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
    return {
      _type: "span",
      _key: key(),
      text: part.text,
      marks: part.marks,
    };
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
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "Mozilla/5.0" },
  });
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
      console.log(`  ⬆️  Uploading to Sanity... (${buffer.length} bytes)`);
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

  const slug = "cual-es-el-mejor-progresivo";
  const featuredImageRef =
    uploadedImages["progresivo-zeiss.jpg"] || Object.values(uploadedImages)[0];

  const body: Record<string, unknown>[] = [
    heading("¿Cuál es el mejor progresivo?"),
    paragraph(
      "Si estás empezando a notar que te cuesta enfocar de cerca — leer el móvil, una etiqueta o la letra pequeña de un documento — es probable que estés experimentando los primeros síntomas de la ",
      bold("presbicia o vista cansada"),
      ". Es algo completamente normal que suele aparecer a partir de los 40-45 años, y la solución más versátil y cómoda son las ",
      bold("lentes progresivas"),
      "."
    ),
    paragraph(
      "En ",
      link("Óptica Suárez en Jaén", "/"),
      " llevamos más de 80 años adaptando lentes progresivas y sabemos que no todos los progresivos son iguales. En este artículo te explicamos qué tipos existen, por qué algunos se adaptan mejor que otros y cómo elegir el que mejor se ajuste a tu estilo de vida."
    ),

    // Image 1
    ...(featuredImageRef
      ? [
          inlineImage(
            featuredImageRef,
            "Lente progresiva Zeiss — diseño óptico avanzado para mejor adaptación"
          ),
        ]
      : []),

    heading("¿Qué es una lente progresiva?"),
    paragraph(
      "Una lente progresiva es un cristal que combina ",
      bold("tres zonas de visión en una sola lente"),
      ": la parte superior está graduada para ver de lejos, la inferior para ver de cerca (lectura), y la zona intermedia permite enfocar a distancias medias (ordenador, salpicadero del coche). La transición entre zonas es gradual, sin saltos ni líneas visibles."
    ),

    heading("Progresivos vs. bifocales vs. monofocales", "h3"),
    paragraph(
      "A diferencia de los ",
      bold("bifocales"),
      ", que tienen una línea visible y solo dos focos (lejos y cerca), los progresivos ofrecen una transición suave que resulta más natural y estética. Los ",
      bold("monofocales"),
      " solo corrigen una distancia, por lo que necesitarías varias gafas para lejos, cerca e intermedia."
    ),

    // Image 2
    ...(uploadedImages["progresivo-tipos.jpg"]
      ? [
          inlineImage(
            uploadedImages["progresivo-tipos.jpg"],
            "Comparativa de tipos de lentes: monofocal, bifocal y progresivo"
          ),
        ]
      : []),

    heading("¿Por qué es difícil adaptarse a un progresivo?"),
    paragraph(
      "La adaptación a las lentes progresivas es uno de los temas que más preocupan a nuestros pacientes. La realidad es que la ",
      bold(
        "calidad del progresivo influye directamente en la facilidad de adaptación"
      ),
      ". Un progresivo de gama baja tiene zonas de aberración más amplias (los laterales se ven borrosos), lo que obliga a mover más la cabeza en lugar de los ojos. Un progresivo de gama alta minimiza estas aberraciones, ofreciendo campos visuales más amplios y una adaptación casi inmediata."
    ),
    paragraph("Algunos factores que afectan la adaptación son:"),
    ...bulletList([
      "La calidad del diseño óptico de la lente (gama baja vs. gama alta vs. personalizado)",
      "La correcta toma de medidas por parte del óptico-optometrista (alturas, distancia interpupilar, ángulo pantonscópico)",
      "El tipo de montura elegida (debe ser adecuada para progresivos)",
      "Si es tu primer progresivo o ya has usado uno antes",
      "Tu graduación: diferencias grandes entre lejos y cerca pueden dificultar más la adaptación",
    ]),
    paragraph(
      "En nuestro centro realizamos un ",
      link("examen visual completo", "/examen-visual"),
      " antes de recetar un progresivo, asegurándonos de que la graduación es precisa y las medidas de montaje son milimétricas."
    ),

    // Image 3
    ...(uploadedImages["progresivo-medicion.jpg"]
      ? [
          inlineImage(
            uploadedImages["progresivo-medicion.jpg"],
            "Medición personalizada de lentes progresivas en óptica de Jaén"
          ),
        ]
      : []),

    heading("Tipos de lentes progresivas"),

    heading("Progresivos estándar (gama básica)", "h3"),
    paragraph(
      "Son las lentes progresivas de ",
      bold("precio más asequible"),
      ". Utilizan diseños genéricos que no se personalizan según las características del usuario. Los campos visuales útiles (lejos, intermedio y cerca) son más estrechos, y las zonas laterales de aberración son más amplias. Requieren más movimiento de cabeza y su adaptación puede ser más lenta."
    ),
    paragraph(
      "Son una opción válida para usuarios con graduaciones bajas y necesidades visuales sencillas."
    ),

    heading("Progresivos de gama media", "h3"),
    paragraph(
      "Ofrecen un ",
      bold("mejor equilibrio entre precio y rendimiento"),
      ". Tienen diseños más avanzados con campos visuales más amplios y una transición más suave entre zonas. La adaptación suele ser más rápida y cómoda que con los estándar."
    ),
    paragraph(
      "Recomendados para la mayoría de usuarios, especialmente si pasas muchas horas frente a pantallas o conduces con frecuencia."
    ),

    heading("Progresivos personalizados (gama alta)", "h3"),
    paragraph(
      "Son las ",
      bold("lentes progresivas más avanzadas del mercado"),
      ". Se fabrican de forma individual para cada usuario, teniendo en cuenta su graduación exacta, las medidas de su montura, su posición de uso (ángulo, distancia al ojo) y sus hábitos visuales."
    ),
    paragraph(
      "Marcas como ",
      bold("Zeiss"),
      ", ",
      bold("Essilor (Varilux)"),
      " y ",
      bold("Hoya"),
      " ofrecen diseños free-form de última generación que maximizan los campos útiles de visión y minimizan las aberraciones laterales. La adaptación es casi inmediata en la mayoría de los casos."
    ),

    heading("Progresivos ocupacionales", "h3"),
    paragraph(
      "Diseñados específicamente para ",
      bold("distancias de trabajo (cerca e intermedio)"),
      ", son ideales para personas que pasan muchas horas en oficina o frente al ordenador. No sustituyen al progresivo general (no sirven para conducir), pero complementan la visión en el entorno laboral."
    ),

    // Image 4
    ...(uploadedImages["progresivo-adaptacion.jpg"]
      ? [
          inlineImage(
            uploadedImages["progresivo-adaptacion.jpg"],
            "Adaptación a lentes progresivas en Óptica Suárez Jaén"
          ),
        ]
      : []),

    heading("Señales de que necesitas un progresivo"),
    paragraph(
      "Estos son los síntomas más habituales que indican que es hora de consultar con tu óptico-optometrista sobre lentes progresivas:"
    ),
    ...bulletList([
      "Alejas el móvil o el libro para poder leer mejor",
      "Necesitas más luz para leer de cerca",
      "Te cuesta enfocar al pasar la vista de lejos a cerca (o al revés)",
      "Sientes fatiga visual al final del día, especialmente después de usar pantallas",
      "Dolores de cabeza frecuentes relacionados con la visión",
      "Tienes que quitarte y ponerte las gafas de cerca constantemente",
    ]),
    paragraph(
      "Si reconoces alguna de estas situaciones, es el momento de pedir una ",
      link("cita para un examen visual", "/cita"),
      " en cualquiera de nuestros centros en Jaén."
    ),

    heading("¿Cómo elegir el mejor progresivo para ti?"),
    paragraph(
      'No existe un "mejor progresivo" universal. El mejor progresivo es ',
      bold(
        "el que se adapta a tus necesidades visuales, tu estilo de vida y tu presupuesto"
      ),
      ". Estos son los factores que evaluamos en Óptica Suárez para recomendarte la mejor opción:"
    ),
    ...bulletList([
      "Tu graduación actual: cuanto mayor es la adición (diferencia entre lejos y cerca), más importante es elegir una gama alta",
      "Tus actividades habituales: conducción, pantallas, lectura, deportes...",
      "Si ya has usado progresivos antes y cuál fue tu experiencia",
      "El tipo de montura que prefieres (algunas son más adecuadas que otras para progresivos)",
      "Tu presupuesto: te asesoramos para encontrar la mejor relación calidad-precio",
    ]),

    heading("Consejos para la adaptación"),
    paragraph(
      "Si vas a estrenar tu primer progresivo, estos consejos te ayudarán con la adaptación:"
    ),
    ...bulletList([
      "Úsalas desde el primer momento: cuanto más las uses, más rápido te adaptarás",
      "Mueve la cabeza en dirección al objeto que quieras ver, no solo los ojos",
      "Para bajar escaleras, inclina ligeramente la cabeza hacia abajo para mirar por la zona de lejos",
      "El período normal de adaptación es de 1 a 2 semanas (con progresivos de calidad, solo unos días)",
      "Si después de 2 semanas sigues con molestias, vuelve a tu óptica para que revisen medidas y graduación",
    ]),

    // Image 5
    ...(uploadedImages["progresivo-consulta.jpg"]
      ? [
          inlineImage(
            uploadedImages["progresivo-consulta.jpg"],
            "Consulta sobre lentes progresivas en Óptica Suárez"
          ),
        ]
      : []),

    heading("Óptica Suárez: tu referencia en progresivos en Jaén"),
    paragraph(
      "En ",
      link("Óptica Suárez", "/"),
      " trabajamos con las mejores marcas del mercado — Zeiss, Essilor (Varilux), Hoya — y contamos con tecnología de última generación para la toma de medidas. Nuestros ópticos-optometristas en Jaén te asesorarán de forma personalizada para que elijas el progresivo que realmente necesitas, sin más y sin menos."
    ),
    paragraph(
      "Visítanos en nuestros centros del ",
      bold("centro de Jaén"),
      " y del ",
      bold("Bulevar"),
      ", o ",
      link("pide tu cita online", "/cita"),
      " para una ",
      link("revisión visual completa", "/examen-visual"),
      ". Llevamos desde 1940 cuidando la visión de los jiennenses."
    ),
  ];

  const blogPost = {
    _type: "blogPost",
    _id: `blog-${slug}`,
    title: "¿Cuál es el mejor progresivo? Guía completa para elegir tus lentes",
    slug: { _type: "slug", current: slug },
    date: "2026-03-27",
    excerpt:
      "Descubre qué tipos de lentes progresivas existen, por qué algunos se adaptan mejor que otros y cómo elegir el progresivo ideal para ti. Guía completa de tu óptica en Jaén.",
    author: "Óptica Suárez",
    categories: ["Óptica", "Lentes Progresivas", "Salud Visual", "Consejos"],
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
      title:
        "¿Cuál es el mejor progresivo? Guía de lentes progresivas | Óptica en Jaén",
      description:
        "Guía completa sobre lentes progresivas: tipos, adaptación, diferencias con bifocales y monofocales. Tu óptico-optometrista en Jaén te aconseja cómo elegir el mejor progresivo.",
      keywords:
        "lentes progresivas, mejor progresivo, progresivos Jaén, óptica progresivos Jaén, adaptación progresivos, Zeiss Varilux Hoya, presbicia vista cansada, lentes multifocales, óptica Jaén, revisión visual Jaén",
      canonicalUrl: `https://opticasuarezjaen.es/blog/${slug}`,
      robots: "index, follow",
    },
  };

  await client.createOrReplace(blogPost);
  console.log(`✅ Blog post created: ${blogPost.title}`);
  console.log(`   URL: /blog/${slug}`);
}

main().catch(console.error);
