import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('book', 'routes/book.tsx'),
  route('book/step2', 'routes/book-step2.tsx'),
  route('book/step3', 'routes/book-step3.tsx'),
  route('book/step4', 'routes/book-step4.tsx'),
  route('quienes-somos', 'routes/quienes-somos.tsx'),
  route('vision-pediatrica', 'routes/vision-pediatrica.tsx'),
  route('terapia-visual', 'routes/terapia-visual.tsx'),
  route('contactologia', 'routes/contactologia.tsx'),
  route('examen-visual', 'routes/examen-visual.tsx'),
] satisfies RouteConfig;
