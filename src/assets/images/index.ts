/**
 * Image constants for Óptica Suárez website
 * Centralized image paths for easy management and updates
 */

// Import hero images
import heroMain from './hero/hero-main.jpg'
import heroGlassesDisplay from './hero/hero-glasses-display.jpg'
import heroEyeExam from './hero/hero-eye-exam.jpg'

// Import service images
import visionBinocular from './services/vision-binocular.jpg'
import terapiaVisual from './services/terapia-visual.jpg'
import contactologia from './services/contactologia.jpg'
import visionPediatrica from './services/vision-pediatrica.jpg'
import controlMiopia from './services/control-miopia.jpg'

// Import product images
import monturasElegantes from './products/monturas-elegantes.jpg'
import gafasSol from './products/gafas-sol.jpg'
import lentillas from './products/lentillas.jpg'
import monturasTitanio from './products/monturas-titanio.jpg'

// Import about images
import equipoProfesional from './about/equipo-profesional.jpg'
import tecnologiaAvanzada from './about/tecnologia-avanzada.jpg'
import tallerMontaje from './about/taller-montaje.jpg'

// Import logo
import opticaSuarezLogo from './logos/optica-suarez-logo.svg'

// Import real Óptica Suárez images
import realLogo from './real-optica-suarez/logo_vector_transparente.png'
import opticaBulevar from './real-optica-suarez/optica_bulevar.jpg'
import barFenix from './real-optica-suarez/bar_fenix_32.jpg'
import kitDigitalLogos from './real-optica-suarez/logos_kitdigital_2024.png'

// Hero section images
export const HERO_IMAGES = {
  main: heroMain,
  glassesDisplay: heroGlassesDisplay,
  eyeExam: heroEyeExam
} as const;

// Service section images
export const SERVICE_IMAGES = {
  visionBinocular: visionBinocular,
  terapiaVisual: terapiaVisual,
  contactologia: contactologia,
  visionPediatrica: visionPediatrica,
  controlMiopia: controlMiopia
} as const;

// Product images
export const PRODUCT_IMAGES = {
  monturasElegantes: monturasElegantes,
  gafasSol: gafasSol,
  lentillas: lentillas,
  monturasTitanio: monturasTitanio
} as const;

// About section images
export const ABOUT_IMAGES = {
  equipoProfesional: equipoProfesional,
  tecnologiaAvanzada: tecnologiaAvanzada,
  tallerMontaje: tallerMontaje
} as const;

// Logo and branding
export const BRAND_IMAGES = {
  logo: realLogo, // Use the real logo
  originalLogo: opticaSuarezLogo // Keep the original as backup
} as const;

// Real store images
export const STORE_IMAGES = {
  bulevar: opticaBulevar,
  centro: barFenix
} as const;

// Partner/Collaborator images
export const PARTNER_IMAGES = {
  kitDigital: kitDigitalLogos
} as const;

// Combined export for easy access
export const IMAGES = {
  hero: HERO_IMAGES,
  services: SERVICE_IMAGES,
  products: PRODUCT_IMAGES,
  about: ABOUT_IMAGES,
  brand: BRAND_IMAGES,
  stores: STORE_IMAGES,
  partners: PARTNER_IMAGES
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
