import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  base: '/starweb-sandbox/',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});
