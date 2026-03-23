# Task 05 — Migrate dynamic routes (blog + booking)

## Objective
Create blog and booking flow routes using TanStack Start conventions including loaders, dynamic params, and server functions.

## Page Components to Copy First
Source: `apps/opticasuarez-react-router/app/ui/pages/`
Target: `apps/web/src/pages/`

- blog/ (blog-post.tsx, sections/)
- book/ (book-appointment.tsx, confirmation.tsx, contact-details.tsx, date-time.tsx, location-selection.tsx)

Update import paths as in previous tasks.

## Blog Routes (2)

### `blog.tsx` → `/blog`
- Convert meta() → head()
- Import blog listing page component

### `blog.$slug.tsx` → `/blog/$slug`
- Convert loader() to TanStack Start loader:
  ```tsx
  export const Route = createFileRoute('/blog/$slug')({
    loader: async ({ params }) => {
      const post = getBlogPost(params.slug)
      if (!post) throw notFound()
      return { post }
    },
    head: ({ loaderData }) => ({
      meta: [
        { title: loaderData.post.title + ' | Óptica Suárez' },
        { name: 'description', content: loaderData.post.excerpt },
        // OG tags...
      ],
      links: [{ rel: 'canonical', href: `https://opticasuarezjaen.es/blog/${loaderData.post.slug}` }],
    }),
    component: BlogPostPage,
  })
  ```

## Booking Flow Routes (4)

### File naming (flat nested routes)
- `cita_.centro.tsx` → `/cita/centro`
- `cita_.horario.tsx` → `/cita/horario`
- `cita_.contacto.tsx` → `/cita/contacto`
- `cita_.confirmacion.tsx` → `/cita/confirmacion`

Each route wraps the corresponding page component with appropriate meta tags.

The booking confirmation route may need access to the `sendBookingEmails` server function (adapted in task 06).

## Acceptance Criteria
- [ ] Blog listing page renders with all posts
- [ ] Individual blog posts render from Markdown
- [ ] Dynamic meta tags work for blog posts
- [ ] All 4 booking flow routes render
- [ ] Booking flow navigation works (step-to-step)
- [ ] 404 thrown for invalid blog slugs
