import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import ProgressIndicator from '../../components/progress-indicator';
import { Button } from '../../components/button';
import { Text } from '../../components/text';

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
    description:
      'Consultoría especializada para el manejo del estrés visual, fatiga ocular y síndrome del ojo seco causado por el uso prolongado de pantallas.',
    icon: '👁️',
    duration: '45 minutos',
  },
  {
    id: 'vision-loss-support',
    title: 'Apoyo por Pérdida de Visión',
    description:
      'Soporte emocional y práctico para adaptarse a cambios en la visión, incluyendo estrategias de afrontamiento y recursos para la vida diaria.',
    icon: '🤝',
    duration: '60 minutos',
  },
  {
    id: 'low-vision-rehabilitation',
    title: 'Rehabilitación de Baja Visión',
    description:
      'Programa integral de rehabilitación para maximizar el uso de la visión residual y aprender técnicas de adaptación para mantener la independencia.',
    icon: '🔍',
    duration: '90 minutos',
  },
];

export default function BookAppointment() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleTypeSelection = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleContinue = () => {
    if (selectedType) {
      // Navigate to step 2 with the selected appointment type
      navigate(`/book/step2?type=${selectedType}`);
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
          <ProgressIndicator currentStep={1} totalSteps={4} />
          <div className="text-center mt-4">
            <Text as="h2" variant="heading-3" className="text-gray-900">
              Selecciona el tipo de apoyo
            </Text>
            <Text variant="body-md" colour="light" className="mt-2">
              Elige el tipo de apoyo mental relacionado con la salud visual que
              necesitas
            </Text>
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
                    <Text as="h3" variant="heading-5" className="text-gray-900">
                      {type.title}
                    </Text>
                    <Text
                      variant="body-sm"
                      colour="muted"
                      className="bg-gray-100 px-2 py-1 rounded"
                    >
                      {type.duration}
                    </Text>
                  </div>
                  <Text
                    variant="body-md"
                    colour="light"
                    className="leading-relaxed"
                  >
                    {type.description}
                  </Text>
                </div>
                <div className="flex-shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      selectedType === type.id
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}
                  >
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
          <Button href="/" variant="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedType}
            variant="primary"
            className={!selectedType ? 'opacity-50 cursor-not-allowed' : ''}
          >
            Continuar
          </Button>
        </div>
      </main>
    </div>
  );
}
