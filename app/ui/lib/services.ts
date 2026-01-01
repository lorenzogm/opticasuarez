// Central definition of all service pages for navigation and SEO
export interface ServicePage {
  name: string;
  url: string;
  description?: string;
}

export const servicePages: ServicePage[] = [
  {
    name: 'Examen Visual',
    url: '/examen-visual',
    description: 'Evaluación completa de tu salud visual',
  },
  {
    name: 'Terapia Visual',
    url: '/terapia-visual',
    description: 'Mejora de habilidades visuales',
  },
  {
    name: 'Contactología',
    url: '/contactologia',
    description: 'Adaptación de lentes de contacto',
  },
  {
    name: 'Visión Pediátrica',
    url: '/vision-pediatrica',
    description: 'Cuidado visual infantil',
  },
  {
    name: 'Visión Deportiva',
    url: '/vision-deportiva',
    description: 'Optimización del rendimiento visual deportivo',
  },
  {
    name: 'Control de Miopía',
    url: '/control-de-miopia',
    description: 'Tratamientos para frenar la progresión de la miopía',
  },
  {
    name: 'OrtoK',
    url: '/ortoqueratologia',
    description: 'Ortoqueratología - Corrección visual nocturna',
  },
];
