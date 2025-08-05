import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200">
      <div className="flex items-center space-x-1 px-6 py-3">
        <button
          onClick={scrollToTop}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
        >
          Inicio
        </button>
        <button
          onClick={() => scrollToSection('services')}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
        >
          Servicios
        </button>
        <Link
          to="/book"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-200"
        >
          Reservar Cita
        </Link>
        <button
          onClick={() => scrollToSection('contact')}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
        >
          Contacto
        </button>
      </div>
    </nav>
  );
}
