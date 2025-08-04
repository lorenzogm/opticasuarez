import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import "./global.css";

export function meta() {
  return [
    { title: "Optica Suarez" },
    { name: "description", content: "Welcome to Optica Suarez!" },
  ];
}

export function HydrateFallback() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Óptica Suárez - Cargando...</title>
        <Links />
      </head>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Óptica Suárez</h1>
              <p className="text-xl text-blue-100">Cargando...</p>
            </div>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
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
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}