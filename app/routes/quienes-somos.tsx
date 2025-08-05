import Quienessomos from '../ui/pages/quienes-somos/quienes-somos';

export function meta() {
  return [
    { title: 'Quiénes somos | Óptica Suárez - Expertos en salud visual' },
    {
      name: 'description',
      content:
        'Conoce la historia de Óptica Suárez desde 1940, nuestro equipo de profesionales y nuestros dos centros en Jaén. Más de 80 años cuidando tu visión.',
    },
  ];
}

export default function QuienessomoPage() {
  return <Quienessomos />;
}
