import { defineConfig } from 'astro/config';

// Sortie statique : le dossier dist/ est servi tel quel par LWS (FTP).
export default defineConfig({
  site: 'https://apsud.org',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  image: { layout: 'constrained' },
  devToolbar: { enabled: false },
});
