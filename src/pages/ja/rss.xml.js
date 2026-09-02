import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../consts';
import { getBaseSlug, filterByLang } from '../../i18n/utils';

export async function GET(context) {
	const allPosts = await getCollection('blog');
	const enPosts = filterByLang(allPosts, 'en');
	const jaPosts = filterByLang(allPosts, 'ja');
	const jaMap = new Map(jaPosts.map(p => [getBaseSlug(p), p]));

	const posts = enPosts.map(enPost => {
		const baseSlug = getBaseSlug(enPost);
		return jaMap.get(baseSlug) ?? enPost;
	});

	// Add ja-only posts
	for (const jaPost of jaPosts) {
		const baseSlug = getBaseSlug(jaPost);
		if (!enPosts.some(e => getBaseSlug(e) === baseSlug)) {
			posts.push(jaPost);
		}
	}

	// Sort by date descending
	posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	return rss({
		title: `${SITE_TITLE} (ja)`,
		description: `${SITE_DESCRIPTION} - 日本語`,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/ja/${getBaseSlug(post)}/`
		}))
	});
}
