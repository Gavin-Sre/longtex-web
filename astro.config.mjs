// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from "@tailwindcss/vite";

// Base path: use BASE_PATH when set (e.g. in GitHub Actions for Pages), otherwise "/" for local dev
const base = process.env.BASE_PATH || "/";

// https://astro.build/config
export default defineConfig({
  site: "https://gavin-sre.github.io",
  base,

  vite: {
    plugins: [tailwindcss()],
  },
});