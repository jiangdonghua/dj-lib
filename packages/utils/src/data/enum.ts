/**
 * @description label-value
 */
declare type LabelValue = {
	label: string;
	value: string;
};
/**
 * @description 对象操作-枚举转对象  --- 不支持部分number和部分string的枚举
 * @param {any} enumObj 正规的枚举对象
 * @param {String[]} filterArr 过滤对象
 * @returns {LabelValue[]} 新的数组对象
 */
export const enumInToObject = (enumObj: any, filterArr?: string[]): LabelValue[] => {
	const sourceObj = Object.assign({}, Object(enumObj));
	if (filterArr) {
		Object.keys(sourceObj).map(key => {
			if (!filterArr.includes(key)) {
				delete sourceObj[key];
			}
		});
	}
	const arr: LabelValue[] = [];
	Object.keys(sourceObj).forEach(key => {
		const obj = {
			value: '',
			label: '',
		};
		if (Object.values(sourceObj).every(it => typeof it === 'string')) {
			obj.value = sourceObj[key];
			obj.label = key;
			arr.push(obj);
		} else {
			if (typeof sourceObj[key] === 'number') {
				obj.label = key;
				obj.value = String(sourceObj[key]);
				arr.push(obj);
			}
		}
	});
	return arr;
};

/**
 * @description 对象操作-枚举专程对象
 * @param {any} enumObj 正规的枚举对象 up为数字
 */
export const parseEnum = (enumObj: any) => {
	const sourceObj = Object(enumObj);
	const obj: any = {};
	for (const key in sourceObj) {
		obj[sourceObj[key]] = key;
	}

	return { ...sourceObj, ...obj };
};
