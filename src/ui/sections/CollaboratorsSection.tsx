import { PARTNER_IMAGES } from '../../assets/images'

export function CollaboratorsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-blue-800 text-[31.5px] font-normal leading-[1.2] mb-4" style={{ fontFamily: 'Delius, serif' }}>
            COLABORAMOS CON
          </h2>
          <p className="text-gray-600 text-[16.8px] leading-[1.5] max-w-2xl mx-auto">
            Contamos con el apoyo del Kit Digital del Gobierno de España para modernizar 
            nuestros servicios y ofrecerte la mejor experiencia digital.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <img 
              src={PARTNER_IMAGES.kitDigital}
              alt="Kit Digital - Digitalización de empresas españolas - Óptica Suárez"
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
