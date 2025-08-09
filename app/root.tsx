import { Links, Meta, Scripts, ScrollRestoration, Outlet } from 'react-router';
import './global.css';
import GlobalNavigation from './ui/components/global-navigation';
import GoogleAnalytics from './ui/components/google-analytics';
import { WebsiteSchema, OrganizationSchema } from './ui/components/structured-data';
import { generatePageKeywords, generateMetaKeywords } from './ui/lib/seo-keywords';

export function meta() {
  const homeKeywords = generatePageKeywords('home');
  
  return [
    { title: 'Óptica Suárez, desde 1940 al cuidado de tu visión.' },
    {
      name: 'description',
      content:
        'Óptica Suárez, tu Centro de Optometría y Terapia Visual en Jaén, con más de más de 80 años cuidando de la salud visual. Especializados en visión infantil, Terapia Visual Comportamental, Control de Miopía, Contactología y visión deportiva.',
    },
    {
      name: 'keywords',
      content: generateMetaKeywords(homeKeywords),
    },
    { name: 'author', content: 'Óptica Suárez' },
    {
      property: 'og:title',
      content: 'Óptica Suárez, desde 1940 al cuidado de tu visión.',
    },
    {
      property: 'og:description',
      content:
        'Óptica Suárez, tu Centro de Optometría y Terapia Visual en Jaén, con más de más de 80 años cuidando de la salud visual. Especializados en visión infantil, Terapia Visual Comportamental, Control de Miopía, Contactología y visión deportiva.',
    },
    { property: 'og:type', content: 'website' },
    {
      property: 'og:url',
      content: 'https://opticasuarezjaen.es/',
    },
    {
      property: 'og:image',
      content: 'https://opticasuarezjaen.es/og-image.jpg',
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: 'Óptica Suárez, desde 1940 al cuidado de tu visión.',
    },
    {
      name: 'twitter:description',
      content:
        'Óptica Suárez, tu Centro de Optometría y Terapia Visual en Jaén, con más de más de 80 años cuidando de la salud visual. Especializados en visión infantil, Terapia Visual Comportamental, Control de Miopía, Contactología y visión deportiva.',
    },
  ];
}

export default function App() {
  // Google Analytics 4 Measurement ID
  const GA_MEASUREMENT_ID = 'G-5PKC2Z5L3G';

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://opticasuarezjaen.es/" />
        <Meta />
        <Links />
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
        <WebsiteSchema />
        <OrganizationSchema />
      </head>
      <body>
        <GlobalNavigation />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
