import path from "node:path";
import tailwindcss from "@tailwindcss/postcss";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    tanstackStart(),
    nitro({
      serverDir: "server",
      routeRules: {
        "/_serverFn/**": { swr: false },
        "/**": { swr: 60 },
      },
    }),
    viteReact(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
