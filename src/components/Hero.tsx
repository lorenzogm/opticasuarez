import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              Especialistas en <span className={styles.highlight}>Salud Visual</span>
            </h1>
            <p className={styles.subtitle}>
              En Óptica Suárez ofrecemos los mejores servicios de optometría, terapia visual 
              y control de miopía en Jaén. Cuidamos tu visión con la más avanzada tecnología 
              y un equipo de profesionales especializados.
            </p>
            <div className={styles.cta}>
              <Link to="/contacto" className={styles.primaryButton}>
                Pedir Cita
              </Link>
              <Link to="/quienes-somos" className={styles.secondaryButton}>
                Conocer Más
              </Link>
            </div>
          </div>
          <div className={styles.imageContent}>
            <img 
              src="/hero-optica.jpg" 
              alt="Especialistas en salud visual" 
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
