import Servicios from '../ui/pages/servicios/servicios';

export function meta() {
  return [
    { title: 'Servicios - Óptica Suárez' },
    {
      name: 'description',
      content:
        'Descubre todos nuestros servicios especializados en salud visual: exámenes visuales, terapia visual, contactología, visión pediátrica y control de miopía.',
    },
  ];
}

export default function ServiciosRoute() {
  return <Servicios />;
}
