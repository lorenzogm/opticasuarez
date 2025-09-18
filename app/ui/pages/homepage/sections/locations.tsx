import Image from '../../../components/image';
import { Link } from 'react-router';

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
    <section className="py-16 px-4 sm:px-6 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 uppercase tracking-wide">
          {title}
        </h2>

        <div className="space-y-16">
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Image */}
                <div className={`aspect-video lg:aspect-square ${
                  index % 2 === 1 ? 'lg:col-start-2' : ''
                }`}>
                  <Image
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className={`p-8 lg:p-12 flex flex-col justify-center ${
                  index % 2 === 1 ? 'lg:col-start-1' : ''
                }`}>
                  {/* Location Name */}
                  <h3 className="text-2xl font-bold text-blue-900 uppercase mb-6">
                    {location.name}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Location */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 mb-4">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <h3 className="text-xl font-bold text-gray-900 uppercase">
                          UBICACIÓN
                        </h3>
                      </div>
                      <a
                        href={location.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-lg leading-relaxed block"
                      >
                        {location.address}
                      </a>
                    </div>

                    {/* Schedule */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 mb-4">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <h3 className="text-xl font-bold text-gray-900 uppercase">
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
                      <div className="flex items-center space-x-2 mb-4">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <h3 className="text-xl font-bold text-gray-900 uppercase">
                          CONTACTO
                        </h3>
                      </div>
                      <a
                        href={location.phoneUrl}
                        className="text-blue-600 hover:text-blue-800 font-medium text-lg transition-colors duration-200"
                      >
                        {location.phone}
                      </a>
                    </div>

                    {/* Email */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 mb-4">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <h3 className="text-xl font-bold text-gray-900 uppercase">
                          EMAIL
                        </h3>
                      </div>
                      <Link
                        to={location.contactUrl}
                        className="text-blue-600 hover:text-blue-800 font-medium text-lg transition-colors duration-200"
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
