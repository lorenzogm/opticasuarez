import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig({
  plugins: [reactRouter()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
