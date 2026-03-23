/// <reference types="vite/client" />

import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import GlobalNavigation from "~/components/global-navigation";
import globalCss from "~/global.css?url";
import { getBaseUrl } from "~/lib/utils";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "p:domain_verify",
        content: "aa1ce7e96c3e34d07a40e64732398337",
      },
    ],
    links: [
      { rel: "stylesheet", href: globalCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/icon-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        href: "/icon-512x512.png",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Óptica Suárez",
          url: getBaseUrl(),
          description:
            "Óptica y centro de optometría avanzada en Jaén. Especialistas en contactología, control de miopía, ortoqueratología y terapia visual.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Óptica Suárez",
          url: getBaseUrl(),
          logo: `${getBaseUrl()}/images/optica-suarez-logo.webp`,
          sameAs: [
            "https://www.instagram.com/opticasuarezjaen/",
            "https://www.facebook.com/opticasuarezjaen/",
          ],
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+34-953-29-09-17",
              contactType: "customer service",
              areaServed: "ES",
              availableLanguage: "Spanish",
            },
          ],
          address: [
            {
              "@type": "PostalAddress",
              streetAddress: "Calle Arquitecto Berges, 18",
              addressLocality: "Jaén",
              postalCode: "23007",
              addressCountry: "ES",
            },
            {
              "@type": "PostalAddress",
              streetAddress: "Bulevar, 18",
              addressLocality: "Jaén",
              postalCode: "23009",
              addressCountry: "ES",
            },
          ],
        }),
      },
    ],
  }),
  component: RootComponent,
});

const GTM_CONTAINER_ID = "GTM-57936PD5";

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            height="0"
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
            width="0"
          />
        </noscript>
        <GlobalNavigation />
        {children}
        <Scripts />
      </body>
    </html>
  );
}
