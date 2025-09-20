import Homepage from '../ui/pages/homepage/homepage';
import {
  generatePageKeywords,
  generateMetaKeywords,
} from '../ui/lib/seo-keywords';

export function meta() {
  const homeKeywords = generatePageKeywords('home');

  return [
    { title: 'Óptica Suárez, tu óptica en Jaén. Desde 1940 mirando por ti' },
    {
      name: 'description',
      content:
        'Optometria en Jaén. Más de 80 años haciendo revisión de la vista, terapia visual, control de miopía, lentes de contacto, visión infantil, ojo vago y estrabismo.',
    },
    {
      name: 'keywords',
      content: generateMetaKeywords(homeKeywords),
    },
    { name: 'author', content: 'Óptica Suárez' },
    {
      property: 'og:title',
      content: 'Óptica Suárez, tu óptica en Jaén. Desde 1940 mirando por ti',
    },
    {
      property: 'og:description',
      content:
        'Optometria en Jaén. Más de 80 años haciendo revisión de la vista, terapia visual, control de miopía, lentes de contacto, visión infantil, ojo vago y estrabismo.',
    },
    { property: 'og:type', content: 'website' },
    {
      property: 'og:url',
      content: 'https://opticasuarezjaen.es/',
    },
    {
      property: 'og:image',
      content: 'https://opticasuarezjaen.es/og-image.jpg',
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: 'Óptica Suárez, tu óptica en Jaén. Desde 1940 mirando por ti',
    },
    {
      name: 'twitter:description',
      content:
        'Optometria en Jaén. Más de 80 años haciendo revisión de la vista, terapia visual, control de miopía, lentes de contacto, visión infantil, ojo vago y estrabismo.',
    },
    { name: 'robots', content: 'index, follow' },
    { rel: 'canonical', href: 'https://opticasuarezjaen.es/' },
  ];
}

export default function Home() {
  return <Homepage />;
}
