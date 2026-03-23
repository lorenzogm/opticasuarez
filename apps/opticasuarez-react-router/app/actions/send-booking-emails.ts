import { Resend } from 'resend';

interface BookingDetails {
  appointmentType: string;
  location: string;
  date: string;
  period: string;
  name: string;
  age: string;
  phone: string;
  email: string;
  observations: string;
}

// Initialize Resend only if API key is available (avoids build errors)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const appointmentTypes = {
  'phone-consultation': 'Cita telefónica',
  'refraction-exam': 'Cita refracción',
  'visual-efficiency-eval': 'Cita Evaluación de eficacia visual',
  'child-exam': 'Cita Examen Infantil',
  'contact-lens': 'Cita Contactología',
  'sports-vision': 'Cita Visión Deportiva',
};

const appointmentDurations = {
  'phone-consultation': '10 minutos',
  'refraction-exam': '30 minutos',
  'visual-efficiency-eval': '60 minutos',
  'child-exam': '60 minutos',
  'contact-lens': '60 minutos',
  'sports-vision': '60 minutos',
};

const locations = {
  centro: {
    name: 'Óptica Suárez Centro',
    address: 'Paseo de la Estación 12, Jaén (23003-Jaén)',
    email: 'centro@opticasuarezjaen.es',
  },
  bulevar: {
    name: 'Óptica Suárez Bulevar',
    address: 'Calle Canarias 6, Jaén (23009 - Jaén)',
    email: 'bulevar@opticasuarezjaen.es',
  },
};

const periods = {
  morning: 'Mañana (9:30-13:00)',
  afternoon: 'Tarde (17:00-20:00)',
};

export async function sendBookingEmails(bookingDetails: BookingDetails) {
  try {
    const selectedLocation = locations[bookingDetails.location as keyof typeof locations];
    const selectedDate = new Date(bookingDetails.date);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    // Email content for Óptica Suárez
    const opticaEmailContent = `
Nueva cita reservada en Óptica Suárez

Detalles de la cita:
- Tipo de servicio: ${appointmentTypes[bookingDetails.appointmentType as keyof typeof appointmentTypes]}
- Duración: ${appointmentDurations[bookingDetails.appointmentType as keyof typeof appointmentDurations]}
- Centro: ${selectedLocation?.name || 'No especificado'}
- Dirección: ${selectedLocation?.address || ''}
- Fecha: ${formatDate(selectedDate)}
- Horario: ${periods[bookingDetails.period as keyof typeof periods] || bookingDetails.period}

Datos del cliente:
- Nombre: ${bookingDetails.name}
- Edad: ${bookingDetails.age} años
- Teléfono: ${bookingDetails.phone}
- Email: ${bookingDetails.email}
${bookingDetails.observations ? `- Observaciones: ${bookingDetails.observations}` : ''}

Reserva realizada el: ${new Date().toLocaleString('es-ES')}
    `;

    // Email content for the customer
    const customerEmailContent = `
¡Gracias por tu reserva en Óptica Suárez!

Hola ${bookingDetails.name},

Tu cita ha sido confirmada exitosamente. Aquí tienes los detalles:

Detalles de tu cita:
- Tipo de servicio: ${appointmentTypes[bookingDetails.appointmentType as keyof typeof appointmentTypes]}
- Centro: ${selectedLocation?.name || 'No especificado'}
- Dirección: ${selectedLocation?.address || ''}
- Fecha: ${formatDate(selectedDate)}
- Horario: ${periods[bookingDetails.period as keyof typeof periods] || bookingDetails.period}

Información importante:
• Llega 10 minutos antes de tu cita
• Si necesitas cancelar o modificar tu cita, contacta con nosotros
• Recuerda traer tu DNI y cualquier gafa o lentilla que uses actualmente

Si tienes alguna pregunta, no dudes en contactarnos:
- Teléfono: ${bookingDetails.location === 'centro' ? '953 22 00 00' : '953 27 00 00'}
- Email: ${selectedLocation?.email}

¡Te esperamos!

Óptica Suárez
    `;

    // Check if Resend is available (API key provided)
    if (!resend) {
      console.log('RESEND_API_KEY not found. Email sending is disabled.');
      console.log(`Email que se enviaría a optica@lorenzogm.com:`);
      console.log(opticaEmailContent);
      console.log(`\nEmail que se enviaría a ${bookingDetails.email}:`);
      console.log(customerEmailContent);
      return { success: true };
    }

    // Send email to Óptica Suárez
    console.log('Attempting to send email to Óptica Suárez...');
    const opticaEmailPayload = {
      from: 'Óptica Suárez <no-reply@opticasuarezjaen.es>',
      to: ['optica@lorenzogm.com'],
      subject: 'Nueva cita reservada - Óptica Suárez',
      text: opticaEmailContent.trim(),
    };
    console.log('Optica email payload:', JSON.stringify(opticaEmailPayload, null, 2));
    
    const opticaEmailResult = await resend.emails.send(opticaEmailPayload);
    console.log('Optica email result:', JSON.stringify(opticaEmailResult, null, 2));

    // Send confirmation email to customer
    console.log(`Attempting to send confirmation email to customer: ${bookingDetails.email}...`);
    const customerEmailPayload = {
      from: 'Óptica Suárez <no-reply@opticasuarezjaen.es>',
      to: [bookingDetails.email],
      subject: 'Confirmación de cita - Óptica Suárez',
      text: customerEmailContent.trim(),
    };
    console.log('Customer email payload:', JSON.stringify(customerEmailPayload, null, 2));
    
    const customerEmailResult = await resend.emails.send(customerEmailPayload);
    console.log('Customer email result:', JSON.stringify(customerEmailResult, null, 2));

    console.log(`Emails sent successfully to optica@lorenzogm.com and ${bookingDetails.email}`);
    console.log('Optica email ID:', opticaEmailResult.data?.id);
    console.log('Customer email ID:', customerEmailResult.data?.id);

    return { success: true };
  } catch (error) {
    console.error('Error sending booking emails:', error);
    
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // If it's a Resend API error, log the response details
    if (error && typeof error === 'object' && 'message' in error) {
      console.error('API error details:', JSON.stringify(error, null, 2));
    }
    
    return { 
      success: false, 
      error: 'Ha ocurrido un error al enviar los emails de confirmación.' 
    };
  }
}