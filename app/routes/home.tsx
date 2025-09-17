import Homepage from '../ui/pages/homepage/homepage';
import {
  generatePageKeywords,
  generateMetaKeywords,
} from '../ui/lib/seo-keywords';

export function meta() {
  const homeKeywords = generatePageKeywords('home');

  return [
    { title: 'Óptica Suárez, desde 1940 al cuidado de tu visión.' },
    {
      name: 'description',
      content:
        'Óptica Suárez en Jaén, más de 80 años cuidando tu visión. Especialistas en terapia visual, control de miopía, contactología y visión infantil.',
    },
    {
      name: 'keywords',
      content: generateMetaKeywords(homeKeywords),
    },
    { name: 'author', content: 'Óptica Suárez' },
    {
      property: 'og:title',
      content: 'Óptica Suárez, desde 1940 al cuidado de tu visión.',
    },
    {
      property: 'og:description',
      content:
        'Óptica Suárez en Jaén, más de 80 años cuidando tu visión. Especialistas en terapia visual, control de miopía, contactología y visión infantil.',
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
      content: 'Óptica Suárez, desde 1940 al cuidado de tu visión.',
    },
    {
      name: 'twitter:description',
      content:
        'Óptica Suárez en Jaén, más de 80 años cuidando tu visión. Especialistas en terapia visual, control de miopía, contactología y visión infantil.',
    },
    { name: 'robots', content: 'index, follow' },
    { rel: 'canonical', href: 'https://opticasuarezjaen.es/' },
  ];
}

export default function Home() {
  return <Homepage />;
}
