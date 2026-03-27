// Central definition of all service pages for navigation and SEO
export interface ServicePage {
  name: string;
  url: string;
  description?: string;
}

export const servicePages: ServicePage[] = [
  {
    name: "Examen Visual",
    url: "/servicios/examen-visual",
    description: "Evaluación completa de tu salud visual",
  },
  {
    name: "Terapia Visual",
    url: "/servicios/terapia-visual",
    description: "Mejora de habilidades visuales",
  },
  {
    name: "Contactología",
    url: "/servicios/contactologia",
    description: "Adaptación de lentes de contacto",
  },
  {
    name: "Visión Pediátrica",
    url: "/servicios/vision-pediatrica",
    description: "Cuidado visual infantil",
  },
  {
    name: "Visión Deportiva",
    url: "/servicios/vision-deportiva",
    description: "Optimización del rendimiento visual deportivo",
  },
  {
    name: "Control de Miopía",
    url: "/servicios/control-de-miopia",
    description: "Tratamientos para frenar la progresión de la miopía",
  },
  {
    name: "OrtoK",
    url: "/servicios/ortoqueratologia",
    description: "Ortoqueratología - Corrección visual nocturna",
  },
  {
    name: "Plan VEO",
    url: "/planveo",
    description: "Ayuda de hasta 100€ para gafas y lentillas infantiles",
  },
];
