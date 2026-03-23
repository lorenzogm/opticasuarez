import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "../../components/button";
import ProgressIndicator from "../../components/progress-indicator";
import { Text } from "../../components/text";

interface AppointmentType {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
}

const appointmentTypes: AppointmentType[] = [
  {
    id: "phone-consultation",
    title: "Cita telefónica",
    description:
      "Consulta telefónica para resolver dudas sobre visión y salud ocular. Perfecta para consultas rápidas y orientación inicial sobre problemas visuales.",
    icon: "📞",
    duration: "10 minutos",
  },
  {
    id: "refraction-exam",
    title: "Cita refracción",
    description:
      "Examen completo de agudeza visual y refracción para determinar la graduación exacta que necesitas. Incluye pruebas de miopía, hipermetropía y astigmatismo.",
    icon: "👓",
    duration: "30 minutos",
  },
  {
    id: "visual-efficiency-eval",
    title: "Cita Evaluación de eficacia visual",
    description:
      "Evaluación completa de todas las habilidades visuales: refracción, oculomotricidad, acomodación, vergencias y estereopsis. Un análisis profundo de tu sistema visual.",
    icon: "🔬",
    duration: "60 minutos",
  },
  {
    id: "child-exam",
    title: "Cita Examen Infantil",
    description:
      "Examen especializado para niños que evalúa el desarrollo visual según la edad. Detectamos ojo vago, estrabismo y problemas de aprendizaje relacionados con la visión.",
    icon: "🧸",
    duration: "60 minutos",
  },
  {
    id: "contact-lens",
    title: "Cita Contactología",
    description:
      "Examen refractivo completo más evaluación de características oculares para la adaptación perfecta de lentes de contacto según tus necesidades.",
    icon: "👁️",
    duration: "60 minutos",
  },
  {
    id: "sports-vision",
    title: "Cita Visión Deportiva",
    description:
      "Examen especializado para deportistas que buscan optimizar su rendimiento visual. Evaluamos y entrenamos las habilidades visuales específicas para tu deporte.",
    icon: "🏃",
    duration: "60 minutos",
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
      navigate({ to: "/cita/centro", search: { type: selectedType } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              className="flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-800"
              to="/"
            >
              ← Volver al inicio
            </Link>
            <div className="text-right">
              <Text as="h1" className="text-gray-900" variant="heading-4">
                Óptica Suárez
              </Text>
              <Text colour="light" variant="body-sm">
                Reservar cita
              </Text>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <ProgressIndicator currentStep={1} totalSteps={5} />
          <div className="mt-4 text-center">
            <Text as="h2" className="text-gray-900" variant="heading-3">
              Selecciona el tipo de cita
            </Text>
            <Text className="mt-2" colour="light" variant="body-md">
              Elige el tipo de servicio visual que necesitas
            </Text>
          </div>
        </div>

        {/* Appointment Types */}
        <div className="mb-8 space-y-4">
          {appointmentTypes.map((type) => (
            <div
              className={`cursor-pointer rounded-lg border-2 p-6 transition-all duration-200 ${
                selectedType === type.id
                  ? "border-blue-600 bg-blue-50 shadow-md"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
              key={type.id}
              onClick={() => handleTypeSelection(type.id)}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{type.icon}</div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <Text as="h3" className="text-gray-900" variant="heading-5">
                      {type.title}
                    </Text>
                    <Text
                      className="rounded bg-gray-100 px-2 py-1"
                      colour="muted"
                      variant="body-sm"
                    >
                      {type.duration}
                    </Text>
                  </div>
                  <Text
                    className="leading-relaxed"
                    colour="light"
                    variant="body-md"
                  >
                    {type.description}
                  </Text>
                </div>
                <div className="flex-shrink-0">
                  <div
                    className={`h-5 w-5 rounded-full border-2 ${
                      selectedType === type.id
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedType === type.id && (
                      <div className="flex h-full w-full items-center justify-center rounded-full">
                        <div className="h-2 w-2 rounded-full bg-white" />
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
            className={selectedType ? "" : "cursor-not-allowed opacity-50"}
            disabled={!selectedType}
            onClick={handleContinue}
            variant="primary"
          >
            Continuar
          </Button>
        </div>
      </main>
    </div>
  );
}
