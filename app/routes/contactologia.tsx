import Contactologia from '../ui/pages/contactologia/contactologia';

export function meta() {
  return [
    { title: 'Contactología | Óptica Suárez - Especialistas en lentes de contacto' },
    {
      name: 'description',
      content:
        'Descubre nuestros servicios de contactología en Óptica Suárez. Especialistas en lentes de contacto, adaptación personalizada y seguimiento profesional en Jaén.',
    },
  ];
}

export default function ContactologiaPage() {
  return <Contactologia />;
}