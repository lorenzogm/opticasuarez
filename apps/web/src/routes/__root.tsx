/// <reference types="vite/client" />

import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import FeatureFlagMenu from "~/components/feature-flag-menu";
import GlobalNavigation from "~/components/global-navigation";
import globalCss from "~/global.css?url";
import { CartProvider } from "~/lib/cart";
import type { FeatureFlags } from "~/lib/feature-flags";
import { fetchSiteSettings } from "~/lib/server-fns";
import {
  createOpticianSchema,
  createWebsiteSchema,
} from "~/lib/structured-data-helpers";

export const Route = createRootRoute({
  loader: async () => {
    const { settings, isPreview } = await fetchSiteSettings();
    return { settings, isPreview };
  },
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
        children: JSON.stringify(createWebsiteSchema()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(createOpticianSchema()),
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});

function NotFoundPage() {
  return (
    <section className="flex min-h-[50vh] items-center justify-center px-4 py-16">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-3xl text-gray-900">
          Página no encontrada
        </h1>
        <p className="mb-8 text-gray-600">La página que buscas no existe.</p>
        <Link
          className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
          to="/"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}

const GTM_CONTAINER_ID = "GTM-57936PD5";

function RootComponent() {
  const loaderData = Route.useLoaderData() as
    // biome-ignore lint/suspicious/noExplicitAny: dynamic Sanity data
    { settings: any; isPreview: boolean } | undefined;
  const shopEnabled = loaderData?.settings?.featureFlags?.shopEnabled ?? false;
  const featureFlags: FeatureFlags = loaderData?.settings?.featureFlags ?? {
    shopEnabled: false,
    ecommerce: false,
  };
  const isPreview = loaderData?.isPreview ?? false;
  return (
    <RootDocument
      featureFlags={featureFlags}
      isPreview={isPreview}
      shopEnabled={shopEnabled}
    >
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({
  children,
  shopEnabled,
  isPreview,
  featureFlags,
}: Readonly<{
  children: ReactNode;
  shopEnabled: boolean;
  isPreview: boolean;
  featureFlags: FeatureFlags;
}>) {
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
        {isPreview && (
          <div className="flex items-center justify-center gap-4 bg-amber-500 px-4 py-2 font-medium text-sm text-white">
            <span>Modo vista previa — Estás viendo contenido en borrador</span>
            <a
              className="rounded bg-white px-3 py-1 text-amber-700 hover:bg-amber-50"
              href="/api/preview/disable"
            >
              Salir
            </a>
          </div>
        )}
        <CartProvider>
          <GlobalNavigation shopEnabled={shopEnabled} />
          {children}
        </CartProvider>
        <Scripts />
        <FeatureFlagMenu featureFlags={featureFlags} />
      </body>
    </html>
  );
}
