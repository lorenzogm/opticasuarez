export function CollaboratorsSection() {
  const collaborators = [
    {
      name: "Hoya",
      logo: "/api/placeholder/150/80",
      alt: "Hoya lenses - Colaborador de Óptica Suárez"
    },
    {
      name: "Zeiss",
      logo: "/api/placeholder/150/80", 
      alt: "Carl Zeiss - Colaborador de Óptica Suárez"
    },
    {
      name: "Essilor",
      logo: "/api/placeholder/150/80",
      alt: "Essilor - Colaborador de Óptica Suárez"
    },
    {
      name: "Ray-Ban",
      logo: "/api/placeholder/150/80",
      alt: "Ray-Ban - Colaborador de Óptica Suárez"
    },
    {
      name: "Oakley",
      logo: "/api/placeholder/150/80",
      alt: "Oakley - Colaborador de Óptica Suárez"
    },
    {
      name: "Johnson & Johnson",
      logo: "/api/placeholder/150/80",
      alt: "Johnson & Johnson Vision Care - Colaborador de Óptica Suárez"
    }
  ]

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-blue-800 text-[31.5px] font-normal leading-[1.2] mb-4" style={{ fontFamily: 'Delius, serif' }}>
            NUESTROS COLABORADORES
          </h2>
          <p className="text-gray-600 text-[16.8px] leading-[1.5] max-w-2xl mx-auto">
            Trabajamos con las mejores marcas del sector para ofrecerte productos 
            de la más alta calidad y tecnología avanzada.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {collaborators.map((collaborator, index) => (
            <div key={index} className="flex items-center justify-center">
              <img 
                src={collaborator.logo}
                alt={collaborator.alt}
                className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
