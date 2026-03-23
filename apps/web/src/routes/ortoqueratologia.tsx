import { createFileRoute } from '@tanstack/react-router'
import Ortoqueratologia from '~/pages/ortoqueratologia/ortoqueratologia'
import {
  generatePageKeywords,
  generateMetaKeywords,
} from '~/lib/seo-keywords'

const ortoqueratologiaKeywords = generatePageKeywords('ortoqueratologia')

export const Route = createFileRoute('/ortoqueratologia')({
  head: () => ({
    meta: [
      { title: 'Ortoqueratología en Jaén | Óptica Suárez' },
      {
        name: 'description',
        content:
          'En Óptica Suárez somos especialistas en ortoqueratología, para frenar la miopía y mejorar la visión sin necesidad de gafas. Más de 80 años de experiencia nos avalan ofreciendo Orto-K en Jaén.',
      },
      {
        name: 'keywords',
        content: generateMetaKeywords(ortoqueratologiaKeywords),
      },
      {
        property: 'og:title',
        content: 'Ortoqueratología en Jaén | Óptica Suárez',
      },
      {
        property: 'og:description',
        content:
          'En Óptica Suárez somos especialistas en ortoqueratología, para frenar la miopía y mejorar la visión sin necesidad de gafas. Más de 80 años de experiencia nos avalan ofreciendo Orto-K en Jaén.',
      },
      {
        property: 'og:url',
        content: 'https://opticasuarezjaen.es/ortoqueratologia',
      },
      { name: 'robots', content: 'index, follow' },
    ],
    links: [
      { rel: 'canonical', href: 'https://opticasuarezjaen.es/ortoqueratologia' },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <Ortoqueratologia />
}
