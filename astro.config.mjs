// @ts-check

import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://s-ide.run',
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel(),
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
  },
});
