import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import ProgressIndicator from '../../components/progress-indicator';

// Generate available dates for the next 30 days (excluding weekends)
const generateAvailableDates = () => {
  const dates = [];
  const today = new Date();
  let currentDate = new Date(today);

  // Start from tomorrow
  currentDate.setDate(currentDate.getDate() + 1);

  while (dates.length < 20) {
    // Skip weekends (Saturday = 6, Sunday = 0)
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      dates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

// Available time slots
const timeSlots = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
];

const appointmentTypes = {
  'visual-stress': 'Apoyo para Estrés Visual',
  'vision-loss-support': 'Apoyo por Pérdida de Visión',
  'low-vision-rehabilitation': 'Rehabilitación de Baja Visión',
};

export default function DateTimeSelection() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const appointmentType = searchParams.get('type') || '';
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const availableDates = generateAvailableDates();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateShort = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      const params = new URLSearchParams();
      params.set('type', appointmentType);
      params.set('date', selectedDate.toISOString());
      params.set('time', selectedTime);
      navigate(`/book/step3?${params.toString()}`);
    }
  };

  const canContinue = selectedDate && selectedTime;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/book"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2 transition-colors"
            >
              ← Volver
            </Link>
            <div className="text-right">
              <h1 className="text-xl font-semibold text-gray-900">
                Óptica Suárez
              </h1>
              <p className="text-sm text-gray-600">Reservar cita</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <ProgressIndicator currentStep={2} totalSteps={4} />
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Selecciona fecha y hora
            </h2>
            <p className="text-gray-600 mt-2">
              Tipo de cita:{' '}
              <span className="font-medium">
                {
                  appointmentTypes[
                    appointmentType as keyof typeof appointmentTypes
                  ]
                }
              </span>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Date Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Fechas disponibles
            </h3>
            <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
              {availableDates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`p-3 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedDate &&
                    selectedDate.toDateString() === date.toDateString()
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="font-medium">{formatDateShort(date)}</div>
                  <div className="text-sm text-gray-600 capitalize">
                    {formatDate(date)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Horarios disponibles
              {selectedDate && (
                <span className="block text-sm font-normal text-gray-600 mt-1">
                  {formatDate(selectedDate)}
                </span>
              )}
            </h3>

            {!selectedDate ? (
              <div className="text-gray-500 italic">
                Selecciona una fecha para ver los horarios disponibles
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 text-center rounded-lg border-2 transition-all duration-200 ${
                      selectedTime === time
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Link
            to="/book"
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Volver
          </Link>
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
              canContinue
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continuar
          </button>
        </div>
      </main>
    </div>
  );
}
