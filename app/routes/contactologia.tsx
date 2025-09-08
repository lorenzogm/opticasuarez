import Contactologia from '../ui/pages/contactologia/contactologia';
import {
  generatePageKeywords,
  generateMetaKeywords,
} from '../ui/lib/seo-keywords';

export function meta() {
  const contactologiaKeywords = generatePageKeywords('contactologia');

  return [
    {
      title:
        'Contactología | Óptica Suárez - Especialistas en lentes de contacto',
    },
    {
      name: 'description',
      content:
        'Descubre nuestros servicios de contactología en Óptica Suárez. Especialistas en lentes de contacto, adaptación personalizada y seguimiento profesional en Jaén.',
    },
    {
      name: 'keywords',
      content: generateMetaKeywords(contactologiaKeywords),
    },
    {
      property: 'og:title',
      content: 'Contactología | Óptica Suárez - Especialistas en lentes de contacto',
    },
    {
      property: 'og:description',
      content:
        'Descubre nuestros servicios de contactología en Óptica Suárez. Especialistas en lentes de contacto, adaptación personalizada y seguimiento profesional en Jaén.',
    },
    {
      property: 'og:url',
      content: 'https://opticasuarezjaen.es/contactologia',
    },
    { name: 'robots', content: 'index, follow' },
    { rel: 'canonical', href: 'https://opticasuarezjaen.es/contactologia' },
  ];
}

export default function ContactologiaPage() {
  return <Contactologia />;
}
