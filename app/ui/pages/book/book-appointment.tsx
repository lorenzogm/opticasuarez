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
    id: 'phone-consultation',
    title: 'Cita telefónica',
    description:
      'Consulta telefónica para resolver dudas sobre visión y salud ocular. Perfecta para consultas rápidas y orientación inicial sobre problemas visuales.',
    icon: '📞',
    duration: '10 minutos',
  },
  {
    id: 'refraction-exam',
    title: 'Cita refracción',
    description:
      'Examen completo de agudeza visual y refracción para determinar la graduación exacta que necesitas. Incluye pruebas de miopía, hipermetropía y astigmatismo.',
    icon: '👓',
    duration: '30 minutos',
  },
  {
    id: 'visual-efficiency-eval',
    title: 'Cita Evaluación de eficacia visual',
    description:
      'Evaluación completa de todas las habilidades visuales: refracción, oculomotricidad, acomodación, vergencias y estereopsis. Un análisis profundo de tu sistema visual.',
    icon: '🔬',
    duration: '60 minutos',
  },
  {
    id: 'child-exam',
    title: 'Cita Examen Infantil',
    description:
      'Examen especializado para niños que evalúa el desarrollo visual según la edad. Detectamos ojo vago, estrabismo y problemas de aprendizaje relacionados con la visión.',
    icon: '🧸',
    duration: '60 minutos',
  },
  {
    id: 'contact-lens',
    title: 'Cita Contactología',
    description:
      'Examen refractivo completo más evaluación de características oculares para la adaptación perfecta de lentes de contacto según tus necesidades.',
    icon: '👁️',
    duration: '60 minutos',
  },
  {
    id: 'sports-vision',
    title: 'Cita Visión Deportiva',
    description:
      'Examen especializado para deportistas que buscan optimizar su rendimiento visual. Evaluamos y entrenamos las habilidades visuales específicas para tu deporte.',
    icon: '🏃',
    duration: '60 minutos',
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
      navigate(`/cita/centro?type=${selectedType}`);
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
          <ProgressIndicator currentStep={1} totalSteps={5} />
          <div className="text-center mt-4">
            <Text as="h2" variant="heading-3" className="text-gray-900">
              Selecciona el tipo de cita
            </Text>
            <Text variant="body-md" colour="light" className="mt-2">
              Elige el tipo de servicio visual que necesitas
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
