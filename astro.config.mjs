import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import { autoNewTabExternalLinks } from './src/autoNewTabExternalLinks';
import { optimizeMediaElements } from './src/optimizeMediaElements';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://baxin.pages.dev/',

	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'ja'],
		routing: {
			prefixDefaultLocale: false
		}
	},

	integrations: [
		mdx(),
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en',
					ja: 'ja'
				}
			}
		}),
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
	},

	vite: {
		plugins: [tailwindcss()]
	}
});
