import { Button } from "../components/button";
import Image from "../components/image";
import { Text } from "../components/text";

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
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {locations.map((location, index) => (
            <div className="text-center" key={index}>
              <figure className="mb-6">
                <a
                  className="block"
                  href={location.mapLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    alt={location.name}
                    className="h-64 w-full rounded-lg object-cover shadow-lg transition-shadow duration-300 hover:shadow-xl"
                    src={location.image}
                  />
                </a>
              </figure>

              <div>
                <Text
                  as="h3"
                  className="mb-4 text-gray-900"
                  variant="heading-3"
                >
                  <a
                    className="transition-colors duration-300 hover:text-blue-800"
                    href={location.mapLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {location.name}
                  </a>
                </Text>

                <Button
                  className="mt-4"
                  href={location.mapLink}
                  variant="primary"
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
