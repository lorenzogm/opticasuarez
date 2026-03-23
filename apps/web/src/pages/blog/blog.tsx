import BlogHero from './sections/blog-hero';
import BlogArticles from './sections/blog-articles';
import BookAppointment from '../../sections/book-appointment';
import type { BlogPost } from '../../lib/blog';

interface BlogProps {
  articles: BlogPost[];
}

export default function Blog(props: BlogProps) {
  return (
    <main>
      <BlogHero
        title="Blog de Optica y Optometría"
        subtitle="ARTÍCULOS DE INTERÉS SOBRE SALUD VISUAL"
      />
      <BlogArticles articles={props.articles} />
      <BookAppointment
        title="Reserva tu cita en nuestra óptica de Jaén"
        description="Obtén un examen visual completo en Jaén. Agenda tu cita y cuida tu salud visual con Óptica Suárez"
        buttonText="Reservar Cita"
      />
    </main>
  );
}
