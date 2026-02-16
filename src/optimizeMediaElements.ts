import type { RehypePlugin } from '@astrojs/markdown-remark';
import { visit } from 'unist-util-visit';

export const optimizeMediaElements: RehypePlugin = () => {
	return (tree: unknown) => {
		visit(tree, (node: any) => {
			if (node.type !== 'element' || node.tagName !== 'video') {
				return;
			}

			node.properties = node.properties || {};
			if (!('preload' in node.properties)) {
				node.properties.preload = 'none';
			}
		});
	};
};
