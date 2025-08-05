import { useState } from 'react';
import { Link } from 'react-router';

interface AppointmentType {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
}

const appointmentTypes: AppointmentType[] = [
  {
    id: 'visual-stress',
    title: 'Apoyo para Estrés Visual',
    description: 'Consultoría especializada para el manejo del estrés visual, fatiga ocular y síndrome del ojo seco causado por el uso prolongado de pantallas.',
    icon: '👁️',
    duration: '45 minutos'
  },
  {
    id: 'vision-loss-support',
    title: 'Apoyo por Pérdida de Visión',
    description: 'Soporte emocional y práctico para adaptarse a cambios en la visión, incluyendo estrategias de afrontamiento y recursos para la vida diaria.',
    icon: '🤝',
    duration: '60 minutos'
  },
  {
    id: 'low-vision-rehabilitation',
    title: 'Rehabilitación de Baja Visión',
    description: 'Programa integral de rehabilitación para maximizar el uso de la visión residual y aprender técnicas de adaptación para mantener la independencia.',
    icon: '🔍',
    duration: '90 minutos'
  }
];

export default function BookAppointment() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleTypeSelection = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleContinue = () => {
    if (selectedType) {
      // Here we would navigate to step 2 of the booking process
      alert(`Continuar con el tipo de cita: ${appointmentTypes.find(t => t.id === selectedType)?.title}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2 transition-colors"
            >
              ← Volver al inicio
            </Link>
            <div className="text-right">
              <h1 className="text-xl font-semibold text-gray-900">Óptica Suárez</h1>
              <p className="text-sm text-gray-600">Reservar cita</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div className="w-16 h-1 bg-gray-200 mx-2"></div>
              <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div className="w-16 h-1 bg-gray-200 mx-2"></div>
              <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold text-gray-900">Selecciona el tipo de apoyo</h2>
            <p className="text-gray-600 mt-2">Elige el tipo de apoyo mental relacionado con la salud visual que necesitas</p>
          </div>
        </div>

        {/* Appointment Types */}
        <div className="space-y-4 mb-8">
          {appointmentTypes.map((type) => (
            <div
              key={type.id}
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                selectedType === type.id
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }`}
              onClick={() => handleTypeSelection(type.id)}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{type.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{type.title}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {type.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{type.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    selectedType === type.id
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedType === type.id && (
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </Link>
          <button
            onClick={handleContinue}
            disabled={!selectedType}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
              selectedType
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