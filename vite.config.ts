import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/opticasuarez-new' : '/',
  plugins: [reactRouter()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
