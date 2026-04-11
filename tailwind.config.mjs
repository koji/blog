import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				xl: '980px'
			}
		},
		extend: {
			colors: {
				apple: {
					blue: '#0071e3',
					'link-blue': '#0066cc',
					'bright-blue': '#2997ff',
					'near-black': '#1d1d1f',
					'light-gray': '#f5f5f7',
					'dark-surface-1': '#272729',
					'dark-surface-2': '#262628',
					'dark-surface-3': '#28282a',
					'dark-surface-4': '#2a2a2d',
					'dark-surface-5': '#242426',
					'btn-active': '#ededf2',
					'btn-default': '#fafafc'
				}
			},
			borderRadius: {
				apple: '8px',
				'apple-sm': '5px',
				'apple-lg': '12px',
				'apple-pill': '980px',
				'apple-filter': '11px'
			},
			boxShadow: {
				apple: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px'
			},
			fontFamily: {
				'sf-display': ['"SF Pro Display"', '"SF Pro Icons"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
				'sf-text': ['"SF Pro Text"', '"SF Pro Icons"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif']
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '100%',
						'--tw-prose-body': '#1d1d1f',
						'--tw-prose-headings': '#1d1d1f',
						'--tw-prose-links': '#0066cc',
						'--tw-prose-bold': '#1d1d1f',
						'--tw-prose-code': '#1d1d1f',
						'--tw-prose-pre-bg': '#1d1d1f',
						'--tw-prose-pre-code': '#ffffff',
						'--tw-prose-counters': '#1d1d1f',
						'--tw-prose-bullets': '#1d1d1f',
						'--tw-prose-hr': '#d2d2d7',
						'--tw-prose-quotes': 'rgba(0,0,0,0.8)',
						'--tw-prose-quote-borders': '#d2d2d7',
						'--tw-prose-th-borders': '#d2d2d7',
						'--tw-prose-td-borders': '#d2d2d7',
						'--tw-prose-invert-body': '#ffffff',
						'--tw-prose-invert-headings': '#ffffff',
						'--tw-prose-invert-links': '#2997ff',
						'--tw-prose-invert-bold': '#ffffff',
						'--tw-prose-invert-code': '#ffffff',
						'--tw-prose-invert-pre-bg': '#242426',
						'--tw-prose-invert-pre-code': '#ffffff',
						'--tw-prose-invert-counters': '#ffffff',
						'--tw-prose-invert-bullets': '#ffffff',
						'--tw-prose-invert-hr': '#424245',
						'--tw-prose-invert-quotes': 'rgba(255,255,255,0.8)',
						'--tw-prose-invert-quote-borders': '#424245',
						'--tw-prose-invert-th-borders': '#424245',
						'--tw-prose-invert-td-borders': '#424245',
						a: {
							color: '#0066cc',
							textDecoration: 'none',
							'&:hover': {
								textDecoration: 'underline'
							}
						},
						h1: {
							fontWeight: '600',
							lineHeight: '1.07',
							letterSpacing: '-0.28px'
						},
						h2: {
							fontWeight: '600',
							lineHeight: '1.10'
						},
						h3: {
							fontWeight: '600',
							lineHeight: '1.14',
							letterSpacing: '0.196px'
						},
						h4: {
							fontWeight: '600',
							lineHeight: '1.19',
							letterSpacing: '0.231px'
						}
					}
				}
			}
		}
	},
	plugins: [typography]
};
