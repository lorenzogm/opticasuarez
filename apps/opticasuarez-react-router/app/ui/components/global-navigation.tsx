import { useState } from "react";
import { Link } from "react-router";
import { servicePages } from "../lib/services";
import Image from "./image";

export default function GlobalNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-gray-200 border-b bg-white/95 shadow-sm backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link className="flex items-center" onClick={closeMenu} to="/">
              <Image
                alt="Óptica Suárez"
                className="h-10 w-auto"
                height={40}
                src="/images/optica-suarez-logo.png"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              className="px-3 py-2 font-medium text-gray-700 text-sm transition-colors duration-200 hover:text-blue-600"
              to="/"
            >
              Inicio
            </Link>
            <Link
              className="px-3 py-2 font-medium text-gray-700 text-sm transition-colors duration-200 hover:text-blue-600"
              to="/quienes-somos"
            >
              Quienes Somos
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onBlur={(e) => {
                if (
                  !(
                    e.relatedTarget && e.currentTarget.contains(e.relatedTarget)
                  )
                ) {
                  setIsServicesOpen(false);
                }
              }}
              onFocus={() => setIsServicesOpen(true)}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <Link
                aria-expanded={isServicesOpen ? "true" : "false"}
                aria-haspopup="true"
                className="flex items-center gap-1 px-3 py-2 font-medium text-gray-700 text-sm transition-colors duration-200 hover:text-blue-600"
                to="/servicios"
              >
                Servicios
                <svg
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </Link>

              {isServicesOpen && (
                <div
                  aria-label="Servicios disponibles"
                  className="absolute left-0 z-50 mt-0 w-48 rounded-md border border-gray-200 bg-white py-2 shadow-lg"
                  role="menu"
                >
                  {servicePages.map((service) => (
                    <Link
                      className="block px-4 py-2 text-gray-700 text-sm transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                      key={service.url}
                      role="menuitem"
                      to={service.url}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              className="px-3 py-2 font-medium text-gray-700 text-sm transition-colors duration-200 hover:text-blue-600"
              to="/blog"
            >
              Blog
            </Link>
            <Link
              className="px-3 py-2 font-medium text-gray-700 text-sm transition-colors duration-200 hover:text-blue-600"
              to="/contacto"
            >
              Contacto
            </Link>

            {/* WhatsApp Icon */}
            <a
              className="px-3 py-2 text-gray-700 transition-colors duration-200 hover:text-green-600"
              href="https://api.whatsapp.com/send?phone=34953093062"
              rel="noopener noreferrer"
              target="_blank"
              title="Contactar por WhatsApp"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.569-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.588z" />
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-expanded="false"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              onClick={toggleMenu}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? (
                <svg
                  aria-hidden="true"
                  className="block h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  className="block h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 border-gray-200 border-t bg-white px-2 pt-2 pb-3">
              <Link
                className="block rounded-md px-3 py-2 font-medium text-base text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-blue-600"
                onClick={closeMenu}
                to="/"
              >
                Inicio
              </Link>
              <Link
                className="block rounded-md px-3 py-2 font-medium text-base text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-blue-600"
                onClick={closeMenu}
                to="/quienes-somos"
              >
                Quienes Somos
              </Link>

              {/* Services Section with Collapsible Menu */}
              <div>
                <button
                  aria-controls="mobile-services-menu"
                  aria-expanded={isServicesOpen ? "true" : "false"}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 font-medium text-base text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-blue-600"
                  onClick={toggleServices}
                >
                  Servicios
                  <svg
                    aria-hidden="true"
                    className={`h-5 w-5 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19 9l-7 7-7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </button>

                {isServicesOpen && (
                  <div
                    aria-label="Servicios disponibles"
                    className="mt-1 space-y-1 pl-4"
                    id="mobile-services-menu"
                    role="menu"
                  >
                    <Link
                      className="block rounded-md px-3 py-2 font-medium text-gray-600 text-sm transition-colors duration-200 hover:bg-gray-50 hover:text-blue-600"
                      onClick={closeMenu}
                      role="menuitem"
                      to="/servicios"
                    >
                      Ver todos los servicios
                    </Link>
                    {servicePages.map((service) => (
                      <Link
                        className="block rounded-md px-3 py-2 text-gray-600 text-sm transition-colors duration-200 hover:bg-gray-50 hover:text-blue-600"
                        key={service.url}
                        onClick={closeMenu}
                        role="menuitem"
                        to={service.url}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                className="block rounded-md px-3 py-2 font-medium text-base text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-blue-600"
                onClick={closeMenu}
                to="/blog"
              >
                Blog
              </Link>
              <Link
                className="block rounded-md px-3 py-2 font-medium text-base text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-blue-600"
                onClick={closeMenu}
                to="/contacto"
              >
                Contacto
              </Link>

              {/* WhatsApp Link */}
              <a
                className="flex items-center rounded-md px-3 py-2 font-medium text-base text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-green-600"
                href="https://api.whatsapp.com/send?phone=34953093062"
                onClick={closeMenu}
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  className="mr-3 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.569-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.588z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
