import VisionPediatrica from '../ui/pages/vision-pediatrica/vision-pediatrica';

export function meta() {
  return [
    { title: 'Visión Pediátrica - Óptica Suárez' },
    {
      name: 'description',
      content:
        'Especialistas en visión pediátrica en Óptica Suárez. Cuidamos la salud visual de los más pequeños con exámenes especializados y tratamientos personalizados.',
    },
  ];
}

export default function VisionPediatricaRoute() {
  return <VisionPediatrica />;
}
