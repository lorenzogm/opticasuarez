import { Links, Meta, Scripts, ScrollRestoration, Outlet } from 'react-router';
import './global.css';
import GlobalNavigation from './ui/components/global-navigation';
import GoogleTagManager from './ui/components/google-tag-manager';
import { CartProvider } from './ui/lib/cart-context';
import {
  WebsiteSchema,
  OrganizationSchema,
} from './ui/components/structured-data';
import {
  generatePageKeywords,
  generateMetaKeywords,
} from './ui/lib/seo-keywords';

export function meta() {
  const homeKeywords = generatePageKeywords('home');

  return [
    { title: 'Óptica Suárez, desde 1940 al cuidado de tu visión.' },
    {
      name: 'description',
      content:
        'Óptica Suárez en Jaén, más de 80 años cuidando tu visión. Especialistas en terapia visual, control de miopía, contactología y visión infantil.',
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
        'Óptica Suárez en Jaén, más de 80 años cuidando tu visión. Especialistas en terapia visual, control de miopía, contactología y visión infantil.',
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
        'Óptica Suárez en Jaén, más de 80 años cuidando tu visión. Especialistas en terapia visual, control de miopía, contactología y visión infantil.',
    },
  ];
}

export default function App() {
  // Google Tag Manager Container ID
  const GTM_CONTAINER_ID = 'GTM-57936PD5';

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://opticasuarezjaen.es/" />

        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/icon-512x512.png"
        />

        <Meta />
        <Links />
        <GoogleTagManager containerId={GTM_CONTAINER_ID} />
        <WebsiteSchema />
        <OrganizationSchema />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <CartProvider>
          <GlobalNavigation />
          <Outlet />
        </CartProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
