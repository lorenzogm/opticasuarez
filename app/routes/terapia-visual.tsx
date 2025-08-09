import TerapiaVisual from '../ui/pages/terapia-visual/terapia-visual';
import { BreadcrumbSchema } from '../ui/components/structured-data';
import { generatePageKeywords, generateMetaKeywords } from '../ui/lib/seo-keywords';

export function meta() {
  const terapiaVisualKeywords = generatePageKeywords('terapia-visual');
  
  return [
    {
      title:
        'Terapia Visual | Óptica Suárez - Entrenamiento visual personalizado',
    },
    {
      name: 'description',
      content:
        'Corrige Ojo Vago, estrabismo, problemas de lectura-escritura. Con la terapia visual comportamental puedes mejorar tu rendimiento visual.',
    },
    {
      name: 'keywords',
      content: generateMetaKeywords(terapiaVisualKeywords),
    },
    {
      property: 'og:title',
      content: 'Terapia Visual | Óptica Suárez - Entrenamiento visual personalizado',
    },
    {
      property: 'og:description',
      content: 'Corrige Ojo Vago, estrabismo, problemas de lectura-escritura. Con la terapia visual comportamental puedes mejorar tu rendimiento visual.',
    },
    {
      property: 'og:url',
      content: 'https://opticasuarezjaen.es/terapia-visual',
    },
    { name: 'robots', content: 'index, follow' },
    { rel: 'canonical', href: 'https://opticasuarezjaen.es/terapia-visual' },
  ];
}

export default function TerapiaVisualPage() {
  const breadcrumbItems = [
    { name: 'Inicio', url: 'https://opticasuarezjaen.es/' },
    { name: 'Servicios', url: 'https://opticasuarezjaen.es/servicios' },
    { name: 'Terapia Visual', url: 'https://opticasuarezjaen.es/terapia-visual' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <TerapiaVisual />
    </>
  );
}
