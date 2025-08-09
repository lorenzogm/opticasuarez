import Servicios from '../ui/pages/servicios/servicios';
import { BreadcrumbSchema } from '../ui/components/structured-data';

export function meta() {
  return [
    { title: 'Servicios - Óptica Suárez' },
    {
      name: 'description',
      content:
        '¿Conoces nuestros servicios? Entra y y fíjate en todo lo que Óptica Suárez puede ofrecerte: exámenes visuales, terapia visual, contactología y más.',
    },
    {
      property: 'og:title',
      content: 'Servicios - Óptica Suárez',
    },
    {
      property: 'og:description',
      content: '¿Conoces nuestros servicios? Entra y y fíjate en todo lo que Óptica Suárez puede ofrecerte: exámenes visuales, terapia visual, contactología y más.',
    },
    {
      property: 'og:url',
      content: 'https://opticasuarezjaen.es/servicios',
    },
    { name: 'robots', content: 'index, follow' },
    { rel: 'canonical', href: 'https://opticasuarezjaen.es/servicios' },
  ];
}

export default function ServiciosRoute() {
  const breadcrumbItems = [
    { name: 'Inicio', url: 'https://opticasuarezjaen.es/' },
    { name: 'Servicios', url: 'https://opticasuarezjaen.es/servicios' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Servicios />
    </>
  );
}
