import VisionPediatrica from '../ui/pages/vision-pediatrica/vision-pediatrica';
import { BreadcrumbSchema } from '../ui/components/structured-data';
import {
  generatePageKeywords,
  generateMetaKeywords,
} from '../ui/lib/seo-keywords';

export function meta() {
  const visionPediatricaKeywords = generatePageKeywords('vision-pediatrica');

  return [
    { title: 'Visión Pediátrica en Jaén | Revisión Visual Infantil – Óptica Suárez' },
    {
      name: 'description',
      content:
        'En Óptica Suárez Jaén nos ocupamos del cuidado visual de tus hijos con revisiones personalizadas y atención experta en visión infantil.',
    },
    {
      name: 'keywords',
      content: generateMetaKeywords(visionPediatricaKeywords),
    },
    {
      property: 'og:title',
      content: 'Visión Pediátrica en Jaén | Revisión Visual Infantil – Óptica Suárez',
    },
    {
      property: 'og:description',
      content:
        'En Óptica Suárez Jaén nos ocupamos del cuidado visual de tus hijos con revisiones personalizadas y atención experta en visión infantil.',
    },
    {
      property: 'og:url',
      content: 'https://opticasuarezjaen.es/vision-pediatrica',
    },
    { name: 'robots', content: 'index, follow' },
    { rel: 'canonical', href: 'https://opticasuarezjaen.es/vision-pediatrica' },
  ];
}

export default function VisionPediatricaRoute() {
  const breadcrumbItems = [
    { name: 'Inicio', url: 'https://opticasuarezjaen.es/' },
    { name: 'Servicios', url: 'https://opticasuarezjaen.es/servicios' },
    {
      name: 'Visión Infantil',
      url: 'https://opticasuarezjaen.es/vision-pediatrica',
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <VisionPediatrica />
    </>
  );
}
