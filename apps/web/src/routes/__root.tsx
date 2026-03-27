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
        rel: "alternate",
        hreflang: "es",
        href: getBaseUrl(),
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: getBaseUrl(),
      },
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
          inLanguage: "es",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${getBaseUrl()}/blog?search={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Optician",
          "@id": `${getBaseUrl()}/#organization`,
          name: "Óptica Suárez",
          url: getBaseUrl(),
          logo: `${getBaseUrl()}/images/optica-suarez-logo.webp`,
          image: `${getBaseUrl()}/og-image.jpg`,
          description:
            "Centro de Optometría y Terapia Visual en Jaén con más de 80 años de experiencia. Especializados en visión infantil, terapia visual, control de miopía y contactología.",
          foundingDate: "1940",
          priceRange: "$$",
          sameAs: [
            "https://www.instagram.com/opticasuarezjaen/",
            "https://www.facebook.com/opticasuarezjaen/",
          ],
          serviceArea: {
            "@type": "City",
            name: "Jaén",
            containedIn: {
              "@type": "AdministrativeArea",
              name: "Andalucía",
            },
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Servicios de Óptica y Optometría",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Examen Visual Completo",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Terapia Visual",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Visión Pediátrica",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Control de Miopía",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Contactología",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Visión Deportiva",
                },
              },
            ],
          },
          department: [
            {
              "@type": "Optician",
              "@id": `${getBaseUrl()}/#centro`,
              name: "Óptica Suárez Centro",
              telephone: "+34-953-22-28-45",
              email: "centro@opticasuarezjaen.es",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Calle Arquitecto Berges, 18",
                addressLocality: "Jaén",
                addressRegion: "Andalucía",
                postalCode: "23007",
                addressCountry: "ES",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 37.7796,
                longitude: -3.787,
              },
              hasMap:
                "https://maps.google.com/?q=Óptica+Suárez+Centro,+Calle+Arquitecto+Berges+18,+Jaén",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:30",
                  closes: "13:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "17:00",
                  closes: "20:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:30",
                  closes: "13:30",
                },
              ],
            },
            {
              "@type": "Optician",
              "@id": `${getBaseUrl()}/#bulevar`,
              name: "Óptica Suárez Bulevar",
              telephone: "+34-953-29-09-17",
              email: "bulevar@opticasuarezjaen.es",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bulevar, 18",
                addressLocality: "Jaén",
                addressRegion: "Andalucía",
                postalCode: "23009",
                addressCountry: "ES",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 37.7884,
                longitude: -3.7928,
              },
              hasMap:
                "https://maps.google.com/?q=Óptica+Suárez+Bulevar,+Bulevar+18,+Jaén",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "09:30",
                  closes: "13:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "17:00",
                  closes: "20:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:30",
                  closes: "13:30",
                },
              ],
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
