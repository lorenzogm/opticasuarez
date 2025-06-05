export function ServicesPage() {
  const services = [
    {
      title: "Examen Visual Completo",
      description: "Evaluación exhaustiva de tu salud visual con tecnología de última generación.",
      features: [
        "Agudeza visual",
        "Refracción computerizada",
        "Examen del fondo de ojo",
        "Medición de presión intraocular"
      ],
      price: "Desde 35€"
    },
    {
      title: "Terapia Visual",
      description: "Tratamientos personalizados para mejorar las habilidades visuales.",
      features: [
        "Ejercicios de motilidad ocular",
        "Terapia de convergencia",
        "Coordinación ojo-mano",
        "Seguimiento personalizado"
      ],
      price: "Consultar"
    },
    {
      title: "Optometría Pediátrica",
      description: "Cuidado especializado de la visión infantil y desarrollo visual.",
      features: [
        "Detección temprana de problemas",
        "Exámenes adaptados para niños",
        "Control de miopía",
        "Asesoramiento a padres"
      ],
      price: "Desde 30€"
    },
    {
      title: "Contactología",
      description: "Adaptación y seguimiento de lentes de contacto personalizadas.",
      features: [
        "Lentes diarias, semanales y mensuales",
        "Lentes tóricas para astigmatismo",
        "Lentes multifocales",
        "Seguimiento y cuidados"
      ],
      price: "Desde 25€"
    },
    {
      title: "Baja Visión",
      description: "Ayudas visuales para personas con visión reducida.",
      features: [
        "Evaluación de resto visual",
        "Ayudas ópticas especializadas",
        "Entrenamiento en uso de ayudas",
        "Rehabilitación visual"
      ],
      price: "Consultar"
    },
    {
      title: "Gafas Graduadas",
      description: "Amplia selección de monturas y cristales de calidad premium.",
      features: [
        "Cristales antirreflejantes",
        "Filtros de luz azul",
        "Cristales progresivos",
        "Monturas de diseño"
      ],
      price: "Desde 89€"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Nuestros Servicios</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Ofrecemos una amplia gama de servicios profesionales para el cuidado 
            integral de tu salud visual con la mejor tecnología y atención personalizada.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-700 mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="text-primary-600 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary-600">{service.price}</span>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                      Reservar Cita
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas más información?</h2>
          <p className="text-xl mb-8">
            Nuestro equipo estará encantado de asesorarte sobre el mejor tratamiento para ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Pedir Cita
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              Llamar Ahora
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
