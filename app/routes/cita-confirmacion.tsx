import Confirmation from '../ui/pages/book/confirmation';
import { sendBookingEmails } from '../actions/send-booking-emails';

export function meta() {
  return [
    { title: 'Confirmar Cita - Óptica Suárez' },
    {
      name: 'description',
      content: 'Revisa y confirma los detalles de tu cita en Óptica Suárez.',
    },
  ];
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  
  const bookingDetails = {
    appointmentType: formData.get('appointmentType') as string,
    location: formData.get('location') as string,
    date: formData.get('date') as string,
    period: formData.get('period') as string,
    name: formData.get('name') as string,
    age: formData.get('age') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    observations: formData.get('observations') as string,
  };

  const result = await sendBookingEmails(bookingDetails);
  return result;
}

export default function CitaConfirmacion() {
  return <Confirmation />;
}