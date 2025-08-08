import { Links, Meta, Scripts, ScrollRestoration, Outlet } from 'react-router';
import './global.css';
import GlobalNavigation from './ui/components/global-navigation';

export function meta() {
  return [
    { title: 'Óptica Suárez, desde 1940 al cuidado de tu visión.' },
    {
      name: 'description',
      content:
        'Óptica Suárez, tu Centro de Optometría y Terapia Visual en Jaén, con más de más de 80 años cuidando de la salud visual. Especializados en visión infantil, Terapia Visual Comportamental, Control de Miopía, Contactología y visión deportiva.',
    },
    {
      name: 'keywords',
      content:
        'óptica, gafas, lentes de contacto, examen visual, optometría, Jaén, gafas graduadas, gafas de sol, terapia visual, control miopía, contactología, visión infantil, visión deportiva',
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
      content: 'https://lorenzogm.github.io/',
    },
    {
      property: 'og:image',
      content: 'https://lorenzogm.github.io/og-image.jpg',
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
