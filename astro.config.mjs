// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://manapple.dev",
  // English stays unprefixed at the root so already-indexed URLs keep working;
  // Spanish lives under /es/. See src/i18n/config.ts.
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", es: "es-ES" },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
