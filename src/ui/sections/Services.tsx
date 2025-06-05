import { SERVICES_DATA } from '../../assets/images';

export function Services() {
  const services = SERVICES_DATA;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <article key={index} className="relative h-[425px] bg-white rounded-lg overflow-hidden group cursor-pointer">
              {/* Service Image */}
              <div className="relative h-full">
                <img 
                  src={service.image} 
                  alt={service.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>
                
                {/* Service Title */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-[25px] font-serif leading-tight text-center whitespace-pre-line">
                    {service.title}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
