import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  // Booking routes
  route('cita', 'routes/cita.tsx'),
  route('cita/centro', 'routes/cita-centro.tsx'),
  route('cita/horario', 'routes/cita-horario.tsx'),
  route('cita/contacto', 'routes/cita-contacto.tsx'),
  route('cita/confirmacion', 'routes/cita-confirmacion.tsx'),
  route('quienes-somos', 'routes/quienes-somos.tsx'),
  route('servicios', 'routes/servicios.tsx'),
  route('vision-deportiva', 'routes/vision-deportiva.tsx'),
  route('control-de-miopia', 'routes/control-de-miopia.tsx'),
  route('vision-pediatrica', 'routes/vision-pediatrica.tsx'),
  route('terapia-visual', 'routes/terapia-visual.tsx'),
  route('contactologia', 'routes/contactologia.tsx'),
  route('examen-visual', 'routes/examen-visual.tsx'),
  route('ortoqueratologia', 'routes/ortoqueratologia.tsx'),
  route('planveo', 'routes/planveo.tsx'),
  route('blog', 'routes/blog.tsx'),
  route('blog/:slug', 'routes/blog.$slug.tsx'),
  route('contacto', 'routes/contacto.tsx'),
  route('sitemap.xml', 'routes/sitemap.xml.ts'),
  route('robots.txt', 'routes/robots.txt.ts'),
  route('og-image.jpg', 'routes/og-image.jpg.ts'),
] satisfies RouteConfig;
