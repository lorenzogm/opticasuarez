interface BuildCataratasPostInput {
  featuredImageRef?: string;
  imageRefs?: string[];
}

interface BlogPostDocument {
  _type: "blogPost";
  _id: string;
  title: string;
  slug: { _type: "slug"; current: string };
  date: string;
  excerpt: string;
  author: string;
  categories: string[];
  featuredImage?: {
    _type: "image";
    asset: { _type: "reference"; _ref: string };
  };
  body: Record<string, unknown>[];
  seo: {
    _type: "seo";
    title: string;
    description: string;
    keywords: string;
    canonicalUrl: string;
    robots: string;
  };
}

export function buildCataratasPost({
  featuredImageRef,
  imageRefs = [],
}: BuildCataratasPostInput): BlogPostDocument {
  const slug = "que-son-las-cataratas-y-como-tratarlas";
  let keyCounter = 0;
  const key = () => `k${(++keyCounter).toString().padStart(4, "0")}`;

  const block = (
    text: string,
    style: "normal" | "h2" | "h3" = "normal"
  ): Record<string, unknown> => ({
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  });

  const linkedParagraph = (
    parts: Array<
      | string
      | {
          text: string;
          href: string;
        }
    >
  ): Record<string, unknown> => {
    const markDefs: Array<{ _type: "link"; _key: string; href: string }> = [];
    const children = parts.map((part) => {
      if (typeof part === "string") {
        return { _type: "span", _key: key(), text: part, marks: [] };
      }
      const mark = key();
      markDefs.push({ _type: "link", _key: mark, href: part.href });
      return { _type: "span", _key: key(), text: part.text, marks: [mark] };
    });
    return {
      _type: "block",
      _key: key(),
      style: "normal",
      markDefs,
      children,
    };
  };

  const bullet = (text: string): Record<string, unknown> => ({
    _type: "block",
    _key: key(),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  });

  const image = (assetRef: string, alt: string, caption: string) => ({
    _type: "image",
    _key: key(),
    asset: { _type: "reference", _ref: assetRef },
    alt,
    caption,
  });

  const body: Record<string, unknown>[] = [
    block("¿Qué son las cataratas?", "h2"),
    block(
      "Las cataratas son la pérdida progresiva de transparencia del cristalino, la lente natural del ojo. Cuando aparece esta opacidad, la visión se vuelve borrosa, los colores pierden intensidad y puede aumentar el deslumbramiento al conducir de noche."
    ),
    block(
      "En Óptica Suárez Jaén, el óptico-optometrista actúa como profesional sanitario de atención primaria visual: detectamos signos de alerta en consulta y, si es necesario, derivamos al oftalmólogo para confirmar diagnóstico y tratamiento médico."
    ),
    ...(imageRefs[0]
      ? [
          image(
            imageRefs[0],
            "Exploración visual para detectar signos compatibles con cataratas en Jaén",
            "La revisión visual periódica permite identificar indicios de cataratas de forma temprana."
          ),
        ]
      : []),
    block("Síntomas frecuentes de cataratas", "h2"),
    bullet("Visión nublada o borrosa que empeora con el tiempo."),
    bullet("Mayor sensibilidad a la luz y deslumbramientos."),
    bullet("Dificultad para ver de noche o al conducir."),
    bullet("Cambios frecuentes en la graduación de las gafas."),
    bullet("Percepción de colores más apagados o amarillentos."),
    linkedParagraph([
      "Ante estos síntomas, recomendamos reservar un ",
      { text: "examen visual completo", href: "/examen-visual" },
      " para valorar la salud ocular y decidir si procede derivación oftalmológica.",
    ]),
    block("¿Cómo puede ayudarte tu óptico-optometrista en Jaén?", "h2"),
    bullet("Realiza controles de agudeza visual y refracción actualizada."),
    bullet(
      "Evalúa signos compatibles con catarata en revisión de salud visual."
    ),
    bullet(
      "Te orienta sobre ayudas ópticas temporales mientras esperas valoración médica."
    ),
    bullet(
      "Coordina la derivación al oftalmólogo cuando detecta indicios patológicos."
    ),
    ...(imageRefs[1]
      ? [
          image(
            imageRefs[1],
            "Optometrista de Óptica Suárez realizando examen de salud visual en Jaén",
            "El óptico-optometrista es clave en la detección precoz y derivación al oftalmólogo."
          ),
        ]
      : []),
    block("Tratamiento de las cataratas", "h2"),
    block(
      "No existe colirio que elimine una catarata establecida. El tratamiento definitivo suele ser la cirugía de cataratas indicada por el oftalmólogo, sustituyendo el cristalino opaco por una lente intraocular."
    ),
    block(
      "Antes y después de la cirugía, el seguimiento visual es importante para ajustar la graduación y optimizar el confort visual en el día a día."
    ),
    linkedParagraph([
      "Si notas visión borrosa o cambios visuales, puedes ",
      { text: "pedir cita", href: "/cita" },
      " en nuestros centros del Centro y Bulevar de Jaén.",
    ]),
    ...(imageRefs[2]
      ? [
          image(
            imageRefs[2],
            "Paciente con síntomas visuales compatibles con cataratas consultando en óptica en Jaén",
            "La valoración temprana ayuda a preservar la calidad visual y planificar el tratamiento adecuado."
          ),
        ]
      : []),
    linkedParagraph([
      "En ",
      { text: "Óptica Suárez", href: "/" },
      " trabajamos para cuidar tu salud visual con revisiones personalizadas y orientación profesional en Jaén.",
    ]),
  ];

  return {
    _type: "blogPost",
    _id: `blog-${slug}`,
    title: "¿Qué son las cataratas y cómo tratarlas? Guía completa en Jaén",
    slug: { _type: "slug", current: slug },
    date: "2026-06-15",
    excerpt:
      "Descubre qué son las cataratas, sus síntomas y cómo te ayuda el óptico-optometrista en Jaén con detección precoz, derivación al oftalmólogo y seguimiento visual.",
    author: "Óptica Suárez",
    categories: ["Salud Visual", "Salud Ocular", "Prevención"],
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
        "¿Qué son las cataratas y cómo tratarlas? | Óptica y optometría en Jaén",
      description:
        "Conoce los síntomas de cataratas, cuándo acudir a tu óptico-optometrista en Jaén y cómo es la derivación al oftalmólogo para su tratamiento.",
      keywords:
        "cataratas jaén, síntomas de cataratas, tratamiento cataratas, óptico optometrista jaén, examen visual jaén, salud ocular jaén, cirugía de cataratas jaén, revisión visual jaén, óptica suárez jaén",
      canonicalUrl: `https://opticasuarezjaen.es/blog/${slug}`,
      robots: "index, follow",
    },
  };
}
