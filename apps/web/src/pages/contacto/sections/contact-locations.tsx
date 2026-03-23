import { Button } from "../../../components/button";
import Image from "../../../components/image";
import { Text } from "../../../components/text";

interface LocationSchedule {
  weekdays: string;
  weekdaysHours: string;
  saturday: string;
  saturdayHours: string;
}

interface LocationItem {
  name: string;
  image: string;
  address: string;
  schedule: LocationSchedule;
  phone: string;
  phoneUrl: string;
  whatsappUrl: string;
  email: string;
  mapUrl: string;
}

interface ContactLocationsProps {
  title: string;
  subtitle: string;
  locations: LocationItem[];
}

export default function ContactLocations({
  title,
  subtitle,
  locations,
}: ContactLocationsProps) {
  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <Text
            align="center"
            as="h2"
            className="mb-4 uppercase tracking-wide"
            variant="heading-2"
          >
            {title}
          </Text>
          <Text align="center" className="mx-auto max-w-2xl" variant="body-lg">
            {subtitle}
          </Text>
        </div>

        <div className="space-y-12">
          {locations.map((location, index) => (
            <div
              className="overflow-hidden rounded-lg bg-white shadow-lg"
              key={index}
            >
              <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
                {/* Image */}
                <div className="aspect-video lg:aspect-square">
                  <Image
                    alt={location.name}
                    className="h-full w-full object-cover"
                    src={location.image}
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <Text
                    as="h3"
                    className="mb-6 text-blue-900 uppercase"
                    variant="heading-3"
                  >
                    {location.name}
                  </Text>

                  <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Location */}
                    <div className="space-y-2">
                      <div className="mb-3 flex items-center space-x-2">
                        <svg
                          className="h-5 w-5 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            clipRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            fillRule="evenodd"
                          />
                        </svg>
                        <Text className="uppercase">UBICACIÓN</Text>
                      </div>
                      <Text>{location.address}</Text>
                    </div>

                    {/* Schedule */}
                    <div className="space-y-2">
                      <div className="mb-3 flex items-center space-x-2">
                        <svg
                          className="h-5 w-5 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            clipRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            fillRule="evenodd"
                          />
                        </svg>
                        <Text className="uppercase">HORARIOS</Text>
                      </div>
                      <div className="space-y-1">
                        <Text>{location.schedule.weekdays}</Text>
                        <Text variant="body-sm">
                          {location.schedule.weekdaysHours}
                        </Text>
                        <Text>{location.schedule.saturday}</Text>
                        <Text variant="body-sm">
                          {location.schedule.saturdayHours}
                        </Text>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-2">
                      <div className="mb-3 flex items-center space-x-2">
                        <svg
                          className="h-5 w-5 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <Text className="uppercase">TELÉFONO</Text>
                      </div>
                      <a
                        className="font-medium text-blue-600 hover:text-blue-800"
                        href={location.phoneUrl}
                      >
                        {location.phone}
                      </a>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <div className="mb-3 flex items-center space-x-2">
                        <svg
                          className="h-5 w-5 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <Text className="uppercase">EMAIL</Text>
                      </div>
                      <a
                        className="break-all font-medium text-blue-600 hover:text-blue-800"
                        href={`mailto:${location.email}`}
                      >
                        {location.email}
                      </a>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button href={location.whatsappUrl} variant="primary">
                      WhatsApp
                    </Button>
                    <Button href={location.phoneUrl} variant="primary">
                      Llamar
                    </Button>
                    <Button href={location.mapUrl} variant="primary">
                      Ver en Google Maps
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
