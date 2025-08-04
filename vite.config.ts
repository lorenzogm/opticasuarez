import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  base: process.env.NODE_ENV === 'production' ? '/opticasuarez-new/' : '/',
});