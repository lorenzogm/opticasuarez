import VisionDeportiva from '../ui/pages/vision-deportiva/vision-deportiva';
import { generatePageKeywords, generateMetaKeywords } from '../ui/lib/seo-keywords';

export function meta() {
  const visionDeportivaKeywords = generatePageKeywords('vision-deportiva');
  
  return [
    {
      title:
        'Visión Deportiva | Óptica Suárez - Especialistas en rendimiento visual',
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
  ];
}

export default function VisionDeportivaPage() {
  return <VisionDeportiva />;
}
