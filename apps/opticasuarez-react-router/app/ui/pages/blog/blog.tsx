import { useLoaderData } from "react-router";
import type { BlogPost } from "../../lib/blog";
import BookAppointment from "../../sections/book-appointment";
import BlogArticles from "./sections/blog-articles";
import BlogHero from "./sections/blog-hero";

interface LoaderData {
  articles: BlogPost[];
}

export default function Blog() {
  const { articles } = useLoaderData<LoaderData>();

  return (
    <main>
      <BlogHero
        subtitle="ARTÍCULOS DE INTERÉS SOBRE SALUD VISUAL"
        title="Blog de Optica y Optometría"
      />
      <BlogArticles articles={articles} />
      <BookAppointment
        buttonText="Reservar Cita"
        description="Obtén un examen visual completo en Jaén. Agenda tu cita y cuida tu salud visual con Óptica Suárez"
        title="Reserva tu cita en nuestra óptica de Jaén"
      />
    </main>
  );
}
