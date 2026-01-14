import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  output: "server", // Enable SSR for dynamic routes
  adapter: vercel(),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // Keep existing global styles
    }),
  ],
  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },
  },
})
