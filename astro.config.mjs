import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL || 'https://nessundormapub.it';
export default defineConfig({
  ...(site ? { site } : {}),
  output: 'static',
  trailingSlash: 'always',
  server: { host: '0.0.0.0' },
  devToolbar: { enabled: false },
  vite: { server: { allowedHosts: ['terminal.local'] } },
});
