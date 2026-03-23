import { createFileRoute } from '@tanstack/react-router'
import VisionPediatrica from '~/pages/vision-pediatrica/vision-pediatrica'
import { BreadcrumbSchema } from '~/components/structured-data'
import {
  generatePageKeywords,
  generateMetaKeywords,
} from '~/lib/seo-keywords'

const visionPediatricaKeywords = generatePageKeywords('vision-pediatrica')

export const Route = createFileRoute('/vision-pediatrica')({
  head: () => ({
    meta: [
      { title: 'Visión Pediátrica y Examen Visual Infantil en Jaén – Óptica Suárez' },
      {
        name: 'description',
        content:
          'Realizamos exámenes visuales infantiles en Jaén para detectar de forma temprana ojo vago, miopía o estrabismo. Prevención y cuidado visual desde la infancia.',
      },
      {
        name: 'keywords',
        content: generateMetaKeywords(visionPediatricaKeywords),
      },
      {
        property: 'og:title',
        content: 'Visión Pediátrica y Examen Visual Infantil en Jaén – Óptica Suárez',
      },
      {
        property: 'og:description',
        content:
          'Realizamos exámenes visuales infantiles en Jaén para detectar de forma temprana ojo vago, miopía o estrabismo. Prevención y cuidado visual desde la infancia.',
      },
      {
        property: 'og:url',
        content: 'https://opticasuarezjaen.es/vision-pediatrica',
      },
      { name: 'robots', content: 'index, follow' },
    ],
    links: [
      { rel: 'canonical', href: 'https://opticasuarezjaen.es/vision-pediatrica' },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const breadcrumbItems = [
    { name: 'Inicio', url: 'https://opticasuarezjaen.es/' },
    { name: 'Servicios', url: 'https://opticasuarezjaen.es/servicios' },
    {
      name: 'Visión Infantil',
      url: 'https://opticasuarezjaen.es/vision-pediatrica',
    },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <VisionPediatrica />
    </>
  )
}
