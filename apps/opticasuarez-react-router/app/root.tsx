import type { LoaderFunctionArgs } from "react-router";
import {
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
} from "react-router";
import "./global.css";
import GlobalNavigation from "./ui/components/global-navigation";
import GoogleTagManager from "./ui/components/google-tag-manager";
import {
  OrganizationSchema,
  WebsiteSchema,
} from "./ui/components/structured-data";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  // Redirect trailing-slash URLs to canonical non-trailing-slash URLs (except root "/")
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    return redirect(
      `${url.pathname.slice(0, -1)}${url.search}${url.hash}`,
      301
    );
  }
  return null;
}

export default function App() {
  // Google Tag Manager Container ID
  const GTM_CONTAINER_ID = "GTM-57936PD5";

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />

        {/* Pinterest domain verification */}
        <meta
          content="aa1ce7e96c3e34d07a40e64732398337"
          name="p:domain_verify"
        />

        {/* Favicon */}
        <link href="/favicon.ico" rel="icon" type="image/x-icon" />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/icon-192x192.png"
          rel="icon"
          sizes="192x192"
          type="image/png"
        />
        <link
          href="/icon-512x512.png"
          rel="icon"
          sizes="512x512"
          type="image/png"
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
            height="0"
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
            width="0"
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
