import { defineConfig } from 'astro/config';

// Sitio estático: CSS inline y JavaScript mínimo solo en la página del buscador.
export default defineConfig({
  site: 'https://gusdv16.github.io',
  base: '/buscador-replica',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
});
