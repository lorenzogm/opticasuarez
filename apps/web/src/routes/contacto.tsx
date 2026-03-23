import { createFileRoute } from '@tanstack/react-router'
import ContactoPage from '~/pages/contacto/contacto'
import { BreadcrumbSchema } from '~/components/structured-data'

export const Route = createFileRoute('/contacto')({
  head: () => ({
    meta: [
      { title: 'Contacto - Óptica Suárez Jaén' },
      {
        name: 'description',
        content:
          '¿Tienes alguna duda o pregunta? Ponte en contacto con nosotros. Encuentra nuestra información de contacto y ubicación.',
      },
      {
        property: 'og:title',
        content: 'Contacto - Óptica Suárez Jaén',
      },
      {
        property: 'og:description',
        content:
          '¿Tienes alguna duda o pregunta? Ponte en contacto con nosotros. Encuentra nuestra información de contacto y ubicación.',
      },
      {
        property: 'og:url',
        content: 'https://opticasuarezjaen.es/contacto',
      },
      { name: 'robots', content: 'index, follow' },
    ],
    links: [
      { rel: 'canonical', href: 'https://opticasuarezjaen.es/contacto' },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const breadcrumbItems = [
    { name: 'Inicio', url: 'https://opticasuarezjaen.es/' },
    { name: 'Contacto', url: 'https://opticasuarezjaen.es/contacto' },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ContactoPage />
    </>
  )
}
