import { Link } from 'react-router-dom'
import styles from './Services.module.css'

const Services = () => {
  const services = [
    {
      title: 'Examen Visual',
      description: 'Evaluación completa de tu salud visual con tecnología de vanguardia.',
      icon: '👁️',
      link: '/examen-visual',
      color: '#3182CE'
    },
    {
      title: 'Terapia Visual',
      description: 'Tratamientos personalizados para mejorar las habilidades visuales.',
      icon: '🎯',
      link: '/terapia-visual',
      color: '#38B2AC'
    },
    {
      title: 'Contactología',
      description: 'Adaptación profesional de lentes de contacto para todas las edades.',
      icon: '👀',
      link: '/contactologia',
      color: '#805AD5'
    },
    {
      title: 'Visión Pediátrica',
      description: 'Cuidado especializado de la visión infantil y desarrollo visual.',
      icon: '👶',
      link: '/vision-pediatrica',
      color: '#E53E3E'
    },
    {
      title: 'Control de Miopía',
      description: 'Tratamientos avanzados para controlar y frenar la progresión de la miopía.',
      icon: '🔍',
      link: '/control-de-miopia',
      color: '#D69E2E'
    },
    {
      title: 'Visión Deportiva',
      description: 'Optimización visual para mejorar el rendimiento deportivo.',
      icon: '⚽',
      link: '/vision-deportiva',
      color: '#38A169'
    }
  ]

  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nuestros Servicios</h2>
          <p className={styles.subtitle}>
            Ofrecemos una amplia gama de servicios especializados en salud visual
          </p>
        </div>
        
        <div className={styles.grid}>
          {services.map((service, index) => (
            <Link 
              to={service.link} 
              key={index} 
              className={styles.serviceCard}
              style={{ '--service-color': service.color } as React.CSSProperties}
            >
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <span className={styles.learnMore}>Saber más →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
