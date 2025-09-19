import config from './data/config';
/**
 * organise menu based from config
 * @param {*} data
 */
export function organiseMenu(data) {
	if (!config?.menu || !config.menu.length) return { type: 'normal', data };
	const ignore = config.menu.flatMap(({ collection }) => collection);
	let arranged = [];
	let auto = [];
	// organise non ordereded items by default
	data.forEach((item) => {
		if (!ignore.includes(item.label)) auto.push(item);
	});
	// order by config menu preferences
	config.menu.forEach(({ name, collection }, index) => {
		let group = [];
		collection.forEach((orderName) => {
			const item = data.find(({ label }) => label === orderName);
			// adding group to directory node
			item && group.push({ ...item, group: name, groupIndex: index + 1 });
		});
		arranged.push({ name, group });
	});

	return arranged.length
		? { type: 'grouped', data: [...arranged, { name: null, group: [...auto] }] }
		: { type: 'flat', data };
}
