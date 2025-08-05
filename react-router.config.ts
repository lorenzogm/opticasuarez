import type { Config } from '@react-router/dev/config';

export default {
  ssr: true,
  prerender: true,
  basename: process.env.NODE_ENV === 'production' ? '/opticasuarez-new' : '/',
} satisfies Config;
