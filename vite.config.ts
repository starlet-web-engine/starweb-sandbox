import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  base: '/web-engine-sandbox/',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});
