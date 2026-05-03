// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// Base path: use BASE_PATH when set (e.g. in GitHub Actions for Pages), otherwise "/" for local dev
const base = process.env.BASE_PATH || "/";

// https://astro.build/config
export default defineConfig({
  site: "https://gavin-sre.github.io/longtex-rubber",
  base,
  trailingSlash: "always",

  integrations: [
    sitemap({
      changefreq: "monthly",
      priority: 0.7,
      serialize(item) {
        if (item.url.endsWith("/longtex-rubber/")) item.priority = 1.0;
        if (item.url.includes("/products")) item.priority = 0.9;
        if (item.url.includes("/reference")) item.priority = 0.8;
        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});