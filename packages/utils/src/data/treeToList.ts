// eslint-disable-next-line @typescript-eslint/no-empty-function
export const treeToList = (treeData: any[], { id = 'id', children = 'children' }, cb: Function = () => {}) => {
	let list: any[] = [],
		map: Record<string, any> = {};
	const recursion = (data: any[], level = 0) => {
		data.forEach(item => {
			map[item[id]] = {
				data: item,
				level,
				...cb(item),
			};
			list.push(item);
			if (item[children]) {
				recursion(item[children], level + 1);
			}
		});
	};
	recursion(treeData);
	return {
		list,
		map,
	};
};
