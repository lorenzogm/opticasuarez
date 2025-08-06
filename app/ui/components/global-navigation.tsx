import { Link } from 'react-router';

export default function GlobalNavigation() {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 rounded-full shadow-lg border border-gray-200 transition-all duration-300 bg-white/90 backdrop-blur-sm">
      <div className="flex items-center space-x-1 px-6 py-3">
        <Link
          to="/"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
        >
          Inicio
        </Link>
        <Link
          to="/quienes-somos"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
        >
          Quienes Somos
        </Link>
        <Link
          to="/servicios"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
        >
          Servicios
        </Link>
        <Link
          to="/blog"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
        >
          Blog
        </Link>
      </div>
    </nav>
  );
}
