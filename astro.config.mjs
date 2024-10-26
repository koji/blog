import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import { autoNewTabExternalLinks } from './src/autoNewTabExternalLinks';


// https://astro.build/config
export default defineConfig({
  site: 'https://baxin.netlify.app',
  integrations: [mdx(), sitemap(), tailwind(), partytown({
    // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
  })],
  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [[autoNewTabExternalLinks, {
      domain: 'localhost:4321'
    }]]
  }
});
