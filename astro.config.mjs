import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL;
export default defineConfig({
  ...(site ? { site } : {}),
  output: 'static',
  trailingSlash: 'always',
  server: { host: '0.0.0.0' },
  devToolbar: { enabled: false },
  vite: { server: { allowedHosts: ['terminal.local'] } },
});
