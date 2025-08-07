import ControlDeMiopia from '../ui/pages/control-de-miopia/control-de-miopia';

export function meta() {
  return [
    { title: 'Control de Miopía - Óptica Suárez' },
    {
      name: 'description',
      content:
        'Especialistas en control de miopía en Jaén. Ofrecemos tratamientos avanzados para frenar la progresión de la miopía en niños y adolescentes.',
    },
  ];
}

export default function ControlDeMiopiaRoute() {
  return <ControlDeMiopia />;
}
