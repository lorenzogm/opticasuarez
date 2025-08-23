import { useState } from 'react';
import { Link, useSearchParams, useFetcher } from 'react-router';
import ProgressIndicator from '../../components/progress-indicator';
import { Button } from '../../components/button';
import { Text } from '../../components/text';

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
  morning: 'Mañana (9:00-12:00)',
  afternoon: 'Tarde (17:00-20:00)',
};

export default function Confirmation() {
  const [searchParams] = useSearchParams();
  const fetcher = useFetcher();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const appointmentType = searchParams.get('type') || '';
  const location = searchParams.get('location') || '';
  const dateParam = searchParams.get('date');
  const period = searchParams.get('period') || '';
  const name = searchParams.get('name') || '';
  const age = searchParams.get('age') || '';
  const phone = searchParams.get('phone') || '';
  const email = searchParams.get('email') || '';
  const observations = searchParams.get('observations') || '';

  const selectedDate = dateParam ? new Date(dateParam) : null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleConfirmBooking = () => {
    const formData = new FormData();
    formData.append('appointmentType', appointmentType);
    formData.append('location', location);
    formData.append('date', dateParam || '');
    formData.append('period', period);
    formData.append('name', name);
    formData.append('age', age);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('observations', observations);

    fetcher.submit(formData, { method: 'post' });
  };

  // Check if the action was successful
  if (fetcher.data?.success) {
    if (!isSubmitted) {
      setIsSubmitted(true);
    }
  }

  const isSubmitting = fetcher.state === 'submitting';

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
              to={`/cita/contacto?type=${appointmentType}&location=${location}&date=${dateParam}&period=${period}&name=${name}&age=${age}&phone=${phone}${email ? `&email=${email}` : ''}&observations=${observations}`}
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
          <ProgressIndicator currentStep={5} totalSteps={5} />
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

            {/* Location Details */}
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-900 mb-2">Centro</h4>
              <p className="text-gray-700">
                {locations[location as keyof typeof locations]?.name || 'No especificado'}
              </p>
              <p className="text-sm text-gray-500">
                {locations[location as keyof typeof locations]?.address || ''}
              </p>
            </div>

            {/* Date and Time */}
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-900 mb-2">Fecha y hora</h4>
              {selectedDate && (
                <p className="text-gray-700">{formatDate(selectedDate)}</p>
              )}
              <p className="text-gray-700">{periods[period as keyof typeof periods] || period}</p>
            </div>

            {/* Contact Details */}
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Datos de contacto
              </h4>
              <p className="text-gray-700">{name} ({age} años)</p>
              <p className="text-gray-700">{phone}</p>
              {email && <p className="text-gray-700">{email}</p>}
            </div>

            {/* Observations */}
            {observations && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Observaciones</h4>
                <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
                  {observations}
                </p>
              </div>
            )}
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
            href={`/cita/contacto?type=${appointmentType}&location=${location}&date=${dateParam}&period=${period}&name=${name}&age=${age}&phone=${phone}${email ? `&email=${email}` : ''}&observations=${observations}`}
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
