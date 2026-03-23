import { createFileRoute } from '@tanstack/react-router'
import Servicios from '~/pages/servicios/servicios'
import { BreadcrumbSchema } from '~/components/structured-data'
import {
  generatePageKeywords,
  generateMetaKeywords,
} from '~/lib/seo-keywords'

const serviciosKeywords = generatePageKeywords('servicios', [
  'Servicios ópticos',
  'Servicios optométricos',
  'Especialidades ópticas',
])

export const Route = createFileRoute('/servicios')({
  head: () => ({
    meta: [
      { title: 'Servicios - Óptica Suárez' },
      {
        name: 'description',
        content:
          '¿Conoces nuestros servicios? Entra y y fíjate en todo lo que Óptica Suárez puede ofrecerte: exámenes visuales, terapia visual, contactología y más.',
      },
      {
        name: 'keywords',
        content: generateMetaKeywords(serviciosKeywords),
      },
      {
        property: 'og:title',
        content: 'Servicios - Óptica Suárez',
      },
      {
        property: 'og:description',
        content:
          '¿Conoces nuestros servicios? Entra y y fíjate en todo lo que Óptica Suárez puede ofrecerte: exámenes visuales, terapia visual, contactología y más.',
      },
      {
        property: 'og:url',
        content: 'https://opticasuarezjaen.es/servicios',
      },
      { name: 'robots', content: 'index, follow' },
    ],
    links: [
      { rel: 'canonical', href: 'https://opticasuarezjaen.es/servicios' },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const breadcrumbItems = [
    { name: 'Inicio', url: 'https://opticasuarezjaen.es/' },
    { name: 'Servicios', url: 'https://opticasuarezjaen.es/servicios' },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Servicios />
    </>
  )
}
