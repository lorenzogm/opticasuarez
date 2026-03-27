import { Link } from "@tanstack/react-router";
import Image from "~/components/image";

interface LocationSchedule {
  weekdays: string;
  weekdaysHours: string;
  saturday: string;
  saturdayHours: string;
}

interface LocationItem {
  name: string;
  image: string;
  imageTitle?: string;
  address: string;
  mapUrl: string;
  schedule: LocationSchedule;
  phone: string;
  phoneUrl: string;
  email: string;
  contactUrl: string;
}

interface LocationsProps {
  title: string;
  locations: LocationItem[];
}

export default function Locations({ title, locations }: LocationsProps) {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="mb-12 text-center font-bold text-3xl text-gray-900 uppercase tracking-wide sm:text-4xl">
          {title}
        </h2>

        <div className="space-y-16">
          {locations.map((location, index) => (
            <div
              className="overflow-hidden rounded-lg bg-white shadow-lg"
              key={index}
            >
              <div
                className={`grid grid-cols-1 items-center gap-0 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`aspect-video lg:aspect-square ${
                    index % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <Image
                    alt={location.name}
                    className="h-full w-full object-cover"
                    src={location.image}
                    title={location.imageTitle}
                  />
                </div>

                {/* Content */}
                <div
                  className={`flex flex-col justify-center p-8 lg:p-12 ${
                    index % 2 === 1 ? "lg:col-start-1" : ""
                  }`}
                >
                  {/* Location Name */}
                  <h3 className="mb-6 text-center font-bold text-3xl text-blue-900 uppercase">
                    {location.name}
                  </h3>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Location */}
                    <div className="space-y-3">
                      <div className="mb-4 flex items-center space-x-2">
                        <svg
                          className="h-6 w-6 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            clipRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            fillRule="evenodd"
                          />
                        </svg>
                        <h3 className="font-bold text-gray-900 text-xl uppercase">
                          UBICACIÓN
                        </h3>
                      </div>
                      <a
                        className="block text-gray-700 text-lg leading-relaxed transition-colors duration-200 hover:text-blue-600"
                        href={location.mapUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {location.address}
                      </a>
                    </div>

                    {/* Schedule */}
                    <div className="space-y-3">
                      <div className="mb-4 flex items-center space-x-2">
                        <svg
                          className="h-6 w-6 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            clipRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            fillRule="evenodd"
                          />
                        </svg>
                        <h3 className="font-bold text-gray-900 text-xl uppercase">
                          HORARIOS
                        </h3>
                      </div>
                      <div className="space-y-2 text-gray-700 text-lg leading-relaxed">
                        <div className="font-medium">
                          {location.schedule.weekdays}
                        </div>
                        <div>{location.schedule.weekdaysHours}</div>
                        <div className="font-medium">
                          {location.schedule.saturday}
                        </div>
                        <div>{location.schedule.saturdayHours}</div>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-3">
                      <div className="mb-4 flex items-center space-x-2">
                        <svg
                          className="h-6 w-6 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <h3 className="font-bold text-gray-900 text-xl uppercase">
                          CONTACTO
                        </h3>
                      </div>
                      <a
                        className="font-medium text-blue-600 text-lg transition-colors duration-200 hover:text-blue-800"
                        href={location.phoneUrl}
                      >
                        {location.phone}
                      </a>
                    </div>

                    {/* Email */}
                    <div className="space-y-3">
                      <div className="mb-4 flex items-center space-x-2">
                        <svg
                          className="h-6 w-6 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <h3 className="font-bold text-gray-900 text-xl uppercase">
                          EMAIL
                        </h3>
                      </div>
                      <Link
                        className="font-medium text-blue-600 text-lg transition-colors duration-200 hover:text-blue-800"
                        to={location.contactUrl}
                      >
                        {location.email}
                      </Link>
                    </div>
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
