import ExamenVisual from '../ui/pages/examen-visual/examen-visual';
import {
  generatePageKeywords,
  generateMetaKeywords,
} from '../ui/lib/seo-keywords';

export function meta() {
  const examenVisualKeywords = generatePageKeywords('examen-visual');

  return [
    { title: 'Examen Visual en Jaén | Óptica Suárez - Graduación de la vista' },
    {
      name: 'description',
      content:
        'Realiza un examen visual completo en Óptica Suárez, Jaén. Detectamos problemas como ambliopía, ojo vago o estrabismo. ¡Reserva tu cita hoy!',
    },
    {
      name: 'keywords',
      content: generateMetaKeywords(examenVisualKeywords),
    },
    {
      property: 'og:title',
      content: 'Examen Visual en Jaén | Óptica Suárez - Graduación de la vista',
    },
    {
      property: 'og:description',
      content:
        'Realiza un examen visual completo en Óptica Suárez, Jaén. Detectamos problemas como ambliopía, ojo vago o estrabismo. ¡Reserva tu cita hoy!',
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
