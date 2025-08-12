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
        'Óptica Suárez, tu Centro de Optometría y Terapia Visual en Jaén, con más de más de 80 años cuidando de la salud visual. Especializados en visión infantil, Terapia Visual Comportamental, Control de Miopía, Contactología y visión deportiva.',
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
