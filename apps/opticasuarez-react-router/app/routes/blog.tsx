import { BreadcrumbSchema } from "../ui/components/structured-data";
import { getBlogPosts } from "../ui/lib/blog";
import Blog from "../ui/pages/blog/blog";

export function links() {
  return [{ rel: "canonical", href: "https://opticasuarezjaen.es/blog" }];
}

export function meta() {
  return [
    { title: "Blog de Salud Visual y Óptica en Jaén | Óptica Suárez" },
    {
      name: "description",
      content:
        "Descubre consejos de salud visual, neurodesarrollo infantil y novedades en optometría. Blog de Óptica Suárez en Jaén: información útil sobre visión y bienestar ocular para todas las edades.",
    },
    {
      name: "keywords",
      content:
        "óptica en Jaén, ópticas Jaén, optometría Jaén, revisión visual Jaén, salud visual Jaén, lentes de contacto Jaén, gafas Jaén, centro óptico Jaén, controlar miopía Jaén, terapia visual Jaén, especialista en visión Jaén, clínica visual Jaén, lentes progresivas Jaén, gafas de sol Jaén, óptica infantil Jaén",
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "es_ES" },
    { property: "og:site_name", content: "Óptica Suárez" },
    {
      property: "og:title",
      content: "Blog de Salud Visual y Óptica en Jaén | Óptica Suárez",
    },
    {
      property: "og:description",
      content:
        "Descubre consejos de salud visual, neurodesarrollo infantil y novedades en optometría. Blog de Óptica Suárez en Jaén: información útil sobre visión y bienestar ocular para todas las edades.",
    },
    {
      property: "og:url",
      content: "https://opticasuarezjaen.es/blog",
    },
    {
      property: "og:image",
      content: "https://opticasuarezjaen.es/og-image.jpg",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Blog de Salud Visual y Óptica en Jaén | Óptica Suárez",
    },
    {
      name: "twitter:description",
      content:
        "Descubre consejos de salud visual, neurodesarrollo infantil y novedades en optometría. Blog de Óptica Suárez en Jaén.",
    },
    { name: "robots", content: "index, follow" },
  ];
}

export async function loader() {
  const articles = getBlogPosts();
  return { articles };
}

export default function BlogRoute() {
  const breadcrumbItems = [
    { name: "Inicio", url: "https://opticasuarezjaen.es/" },
    { name: "Blog", url: "https://opticasuarezjaen.es/blog" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Blog />
    </>
  );
}
