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
  ];
}

export default function Home() {
  return <Homepage />;
}
