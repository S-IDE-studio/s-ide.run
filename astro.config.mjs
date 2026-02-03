// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://s-ide.run',
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: vercel(),
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
  },
});