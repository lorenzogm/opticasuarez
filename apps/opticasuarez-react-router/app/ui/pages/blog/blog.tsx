import { useLoaderData } from 'react-router';
import BlogHero from './sections/blog-hero';
import BlogArticles from './sections/blog-articles';
import BookAppointment from '../../sections/book-appointment';
import type { BlogPost } from '../../lib/blog';

interface LoaderData {
  articles: BlogPost[];
}

export default function Blog() {
  const { articles } = useLoaderData<LoaderData>();

  return (
    <main>
      <BlogHero
        title="Blog de Optica y Optometría"
        subtitle="ARTÍCULOS DE INTERÉS SOBRE SALUD VISUAL"
      />
      <BlogArticles articles={articles} />
      <BookAppointment
        title="Reserva tu cita en nuestra óptica de Jaén"
        description="Obtén un examen visual completo en Jaén. Agenda tu cita y cuida tu salud visual con Óptica Suárez"
        buttonText="Reservar Cita"
      />
    </main>
  );
}
