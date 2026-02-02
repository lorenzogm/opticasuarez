import ControlDeMiopia from '../ui/pages/control-de-miopia/control-de-miopia';
import {
  generatePageKeywords,
  generateMetaKeywords,
} from '../ui/lib/seo-keywords';

export function links() {
  return [
    { rel: 'canonical', href: 'https://opticasuarezjaen.es/control-de-miopia' },
  ];
}

export function meta() {
  const controlMiopiaKeywords = generatePageKeywords('control-miopia');

  return [
    { title: 'Control de Miopía Jaén - Óptica Suárez' },
    {
      name: 'description',
      content:
        'Especialistas en control de miopía en Jaén. Ofrecemos tratamientos avanzados para frenar la progresión de la miopía en niños y adolescentes.',
    },
    {
      name: 'keywords',
      content: generateMetaKeywords(controlMiopiaKeywords),
    },
    {
      property: 'og:title',
      content: 'Control de Miopía Jaén - Óptica Suárez',
    },
    {
      property: 'og:description',
      content:
        'Especialistas en control de miopía en Jaén. Ofrecemos tratamientos avanzados para frenar la progresión de la miopía en niños y adolescentes.',
    },
    {
      property: 'og:url',
      content: 'https://opticasuarezjaen.es/control-de-miopia',
    },
    { name: 'robots', content: 'index, follow' },
  ];
}

export default function ControlDeMiopiaRoute() {
  return <ControlDeMiopia />;
}
