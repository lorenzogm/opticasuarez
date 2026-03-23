import { Links, Meta, Scripts, ScrollRestoration, Outlet, redirect } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import './global.css';
import GlobalNavigation from './ui/components/global-navigation';
import GoogleTagManager from './ui/components/google-tag-manager';
import {
  WebsiteSchema,
  OrganizationSchema,
} from './ui/components/structured-data';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  // Redirect trailing-slash URLs to canonical non-trailing-slash URLs (except root "/")
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    return redirect(`${url.pathname.slice(0, -1)}${url.search}${url.hash}`, 301);
  }
  return null;
}

export default function App() {
  // Google Tag Manager Container ID
  const GTM_CONTAINER_ID = 'GTM-57936PD5';

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Pinterest domain verification */}
        <meta name="p:domain_verify" content="aa1ce7e96c3e34d07a40e64732398337" />

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
