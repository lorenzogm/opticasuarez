/**
 * Fix script: Applies the Terapia Visual content changes from PR #452.
 *
 * Changes:
 * 1. Adds "SÍNTOMAS DETECTABLES EN CASA Y EL COLEGIO" sectionList after the
 *    benefits section (symptoms visible at home and school for parents/teachers).
 * 2. Updates the conditions sectionCards title from "CONDICIONES QUE TRATAMOS"
 *    to "PROBLEMAS VISUALES QUE TRATAMOS" and replaces the 6 generic items with
 *    4 detailed, SEO-rich blocks (ambliopía, estrabismos, acomodación, binocular).
 * 3. Adds "INSTALACIONES" sectionText after the conditions section, describing
 *    the 40m² specialist room at the Bulevar centre.
 *
 * The script is idempotent: it checks whether each section already exists (by
 * matching its title) before inserting it.
 *
 * Usage:
 *   SANITY_TOKEN=<token> node scripts/fix-terapia-visual-sections.mjs
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@sanity/client";

const PROJECT_ID = "2a24wmex";
const DATASET = "production";

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

let keyCounter = 0;
function generateKey() {
  keyCounter++;
  return `ftv${keyCounter.toString(36).padStart(4, "0")}`;
}

function toPortableText(text) {
  return [
    {
      _type: "block",
      _key: generateKey(),
      children: [{ _type: "span", _key: generateKey(), text, marks: [] }],
      markDefs: [],
      style: "normal",
    },
  ];
}

// ─── Content from content/json/terapia-visual.json (PR #452) ───────────────

const SYMPTOMS_TITLE = "SÍNTOMAS DETECTABLES EN CASA Y EL COLEGIO";

const symptomsSection = {
  _type: "sectionList",
  _key: generateKey(),
  title: SYMPTOMS_TITLE,
  description: "Señales de alerta para padres y profesores",
  variant: "checkmark",
  items: [
    "Se acerca demasiado al papel al leer o escribir.",
    "Se salta líneas o usa el dedo para no perderse al leer.",
    "Termina el día con fatiga visual, irritación o picor de ojos.",
    "Presenta dolores de cabeza durante o después del estudio.",
    "Baja su rendimiento escolar pese a dedicar tiempo al estudio.",
  ],
};

const CONDITIONS_OLD_TITLE = "CONDICIONES QUE TRATAMOS";
const CONDITIONS_NEW_TITLE = "PROBLEMAS VISUALES QUE TRATAMOS";

const conditionsItems = [
  {
    title: "Ambliopía (Ojo Vago)",
    description:
      "La ambliopía es una disminución de visión en uno de los ojos porque el cerebro prioriza la información del ojo dominante. Con terapia visual trabajamos la estimulación del ojo vago y la integración binocular para mejorar la agudeza visual y el uso coordinado de ambos ojos.",
    icon: "lazy-eye",
  },
  {
    title: "Estrabismos y microestrabismos",
    description:
      "Tratamos tanto estrabismos manifiestos como microestrabismos, donde la desviación puede ser sutil pero afecta al confort visual y al rendimiento lector. El objetivo es mejorar la alineación ocular, reducir la supresión y favorecer una visión binocular estable.",
    icon: "alignment",
  },
  {
    title: "Problemas de acomodación (enfoque)",
    description:
      "Cuando el sistema de enfoque no responde bien, aparecen visión borrosa, cansancio y dificultades para cambiar de lejos a cerca con rapidez. En nuestras sesiones entrenamos la flexibilidad y resistencia acomodativa para que leer y estudiar sea más cómodo.",
    icon: "focus",
  },
  {
    title: "Disfunciones binoculares y de motilidad ocular",
    description:
      "Las disfunciones binoculares y de motilidad ocular dificultan coordinar ambos ojos con precisión en lectura, escritura o actividades deportivas. Con ejercicios específicos mejoramos vergencias, seguimiento y movimientos sacádicos para aumentar precisión y fluidez visual.",
    icon: "tracking",
  },
];

const INSTALLATIONS_TITLE = "INSTALACIONES";

const installationsSection = {
  _type: "sectionText",
  _key: generateKey(),
  title: INSTALLATIONS_TITLE,
  content: toPortableText(
    "En nuestro centro del Bulevar contamos con una sala especializada de más de 40m² para terapia visual, equipada con tecnología de vanguardia y materiales adaptados por edades. Esto nos permite realizar sesiones personalizadas, dinámicas y amenas para los más pequeños, manteniendo siempre un seguimiento profesional y cercano en cada fase del tratamiento."
  ),
};

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("🔧 Applying PR #452 Terapia Visual content changes...\n");

  console.log("📄 Fetching current page...");
  const page = await client.fetch(
    '*[_type == "page" && path.current == "/servicios/terapia-visual"][0]'
  );

  if (!page) {
    console.error("❌ Page not found. Run migrate-service-pages.mjs first.");
    process.exit(1);
  }

  console.log(`  Found: ${page.title} (${page._id})`);
  console.log(`  Sections: ${page.sections?.length || 0}`);

  const sections = page.sections || [];
  let changed = false;

  // ── 1. Add symptoms section after "Beneficios de la terapia visual" ──────

  const hasSymptoms = sections.some((s) => s.title === SYMPTOMS_TITLE);

  if (hasSymptoms) {
    console.log("\n✅ Symptoms section already present — skipping.");
  } else {
    console.log(`\n➕ Adding symptoms section: "${SYMPTOMS_TITLE}"...`);
    // Insert after the benefits sectionList (the first sectionList in the page)
    const benefitsIdx = sections.findIndex((s) => s._type === "sectionList");
    const insertAfter = benefitsIdx !== -1 ? benefitsIdx : sections.length - 1;
    sections.splice(insertAfter + 1, 0, symptomsSection);
    console.log(`  ✓ Inserted at position ${insertAfter + 1}`);
    changed = true;
  }

  // ── 2. Update conditions section ─────────────────────────────────────────

  const conditionsIdx = sections.findIndex(
    (s) =>
      s._type === "sectionCards" &&
      (s.title === CONDITIONS_OLD_TITLE || s.title === CONDITIONS_NEW_TITLE)
  );

  if (conditionsIdx === -1) {
    console.log("\n⚠️  Conditions section not found — skipping update.");
  } else {
    const conditionsSection = sections[conditionsIdx];
    const alreadyUpdated =
      conditionsSection.title === CONDITIONS_NEW_TITLE &&
      conditionsSection.items?.length === 4 &&
      conditionsSection.items[0]?.title === "Ambliopía (Ojo Vago)";

    if (alreadyUpdated) {
      console.log("\n✅ Conditions section already updated — skipping.");
    } else {
      console.log("\n✏️  Updating conditions section...");
      sections[conditionsIdx] = {
        ...conditionsSection,
        title: CONDITIONS_NEW_TITLE,
        subtitle:
          "Valoramos cada caso y diseñamos un plan de terapia visual personalizado según la dificultad detectada.",
        items: conditionsItems.map((item) => ({
          _key: generateKey(),
          _type: "cardItem",
          title: item.title,
          description: item.description,
          icon: item.icon,
        })),
      };
      console.log(
        `  ✓ Title: "${CONDITIONS_OLD_TITLE}" → "${CONDITIONS_NEW_TITLE}"`
      );
      console.log("  ✓ Items: updated to 4 detailed SEO-rich blocks");
      changed = true;
    }
  }

  // ── 3. Add installations section after conditions ─────────────────────────

  const hasInstallations = sections.some(
    (s) => s.title === INSTALLATIONS_TITLE
  );

  if (hasInstallations) {
    console.log("\n✅ Installations section already present — skipping.");
  } else {
    console.log(
      `\n➕ Adding installations section: "${INSTALLATIONS_TITLE}"...`
    );
    // Insert after conditions section (find updated conditions index)
    const condIdx = sections.findIndex(
      (s) =>
        s._type === "sectionCards" &&
        (s.title === CONDITIONS_OLD_TITLE || s.title === CONDITIONS_NEW_TITLE)
    );
    const insertAfter = condIdx !== -1 ? condIdx : sections.length - 1;
    sections.splice(insertAfter + 1, 0, installationsSection);
    console.log(`  ✓ Inserted at position ${insertAfter + 1}`);
    changed = true;
  }

  // ── 4. Save ───────────────────────────────────────────────────────────────

  if (!changed) {
    console.log("\n✅ All sections are already up to date. Nothing to do.");
    return;
  }

  console.log("\n📤 Pushing to Sanity...");
  await client.createOrReplace({ ...page, sections });
  console.log(`  ✓ Page updated: ${sections.length} sections`);

  console.log("\n✅ PR #452 Terapia Visual changes applied successfully!");
}

main().catch((err) => {
  console.error("Fix failed:", err);
  process.exit(1);
});
