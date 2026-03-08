// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://gavin-sre.github.io",
  base: "/longtex-web",

  vite: {
    plugins: [tailwindcss()],
  },
});