/**
 * Image constants for Óptica Suárez website
 * Centralized image paths for easy management and updates
 */

// Hero section images
export const HERO_IMAGES = {
  main: '/src/assets/images/hero/hero-main.jpg',
  glassesDisplay: '/src/assets/images/hero/hero-glasses-display.jpg',
  eyeExam: '/src/assets/images/hero/hero-eye-exam.jpg'
} as const;

// Service section images
export const SERVICE_IMAGES = {
  visionBinocular: '/src/assets/images/services/vision-binocular.jpg',
  terapiaVisual: '/src/assets/images/services/terapia-visual.jpg',
  contactologia: '/src/assets/images/services/contactologia.jpg',
  visionPediatrica: '/src/assets/images/services/vision-pediatrica.jpg',
  controlMiopia: '/src/assets/images/services/control-miopia.jpg'
} as const;

// Product images
export const PRODUCT_IMAGES = {
  monturasElegantes: '/src/assets/images/products/monturas-elegantes.jpg',
  gafasSol: '/src/assets/images/products/gafas-sol.jpg',
  lentillas: '/src/assets/images/products/lentillas.jpg',
  monturasTitanio: '/src/assets/images/products/monturas-titanio.jpg'
} as const;

// About section images
export const ABOUT_IMAGES = {
  equipoProfesional: '/src/assets/images/about/equipo-profesional.jpg',
  tecnologiaAvanzada: '/src/assets/images/about/tecnologia-avanzada.jpg',
  tallerMontaje: '/src/assets/images/about/taller-montaje.jpg'
} as const;

// Logo and branding
export const BRAND_IMAGES = {
  logo: '/src/assets/images/logos/optica-suarez-logo.svg'
} as const;

// Combined export for easy access
export const IMAGES = {
  hero: HERO_IMAGES,
  services: SERVICE_IMAGES,
  products: PRODUCT_IMAGES,
  about: ABOUT_IMAGES,
  brand: BRAND_IMAGES
} as const;

// Service data with local images
export const SERVICES_DATA = [
  {
    title: 'VISIÓN\nBINOCULAR',
    image: SERVICE_IMAGES.visionBinocular,
    alt: 'Paciente realizando un examen de visión con los profesionales de óptica Suárez en Jaén.'
  },
  {
    title: 'TERAPIA\nVISUAL',
    image: SERVICE_IMAGES.terapiaVisual,
    alt: 'Asesoramiento personalizado en la compra de monturas y cristales graduados en óptica Suárez en Jaén.'
  },
  {
    title: 'CONTACTOLOGÍA',
    image: SERVICE_IMAGES.contactologia,
    alt: 'Chica poniéndose unas lentillas compradas en óptica Suárez en Jaén.'
  },
  {
    title: 'VISIÓN\nPEDIÁTRICA',
    image: SERVICE_IMAGES.visionPediatrica,
    alt: 'Niño realizando terapias oculares en el centro óptico de óptica Suárez en Jaén.'
  },
  {
    title: 'CONTROL\nDE\nMIOPÍA',
    image: SERVICE_IMAGES.controlMiopia,
    alt: 'Control de miopía en óptica Suárez'
  }
] as const;

export default IMAGES;
