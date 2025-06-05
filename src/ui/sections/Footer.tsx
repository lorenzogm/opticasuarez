export function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-[21px] font-normal text-white" style={{ fontFamily: 'Delius, serif' }}>
              ÓPTICA SUÁREZ
            </h3>
            <p className="text-white text-[14px] leading-[1.5] opacity-90">
              Desde 1940 cuidando tu visión. Especialistas en salud visual con más de 80 años
              de experiencia en Jaén.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[18px] font-normal text-white" style={{ fontFamily: 'Delius, serif' }}>
              ENLACES RÁPIDOS
            </h4>
            <ul className="space-y-2">
              <li><a href="/quienes-somos" className="text-white text-[14px] opacity-90 hover:opacity-100 transition-opacity">Quiénes Somos</a></li>
              <li><a href="/examen-visual" className="text-white text-[14px] opacity-90 hover:opacity-100 transition-opacity">Examen Visual</a></li>
              <li><a href="/terapia-visual" className="text-white text-[14px] opacity-90 hover:opacity-100 transition-opacity">Terapia Visual</a></li>
              <li><a href="/contactologia" className="text-white text-[14px] opacity-90 hover:opacity-100 transition-opacity">Contactología</a></li>
              <li><a href="/vision-pediatrica" className="text-white text-[14px] opacity-90 hover:opacity-100 transition-opacity">Visión Pediátrica</a></li>
              <li><a href="/control-de-miopia" className="text-white text-[14px] opacity-90 hover:opacity-100 transition-opacity">Control de Miopía</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-[18px] font-normal text-white" style={{ fontFamily: 'Delius, serif' }}>
              CONTACTO
            </h4>
            <div className="space-y-3 text-white text-[14px] opacity-90">
              <div className="flex items-start space-x-2">
                <span>📍</span>
                <div>
                  <p>Bulevar: C. de Canarias, 6, 23009 Jaén</p>
                  <p>Centro: P.º de la Estación, 12, 23003 Jaén</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <div>
                  <p>Bulevar: 953-093-062</p>
                  <p>Centro: 953-223-180</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span>✉️</span>
                <p>bulevar@opticasuarezjaen.es</p>
              </div>
            </div>
          </div>
          
          {/* Social Media & Hours */}
          <div className="space-y-4">
            <h4 className="text-[18px] font-normal text-white" style={{ fontFamily: 'Delius, serif' }}>
              SÍGUENOS
            </h4>
            <div className="flex space-x-4 mb-4">
              <a href="https://www.instagram.com/opticasuarezjaen" className="text-white hover:text-blue-200 transition-colors">
                <span className="text-2xl">📷</span>
              </a>
              <a href="https://www.facebook.com/opticasuarezjaen" className="text-white hover:text-blue-200 transition-colors">
                <span className="text-2xl">📘</span>
              </a>
              <a href="https://www.youtube.com/@opticasuarezjaen" className="text-white hover:text-blue-200 transition-colors">
                <span className="text-2xl">📺</span>
              </a>
              <a href="https://wa.me/34953093062" className="text-white hover:text-blue-200 transition-colors">
                <span className="text-2xl">💬</span>
              </a>
            </div>
            <div className="text-white text-[14px] opacity-90">
              <h5 className="font-medium mb-2">HORARIOS</h5>
              <p>Lunes - Viernes: 9:30 - 13:30 | 17:00 - 20:30</p>
              <p>Sábados: 10:00 - 13:00</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-600 pt-6 text-center">
          <p className="text-white text-[12px] opacity-75">
            &copy; 2025 Óptica Suárez. Todos los derechos reservados. | Desarrollado con ❤️ para cuidar tu visión
          </p>
        </div>
      </div>
    </footer>
  )
}
