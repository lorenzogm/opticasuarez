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
    {
      property: 'og:title',
      content: 'Examen Visual | Óptica Suárez - Especialistas en salud visual',
    },
    {
      property: 'og:description',
      content:
        'Examen visual completo en Óptica Suárez. Evaluación profesional de tu salud visual con tecnología avanzada. Agenda tu cita en Jaén.',
    },
    {
      property: 'og:url',
      content: 'https://opticasuarezjaen.es/examen-visual',
    },
    { name: 'robots', content: 'index, follow' },
    { rel: 'canonical', href: 'https://opticasuarezjaen.es/examen-visual' },
  ];
}

export default function ExamenVisualPage() {
  return <ExamenVisual />;
}
