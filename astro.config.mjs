import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react'
import markdoc from '@astrojs/markdoc'
import keystatic from '@keystatic/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), markdoc(), keystatic()],
  output: 'hybrid',

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: node({
    mode: 'standalone',
  }),
  
  redirects: {
    '/admin': '/keystatic'
  }
})