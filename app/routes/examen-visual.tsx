import ExamenVisual from '../ui/pages/examen-visual/examen-visual';
import {
  generatePageKeywords,
  generateMetaKeywords,
} from '../ui/lib/seo-keywords';

export function meta() {
  const examenVisualKeywords = generatePageKeywords('examen-visual');

  return [
    { title: 'Examen Visual | Óptica Suárez - Especialistas en salud visual' },
    {
      name: 'description',
      content:
        'Examen visual completo en Óptica Suárez. Evaluación profesional de tu salud visual con tecnología avanzada. Agenda tu cita en Jaén.',
    },
    {
      name: 'keywords',
      content: generateMetaKeywords(examenVisualKeywords),
    },
  ];
}

export default function ExamenVisualPage() {
  return <ExamenVisual />;
}
