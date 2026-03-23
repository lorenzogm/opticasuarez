import ContactoPage from '../ui/pages/contacto/contacto';
import { BreadcrumbSchema } from '../ui/components/structured-data';

export function links() {
  return [
    { rel: 'canonical', href: 'https://opticasuarezjaen.es/contacto' },
  ];
}

export function meta() {
  return [
    { title: 'Contacto - Óptica Suárez Jaén' },
    {
      name: 'description',
      content:
        '¿Tienes alguna duda o pregunta? Ponte en contacto con nosotros. Encuentra nuestra información de contacto y ubicación.',
    },
    {
      property: 'og:title',
      content: 'Contacto - Óptica Suárez Jaén',
    },
    {
      property: 'og:description',
      content:
        '¿Tienes alguna duda o pregunta? Ponte en contacto con nosotros. Encuentra nuestra información de contacto y ubicación.',
    },
    {
      property: 'og:url',
      content: 'https://opticasuarezjaen.es/contacto',
    },
    { name: 'robots', content: 'index, follow' },
  ];
}

export default function Contacto() {
  const breadcrumbItems = [
    { name: 'Inicio', url: 'https://opticasuarezjaen.es/' },
    { name: 'Contacto', url: 'https://opticasuarezjaen.es/contacto' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ContactoPage />
    </>
  );
}
