export interface Project {
	name: string;
	demoLink: string;
	tags?: string[];
	description?: string;
	postLink?: string;
	demoLinkRel?: string;
	[key: string]: any;
}

export const projects: Project[] = [
	{
		name: 'Devaradise.com',
		description: 'A blog that sharing web development resources and tutorials',
		demoLink: 'https://devaradise.com',
		tags: ['Blog']
	},
	{
		name: 'Sellercraft App',
		description: 'An Ecommerce omnichannel platform in Southeast Asia',
		demoLink: 'https://sellercraft.co',
		demoLinkRel: 'nofollow noopener noreferrer',
		tags: ['ECommerce', 'Saas']
	},
	{
		name: 'Gaji.id App',
		description: 'Payroll and HR Management Information System',
		demoLink: 'https://sellercraft.co',
		demoLinkRel: 'nofollow noopener noreferrer',
		tags: ['HRIS', 'Saas']
	},
	{
		name: 'Gaji.id App',
		description: 'Payroll and HR Management Information System',
		demoLink: 'https://sellercraft.co',
		demoLinkRel: 'nofollow noopener noreferrer',
		tags: ['HRIS', 'Saas']
	},
	{
		name: 'Gaji.id App',
		description: 'Payroll and HR Management Information System',
		demoLink: 'https://sellercraft.co',
		demoLinkRel: 'nofollow noopener noreferrer',
		tags: ['HRIS', 'Saas']
	},
	{
		name: 'Gaji.id App',
		description: 'Payroll and HR Management Information System',
		demoLink: 'https://sellercraft.co',
		demoLinkRel: 'nofollow noopener noreferrer',
		tags: ['HRIS', 'Saas']
	}
];
