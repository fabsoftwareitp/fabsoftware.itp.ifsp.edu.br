import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

import tailwind from "@astrojs/tailwind";

import react from '@astrojs/react'
import markdoc from '@astrojs/markdoc'
import keystatic from '@keystatic/astro'

// https://astro.build/config
// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), markdoc(), keystatic()],
  output: 'hybrid',

  adapter: node({
    mode: 'standalone',
  }),
})