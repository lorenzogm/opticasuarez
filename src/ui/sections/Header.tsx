import { Link, useLocation } from 'react-router-dom'
import { BRAND_IMAGES } from '../../assets/images'

export function Header() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'INICIO' },
    { path: '/quienes-somos', label: 'QUIÉNES SOMOS' },
    { path: '/examen-visual', label: 'EXAMEN VISUAL' },
    { path: '/terapia-visual', label: 'TERAPIA VISUAL' },
    { path: '/contactologia', label: 'CONTACTOLOGÍA' },
    { path: '/vision-pediatrica', label: 'VISIÓN PEDIÁTRICA' },
    { path: '/control-de-miopia', label: 'CONTROL DE MIOPÍA' },
    { path: '/vision-deportiva', label: 'VISIÓN DEPORTIVA' },
    { path: '/blog', label: 'BLOG' },
    { path: '/contacto', label: 'CONTACTO' },
  ]

  return (
    <header className="bg-blue-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={BRAND_IMAGES.logo} 
              alt="Óptica Suárez" 
              className="h-12 w-auto"
            />
            <span className="ml-3 text-white text-xl font-bold" style={{ fontFamily: 'Delius, serif' }}>
              ÓPTICA SUÁREZ
            </span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden lg:flex">
            <ul className="flex space-x-6 list-none">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`
                      text-white text-[14px] font-medium transition-all duration-300 hover:text-blue-200
                      ${location.pathname === item.path 
                        ? 'border-b-2 border-white pb-1' 
                        : ''
                      }
                    `}
                    style={{ fontFamily: 'Delius, serif' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-white text-right">
              <p className="text-[12px] opacity-90">Llámanos</p>
              <p className="text-[14px] font-semibold">953-093-062</p>
            </div>
            <a 
              href="https://wa.me/34953093062" 
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
            >
              <span className="text-lg">💬</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden border-t border-blue-700 py-4">
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`
                      block text-white text-[14px] font-medium py-2 px-4 rounded transition-all duration-300
                      ${location.pathname === item.path 
                        ? 'bg-blue-700 text-blue-100' 
                        : 'hover:bg-blue-700'
                      }
                    `}
                    style={{ fontFamily: 'Delius, serif' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
