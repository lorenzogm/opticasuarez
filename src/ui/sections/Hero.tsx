import { HERO_IMAGES } from '../../assets/images';

export function Hero() {
  return (
    <section className="relative h-[885px] bg-cover bg-center bg-no-repeat">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${HERO_IMAGES.main}')`
        }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/46"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-end pb-24">
        <div className="container mx-auto px-12">
          <div className="text-white max-w-3xl">
            <h2 className="text-[58px] leading-tight mb-8 font-serif">TU ÓPTICA EN JAÉN</h2>
            <h1 className="text-2xl font-serif">BIENVENIDOS A ÓPTICA SUAREZ</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
