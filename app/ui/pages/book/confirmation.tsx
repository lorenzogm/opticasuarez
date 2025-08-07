import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import ProgressIndicator from '../../components/progress-indicator';
import { Button } from '../../components/button';
import { Text } from '../../components/text';

const appointmentTypes = {
  'visual-stress': 'Apoyo para Estrés Visual',
  'vision-loss-support': 'Apoyo por Pérdida de Visión',
  'low-vision-rehabilitation': 'Rehabilitación de Baja Visión',
};

const appointmentDurations = {
  'visual-stress': '45 minutos',
  'vision-loss-support': '60 minutos',
  'low-vision-rehabilitation': '90 minutos',
};

export default function Confirmation() {
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const appointmentType = searchParams.get('type') || '';
  const dateParam = searchParams.get('date');
  const time = searchParams.get('time') || '';
  const name = searchParams.get('name') || '';
  const phone = searchParams.get('phone') || '';

  const selectedDate = dateParam ? new Date(dateParam) : null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);

    try {
      // Prepare the booking data
      const bookingData = {
        appointmentType:
          appointmentTypes[appointmentType as keyof typeof appointmentTypes],
        date: selectedDate ? formatDate(selectedDate) : '',
        time: time,
        duration:
          appointmentDurations[
            appointmentType as keyof typeof appointmentDurations
          ],
        name: name,
        phone: phone,
        timestamp: new Date().toISOString(),
      };

      // Here you would normally send this data to your backend
      // For now, we'll simulate the email sending

      // Create email content
      const emailContent = `
Nueva cita reservada en Óptica Suárez

Detalles de la cita:
- Tipo de servicio: ${bookingData.appointmentType}
- Duración: ${bookingData.duration}
- Fecha: ${bookingData.date}
- Hora: ${bookingData.time}

Datos del cliente:
- Nombre: ${bookingData.name}
- Teléfono: ${bookingData.phone}

Reserva realizada el: ${new Date(bookingData.timestamp).toLocaleString('es-ES')}
      `;

      // Log the email content (in a real app, this would be sent to optica@lorenzogm.com)
      console.log('Email que se enviaría a optica@lorenzogm.com:');
      console.log(emailContent);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert(
        'Ha ocurrido un error al enviar la reserva. Por favor, inténtalo de nuevo.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <Text as="h2" variant="heading-3" className="text-gray-900 mb-4">
            ¡Cita confirmada!
          </Text>
          <Text variant="body-md" colour="light" className="mb-6">
            Tu cita ha sido reservada exitosamente. Recibirás un email de
            confirmación en breve.
          </Text>
          <Button href="/" variant="primary">
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to={`/book/step3?type=${appointmentType}&date=${dateParam}&time=${time}`}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2 transition-colors"
            >
              ← Volver
            </Link>
            <div className="text-right">
              <Text as="h1" variant="heading-4" className="text-gray-900">
                Óptica Suárez
              </Text>
              <Text variant="body-sm" colour="light">
                Reservar cita
              </Text>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <ProgressIndicator currentStep={4} totalSteps={4} />
          <div className="text-center mt-4">
            <Text as="h2" variant="heading-3" className="text-gray-900">
              Confirmar cita
            </Text>
            <Text variant="body-md" colour="light" className="mt-2">
              Revisa los detalles de tu cita antes de confirmar
            </Text>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="bg-white rounded-lg shadow-sm border p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Resumen de la cita
          </h3>

          <div className="space-y-4">
            {/* Service Details */}
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Tipo de servicio
              </h4>
              <p className="text-gray-700">
                {
                  appointmentTypes[
                    appointmentType as keyof typeof appointmentTypes
                  ]
                }
              </p>
              <p className="text-sm text-gray-500">
                Duración:{' '}
                {
                  appointmentDurations[
                    appointmentType as keyof typeof appointmentDurations
                  ]
                }
              </p>
            </div>

            {/* Date and Time */}
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-900 mb-2">Fecha y hora</h4>
              {selectedDate && (
                <p className="text-gray-700">{formatDate(selectedDate)}</p>
              )}
              <p className="text-gray-700">{time}</p>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Datos de contacto
              </h4>
              <p className="text-gray-700">{name}</p>
              <p className="text-gray-700">{phone}</p>
            </div>
          </div>

          {/* Important Information */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              Información importante
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • Recibirás un email de confirmación tras realizar la reserva
              </li>
              <li>
                • Si necesitas cancelar o modificar tu cita, contacta con
                nosotros
              </li>
              <li>• Llega 10 minutos antes de tu cita</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            href={`/book/step3?type=${appointmentType}&date=${dateParam}&time=${time}`}
            variant="secondary"
          >
            Volver
          </Button>
          <Button
            onClick={handleConfirmBooking}
            disabled={isSubmitting}
            variant="primary"
            className={isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Confirmando...
              </span>
            ) : (
              'Confirmar cita'
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}
