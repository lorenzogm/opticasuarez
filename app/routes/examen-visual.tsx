import ExamenVisual from '../ui/pages/examen-visual/examen-visual';

export function meta() {
  return [
    { title: 'Examen Visual | Óptica Suárez - Especialistas en salud visual' },
    {
      name: 'description',
      content:
        'Examen visual completo en Óptica Suárez. Evaluación profesional de tu salud visual con tecnología avanzada. Agenda tu cita en Jaén.',
    },
  ];
}

export default function ExamenVisualPage() {
  return <ExamenVisual />;
}