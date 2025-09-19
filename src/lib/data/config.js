export default {
	org: 'ARC',
	navigator: [
		[
			{
				label: 'Dropdown List',
				children: [
					{ label: 'Link 1', link: 'https://google.com' },
					{ label: 'Link 2', link: 'https://google.com' }
				]
			},
			{ link: '', label: 'two home' }
		],
		[
			{ link: 'page-1', label: 'Internal Link' },
			{ link: 'https://google.com', label: 'External Link' }
		]
	],
	wikiPages: [
		{
			path: '/',
			title: '[sitename] home',
			description: 'SEO Maxies'
		}
	],
	menu: []
};
