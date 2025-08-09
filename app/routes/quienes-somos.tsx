import Quienessomos from '../ui/pages/quienes-somos/quienes-somos';
import { BreadcrumbSchema } from '../ui/components/structured-data';

export function meta() {
  return [
    { title: 'Quiénes somos | Óptica Suárez - Expertos en salud visual' },
    {
      name: 'description',
      content:
        'Desde 1940 cuidando de tu visión. Conoce nuestro equipo y trayectoria profesional de Óptica Suárez en Jaén.',
    },
    {
      property: 'og:title',
      content: 'Quiénes somos | Óptica Suárez - Expertos en salud visual',
    },
    {
      property: 'og:description',
      content: 'Desde 1940 cuidando de tu visión. Conoce nuestro equipo y trayectoria profesional de Óptica Suárez en Jaén.',
    },
    {
      property: 'og:url',
      content: 'https://opticasuarezjaen.es/quienes-somos',
    },
    { name: 'robots', content: 'index, follow' },
    { rel: 'canonical', href: 'https://opticasuarezjaen.es/quienes-somos' },
  ];
}

export default function QuienessomoPage() {
  const breadcrumbItems = [
    { name: 'Inicio', url: 'https://opticasuarezjaen.es/' },
    { name: '¿Quiénes Somos?', url: 'https://opticasuarezjaen.es/quienes-somos' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Quienessomos />
    </>
  );
}
