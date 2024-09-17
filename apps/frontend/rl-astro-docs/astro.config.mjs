import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import compress from 'astro-compress'
import icon from "astro-icon"
import vercel from '@astrojs/vercel/serverless'

export default defineConfig({
  compressHTML: true,
  integrations: [mdx(), icon(), tailwind({
    applyBaseStyles: false,
  }), compress()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    }
  }),
  output: 'hybrid',
})
