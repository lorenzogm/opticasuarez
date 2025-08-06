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
        title="BLOG"
        subtitle="ARTÍCULOS DE INTERÉS SOBRE SALUD VISUAL"
      />
      <BlogArticles articles={articles} />
      <BookAppointment
        title="Reserva tu cita hoy"
        description="Obtén un examen visual completo con nuestros especialistas. Agenda tu cita y cuida tu salud visual."
        buttonText="Reservar Cita"
      />
    </main>
  );
}