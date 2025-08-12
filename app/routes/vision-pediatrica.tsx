import VisionPediatrica from '../ui/pages/vision-pediatrica/vision-pediatrica';
import { BreadcrumbSchema } from '../ui/components/structured-data';
import {
  generatePageKeywords,
  generateMetaKeywords,
} from '../ui/lib/seo-keywords';

export function meta() {
  const visionPediatricaKeywords = generatePageKeywords('vision-pediatrica');

  return [
    { title: 'Visión Infantil - Óptica Suárez' },
    {
      name: 'description',
      content:
        '¿A tu hijo le cuesta seguir el ritmo en clase? ¿Tiene problemas de lectura? Todo esto puede deberse a un mal desarrollo visual.',
    },
    {
      name: 'keywords',
      content: generateMetaKeywords(visionPediatricaKeywords),
    },
    {
      property: 'og:title',
      content: 'Visión Infantil - Óptica Suárez',
    },
    {
      property: 'og:description',
      content:
        '¿A tu hijo le cuesta seguir el ritmo en clase? ¿Tiene problemas de lectura? Todo esto puede deberse a un mal desarrollo visual.',
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
