import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';
import { autoNewTabExternalLinks } from './src/autoNewTabExternalLinks';
import { optimizeMediaElements } from './src/optimizeMediaElements';

function safeSitemap() {
	const integration = sitemap();
	const buildDone = integration.hooks?.['astro:build:done'];

	return {
		...integration,
		hooks: {
			...integration.hooks,
			async 'astro:build:done'(params) {
				try {
					await buildDone?.(params);
				} catch (error) {
					const message = error instanceof Error ? error.message : String(error);
					if (message.includes("Cannot read properties of undefined (reading 'reduce')")) {
						params.logger.warn(
							'Skipping sitemap generation because the installed @astrojs/sitemap version is incompatible with this Astro version.'
						);
						return;
					}
					throw error;
				}
			}
		}
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://baxin.netlify.app',
	integrations: [
		mdx(),
		safeSitemap(),
		tailwind(),
		partytown({
			// Adds dataLayer.push as a forwarding-event.
			config: {
				forward: ['dataLayer.push']
			}
		})
	],
	markdown: {
		extendDefaultPlugins: true,
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
