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
        'Lentes de contacto en Jaén | Óptica Suárez',
    },
    {
      name: 'description',
      content:
        'Óptica Suárez, tu centro de contactología en Jaén. Adaptamos tus lentillas con precisión, confort y la última tecnología óptica.',
    },
    {
      name: 'keywords',
      content: generateMetaKeywords(contactologiaKeywords),
    },
    {
      property: 'og:title',
      content: 'Lentes de contacto en Jaén | Óptica Suárez',
    },
    {
      property: 'og:description',
      content:
        'Óptica Suárez, tu centro de contactología en Jaén. Adaptamos tus lentillas con precisión, confort y la última tecnología óptica.',
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
