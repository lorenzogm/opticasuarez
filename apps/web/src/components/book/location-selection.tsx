import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "~/components/button";
import ProgressIndicator from "~/components/progress-indicator";
import { Text } from "~/components/text";

interface Location {
  id: string;
  name: string;
  address: string;
  mapLink: string;
}

const locations: Location[] = [
  {
    id: "centro",
    name: "Óptica Suárez Centro",
    address: "Paseo de la Estación 12, Jaén (23003-Jaén)",
    mapLink: "https://maps.google.com/?q=Paseo+de+la+Estación+12,+Jaén",
  },
  {
    id: "bulevar",
    name: "Óptica Suárez Bulevar",
    address: "Calle Canarias 6, Jaén (23009 - Jaén)",
    mapLink: "https://maps.google.com/?q=Calle+Canarias+6,+Jaén",
  },
];

// Service availability by location
const serviceAvailability = {
  centro: [
    "phone-consultation",
    "refraction-exam",
    "visual-efficiency-eval",
    "contact-lens",
  ],
  bulevar: [
    "phone-consultation",
    "refraction-exam",
    "visual-efficiency-eval",
    "contact-lens",
    "sports-vision",
    "child-exam",
  ],
};

const appointmentTypes = {
  "phone-consultation": "Cita telefónica",
  "refraction-exam": "Cita refracción",
  "visual-efficiency-eval": "Cita Evaluación de eficacia visual",
  "child-exam": "Cita Examen Infantil",
  "contact-lens": "Cita Contactología",
  "sports-vision": "Cita Visión Deportiva",
};

export default function LocationSelection() {
  const searchParams = useSearch({ strict: false }) as Record<string, string>;
  const navigate = useNavigate();
  const appointmentType = searchParams.type || "";
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Filter locations based on service availability
  const availableLocations = locations.filter((location) =>
    serviceAvailability[
      location.id as keyof typeof serviceAvailability
    ].includes(appointmentType)
  );

  const handleLocationSelection = (locationId: string) => {
    setSelectedLocation(locationId);
  };

  const handleContinue = () => {
    if (selectedLocation) {
      navigate({
        to: "/cita/horario",
        search: { type: appointmentType, location: selectedLocation },
      });
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
              search={{ type: appointmentType }}
              to="/cita"
            >
              ← Volver
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
          <ProgressIndicator currentStep={2} totalSteps={5} />
          <div className="mt-4 text-center">
            <Text as="h2" className="text-gray-900" variant="heading-3">
              Selecciona el centro
            </Text>
            <Text className="mt-2" colour="light" variant="body-md">
              Tipo de cita:{" "}
              <span className="font-medium">
                {
                  appointmentTypes[
                    appointmentType as keyof typeof appointmentTypes
                  ]
                }
              </span>
            </Text>
          </div>
        </div>

        {/* Location Options */}
        <div className="mb-8 space-y-4">
          {availableLocations.map((location) => (
            <div
              className={`cursor-pointer rounded-lg border-2 p-6 transition-all duration-200 ${
                selectedLocation === location.id
                  ? "border-blue-600 bg-blue-50 shadow-md"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
              key={location.id}
              onClick={() => handleLocationSelection(location.id)}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">🏢</div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <Text as="h3" className="text-gray-900" variant="heading-5">
                      {location.name}
                    </Text>
                    <a
                      className="text-blue-600 text-sm transition-colors hover:text-blue-800"
                      href={location.mapLink}
                      onClick={(e) => e.stopPropagation()}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Ver en mapa 🗺️
                    </a>
                  </div>
                  <Text
                    className="leading-relaxed"
                    colour="light"
                    variant="body-md"
                  >
                    {location.address}
                  </Text>
                </div>
                <div className="flex-shrink-0">
                  <div
                    className={`h-5 w-5 rounded-full border-2 ${
                      selectedLocation === location.id
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedLocation === location.id && (
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
          <Button href={`/cita?type=${appointmentType}`} variant="secondary">
            Volver
          </Button>
          <Button
            className={selectedLocation ? "" : "cursor-not-allowed opacity-50"}
            disabled={!selectedLocation}
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
