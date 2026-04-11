import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import { autoNewTabExternalLinks } from './src/autoNewTabExternalLinks';
import { optimizeMediaElements } from './src/optimizeMediaElements';

// https://astro.build/config
export default defineConfig({
	site: 'https://baxin.netlify.app',
	integrations: [
		mdx(),
		sitemap(),
		partytown({
			// Adds dataLayer.push as a forwarding-event.
			config: {
				forward: ['dataLayer.push']
			}
		})
	],
	markdown: {
		rehypePlugins: [
			[
				autoNewTabExternalLinks,
				{
					domain: 'localhost:4321'
				}
			],
			optimizeMediaElements
		]
	}
});
