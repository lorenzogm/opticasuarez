import { createFileRoute } from '@tanstack/react-router'
import Blog from '~/pages/blog/blog'
import { BreadcrumbSchema } from '~/components/structured-data'
import { getBlogPosts } from '~/lib/blog'

interface BlogSearch {
  category?: string
}

export const Route = createFileRoute('/blog/')({
  validateSearch: (search: Record<string, unknown>): BlogSearch => ({
    category: typeof search.category === 'string' ? search.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: 'Blog de Salud Visual y Óptica en Jaén | Óptica Suárez' },
      {
        name: 'description',
        content:
          'Descubre consejos de salud visual, neurodesarrollo infantil y novedades en optometría. Blog de Óptica Suárez en Jaén: información útil sobre visión y bienestar ocular para todas las edades.',
      },
      {
        name: 'keywords',
        content:
          'óptica en Jaén, ópticas Jaén, optometría Jaén, revisión visual Jaén, salud visual Jaén, lentes de contacto Jaén, gafas Jaén, centro óptico Jaén, controlar miopía Jaén, terapia visual Jaén, especialista en visión Jaén, clínica visual Jaén, lentes progresivas Jaén, gafas de sol Jaén, óptica infantil Jaén',
      },
      {
        property: 'og:title',
        content: 'Blog de Salud Visual y Óptica en Jaén | Óptica Suárez',
      },
      {
        property: 'og:description',
        content:
          'Descubre consejos de salud visual, neurodesarrollo infantil y novedades en optometría. Blog de Óptica Suárez en Jaén: información útil sobre visión y bienestar ocular para todas las edades.',
      },
      {
        property: 'og:url',
        content: 'https://opticasuarezjaen.es/blog',
      },
      { name: 'robots', content: 'index, follow' },
    ],
    links: [
      { rel: 'canonical', href: 'https://opticasuarezjaen.es/blog' },
    ],
  }),
  loader: () => {
    const articles = getBlogPosts()
    return { articles }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { articles } = Route.useLoaderData()
  const breadcrumbItems = [
    { name: 'Inicio', url: 'https://opticasuarezjaen.es/' },
    { name: 'Blog', url: 'https://opticasuarezjaen.es/blog' },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Blog articles={articles} />
    </>
  )
}
