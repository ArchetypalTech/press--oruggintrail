import { organiseMenu } from '$lib/utils';
import config from '$lib/data/config.js';
export async function load({ url }) {
	let menu = null;
	let path = null;
	let navigator = config?.navigator || null;
	const menudata = await import(`$lib/data/menu.js`);
	if (menudata) {
		menu = organiseMenu(menudata.default);
		path = menudata.default.find(({ link }) => url.pathname.includes(link));
	}

	return {
		title: path ? path.label : null,
		menu,
		navigator
	};
}
