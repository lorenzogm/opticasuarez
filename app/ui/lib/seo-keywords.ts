/**
 * SEO Keywords utility for Óptica Suárez
 * Comprehensive list of keywords for improved search engine positioning
 */

// Base keywords provided by the client
export const coreKeywords = [
  'Óptica',
  'Optometría',
  'Óptica en Jaén',
  'Mejor óptica de Jaén',
  'Terapia Visual',
  'Control de Miopía',
  'Ojo vago',
  'Estrabismo',
  'Ambliopía',
  'Problemas de aprendizaje',
  'Gafas de sol',
  'Gafas de marca',
  'Gafas progresivas',
  'Visión Deportiva',
  'Queratocono',
  'Lentillas para oposiciones',
  'Lentillas de Halloween',
  'Examen visual',
  'Neuro desarrollo visual',
];

// Additional related keywords for better SEO positioning
export const expandedKeywords = [
  // Location-based
  'Óptica Jaén',
  'Optometrista Jaén',
  'Centro óptico Jaén',
  'Óptica Suárez Jaén',
  'Óptica en el centro de Jaén',

  // Professional services
  'Optometrista comportamental',
  'Especialista en visión',
  'Examen optométrico',
  'Revisión visual',
  'Graduación de la vista',
  'Medición visual',

  // Vision therapy related
  'Terapia visual comportamental',
  'Rehabilitación visual',
  'Entrenamiento visual',
  'Ejercicios visuales',
  'Tratamiento ojo vago',
  'Tratamiento estrabismo',
  'Tratamiento ambliopía',
  'Problemas de lectura',
  'Dificultades de aprendizaje',
  'Procesamiento visual',

  // Myopia control
  'Control miopía infantil',
  'Frenar miopía',
  'Lentes de control de miopía',
  'Ortoqueratología',
  'Lentillas nocturnas',
  'MiSight',
  'Coopervision',

  // Contact lenses
  'Lentes de contacto',
  'Lentillas',
  'Contactología',
  'Adaptación lentillas',
  'Lentillas diarias',
  'Lentillas mensuales',
  'Lentillas tóricas',
  'Lentillas multifocales',
  'Lentillas cosméticas',
  'Lentillas de colores',

  // Eyewear
  'Gafas graduadas',
  'Monturas',
  'Cristales oftálmicos',
  'Lentes progresivas',
  'Lentes bifocales',
  'Gafas de lectura',
  'Gafas de ordenador',
  'Filtro luz azul',
  'Antirreflejante',

  // Specialized conditions
  'Baja visión',
  'Degeneración macular',
  'Glaucoma',
  'Cataratas',
  'Retinopatía diabética',
  'Astigmatismo',
  'Hipermetropía',
  'Presbicia',
  'Vista cansada',

  // Pediatric vision
  'Visión infantil',
  'Optometría pediátrica',
  'Examen visual niños',
  'Problemas visuales escolares',
  'Rendimiento académico',
  'Coordinación ojo-mano',

  // Sports vision
  'Optometría deportiva',
  'Gafas deportivas',
  'Lentillas deportivas',
  'Rendimiento visual deportivo',
  'Protección ocular deportiva',

  // Brands and quality
  'Marcas premium',
  'Ray-Ban',
  'Oakley',
  'Maui Jim',
  'Zeiss',
  'Essilor',
  'Varilux',
  'Crizal',
];

// Generate keywords for specific pages
export const generatePageKeywords = (
  pageType: string,
  baseKeywords: string[] = []
): string[] => {
  const combined = [...coreKeywords, ...expandedKeywords, ...baseKeywords];

  switch (pageType) {
    case 'home':
      return [
        ...coreKeywords.slice(0, 15), // Primary keywords
        'Centro óptico Jaén',
        'Óptica Suárez',
        'Desde 1940',
        'Tradición óptica',
        'Salud visual',
      ];

    case 'terapia-visual':
      return [
        'Terapia Visual',
        'Terapia visual comportamental',
        'Ojo vago',
        'Estrabismo',
        'Ambliopía',
        'Problemas de aprendizaje',
        'Rehabilitación visual',
        'Entrenamiento visual',
        'Ejercicios visuales',
        'Procesamiento visual',
        'Neuro desarrollo visual',
        'Optometrista comportamental',
      ];

    case 'control-miopia':
      return [
        'Control de Miopía',
        'Control miopía infantil',
        'Frenar miopía',
        'Lentes de control de miopía',
        'Ortoqueratología',
        'Lentillas nocturnas',
        'MiSight',
        'Miopía en niños',
        'Tratamiento miopía',
      ];

    case 'contactologia':
      return [
        'Contactología',
        'Lentes de contacto',
        'Lentillas',
        'Adaptación lentillas',
        'Lentillas para oposiciones',
        'Lentillas de Halloween',
        'Lentillas diarias',
        'Lentillas mensuales',
        'Lentillas tóricas',
        'Lentillas multifocales',
      ];

    case 'vision-deportiva':
      return [
        'Visión Deportiva',
        'Optometría deportiva',
        'Gafas deportivas',
        'Lentillas deportivas',
        'Rendimiento visual deportivo',
        'Protección ocular deportiva',
      ];

    case 'vision-pediatrica':
      return [
        'visión pediátrica Jaén',
        'optometría infantil Jaén',
        'revisión visual infantil en Jaén',
        'examen visual niños Jaén',
        'cuidado de la vista infantil Jaén',
        'detección precoz ambliopía Jaén',
        'ojo vago Jaén',
        'Visión infantil',
        'Optometría pediátrica',
        'Desarrollo visual infantil',
      ];

    case 'examen-visual':
      return [
        'Examen visual',
        'Revisión visual',
        'Examen optométrico',
        'Graduación de la vista',
        'Medición visual',
        'Chequeo visual',
        'Detección problemas visuales',
      ];

    default:
      return combined.slice(0, 20); // Return top 20 keywords for other pages
  }
};

// Generate meta keywords string
export const generateMetaKeywords = (keywords: string[]): string => {
  return keywords.join(', ');
};

// Complete keyword list for sitemap and overall SEO
export const allKeywords = [...coreKeywords, ...expandedKeywords];
