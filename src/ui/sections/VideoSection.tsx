export function VideoSection() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 items-center min-h-[639px]">
          {/* Video Container */}
          <div className="relative bg-black h-[471px] mx-12">
            <div className="relative w-full h-full overflow-hidden">
              {/* YouTube video placeholder */}
              <div className="absolute inset-0 bg-black">
                <img 
                  src="/api/placeholder/539/303" 
                  alt="Presentación Optica Suárez"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>

              {/* Video title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white text-lg font-normal">
                  Presentación Optica Suárez
                </h3>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-12 space-y-6">
            <h2 className="text-[42px] font-normal text-blue-800 leading-[1.2]" style={{ fontFamily: 'Delius, serif' }}>
              Somos Óptica Suárez
            </h2>
            <p className="text-gray-600 text-[16.8px] leading-[1.5] max-w-lg">
              Somos tu destino de confianza para todo lo relacionado con el
              cuidado de tus ojos. Con un equipo de profesionales dedicados y
              una amplia gama de servicios y productos de calidad, estamos aquí
              para garantizarte una experiencia visual excepcional. Desde
              exámenes de la vista hasta la selección de gafas y lentes de contacto,
              estamos comprometidos a cuidar de tu visión de la mejor manera
              posible. ¡Ven y descubre cómo podemos ayudarte a ver mejor y lucir
              genial en Óptica Suárez!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
