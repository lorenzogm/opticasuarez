import { Links, Meta, Scripts, ScrollRestoration, Outlet } from 'react-router';
import './global.css';
import GlobalNavigation from './ui/components/global-navigation';

export function meta() {
  return [
    { title: 'Óptica Suárez - Expertos en salud visual desde 1985' },
    {
      name: 'description',
      content:
        'Óptica Suárez, expertos en salud visual desde 1985. Ofrecemos exámenes visuales, gafas graduadas, lentes de contacto y gafas de sol de las mejores marcas en Madrid.',
    },
    {
      name: 'keywords',
      content:
        'óptica, gafas, lentes de contacto, examen visual, optometría, Madrid, gafas graduadas, gafas de sol',
    },
    { name: 'author', content: 'Óptica Suárez' },
    {
      property: 'og:title',
      content: 'Óptica Suárez - Expertos en salud visual desde 1985',
    },
    {
      property: 'og:description',
      content:
        'Óptica Suárez, expertos en salud visual desde 1985. Ofrecemos exámenes visuales, gafas graduadas, lentes de contacto y gafas de sol de las mejores marcas en Madrid.',
    },
    { property: 'og:type', content: 'website' },
    {
      property: 'og:url',
      content: 'https://lorenzogm.github.io/',
    },
    {
      property: 'og:image',
      content: 'https://lorenzogm.github.io/og-image.jpg',
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: 'Óptica Suárez - Expertos en salud visual desde 1985',
    },
    {
      name: 'twitter:description',
      content:
        'Óptica Suárez, expertos en salud visual desde 1985. Ofrecemos exámenes visuales, gafas graduadas, lentes de contacto y gafas de sol de las mejores marcas en Madrid.',
    },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
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
