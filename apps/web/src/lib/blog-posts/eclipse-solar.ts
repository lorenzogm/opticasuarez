interface BuildEclipseSolarPostInput {
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

export function buildEclipseSolarPost({
  featuredImageRef,
  imageRefs = [],
}: BuildEclipseSolarPostInput): BlogPostDocument {
  const slug = "eclipse-solar-como-verlo-correctamente";
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

  const paragraph = (
    parts: Array<
      | string
      | {
          text: string;
          marks?: string[];
          href?: string;
        }
    >
  ): Record<string, unknown> => {
    const markDefs: Array<{ _type: "link"; _key: string; href: string }> = [];
    const children = parts.map((part) => {
      if (typeof part === "string") {
        return { _type: "span", _key: key(), text: part, marks: [] };
      }

      if (part.href) {
        const mark = key();
        markDefs.push({ _type: "link", _key: mark, href: part.href });
        return { _type: "span", _key: key(), text: part.text, marks: [mark] };
      }

      return {
        _type: "span",
        _key: key(),
        text: part.text,
        marks: part.marks || [],
      };
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

  const strong = (text: string) => ({ text, marks: ["strong"] });

  const body: Record<string, unknown>[] = [
    block("¿Qué es un eclipse solar y por qué hay que verlo con protección?", "h2"),
    paragraph([
      "Un eclipse solar ocurre cuando la Luna se interpone entre la Tierra y el Sol y oculta total o parcialmente su luz. Aunque el fenómeno sea espectacular, mirar el Sol sin protección puede causar daño ocular irreversible en la retina. Por eso, desde la óptica y la optometría insistimos en combinar divulgación, prevención y material homologado antes de observarlo.",
    ]),
    paragraph([
      "En Óptica Suárez, tu óptico-optometrista en Jaén puede orientarte sobre la protección visual adecuada, revisar el estado de tus filtros solares para eclipse y recomendarte una ",
      strong("observación segura y cómoda"),
      " según tu edad, tus necesidades visuales y el tiempo de exposición. Si quieres revisar tu visión antes del evento, puedes reservar un ",
      { text: "examen visual completo", href: "/servicios/examen-visual" },
      ".",
    ]),
    ...(imageRefs[0]
      ? [
          image(
            imageRefs[0],
            "Personas observando un eclipse solar con gafas homologadas de protección",
            "La observación segura del eclipse requiere gafas homologadas y supervisión, especialmente en niños."
          ),
        ]
      : []),
    block("Cómo se verá el eclipse solar del 12 de agosto de 2026 en Jaén", "h2"),
    paragraph([
      "El 12 de agosto de 2026 España vivirá uno de los grandes eventos astronómicos de la década. En parte del norte peninsular el eclipse será total, pero en Jaén se observará como un ",
      strong("eclipse parcial muy profundo"),
      ", con una ocultación aproximada del 96-97 % del disco solar y con el Sol muy bajo sobre el horizonte al final de la tarde.",
    ]),
    paragraph([
      "De forma orientativa, en Jaén empezará alrededor de las 19:32, alcanzará su máximo cerca de las 20:36 y terminará con la puesta de sol. Para consultar horarios y mapas oficiales actualizados, puedes revisar la web de ",
      { text: "Trío de Eclipses", href: "https://www.trioeclipses.es/" },
      " o la información del ",
      {
        text: "Instituto Geográfico Nacional",
        href: "https://eclipses.ign.es/eclipse-total-sol-de-12-de-agosto-2026.html",
      },
      ".",
    ]),
    block("Qué gafas necesitas para ver el eclipse correctamente", "h2"),
    paragraph([
      "No sirven las gafas de sol convencionales, los cristales ahumados ni los filtros caseros. Para mirar el eclipse necesitas ",
      strong("gafas solares específicas para eclipse homologadas según la norma ISO 12312-2"),
      ", con marcado CE, compradas en establecimientos fiables y en perfecto estado.",
    ]),
    bullet("Comprueba que las gafas no tengan arañazos, perforaciones ni filtros deformados."),
    bullet("No utilices prismáticos, telescopios, cámaras ni móviles sin filtro solar específico delante del objetivo."),
    bullet("Supervisa siempre a los niños y evita que se quiten la protección mientras miran al Sol."),
    bullet("Si llevas gafas graduadas, las gafas para eclipse deben colocarse por delante, sin sustituirlas."),
    block("Qué puede hacer el óptico-optometrista para ayudarte en Jaén", "h2"),
    paragraph([
      "El óptico-optometrista no solo corrige la graduación: también educa en salud visual. Ante un eclipse solar puede ayudarte a identificar material homologado, resolver dudas sobre filtros solares, aconsejar a personas con baja visión o sensibilidad a la luz y derivarte si presentas molestias o síntomas tras la observación.",
    ]),
    paragraph([
      "Si vas a desplazarte para ver el eclipse o quieres preparar a toda la familia, puedes ",
      { text: "pedir cita", href: "/cita" },
      " en nuestras ópticas del ",
      { text: "Centro", href: "/centro" },
      " o del ",
      { text: "Bulevar", href: "/bulevar" },
      ". También podemos orientarte si buscas una revisión visual infantil antes del verano en nuestro servicio de ",
      { text: "visión pediátrica", href: "/servicios/vision-pediatrica" },
      ".",
    ]),
    ...(imageRefs[1]
      ? [
          image(
            imageRefs[1],
            "Imagen de un eclipse solar parcial en el cielo durante la tarde",
            "En Jaén el eclipse de agosto de 2026 se verá como un eclipse parcial muy profundo cerca de la puesta de sol."
          ),
        ]
      : []),
    block("Consejos finales para disfrutar del eclipse sin dañar tus ojos", "h2"),
    bullet("Elige con antelación un lugar con horizonte despejado hacia el oeste para verlo mejor desde Jaén."),
    bullet("Lleva tus gafas homologadas de repuesto si las compartes en familia o con amigos."),
    bullet("No mires al Sol directamente ni siquiera durante unos segundos si no llevas la protección adecuada."),
    bullet("Si notas visión borrosa, manchas o deslumbramiento persistente después del eclipse, solicita revisión profesional cuanto antes."),
    paragraph([
      "En Óptica Suárez trabajamos la prevención visual cada día para que disfrutes de experiencias como este eclipse con seguridad. Si quieres prepararte con tiempo, reserva tu revisión en Jaén y te ayudaremos a cuidar tu visión antes, durante y después del fenómeno.",
    ]),
  ];

  return {
    _type: "blogPost",
    _id: `blog-${slug}`,
    title:
      "Eclipse solar del 12 de agosto de 2026: cómo verlo correctamente y proteger tus ojos en Jaén",
    slug: { _type: "slug", current: slug },
    date: "2026-07-30",
    excerpt:
      "Descubre qué es un eclipse solar, cómo se verá en Jaén el 12 de agosto de 2026 y qué gafas homologadas necesitas para observarlo sin dañar tu visión.",
    author: "Óptica Suárez",
    categories: ["Salud Visual", "Gafas de Sol", "Educación Visual"],
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
      title: "Eclipse solar 2026 en Jaén: cómo verlo correctamente | Óptica Suárez",
      description:
        "Guía sobre el eclipse solar del 12 de agosto de 2026 en Jaén: horarios orientativos, gafas homologadas ISO 12312-2 y consejos de óptica y optometría para proteger tus ojos.",
      keywords:
        "eclipse solar jaén, eclipse solar 12 agosto 2026, cómo ver eclipse solar correctamente, gafas homologadas eclipse, óptica jaén, optometría jaén, salud visual jaén, examen visual jaén, gafas de sol jaén, óptico optometrista jaén",
      canonicalUrl: `https://opticasuarezjaen.es/blog/${slug}`,
      robots: "index, follow",
    },
  };
}
