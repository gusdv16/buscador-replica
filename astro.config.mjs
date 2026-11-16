import { defineConfig } from 'astro/config';

// Sitio estático: CSS inline y JavaScript mínimo solo en la página del buscador.
export default defineConfig({
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
});
