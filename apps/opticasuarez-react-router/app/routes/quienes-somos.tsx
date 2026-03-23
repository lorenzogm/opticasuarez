import Quienessomos from '../ui/pages/quienes-somos/quienes-somos';
import { BreadcrumbSchema } from '../ui/components/structured-data';
import {
  generatePageKeywords,
  generateMetaKeywords,
} from '../ui/lib/seo-keywords';

export function links() {
  return [
    { rel: 'canonical', href: 'https://opticasuarezjaen.es/quienes-somos' },
  ];
}

export function meta() {
  const quienesSomosKeywords = generatePageKeywords('quienes-somos', [
    'Historia óptica',
    'Equipo profesional',
    'Experiencia óptica',
    'Desde 1940',
    'Tradición familiar',
    'Optometristas Jaén',
  ]);

  return [
    { title: 'Quiénes somos | Óptica Suárez - Expertos en salud visual' },
    {
      name: 'description',
      content:
        'Desde 1940 cuidando de tu visión. Conoce nuestro equipo y trayectoria profesional de Óptica Suárez en Jaén.',
    },
    {
      name: 'keywords',
      content: generateMetaKeywords(quienesSomosKeywords),
    },
    {
      property: 'og:title',
      content: 'Quiénes somos | Óptica Suárez - Expertos en salud visual',
    },
    {
      property: 'og:description',
      content:
        'Desde 1940 cuidando de tu visión. Conoce nuestro equipo y trayectoria profesional de Óptica Suárez en Jaén.',
    },
    {
      property: 'og:url',
      content: 'https://opticasuarezjaen.es/quienes-somos',
    },
    { name: 'robots', content: 'index, follow' },
  ];
}

export default function QuienessomoPage() {
  const breadcrumbItems = [
    { name: 'Inicio', url: 'https://opticasuarezjaen.es/' },
    {
      name: '¿Quiénes Somos?',
      url: 'https://opticasuarezjaen.es/quienes-somos',
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Quienessomos />
    </>
  );
}
