/**
 * @description 将json数据压平
 * @param data
 * @returns
 */
export const flattenJson = (data: Record<string, any>) => {
	const result: Record<string, any> = {};
	const recursion = (data: Record<string, any>, prefix?: string) => {
		Object.entries(data).forEach(([key, value]) => {
			let _prefix = '';
			if (prefix) {
				_prefix = `${prefix}.${key}`;
			} else {
				_prefix = key;
			}
			if (typeof value === 'object') {
				recursion(value, _prefix);
			} else {
				result[_prefix] = value;
			}
		});
	};
	recursion(data);
	return result;
};
