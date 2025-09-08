import { Links, Meta, Scripts, ScrollRestoration, Outlet } from 'react-router';
import './global.css';
import GlobalNavigation from './ui/components/global-navigation';
import GoogleTagManager from './ui/components/google-tag-manager';
import {
  WebsiteSchema,
  OrganizationSchema,
} from './ui/components/structured-data';

export default function App() {
  // Google Tag Manager Container ID
  const GTM_CONTAINER_ID = 'GTM-57936PD5';

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

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
        <GlobalNavigation />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
