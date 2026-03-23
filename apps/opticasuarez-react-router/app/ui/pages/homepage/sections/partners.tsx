import Image from "../../../components/image";

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
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="mb-12 text-center font-bold text-2xl text-gray-900 sm:text-3xl">
          {title}
        </h2>

        <div className="flex items-center justify-center">
          {partners.map((partner, index) => (
            <div className="flex justify-center" key={index}>
              <Image
                alt={partner.name}
                className="h-16 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0"
                src={partner.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
