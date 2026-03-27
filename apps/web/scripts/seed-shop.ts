/**
 * Seed data script: creates initial product categories, brands, and example products.
 *
 * Usage: cd apps/web && npx tsx scripts/seed-shop.ts
 *
 * Requires Sanity write access (SANITY_API_TOKEN env var or Sanity CLI login).
 * Idempotent: skips documents that already exist.
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

// ─── Categories ────────────────────────────────────────────────

const categories = [
  {
    _id: "category-monturas",
    name: "Monturas",
    slug: "monturas",
    description:
      "Monturas de gafas graduadas de las mejores marcas. Diseño, calidad y confort.",
    order: 1,
  },
  {
    _id: "category-gafas-de-sol",
    name: "Gafas de Sol",
    slug: "gafas-de-sol",
    description:
      "Gafas de sol con protección UV certificada. Estilo y protección para tus ojos.",
    order: 2,
  },
  {
    _id: "category-contactologia",
    name: "Contactología",
    slug: "contactologia",
    description:
      "Lentillas y soluciones de mantenimiento. Diarias, mensuales, tóricas y multifocales.",
    order: 3,
  },
  {
    _id: "category-salud-ocular",
    name: "Salud Ocular",
    slug: "salud-ocular",
    description:
      "Productos para el cuidado y bienestar de tus ojos: lágrima artificial, toallitas y más.",
    order: 4,
  },
  {
    _id: "category-outlet",
    name: "Outlet",
    slug: "outlet",
    description:
      "Productos seleccionados con descuento. Oportunidades en monturas y gafas de sol.",
    order: 5,
  },
];

// ─── Brands ────────────────────────────────────────────────────

const brands = [
  { _id: "brand-ray-ban", name: "Ray-Ban", slug: "ray-ban" },
  { _id: "brand-oakley", name: "Oakley", slug: "oakley" },
  { _id: "brand-prada", name: "Prada", slug: "prada" },
  { _id: "brand-gucci", name: "Gucci", slug: "gucci" },
  { _id: "brand-tom-ford", name: "Tom Ford", slug: "tom-ford" },
  { _id: "brand-persol", name: "Persol", slug: "persol" },
  { _id: "brand-maui-jim", name: "Maui Jim", slug: "maui-jim" },
  {
    _id: "brand-polo-ralph-lauren",
    name: "Polo Ralph Lauren",
    slug: "polo-ralph-lauren",
  },
  {
    _id: "brand-giorgio-armani",
    name: "Giorgio Armani",
    slug: "giorgio-armani",
  },
  {
    _id: "brand-dolce-gabbana",
    name: "Dolce & Gabbana",
    slug: "dolce-gabbana",
  },
  { _id: "brand-police", name: "Police", slug: "police" },
  { _id: "brand-carrera", name: "Carrera", slug: "carrera" },
];

// ─── Sample products ──────────────────────────────────────────

const sampleProducts = [
  {
    _id: "product-ray-ban-wayfarer",
    name: "Ray-Ban Wayfarer Classic",
    slug: "ray-ban-wayfarer-classic",
    price: 159,
    brandRef: "brand-ray-ban",
    categoryRef: "category-monturas",
    availability: "disponible",
    tags: ["clásico", "unisex", "acetato"],
    featured: true,
    specs: {
      material: "Acetato",
      gender: "unisex",
      frameDimensions: { calibre: 52, puente: 18, varilla: 150 },
    },
    colors: [
      { name: "Negro", hex: "#000000" },
      { name: "Carey", hex: "#8B4513" },
    ],
  },
  {
    _id: "product-oakley-holbrook",
    name: "Oakley Holbrook",
    slug: "oakley-holbrook",
    price: 145,
    brandRef: "brand-oakley",
    categoryRef: "category-gafas-de-sol",
    availability: "disponible",
    tags: ["deportivo", "polarizado"],
    featured: true,
    specs: {
      material: "O-Matter",
      gender: "hombre",
      frameDimensions: { calibre: 55, puente: 18, varilla: 137 },
    },
    colors: [
      { name: "Negro mate", hex: "#1A1A1A" },
      { name: "Azul", hex: "#003366" },
    ],
  },
  {
    _id: "product-prada-pr-01wv",
    name: "Prada PR 01WV",
    slug: "prada-pr-01wv",
    price: 245,
    brandRef: "brand-prada",
    categoryRef: "category-monturas",
    availability: "disponible",
    tags: ["elegante", "mujer", "acetato"],
    featured: true,
    specs: {
      material: "Acetato",
      gender: "mujer",
      frameDimensions: { calibre: 54, puente: 16, varilla: 140 },
    },
    colors: [
      { name: "Negro", hex: "#000000" },
      { name: "Havana", hex: "#6B3A20" },
    ],
  },
  {
    _id: "product-ray-ban-aviator-sol",
    name: "Ray-Ban Aviator Classic",
    slug: "ray-ban-aviator-classic",
    price: 169,
    brandRef: "brand-ray-ban",
    categoryRef: "category-gafas-de-sol",
    availability: "disponible",
    tags: ["clásico", "metal", "polarizado"],
    featured: true,
    specs: {
      material: "Metal",
      gender: "unisex",
      frameDimensions: { calibre: 58, puente: 14, varilla: 135 },
    },
    colors: [
      { name: "Dorado", hex: "#C5A54C" },
      { name: "Plateado", hex: "#C0C0C0" },
    ],
  },
  {
    _id: "product-acuvue-oasys",
    name: "Acuvue Oasys (caja 6 uds.)",
    slug: "acuvue-oasys-6",
    price: 28,
    brandRef: null,
    categoryRef: "category-contactologia",
    availability: "disponible",
    tags: ["lentillas", "quincenal", "hidrogel de silicona"],
    featured: false,
    specs: { material: "Hidrogel de silicona", gender: "unisex" },
    colors: [],
  },
  {
    _id: "product-persol-649",
    name: "Persol 649 Original",
    slug: "persol-649-original",
    price: 195,
    salePrice: 149,
    brandRef: "brand-persol",
    categoryRef: "category-gafas-de-sol",
    availability: "disponible",
    tags: ["italiano", "icónico", "acetato"],
    featured: false,
    specs: {
      material: "Acetato",
      gender: "unisex",
      frameDimensions: { calibre: 54, puente: 20, varilla: 140 },
    },
    colors: [{ name: "Havana", hex: "#6B3A20" }],
  },
  {
    _id: "product-systane-ultra",
    name: "Systane Ultra Lágrimas Artificiales 10ml",
    slug: "systane-ultra-10ml",
    price: 14.5,
    brandRef: null,
    categoryRef: "category-salud-ocular",
    availability: "disponible",
    tags: ["ojo seco", "lágrima artificial", "lubricante"],
    featured: false,
    specs: { material: null, gender: "unisex" },
    colors: [],
  },
  {
    _id: "product-tom-ford-ft5401",
    name: "Tom Ford FT5401",
    slug: "tom-ford-ft5401",
    price: 295,
    salePrice: 199,
    brandRef: "brand-tom-ford",
    categoryRef: "category-monturas",
    availability: "disponible",
    tags: ["premium", "acetato", "elegante"],
    featured: false,
    specs: {
      material: "Acetato",
      gender: "hombre",
      frameDimensions: { calibre: 51, puente: 20, varilla: 145 },
    },
    colors: [
      { name: "Negro brillante", hex: "#0A0A0A" },
      { name: "Havana oscuro", hex: "#4A2C10" },
    ],
  },
];

// ─── Helper functions ──────────────────────────────────────────

async function exists(id: string): Promise<boolean> {
  const doc = await client.fetch("*[_id == $id][0]{ _id }", { id });
  return !!doc;
}

async function createCategory(cat: (typeof categories)[0]) {
  if (await exists(cat._id)) {
    console.log(`  ⏭️  Category "${cat.name}" already exists`);
    return;
  }
  await client.create({
    _id: cat._id,
    _type: "productCategory",
    name: cat.name,
    slug: { _type: "slug", current: cat.slug },
    description: cat.description,
    order: cat.order,
  });
  console.log(`  ✅ Category "${cat.name}"`);
}

async function createBrand(b: (typeof brands)[0]) {
  if (await exists(b._id)) {
    console.log(`  ⏭️  Brand "${b.name}" already exists`);
    return;
  }
  await client.create({
    _id: b._id,
    _type: "brand",
    name: b.name,
    slug: { _type: "slug", current: b.slug },
  });
  console.log(`  ✅ Brand "${b.name}"`);
}

async function createProduct(p: (typeof sampleProducts)[0]) {
  if (await exists(p._id)) {
    console.log(`  ⏭️  Product "${p.name}" already exists`);
    return;
  }

  const doc: Record<string, unknown> = {
    _id: p._id,
    _type: "product",
    name: p.name,
    slug: { _type: "slug", current: p.slug },
    price: p.price,
    category: { _type: "reference", _ref: p.categoryRef },
    availability: p.availability,
    tags: p.tags,
    featured: p.featured,
  };

  if ("salePrice" in p && p.salePrice) {
    doc.salePrice = p.salePrice;
  }

  if (p.brandRef) {
    doc.brand = { _type: "reference", _ref: p.brandRef };
  }

  if (p.specs) {
    doc.specs = {
      material: p.specs.material,
      gender: p.specs.gender,
      ...(p.specs.frameDimensions
        ? { frameDimensions: p.specs.frameDimensions }
        : {}),
    };
  }

  if (p.colors.length > 0) {
    doc.colors = p.colors.map((c) => ({
      _type: "productColor",
      _key: c.hex.replace("#", ""),
      name: c.name,
      hex: c.hex,
    }));
  }

  await client.create(doc);
  console.log(`  ✅ Product "${p.name}"`);
}

// ─── Main ──────────────────────────────────────────────────────

async function main() {
  console.log("🔄 Seeding shop data...\n");

  console.log("── Categories ──");
  for (const cat of categories) {
    await createCategory(cat);
  }

  console.log("\n── Brands ──");
  for (const b of brands) {
    await createBrand(b);
  }

  console.log("\n── Products ──");
  for (const p of sampleProducts) {
    await createProduct(p);
  }

  console.log("\n✅ Shop seed complete.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
