import BookAppointment from '../ui/pages/book/book-appointment';

export function meta() {
  return [
    { title: 'Reservar Cita - Óptica Suárez' },
    {
      name: 'description',
      content:
        'Reserva tu cita para apoyo mental relacionado con la salud visual en Óptica Suárez.',
    },
  ];
}

export default function Book() {
  return <BookAppointment />;
}
