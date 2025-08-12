import ControlDeMiopia from '../ui/pages/control-de-miopia/control-de-miopia';
import {
  generatePageKeywords,
  generateMetaKeywords,
} from '../ui/lib/seo-keywords';

export function meta() {
  const controlMiopiaKeywords = generatePageKeywords('control-miopia');

  return [
    { title: 'Control de Miopía - Óptica Suárez' },
    {
      name: 'description',
      content:
        'Especialistas en control de miopía en Jaén. Ofrecemos tratamientos avanzados para frenar la progresión de la miopía en niños y adolescentes.',
    },
    {
      name: 'keywords',
      content: generateMetaKeywords(controlMiopiaKeywords),
    },
  ];
}

export default function ControlDeMiopiaRoute() {
  return <ControlDeMiopia />;
}
