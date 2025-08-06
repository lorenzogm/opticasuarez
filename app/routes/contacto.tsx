import ContactoPage from '../ui/pages/contacto/contacto';

export function meta() {
  return [
    { title: 'Contacto - Óptica Suárez Jaén' },
    { name: 'description', content: 'Contacta con Óptica Suárez Jaén. Información de contacto, ubicaciones y formulario para consultas sobre nuestros servicios de óptica y cuidado visual.' },
  ];
}

export default function Contacto() {
  return <ContactoPage />;
}