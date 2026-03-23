import { Text } from '../components/text';
import { Button } from '../components/button';
import Image from '../components/image';

interface Location {
  name: string;
  image: string;
  mapLink: string;
}

interface LocationsInfoProps {
  locations: Location[];
}

export default function LocationsInfo({ locations }: LocationsInfoProps) {
  return (
    <section className="bg-white py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <div key={index} className="text-center">
              <figure className="mb-6">
                <a
                  href={location.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Image
                    src={location.image}
                    alt={location.name}
                    className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                </a>
              </figure>

              <div>
                <Text
                  as="h3"
                  variant="heading-3"
                  className="mb-4 text-gray-900"
                >
                  <a
                    href={location.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-800 transition-colors duration-300"
                  >
                    {location.name}
                  </a>
                </Text>

                <Button
                  href={location.mapLink}
                  variant="primary"
                  className="mt-4"
                >
                  Ver en el mapa
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
