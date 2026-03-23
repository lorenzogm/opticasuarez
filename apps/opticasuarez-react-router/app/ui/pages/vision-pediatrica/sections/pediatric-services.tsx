import { Link } from "react-router";
import Image from "../../../components/image";
import { Text } from "../../../components/text";

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  image: string;
  imageTitle?: string;
  imageAlt?: string;
  link?: string;
}

interface PediatricServicesProps {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export default function PediatricServices({
  title,
  subtitle,
  items,
}: PediatricServicesProps) {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mb-4 font-bold text-3xl text-gray-900 uppercase tracking-tight tracking-wide">
            {title}
          </div>
          <Text className="text-gray-600" variant="body-lg">
            {subtitle}
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => {
            const content = (
              <>
                <Image
                  alt={service.imageAlt || service.title}
                  className="h-48 w-full object-cover"
                  src={service.image}
                  title={service.imageTitle}
                />
                <div className="p-6">
                  <div className="mb-3 font-semibold text-2xl text-blue-900 tracking-tight">
                    {service.title}
                  </div>
                  <Text className="text-gray-600 leading-relaxed">
                    {service.description}
                  </Text>
                </div>
              </>
            );

            return service.link ? (
              <Link
                className="block overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
                key={index}
                to={service.link}
              >
                {content}
              </Link>
            ) : (
              <div
                className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
                key={index}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
