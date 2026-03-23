import { createFileRoute } from '@tanstack/react-router'
import VisionDeportiva from '~/pages/vision-deportiva/vision-deportiva'
import {
  generatePageKeywords,
  generateMetaKeywords,
} from '~/lib/seo-keywords'

const visionDeportivaKeywords = generatePageKeywords('vision-deportiva')

export const Route = createFileRoute('/vision-deportiva')({
  head: () => ({
    meta: [
      {
        title: 'Visión Deportiva en Jaén | Óptica Suárez',
      },
      {
        name: 'description',
        content:
          'Optimiza tu rendimiento deportivo con nuestros servicios de visión deportiva. Evaluaciones especializadas, entrenamiento visual y equipamiento para deportistas en Jaén.',
      },
      {
        name: 'keywords',
        content: generateMetaKeywords(visionDeportivaKeywords),
      },
      {
        property: 'og:title',
        content: 'Visión Deportiva en Jaén | Óptica Suárez',
      },
      {
        property: 'og:description',
        content:
          'Optimiza tu rendimiento deportivo con nuestros servicios de visión deportiva. Evaluaciones especializadas, entrenamiento visual y equipamiento para deportistas en Jaén.',
      },
      {
        property: 'og:url',
        content: 'https://opticasuarezjaen.es/vision-deportiva',
      },
      { name: 'robots', content: 'index, follow' },
    ],
    links: [
      { rel: 'canonical', href: 'https://opticasuarezjaen.es/vision-deportiva' },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <VisionDeportiva />
}
