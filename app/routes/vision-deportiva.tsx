import VisionDeportiva from '../ui/pages/vision-deportiva/vision-deportiva';
import {
  generatePageKeywords,
  generateMetaKeywords,
} from '../ui/lib/seo-keywords';

export function links() {
  return [
    { rel: 'canonical', href: 'https://opticasuarezjaen.es/vision-deportiva' },
  ];
}

export function meta() {
  const visionDeportivaKeywords = generatePageKeywords('vision-deportiva');

  return [
    {
      title:
        'Visión Deportiva en Jaén | Óptica Suárez',
    },
    {
      name: 'description',
      content:
        'Optimiza tu rendimiento deportivo con nuestros servicios de visión deportiva. Evaluaciones especializadas, entrenamiento visual y equipamiento para deportistas en Jaén.',
    },
    {
      name: 'keywords',
      content: generateMetaKeywords(visionDeportivaKeywords),
    },
    {
      property: 'og:title',
      content:
        'Visión Deportiva en Jaén | Óptica Suárez',
    },
    {
      property: 'og:description',
      content:
        'Optimiza tu rendimiento deportivo con nuestros servicios de visión deportiva. Evaluaciones especializadas, entrenamiento visual y equipamiento para deportistas en Jaén.',
    },
    {
      property: 'og:url',
      content: 'https://opticasuarezjaen.es/vision-deportiva',
    },
    { name: 'robots', content: 'index, follow' },
  ];
}

export default function VisionDeportivaPage() {
  return <VisionDeportiva />;
}
