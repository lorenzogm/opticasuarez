import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  // Booking routes temporarily hidden
  // route('book', 'routes/book.tsx'),
  // route('book/step2', 'routes/book-step2.tsx'),
  // route('book/step3', 'routes/book-step3.tsx'),
  // route('book/step4', 'routes/book-step4.tsx'),
  route('quienes-somos', 'routes/quienes-somos.tsx'),
  route('servicios', 'routes/servicios.tsx'),
  route('vision-deportiva', 'routes/vision-deportiva.tsx'),
  route('control-de-miopia', 'routes/control-de-miopia.tsx'),
  route('vision-pediatrica', 'routes/vision-pediatrica.tsx'),
  route('terapia-visual', 'routes/terapia-visual.tsx'),
  route('contactologia', 'routes/contactologia.tsx'),
  route('examen-visual', 'routes/examen-visual.tsx'),
  route('blog', 'routes/blog.tsx'),
  route('blog/:slug', 'routes/blog.$slug.tsx'),
  route('contacto', 'routes/contacto.tsx'),
] satisfies RouteConfig;
