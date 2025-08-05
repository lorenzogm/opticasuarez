import Image from '../components/image';

interface PartnerItem {
  name: string;
  image: string;
}

interface PartnersProps {
  title: string;
  partners: PartnerItem[];
}

export default function Partners({ title, partners }: PartnersProps) {
  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-gray-900">
          {title}
        </h2>

        <div className="flex justify-center items-center">
          {partners.map((partner, index) => (
            <div key={index} className="flex justify-center">
              <Image
                src={partner.image}
                alt={partner.name}
                className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
