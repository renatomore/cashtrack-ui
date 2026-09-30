import { defineConfig } from 'vite';

// Build config for the Showcase (documentation site)
export default defineConfig({
  build: {
    outDir: 'dist-showcase',
    emptyOutDir: true,
  },
  base: '/cashtrack-ui/',
});
