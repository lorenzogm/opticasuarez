import BookAppointment from "~/components/sections/book-appointment";
import BlogArticles from "./sections/blog-articles";
import BlogHero from "./sections/blog-hero";

interface BlogProps {
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
  articles: any[];
}

export default function Blog(props: BlogProps) {
  return (
    <main>
      <BlogHero
        subtitle="ARTÍCULOS DE INTERÉS SOBRE SALUD VISUAL"
        title="Blog de Optica y Optometría"
      />
      <BlogArticles articles={props.articles} />
      <BookAppointment
        buttonText="Reservar Cita"
        description="Obtén un examen visual completo en Jaén. Agenda tu cita y cuida tu salud visual con Óptica Suárez"
        title="Reserva tu cita en nuestra óptica de Jaén"
      />
    </main>
  );
}
