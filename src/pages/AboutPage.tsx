export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-6">
            Quiénes Somos
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Conoce más sobre Óptica Suárez y nuestro compromiso con la salud visual.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-secondary-800">
              Nuestra Historia
            </h2>
            <p className="text-lg text-secondary-600 leading-relaxed">
              Con más de 20 años de experiencia en el cuidado de la salud visual, 
              Óptica Suárez se ha consolidado como referente en Jaén en servicios 
              especializados de optometría y terapia visual.
            </p>
            <p className="text-lg text-secondary-600 leading-relaxed">
              Nuestro compromiso es ofrecer la mejor atención personalizada utilizando 
              la tecnología más avanzada para garantizar el bienestar visual de nuestros pacientes.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md h-64 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-white text-6xl">👨‍⚕️</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-secondary-800 mb-2">Misión</h3>
            <p className="text-secondary-600">
              Proporcionar servicios de salud visual de excelencia con tecnología avanzada 
              y atención personalizada.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">👁️</div>
            <h3 className="text-xl font-semibold text-secondary-800 mb-2">Visión</h3>
            <p className="text-secondary-600">
              Ser el centro de referencia en salud visual en Jaén, reconocidos por 
              nuestra calidad y compromiso.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-semibold text-secondary-800 mb-2">Valores</h3>
            <p className="text-secondary-600">
              Excelencia, profesionalidad, innovación y dedicación al cuidado 
              de la salud visual.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
