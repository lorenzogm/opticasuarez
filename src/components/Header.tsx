import { Link, useLocation } from 'react-router-dom'
import { BRAND_IMAGES } from '../assets/images'
import styles from './Header.module.css'

const Header = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/quienes-somos', label: 'Quiénes Somos' },
    { path: '/examen-visual', label: 'Examen Visual' },
    { path: '/terapia-visual', label: 'Terapia Visual' },
    { path: '/contactologia', label: 'Contactología' },
    { path: '/vision-pediatrica', label: 'Visión Pediátrica' },
    { path: '/control-de-miopia', label: 'Control de Miopía' },
    { path: '/vision-deportiva', label: 'Visión Deportiva' },
    { path: '/blog', label: 'Blog' },
    { path: '/contacto', label: 'Contacto' },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={BRAND_IMAGES.logo} alt="Óptica Suárez" className={styles.logoImage} />
        </Link>
        
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <Link 
                  to={item.path} 
                  className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.contact}>
          <span className={styles.phone}>📞 953 25 04 62</span>
        </div>
      </div>
    </header>
  )
}

export default Header
