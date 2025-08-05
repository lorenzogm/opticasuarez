import ContactDetails from '../ui/pages/book/contact-details';

export function meta() {
  return [
    { title: 'Datos de Contacto - Óptica Suárez' },
    {
      name: 'description',
      content:
        'Introduce tus datos de contacto para la cita en Óptica Suárez.',
    },
  ];
}

export default function BookStep3() {
  return <ContactDetails />;
}