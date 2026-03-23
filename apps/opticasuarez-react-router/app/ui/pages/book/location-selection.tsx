import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import ProgressIndicator from '../../components/progress-indicator';
import { Button } from '../../components/button';
import { Text } from '../../components/text';

interface Location {
  id: string;
  name: string;
  address: string;
  mapLink: string;
}

const locations: Location[] = [
  {
    id: 'centro',
    name: 'Óptica Suárez Centro',
    address: 'Paseo de la Estación 12, Jaén (23003-Jaén)',
    mapLink: 'https://maps.google.com/?q=Paseo+de+la+Estación+12,+Jaén',
  },
  {
    id: 'bulevar',
    name: 'Óptica Suárez Bulevar',
    address: 'Calle Canarias 6, Jaén (23009 - Jaén)',
    mapLink: 'https://maps.google.com/?q=Calle+Canarias+6,+Jaén',
  },
];

// Service availability by location
const serviceAvailability = {
  centro: [
    'phone-consultation',
    'refraction-exam',
    'visual-efficiency-eval',
    'contact-lens',
  ],
  bulevar: [
    'phone-consultation',
    'refraction-exam',
    'visual-efficiency-eval',
    'contact-lens',
    'sports-vision',
    'child-exam',
  ],
};

const appointmentTypes = {
  'phone-consultation': 'Cita telefónica',
  'refraction-exam': 'Cita refracción',
  'visual-efficiency-eval': 'Cita Evaluación de eficacia visual',
  'child-exam': 'Cita Examen Infantil',
  'contact-lens': 'Cita Contactología',
  'sports-vision': 'Cita Visión Deportiva',
};

export default function LocationSelection() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const appointmentType = searchParams.get('type') || '';
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Filter locations based on service availability
  const availableLocations = locations.filter((location) =>
    serviceAvailability[location.id as keyof typeof serviceAvailability].includes(appointmentType)
  );

  const handleLocationSelection = (locationId: string) => {
    setSelectedLocation(locationId);
  };

  const handleContinue = () => {
    if (selectedLocation) {
      navigate(`/cita/horario?type=${appointmentType}&location=${selectedLocation}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to={`/cita?type=${appointmentType}`}
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
          <ProgressIndicator currentStep={2} totalSteps={5} />
          <div className="text-center mt-4">
            <Text as="h2" variant="heading-3" className="text-gray-900">
              Selecciona el centro
            </Text>
            <Text variant="body-md" colour="light" className="mt-2">
              Tipo de cita:{' '}
              <span className="font-medium">
                {appointmentTypes[appointmentType as keyof typeof appointmentTypes]}
              </span>
            </Text>
          </div>
        </div>

        {/* Location Options */}
        <div className="space-y-4 mb-8">
          {availableLocations.map((location) => (
            <div
              key={location.id}
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                selectedLocation === location.id
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }`}
              onClick={() => handleLocationSelection(location.id)}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">🏢</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <Text as="h3" variant="heading-5" className="text-gray-900">
                      {location.name}
                    </Text>
                    <a
                      href={location.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Ver en mapa 🗺️
                    </a>
                  </div>
                  <Text variant="body-md" colour="light" className="leading-relaxed">
                    {location.address}
                  </Text>
                </div>
                <div className="flex-shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      selectedLocation === location.id
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedLocation === location.id && (
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
          <Button href={`/cita?type=${appointmentType}`} variant="secondary">
            Volver
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedLocation}
            variant="primary"
            className={!selectedLocation ? 'opacity-50 cursor-not-allowed' : ''}
          >
            Continuar
          </Button>
        </div>
      </main>
    </div>
  );
}