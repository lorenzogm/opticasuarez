import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import ProgressIndicator from '../../components/progress-indicator';

// Generate available dates for the next 2 weeks
const generateAvailableDates = () => {
  const dates = [];
  const today = new Date();
  const twoWeeksFromNow = new Date(today);
  twoWeeksFromNow.setDate(today.getDate() + 14);
  
  let currentDate = new Date(today);
  // Start from tomorrow
  currentDate.setDate(currentDate.getDate() + 1);

  while (currentDate <= twoWeeksFromNow) {
    // Skip weekends (Saturday = 6, Sunday = 0)
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      dates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

// Generate calendar weeks for the next 2 weeks
const generateCalendarWeeks = () => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + 1); // Start from tomorrow
  
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 14); // 2 weeks from now
  
  const weeks = [];
  let currentDate = new Date(startDate);
  
  // Find the start of the week (Monday)
  const dayOfWeek = currentDate.getDay();
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Sunday is 0, should be 6 days from Monday
  currentDate.setDate(currentDate.getDate() - daysFromMonday);
  
  while (currentDate <= endDate) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      const isInRange = date >= startDate && date <= endDate;
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isAvailable = isInRange && !isWeekend;
      const isPast = date < startDate;
      
      week.push({
        date: new Date(date),
        isAvailable,
        isPast,
        isInRange,
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(week);
    
    // Stop if we've covered our range
    if (currentDate > endDate) break;
  }
  
  return weeks;
};

const appointmentTypes = {
  'phone-consultation': 'Cita telefónica',
  'refraction-exam': 'Cita refracción',
  'visual-efficiency-eval': 'Cita Evaluación de eficacia visual',
  'child-exam': 'Cita Examen Infantil',
  'contact-lens': 'Cita Contactología',
  'sports-vision': 'Cita Visión Deportiva',
};

export default function DateTimeSelection() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const appointmentType = searchParams.get('type') || '';
  const location = searchParams.get('location') || '';
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const availableDates = generateAvailableDates();
  const calendarWeeks = generateCalendarWeeks();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isDateAvailable = (date: Date) => {
    return availableDates.some(availableDate => 
      availableDate.toDateString() === date.toDateString()
    );
  };

  const isDateSelected = (date: Date) => {
    return selectedDate && selectedDate.toDateString() === date.toDateString();
  };

  const handleContinue = () => {
    if (selectedDate && selectedPeriod) {
      const params = new URLSearchParams();
      params.set('type', appointmentType);
      params.set('location', location);
      params.set('date', selectedDate.toISOString());
      params.set('period', selectedPeriod);
      navigate(`/cita/contacto?${params.toString()}`);
    }
  };

  const canContinue = selectedDate && selectedPeriod;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to={`/cita/centro?type=${appointmentType}`}
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
          <ProgressIndicator currentStep={3} totalSteps={5} />
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
          {/* Date Selection - Calendar View */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Fechas disponibles
            </h3>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              {/* Calendar Header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
                  <div key={day} className="p-2 text-center text-xs font-medium text-gray-600 uppercase">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Body */}
              <div className="space-y-1">
                {calendarWeeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-7 gap-1">
                    {week.map((day, dayIndex) => {
                      const isAvailable = isDateAvailable(day.date);
                      const isSelected = isDateSelected(day.date);
                      
                      return (
                        <button
                          key={dayIndex}
                          onClick={() => isAvailable ? setSelectedDate(day.date) : undefined}
                          disabled={!isAvailable}
                          className={`
                            p-2 text-sm rounded-md transition-all duration-200 min-h-[2.5rem]
                            ${isSelected 
                              ? 'bg-blue-600 text-white font-medium' 
                              : isAvailable 
                                ? 'bg-white hover:bg-blue-50 text-gray-900 border border-gray-200 hover:border-blue-300' 
                                : 'text-gray-300 cursor-not-allowed'
                            }
                            ${!day.isInRange ? 'invisible' : ''}
                          `}
                        >
                          {day.date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-600 rounded"></div>
                    <span>Seleccionado</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-white border border-gray-200 rounded"></div>
                    <span>Disponible</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-100 rounded"></div>
                    <span>No disponible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Time Period Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Horario preferido
              {selectedDate && (
                <span className="block text-sm font-normal text-gray-600 mt-1">
                  {formatDate(selectedDate)}
                </span>
              )}
            </h3>

            {!selectedDate ? (
              <div className="text-gray-500 italic">
                Selecciona una fecha para elegir el horario
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedPeriod('morning')}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedPeriod === 'morning'
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="font-medium">Mañana</div>
                  <div className="text-sm text-gray-600">9:00 - 12:00</div>
                </button>
                <button
                  onClick={() => setSelectedPeriod('afternoon')}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedPeriod === 'afternoon'
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="font-medium">Tarde</div>
                  <div className="text-sm text-gray-600">17:00 - 20:00</div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Link
            to="/cita"
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
