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
        'Óptica Suárez, centro de referencia de lentillas en Jaén. Especialistas en contactología con servicio integral de adaptación, seguimiento y cuidado de lentes de contacto.',
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
        'Óptica Suárez, centro de referencia de lentillas en Jaén. Especialistas en contactología con servicio integral de adaptación, seguimiento y cuidado de lentes de contacto.',
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
