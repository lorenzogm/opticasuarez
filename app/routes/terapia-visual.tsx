import TerapiaVisual from '../ui/pages/terapia-visual/terapia-visual';
import { BreadcrumbSchema } from '../ui/components/structured-data';
import {
  generatePageKeywords,
  generateMetaKeywords,
} from '../ui/lib/seo-keywords';

export function meta() {
  const terapiaVisualKeywords = generatePageKeywords('terapia-visual');

  return [
    {
      title:
        'Terapia Visual en Jaén para Ojo Vago y Estrabismo | Óptica Suárez',
    },
    {
      name: 'description',
      content:
        'Mejora tu sistema visual con terapia visual en Jaén. En Óptica Suárez ayudamos a niños y adultos a mejorar ojo vago, estrabismo y habilidades visuales para un mayor confort y rendimiento.',
    },
    {
      name: 'keywords',
      content: generateMetaKeywords(terapiaVisualKeywords),
    },
    {
      property: 'og:title',
      content:
        'Terapia Visual en Jaén para Ojo Vago y Estrabismo | Óptica Suárez',
    },
    {
      property: 'og:description',
      content:
        'Mejora tu sistema visual con terapia visual en Jaén. En Óptica Suárez ayudamos a niños y adultos a mejorar ojo vago, estrabismo y habilidades visuales para un mayor confort y rendimiento.',
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
    {
      name: 'Terapia Visual',
      url: 'https://opticasuarezjaen.es/terapia-visual',
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <TerapiaVisual />
    </>
  );
}
