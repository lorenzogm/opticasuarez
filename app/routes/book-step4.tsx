import Confirmation from '../ui/pages/book/confirmation';

export function meta() {
  return [
    { title: 'Confirmar Cita - Óptica Suárez' },
    {
      name: 'description',
      content:
        'Revisa y confirma los detalles de tu cita en Óptica Suárez.',
    },
  ];
}

export default function BookStep4() {
  return <Confirmation />;
}