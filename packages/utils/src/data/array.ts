/**
 * unique
 * @description 数组去重
 * @param {arr} arr
 */
export function unique(arr: number[]) {
	let obj: any = {},
		temp: any[] = [];
	for (let i = 0; i < arr.length; i++) {
		if (!obj[arr[i]]) {
			obj[arr[i]] = 1;
			temp.push(arr[i]);
		}
	}
	return temp;
}
export function chunkArray(array: any[], size: number = 1) {
	const length = array == null ? 0 : array.length;
	if (!length || size < 1) {
		return [];
	}
	let index = 0,
		resIndex = 0;
	const result = new Array(Math.ceil(length / size));

	while (index < length) {
		result[resIndex++] = array.slice(index, (index += size));
	}
	return result;
}
