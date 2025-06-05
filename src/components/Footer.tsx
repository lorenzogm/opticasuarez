import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <h3 className={styles.title}>Óptica Suárez</h3>
            <p className={styles.description}>
              Especialistas en salud visual en Jaén. Ofrecemos los mejores servicios de optometría,
              terapia visual y control de miopía para toda la familia.
            </p>
          </div>
          
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Servicios</h4>
            <ul className={styles.list}>
              <li><a href="/examen-visual" className={styles.link}>Examen Visual</a></li>
              <li><a href="/terapia-visual" className={styles.link}>Terapia Visual</a></li>
              <li><a href="/contactologia" className={styles.link}>Contactología</a></li>
              <li><a href="/vision-pediatrica" className={styles.link}>Visión Pediátrica</a></li>
              <li><a href="/control-de-miopia" className={styles.link}>Control de Miopía</a></li>
              <li><a href="/vision-deportiva" className={styles.link}>Visión Deportiva</a></li>
            </ul>
          </div>
          
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Contacto</h4>
            <div className={styles.contactInfo}>
              <p>📍 Calle Ejemplo, 123<br />23001 Jaén, España</p>
              <p>📞 953 25 04 62</p>
              <p>✉️ info@opticasuarezjaen.com</p>
            </div>
          </div>
          
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Horarios</h4>
            <div className={styles.schedule}>
              <p><strong>Lunes - Viernes:</strong><br />9:00 - 14:00 | 17:00 - 20:30</p>
              <p><strong>Sábados:</strong><br />9:00 - 14:00</p>
              <p><strong>Domingos:</strong><br />Cerrado</p>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; 2025 Óptica Suárez. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
