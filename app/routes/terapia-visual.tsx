import TerapiaVisual from '../ui/pages/terapia-visual/terapia-visual';

export function meta() {
  return [
    {
      title:
        'Terapia Visual | Óptica Suárez - Entrenamiento visual personalizado',
    },
    {
      name: 'description',
      content:
        'Terapia visual en Jaén. Programas personalizados de entrenamiento visual para mejorar habilidades visuales, tratar estrabismo, ambliopía y problemas de enfoque.',
    },
  ];
}

export default function TerapiaVisualPage() {
  return <TerapiaVisual />;
}
