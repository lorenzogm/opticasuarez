import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import ProgressIndicator from "../../components/progress-indicator";

// Generate available dates for the next 2 weeks
const generateAvailableDates = () => {
  const dates = [];
  const today = new Date();
  const twoWeeksFromNow = new Date(today);
  twoWeeksFromNow.setDate(today.getDate() + 14);

  const currentDate = new Date(today);
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
  const currentDate = new Date(startDate);

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
  "phone-consultation": "Cita telefónica",
  "refraction-exam": "Cita refracción",
  "visual-efficiency-eval": "Cita Evaluación de eficacia visual",
  "child-exam": "Cita Examen Infantil",
  "contact-lens": "Cita Contactología",
  "sports-vision": "Cita Visión Deportiva",
};

export default function DateTimeSelection() {
  const searchParams = useSearch({ strict: false }) as Record<string, string>;
  const navigate = useNavigate();
  const appointmentType = searchParams.type || "";
  const location = searchParams.location || "";
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const availableDates = generateAvailableDates();
  const calendarWeeks = generateCalendarWeeks();

  const formatDate = (date: Date) =>
    date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const isDateAvailable = (date: Date) =>
    availableDates.some(
      (availableDate) => availableDate.toDateString() === date.toDateString()
    );

  const isDateSelected = (date: Date) =>
    selectedDate && selectedDate.toDateString() === date.toDateString();

  const handleContinue = () => {
    if (selectedDate && selectedPeriod) {
      navigate({
        to: "/cita/contacto",
        search: {
          type: appointmentType,
          location,
          date: selectedDate.toISOString(),
          period: selectedPeriod,
        },
      });
    }
  };

  const canContinue = selectedDate && selectedPeriod;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              className="flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-800"
              search={{ type: appointmentType }}
              to="/cita/centro"
            >
              ← Volver
            </Link>
            <div className="text-right">
              <h1 className="font-semibold text-gray-900 text-xl">
                Óptica Suárez
              </h1>
              <p className="text-gray-600 text-sm">Reservar cita</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <ProgressIndicator currentStep={3} totalSteps={5} />
          <div className="mt-4 text-center">
            <h2 className="font-bold text-2xl text-gray-900">
              Selecciona fecha y hora
            </h2>
            <p className="mt-2 text-gray-600">
              Tipo de cita:{" "}
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

        <div className="grid gap-8 md:grid-cols-2">
          {/* Date Selection - Calendar View */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 text-lg">
              Fechas disponibles
            </h3>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              {/* Calendar Header */}
              <div className="mb-2 grid grid-cols-7 gap-1">
                {["L", "M", "X", "J", "V", "S", "D"].map((day) => (
                  <div
                    className="p-2 text-center font-medium text-gray-600 text-xs uppercase"
                    key={day}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Body */}
              <div className="space-y-1">
                {calendarWeeks.map((week, weekIndex) => (
                  <div className="grid grid-cols-7 gap-1" key={weekIndex}>
                    {week.map((day, dayIndex) => {
                      const isAvailable = isDateAvailable(day.date);
                      const isSelected = isDateSelected(day.date);

                      return (
                        <button
                          className={`min-h-[2.5rem] rounded-md p-2 text-sm transition-all duration-200 ${
                            isSelected
                              ? "bg-blue-600 font-medium text-white"
                              : isAvailable
                                ? "border border-gray-200 bg-white text-gray-900 hover:border-blue-300 hover:bg-blue-50"
                                : "cursor-not-allowed text-gray-300"
                          }
                            ${day.isInRange ? "" : "invisible"}
                          `}
                          disabled={!isAvailable}
                          key={dayIndex}
                          onClick={() =>
                            isAvailable ? setSelectedDate(day.date) : undefined
                          }
                        >
                          {day.date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-4 border-gray-100 border-t pt-3">
                <div className="flex flex-wrap gap-3 text-gray-600 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded bg-blue-600" />
                    <span>Seleccionado</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded border border-gray-200 bg-white" />
                    <span>Disponible</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded bg-gray-100" />
                    <span>No disponible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Time Period Selection */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 text-lg">
              Horario preferido
              {selectedDate && (
                <span className="mt-1 block font-normal text-gray-600 text-sm">
                  {formatDate(selectedDate)}
                </span>
              )}
            </h3>

            {selectedDate ? (
              <div className="space-y-2">
                <button
                  className={`w-full rounded-lg border-2 p-4 text-left transition-all duration-200 ${
                    selectedPeriod === "morning"
                      ? "border-blue-600 bg-blue-50 text-blue-900"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  }`}
                  onClick={() => setSelectedPeriod("morning")}
                >
                  <div className="font-medium">Mañana</div>
                  <div className="text-gray-600 text-sm">9:30 - 13:00</div>
                </button>
                <button
                  className={`w-full rounded-lg border-2 p-4 text-left transition-all duration-200 ${
                    selectedPeriod === "afternoon"
                      ? "border-blue-600 bg-blue-50 text-blue-900"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  }`}
                  onClick={() => setSelectedPeriod("afternoon")}
                >
                  <div className="font-medium">Tarde</div>
                  <div className="text-gray-600 text-sm">17:00 - 20:00</div>
                </button>
              </div>
            ) : (
              <div className="text-gray-500 italic">
                Selecciona una fecha para elegir el horario
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-between">
          <Link
            className="px-6 py-3 text-gray-600 transition-colors hover:text-gray-800"
            to="/cita"
          >
            Volver
          </Link>
          <button
            className={`rounded-lg px-8 py-3 font-medium transition-all duration-200 ${
              canContinue
                ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                : "cursor-not-allowed bg-gray-200 text-gray-400"
            }`}
            disabled={!canContinue}
            onClick={handleContinue}
          >
            Continuar
          </button>
        </div>
      </main>
    </div>
  );
}
