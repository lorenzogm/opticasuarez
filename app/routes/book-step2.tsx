import DateTimeSelection from '../ui/pages/book/date-time';

export function meta() {
  return [
    { title: 'Seleccionar Fecha y Hora - Óptica Suárez' },
    {
      name: 'description',
      content:
        'Selecciona la fecha y hora para tu cita en Óptica Suárez.',
    },
  ];
}

export default function BookStep2() {
  return <DateTimeSelection />;
}