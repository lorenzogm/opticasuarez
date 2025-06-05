import { STORE_IMAGES } from '../../assets/images'

export function LocationsMap() {
  return (
    <>
      {/* Header Section */}
      <section className="bg-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-white text-[31.5px] font-normal leading-[1.2]" style={{ fontFamily: 'Delius, serif' }}>
            ¿DÓNDE ESTAMOS?
          </h2>
        </div>
      </section>

      {/* Bulevar Location */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 min-h-[697px]">
            {/* Location Image */}
            <div className="relative">
              <img 
                src={STORE_IMAGES.bulevar}
                alt="Centro óptico y de Terapias Visuales de Óptica Suárez en la zona del Bulevar, en Jaén"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Location Info */}
            <div className="px-12 py-16 space-y-8">
              {/* Ubicación */}
              <div className="flex items-start space-x-4">
                <div className="w-[62.77px] h-[62.77px] border-2 border-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-blue-800 text-[29.4px]">📍</span>
                </div>
                <div>
                  <h3 className="text-blue-800 text-[20.2px] font-normal leading-[1.2] mb-2" style={{ fontFamily: 'Delius, serif' }}>
                    UBICACIÓN
                  </h3>
                  <p className="text-blue-800 text-[13.4px] leading-[1.5]">
                    C. de Canarias,<br />
                    6, 23009 Jaén
                  </p>
                </div>
              </div>

              {/* Horarios */}
              <div className="flex items-start space-x-4">
                <div className="w-[62.77px] h-[62.77px] border-2 border-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-blue-800 text-[29.4px]">🕐</span>
                </div>
                <div>
                  <h3 className="text-blue-800 text-[20.2px] font-normal leading-[1.2] mb-2" style={{ fontFamily: 'Delius, serif' }}>
                    NUESTRO<br />HORARIOS
                  </h3>
                  <div className="text-blue-800 text-[13.4px] leading-[1.5] space-y-1">
                    <p>Lunes a Viernes</p>
                    <p>9:30 a 13:30 y</p>
                    <p>17:00 a 20:30</p>
                    <p>Sábados</p>
                    <p>10:00 a 13:00</p>
                  </div>
                </div>
              </div>

              {/* Contacto */}
              <div className="flex items-start space-x-4">
                <div className="w-[62.77px] h-[62.77px] border-2 border-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-blue-800 text-[29.4px]">📞</span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-blue-800 text-[20.2px] font-normal leading-[1.2]" style={{ fontFamily: 'Delius, serif' }}>
                    CONTACTA<br />CON<br />NOSOTROS
                  </h3>
                  <p className="text-blue-800 text-[13.4px] leading-[1.5]">
                    953-093-062
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-[62.77px] h-[62.77px] border border-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-blue-800 text-[29.4px]">✉️</span>
                </div>
                <div>
                  <h3 className="text-blue-800 text-[20.2px] font-normal leading-[1.2] mb-2" style={{ fontFamily: 'Delius, serif' }}>
                    ENVÍANOS<br />UN EMAIL
                  </h3>
                  <p className="text-blue-800 text-[13.4px] leading-[1.5]">
                    bulevar@opticasuarezjaen.es
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <section className="bg-blue-800 h-[84px]"></section>

      {/* Centro Location */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 min-h-[689px]">
            {/* Location Image */}
            <div className="relative">
              <img 
                src={STORE_IMAGES.centro}
                alt="Fachada de Óptica Suárez en Plaza de la estación en Jaén"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Location Info */}
            <div className="px-12 py-16 space-y-8">
              {/* Ubicación */}
              <div className="flex items-start space-x-4">
                <div className="w-[62.77px] h-[62.77px] border-2 border-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-blue-800 text-[29.4px]">📍</span>
                </div>
                <div>
                  <h3 className="text-blue-800 text-[20.2px] font-normal leading-[1.2] mb-2" style={{ fontFamily: 'Delius, serif' }}>
                    UBICACIÓN
                  </h3>
                  <p className="text-blue-800 text-[13.4px] leading-[1.5]">
                    P.º de la<br />
                    Estación, 12,<br />
                    23003 Jaén
                  </p>
                </div>
              </div>

              {/* Horarios */}
              <div className="flex items-start space-x-4">
                <div className="w-[62.77px] h-[62.77px] border-2 border-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-blue-800 text-[29.4px]">🕐</span>
                </div>
                <div>
                  <h3 className="text-blue-800 text-[20.2px] font-normal leading-[1.2] mb-2" style={{ fontFamily: 'Delius, serif' }}>
                    NUESTROS<br />HORARIOS
                  </h3>
                  <div className="text-blue-800 text-[13.4px] leading-[1.5] space-y-1">
                    <p>Lunes a Viernes</p>
                    <p>9:30 a 13:30 y<br />17:00 a 20:30</p>
                    <p>Sábados<br />10:00 a 13:00</p>
                  </div>
                </div>
              </div>

              {/* Contacto */}
              <div className="flex items-start space-x-4">
                <div className="w-[62.77px] h-[62.77px] border-2 border-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-blue-800 text-[29.4px]">📞</span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-blue-800 text-[20.2px] font-normal leading-[1.2]" style={{ fontFamily: 'Delius, serif' }}>
                    CONTACTA<br />CON<br />NOSOTROS
                  </h3>
                  <p className="text-blue-800 text-[13.4px] leading-[1.5]">
                    953-223-180
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-[62.77px] h-[62.77px] border border-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-blue-800 text-[29.4px]">✉️</span>
                </div>
                <div>
                  <h3 className="text-blue-800 text-[20.2px] font-normal leading-[1.2] mb-2" style={{ fontFamily: 'Delius, serif' }}>
                    ENVÍANOS<br />UN EMAIL
                  </h3>
                  <p className="text-blue-800 text-[13.4px] leading-[1.5]">
                    centro@opticasuarezjaen.es
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
