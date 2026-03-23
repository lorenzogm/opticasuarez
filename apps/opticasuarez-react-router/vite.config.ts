import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/postcss";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [reactRouter()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
