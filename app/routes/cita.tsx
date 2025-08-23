import BookAppointment from '../ui/pages/book/book-appointment';

export function meta() {
  return [
    { title: 'Reservar Cita - Óptica Suárez' },
    {
      name: 'description',
      content:
        'Reserva tu cita para servicios ópticos especializados en Óptica Suárez.',
    },
  ];
}

export default function Cita() {
  return <BookAppointment />;
}
