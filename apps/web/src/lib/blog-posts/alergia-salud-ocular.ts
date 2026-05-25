interface BuildAlergiaSaludOcularPostInput {
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

export function buildAlergiaSaludOcularPost({
  featuredImageRef,
  imageRefs = [],
}: BuildAlergiaSaludOcularPostInput): BlogPostDocument {
  const slug = "alergia-y-salud-ocular";
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
    block("Alergia y Salud Ocular: qué debes saber", "h2"),
    block(
      "La alergia ocular provoca picor, enrojecimiento, lagrimeo y sensación de arenilla. Estos síntomas pueden confundirse con sequedad ocular u otras alteraciones visuales, por eso es clave una valoración profesional."
    ),
    linkedParagraph([
      "En Óptica Suárez, tu óptico-optometrista en Jaén puede ayudarte con un ",
      { text: "examen visual completo", href: "/examen-visual" },
      " para identificar la causa de las molestias y orientar el mejor plan de cuidado.",
    ]),
    ...(imageRefs[0]
      ? [
          image(
            imageRefs[0],
            "Síntomas de alergia ocular como ojo rojo y picor",
            "La alergia ocular causa inflamación conjuntival y molestias visuales."
          ),
        ]
      : []),
    block("¿Cómo ayuda el óptico-optometrista ante la alergia ocular?", "h2"),
    block(
      "Además de detectar señales de alarma para derivar al oftalmólogo cuando sea necesario, el óptico-optometrista puede recomendar medidas de alivio que mejoran el confort diario."
    ),
    bullet("Higiene palpebral y baños oculares con suero fisiológico."),
    bullet("Lágrimas artificiales específicas para alergia ocular."),
    bullet(
      "Control del entorno: evitar alérgenos, usar gafas de sol y mantener filtros limpios."
    ),
    linkedParagraph([
      "Si necesitas atención personalizada, puedes ",
      { text: "pedir cita", href: "/cita" },
      " en nuestras ópticas del centro y del Bulevar de Jaén.",
    ]),
    block("Consejos prácticos en temporada de alergias", "h2"),
    bullet("No te frotes los ojos: aumenta la inflamación y el picor."),
    bullet("Lava manos y cara al llegar de la calle."),
    bullet("Usa lágrimas frías para aliviar el escozor."),
    bullet("Consulta si los síntomas duran más de unos días o empeoran."),
    ...(imageRefs[1]
      ? [
          image(
            imageRefs[1],
            "Examen visual para alergia ocular en Óptica Suárez Jaén",
            "Revisión visual en Jaén para diferenciar alergia ocular y otras patologías."
          ),
        ]
      : []),
    linkedParagraph([
      "En ",
      { text: "Óptica Suárez", href: "/" },
      ", llevamos décadas cuidando la salud visual en Jaén con un enfoque cercano y personalizado.",
    ]),
  ];

  return {
    _type: "blogPost",
    _id: `blog-${slug}`,
    title: "Alergia y Salud Ocular: guía práctica para aliviar tus síntomas",
    slug: { _type: "slug", current: slug },
    date: "2026-05-12",
    excerpt:
      "Descubre cómo la alergia afecta a tus ojos, cuándo acudir al óptico-optometrista y qué soluciones te ayudan a aliviar el picor, enrojecimiento y lagrimeo en Jaén.",
    author: "Óptica Suárez",
    categories: ["Salud Visual", "Educación Visual"],
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
        "Alergia y Salud Ocular: síntomas y alivio en Jaén | Óptica Suárez",
      description:
        "Guía sobre alergia ocular en Jaén: síntomas, examen visual, baños oculares y lágrimas artificiales específicas para mejorar tu confort y salud visual.",
      keywords:
        "alergia ocular jaén, salud ocular jaén, óptica en jaén, óptico optometrista jaén, examen visual jaén, lagrimeo y picor ocular, lágrimas artificiales alergia, baños oculares jaén, ojo rojo por alergia, revisión visual jaén",
      canonicalUrl: `https://opticasuarezjaen.es/blog/${slug}`,
      robots: "index, follow",
    },
  };
}
